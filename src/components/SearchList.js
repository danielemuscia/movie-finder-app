import React from "react";
import { Grid, Typography } from "@material-ui/core";
import MovieCardSearch from "./MovieCardSearch";
import { useContext } from "react";
import { MyContext } from "../Context";

export default function SearchList() {
  const context = useContext(MyContext);
  let { foundMovies } = context;

  return foundMovies.length > 0 ? (
    <>
      <Grid container>
        <Grid item sm={3}></Grid>
        <Grid item container xs={12} sm={6} spacing={2}>
          {foundMovies.map((movie) => {
            return (
              <Grid item xs={12} key={movie.id}>
                <MovieCardSearch
                  title={movie.title}
                  id={movie.id}
                  overview={movie.overview}
                  poster={movie.poster_path}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid>
    </>
  ) : (
    <Typography style={{ marginTop: 100, textAlign: "center" }} variant="h4">
      Usa la barra di ricerca per trovare il film
    </Typography>
  );
}
