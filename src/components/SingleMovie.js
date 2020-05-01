import React from "react";
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Divider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import CastCard from './CastCard'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    margin: "auto",
    maxWidth: 1200,
  },
  poster: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  box: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
}));

export default function SingleMovie(props) {
  const classes = useStyles();
  const [movieInfo, setMovieInfo] = useState({});
  const [castInfo, setCastInfo] = useState({})
  const [loading, setloading] = useState(true);

  const getSingleMovie = async (id) => {

    let apiKey = process.env.REACT_APP_API_KEY
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=it-IT`;
    try {
      let response = await axios.get(url);
      let movieInfo = response.data;
      setMovieInfo(movieInfo);

    } catch (error) {}
  };
  const getCast = async (id) => {

    let apiKey = process.env.REACT_APP_API_KEY
    let url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=it-IT`;
    try {
      let response = await axios.get(url);
      let castInfo = response.data;
      setCastInfo(castInfo);

    } catch (error) {}
  };

  const apiCall = async() => {
    setloading(true);
    await getSingleMovie(props.match.params.slug);
    await getCast(props.match.params.slug)
    setloading(false);
  }

  useEffect(() => {
    apiCall()
    return (setMovieInfo({}), setCastInfo({}));
  }, []);

  return (
    <div className={classes.root}>
      {!loading && <Paper className={classes.paper} elevation={1}>
        <Grid container spacing={3}>
          <Grid item sm={3}>
            <img
              className={classes.poster}
              src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
              alt={movieInfo.title}
            />
          </Grid>
          <Grid container item sm={9}>
            <Grid item>
              <Box className={classes.box}>
                <Typography variant="h2">{movieInfo.title}</Typography>
                <Typography variant="subtitle2">
                  {!loading &&
                    `${movieInfo.release_date} - ${movieInfo.genres.map(
                      (item) => item.name
                    )} - ${movieInfo.runtime} minuti`}
                </Typography>
                <Rating
                    name="rate"
                    precision={0.5}
                    value={movieInfo.vote_average/2}
                    readOnly
                  />
              </Box>
              <Box className={classes.box}>
                <Grid item>
                    <Typography variant='overline'>{movieInfo.tagline}</Typography>
                  <Typography variant="h5">Trama</Typography>
                  <Typography variant="body1">{movieInfo.overview}</Typography>
                </Grid>
              </Box>
              <Box className={classes.box}>
              <Grid container item spacing={9}> 
                <Grid item>
                  <Typography variant='h6'>{!loading && castInfo.crew.filter(item => item.job === 'Director')[0].name}</Typography>
                  <Typography>Regista</Typography>
                </Grid>
                <Grid item>
                <Typography variant='h6'>{!loading && castInfo.crew.filter(item => item.job === 'Screenplay').map(item => item.name).join(', ')}</Typography>
                  <Typography>Sceneggiatori</Typography>
                </Grid>
              </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Divider/>
        <Box className={classes.box}>
            <Typography variant='h5'>Attori principali</Typography>
            <Grid container spacing={2} style={{marginTop: 20}}>
                {
                    !loading && castInfo.cast.slice(0,7).map(item => {
                        return <Grid item key={uuidv4()}> <CastCard name={item.name} img={item.profile_path} character={item.character} /> </Grid>
                    })
                }
            </Grid>
        </Box>
      </Paper>}
    </div>
  );
}
