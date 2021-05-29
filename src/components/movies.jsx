import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Input from "./common/input";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres", c: "active" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres, selectedGenre: genres[0] });
  }
  handleDelete = async (movie) => {
    const oMovies = this.state.movies;
    this.setState({
      movies: this.state.movies.filter((data) => data._id !== movie._id),
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response.status === 404) {
        toast.error("This movie has already been deleted");
        this.setState({ movies: oMovies });
      }
    }
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleItemSelect = async (genre) => {
    const { data: movies } = await getMovies();
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: "",
      movies,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered;
    if (searchQuery)
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((movie) => {
        return movie.genre._id === this.state.selectedGenre._id;
      });
    else filtered = allMovies;
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: movies };
  };

  handleSearch = (value) => {
    this.setState({ searchQuery: value, selectedGenre: null, currentPage: 1 });
  };

  renderTable = (movies, sortColumn, totalCount) => {
    if (totalCount === 0) {
      return <h3>There are no movies in database</h3>;
    }
    return (
      <MoviesTable
        movies={movies}
        sortColumn={sortColumn}
        onLike={this.handleLiked}
        onDelete={this.handleDelete}
        onSort={this.handleSort}
      />
    );
  };

  render() {
    const { currentPage, pageSize, genres, sortColumn, selectedGenre } =
      this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <main className="container">
          <div className="row pt-4">
            <div className="col-3 mb-4">
              <ListGroup
                items={genres}
                selectedItem={selectedGenre}
                onGenreChange={this.handleItemSelect}
              />
            </div>
            <div className="col">
              <Link className="btn btn-primary mb-3" to={`/movies/new`}>
                New Movie
              </Link>
              <h3>Showing {totalCount} Movies in the Database</h3>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
              {this.renderTable(movies, sortColumn, totalCount)}
            </div>
          </div>
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Movies;
