import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 150,
    minHeight: 300,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`https://image.tmdb.org/t/p/w500${props.img}`}
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="body1" component="h2">
          {props.character}
        </Typography>
      </CardContent>
    </Card>
  );
}
