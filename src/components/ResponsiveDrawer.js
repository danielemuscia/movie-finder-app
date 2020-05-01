import React from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Chip,
  Slider,
  Box,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search'
import MovieList from "./MovieList";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { genres, sortOption } from "../Data";
import { useState, useContext } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import startOfYear from "date-fns/startOfYear";
import endOfYear from "date-fns/endOfYear";
import { MyContext } from "../Context";
import moment from "moment";
import {Link} from 'react-router-dom'

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  chip: {
    margin: theme.spacing(0.5, 1, 0.5, 0),
  },
  formControl: {
    minWidth: 120,
  },
  searchIcon: {
    height: '100%',
    display: 'flex',
    color:'white'
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const context = useContext(MyContext);
  const { getMovies, setSort, sort } = context;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedChips, setselectedChips] = useState([]);
  const [runtime, setRuntime] = useState([0, 400]);
  const [rating, setRating] = useState(null);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  
  const chipData = genres.map((item) => item);
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleDateChangeFrom = (date) => {
    return date
      ? setSelectedDateFrom(moment(startOfYear(date)).format("YYYY-MM-DD"))
      : setSelectedDateFrom(date);
  };
  const handleDateChangeTo = (date) => {
    return date
      ? setSelectedDateTo(moment(endOfYear(date)).format("YYYY-MM-DD"))
      : setSelectedDateTo(date);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleRuntimeChange = (event, newValue) => {
    setRuntime(newValue);
  };
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFilterClick = () => {
    getMovies(
      'filter',
      "/discover/movie",
      runtime,
      rating,
      selectedDateFrom,
      selectedDateTo,
      getGenresId.join(),
      undefined,
      sort
      );
      setMobileOpen(false)
  }
  const getGenresId = selectedChips.map(item => item.id)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Box component="fieldset" mb={1} borderColor="transparent">
        <Typography variant="h6" paragraph={true}>
          Ordina
        </Typography>
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <FormControl className={classes.formControl}>
          <InputLabel id="select-sort">Ordina per</InputLabel>
          <Select
            labelId="selected-sort"
            id="selected-sort-id"
            value={sort}
            onChange={handleChangeSort}
          >
            {sortOption.map((item) => (
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography variant="h6" paragraph={true}>
          Filtra
        </Typography>
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography id="range-slider" gutterBottom>
          Anno di uscita
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <Grid item xs={6}>
              <DatePicker
                views={["year"]}
                label="dal"
                value={selectedDateFrom}
                onChange={handleDateChangeFrom}
                clearable={true}
                clearLabel="Rimuovi"
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                views={["year"]}
                label="al"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                clearable={true}
                clearLabel="Rimuovi"
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography id="range-slider" gutterBottom>
          Generi
        </Typography>
        {chipData.map((item) => (
          <Chip
            className={classes.chip}
            key={item.id}
            label={item.name}
            color="primary"
            variant={selectedChips.includes(item) ? "default" : "outlined"}
            onClick={() => {
              if (selectedChips.includes(item)) {
                setselectedChips((chips) =>
                  chips.filter((chip) => item.id !== chip.id)
                );
              } else {
                setselectedChips((prev) => [...prev, item]);
              }
            }}
          />
        ))}
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography id="range-slider" gutterBottom>
          Durata in minuti
        </Typography>
        <Slider
          value={runtime}
          onChange={handleRuntimeChange}
          style={{width: '90%'}}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          max={400}
          marks={[
            { value: 0, label: "0" },
            { value: 400, label: "400" },
          ]}
        />
      </Box>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography id="range-slider" gutterBottom>
          Punteggio minimo
        </Typography>
        <Rating
          name="rating"
          defaultValue={0}
          value={rating}
          precision={0.5}
          onChange={handleRatingChange}
        />
      </Box>
      <Button
      variant='contained'
      color='primary'
      style={{margin: theme.spacing(2)}}
        onClick={handleFilterClick
          
        }
      >
        filtra
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Catalogo
          </Typography>
            <Link to='/search' ><SearchIcon className={classes.searchIcon}/></Link>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <MovieList
          getGenresId={getGenresId}
          runtime={runtime}
          rating={rating}
          selectedDateFrom={selectedDateFrom}
          selectedDateTo={selectedDateTo}
        ></MovieList>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
