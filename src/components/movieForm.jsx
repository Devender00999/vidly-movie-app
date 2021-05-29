import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovies, getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.required().label("Genre"),
    numberInStock: Joi.number().label("Stock").required().min(0).max(100),
    dailyRentalRate: Joi.number().label("Rate").required().min(0).max(10),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  fillData = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  async populateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.fillData(movie) });
    } catch (ex) {
      if ((ex.response.status = 404)) {
        this.props.history.replace("/not-found");
      }
    }
  }
  async componentDidMount() {
    this.populateGenre();
    this.populateMovie();
  }
  render() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
