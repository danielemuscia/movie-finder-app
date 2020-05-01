import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'
import {Link as RouterLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 500,
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },
  },
}));

export default function MovieCardSearch(props) {
  const classes = useStyles();
    const {title, overview, poster, id} = props
  return (
    <Link component={RouterLink} to={`/movie/${id}`} color='inherit' underline='none'>
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {overview.substring(0, 140) + '...'}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`http://image.tmdb.org/t/p/w185${poster}`}
        title={title}
      />
    </Card>
    </Link>
  );
}

