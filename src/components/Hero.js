import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import tv from "../assets/tv.png";

const useStyles = makeStyles((theme) => ({
  uvp: {
    padding: 72,
  },
  container: {
    minHeight: "85vh",
  },
  text: {
    paddingBottom: 30,
  },
}));

export default function Hero() {
  const classes = useStyles();
  return (
    <>
      <Grid container alignItems='center' className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.uvp}>
          <Typography variant="h2" className={classes.text}>
            Tutti i Film in un <br></br> Unico Catalogo
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            Sei stanco di dover cercare i film tra le diverse piattaforme di
            streaming online? <br></br> Movie Finder ti offre tutti i film in un
            unico catalogo cosí sarai sempre sicuro di scegliere quello che fa
            per te!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/catalog"
          >
            Scopri il catalogo
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={tv} />
        </Grid>
      </Grid>
    </>
  );
}
