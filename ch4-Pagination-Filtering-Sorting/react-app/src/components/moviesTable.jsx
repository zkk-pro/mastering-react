import React, { Component } from "react";
import Liked from "./common/liked";

class MoviesTable extends Component {
  raiseSort = title => {
    let sortColumn = {...this.props.sortColumn}
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    sortColumn.title = title
    this.props.onSort(sortColumn)
  }
  render() {
    const { movies, onLike, onDelete } = this.props;
 
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>Title</th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
            <th></th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Liked liked={movie.liked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
