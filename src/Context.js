import React from "react";
import axios from "axios";

const MyContext = React.createContext();

class ContextProvider extends React.Component {
  state = {
    movies: [],
    series: [],
    loading: true,
    page: 1,
    sort: 'popularity.desc',
    searchQuery: '',
    movieInfo: [],
    foundMovies: []
  };

  createMovieDbUrl = (relativeUrl) => {
    let apiKey = process.env.REACT_APP_API_KEY
    let baseUrl = `https://api.themoviedb.org/3${relativeUrl}?api_key=${apiKey}&language=it-IT`;
    return baseUrl;
  };

  getData = async(searchType,
    relativeUrl,
    runtime,
    rating,
    dateFrom,
    dateTo,
    genres,
    page,
    sort) => {
      let baseUrl = this.createMovieDbUrl(relativeUrl);
      let response = await axios({
        metod: "get",
        url: baseUrl,
        params: {
          "with_runtime.gte": runtime ? runtime[0] : null,
          "with_runtime.lte": runtime ? runtime[1] : null,
          "vote_average.gte": rating*2,
          "primary_release_date.gte": dateFrom,
          "primary_release_date.lte": dateTo,
          'vote_count.gte': 100,
          with_genres: genres,
          page: page,
          sort_by: sort,
        },
      })
      let newMovies = response.data.results;
      return newMovies
  }
  getMovies = async (
    searchType,
    relativeUrl,
    runtime,
    rating,
    dateFrom,
    dateTo,
    genres,
    page,
    sort
  ) => {
    this.setState(() => ({ loading: true }));

    switch (searchType) {
      case "filter":
        let newFilteredMovies = await this.getData(searchType,
          relativeUrl,
          runtime,
          rating,
          dateFrom,
          dateTo,
          genres,
          page,
          sort)  
      this.setState(() => ({ movies: newFilteredMovies }));
        this.setState({ page: 2 });
        window.scrollTo(0,0)
        break
      case "nextPage":
        this.setNextPage()
        let newPageMovies = await this.getData(searchType,
            relativeUrl,
            runtime,
            rating,
            dateFrom,
            dateTo,
            genres,
            page,
            sort)
        this.setState(({ movies }) => ({ movies: movies.concat(newPageMovies) }));
        break
      default:
        return console.log('specify search type')
    }

    this.setState(() => ({ loading: false }));
  };
  
  getMoviesViaSearch = async(relativeUrl,query) => {
      let baseUrl = this.createMovieDbUrl(relativeUrl);
      try{
        if(query){
          let response = await axios({
            metod: "get",
            url: baseUrl,
            params: {
              query: query ? query : null
            },
          })
          let foundMovies = response.data.results;
          this.setState(() => ({ foundMovies }));
        } else {
          this.setState(() => ({ foundMovies: [] }));
        }
      } catch(e){}

  }

  getSingleMovie = async(id) => {
    let apiKey = process.env.REACT_APP_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=it-IT`
    try {
      let response = await axios.get(url)
      let movieInfo = response.data
      this.setState(() => ({movieInfo}))
    } catch (error) {
      this.setState(() => ({movieInfo: {}}))
    }
  }
  setSort = (sort) => {
    this.setState(() => ({sort}))
  }
  setNextPage = () => {
    this.setState((prev) => {
      return { page: prev.page + 1 };
    });
  };
  
  setSearchQuery = (searchQuery) => {
    this.setState(() => ({searchQuery}))
    this.getMoviesViaSearch('/search/movie',searchQuery)
  }

  render() {
    return (
      <div>
        <MyContext.Provider
          value={{
            ...this.state,
            getMovies: this.getMovies,
            setNextPage: this.setNextPage,
            setSort: this.setSort,
            setSearchQuery: this.setSearchQuery,
            getMoviesViaSearch: this.getMoviesViaSearch,
            getSingleMovie: this.getSingleMovie
          }}
        >
          {this.props.children}
        </MyContext.Provider>
      </div>
    );
  }
}

const ContextConsumer = MyContext.Consumer;

export function withContextConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ContextConsumer>
        {(value) => <Component {...props} context={value} />}
      </ContextConsumer>
    );
  };
}

export { ContextProvider, ContextConsumer, MyContext };
