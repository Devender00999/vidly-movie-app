import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Table from "./table";
import auth from "../../services/auth.js";
const deleteButton = {
  key: "delete",
  content: (movie) =>{
      return (<button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>)}
}

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        this.props.user ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          movie.title
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => <Like movie={movie} onLiked={this.props.onLike} />,
    },
    
  ];
  constructor(){
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin){
      this.columns.push(deleteButton)
    } 
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
