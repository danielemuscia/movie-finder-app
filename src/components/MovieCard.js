import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 206,
    },
  },
  media: {
    height: 500,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      height: 316,
    },
  },
}));

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          component={RouterLink}
          to={`/movie/${props.id}`}
          color="inherit"
          underline="none"
        >
          <CardMedia
            className={classes.media}
            image={`http://image.tmdb.org/t/p/w185/${props.poster}`}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Rating
              name="rate"
              precision={0.5}
              value={props.rating / 2}
              readOnly
            />
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}
