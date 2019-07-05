import React, { Component } from "react";
import { getMovies } from "../data/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };
  deleteMovie = id => {
    const movies = this.state.movies.filter(movie => movie._id !== id);
    this.setState({ movies });
  };
  render() {
    const moviesNumber = this.state.movies.length;

    if (!moviesNumber) return <p>No Movies...</p>;

    return (
      <React.Fragment>
        <p>Have {moviesNumber} movies</p>
        <table className="table">
          <thead>
            <tr>
              <th>名称</th>
              <th>类型</th>
              <th>票价</th>
              <th>评分</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => this.deleteMovie(movie._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
