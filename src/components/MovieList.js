import React from "react";
import MovieCard from "./MovieCard";
import { MyContext } from "../Context";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography, Grid, Button } from "@material-ui/core";
import loadingGif from '../assets/800.gif'

export default function MovieList(props) {
  const context = useContext(MyContext);
  let { movies, getMovies, page, loading, sort } = context;

  const checkGenres = () =>
    props.getGenresId > 0 ? props.getGenresId.join() : undefined;
  const genres = checkGenres();
  useEffect(() => {
    getMovies(
      "filter",
      "/discover/movie",
      props.runtime,
      props.rating,
      props.selectedDateFrom,
      props.selectedDateTo,
      genres
    );
  }, []);
  const handleNextPage = () => {
    console.log(genres);
    return getMovies(
      "nextPage",
      "/discover/movie",
      props.runtime,
      props.rating,
      props.selectedDateFrom,
      props.selectedDateTo,
      genres,
      page,
      sort
    );
  };

  return movies.length > 0 ? (
    <>
      <Grid container spacing={6} justify='center'>
        {movies.map((item) => {
          return (
            <Grid item xs={12} sm key={uuidv4()}>
              <MovieCard
                title={item.title}
                poster={item.poster_path}
                id={item.id}
                rating={item.vote_average}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify='center' style={{marginTop: 60}}>
      <Grid item>
      {loading && <img src={loadingGif} style={{width:70}}alt='caricamento' />}
      {!loading && <Button onClick={handleNextPage} size='large' variant='outlined' color='primary'>Carica altri film</Button>}
      </Grid>
      </Grid>
    </>
  ) : (
    <>
      <Typography variant="h4">Nessun titolo trovato</Typography>
      <Typography variant="body1">Prova a cambiare i filtri</Typography>
    </>
  );
}
