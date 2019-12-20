import React, { Component } from "react";
import * as API from "../data/fakeMovieService";
import { paginate } from "../utils/paginate";
import Liked from "./common/liked";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: API.getMovies(),
    pageSize: 2,
    currentPage: 1
  };
  handleLike = movie => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handPageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize } = this.state;
    const movies = paginate(this.state.movies, currentPage, pageSize)

    return (
      <React.Fragment>
        <h2>have total: {this.state.movies.length} </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
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
                  <td>{movie.dailyRentalRate}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Liked
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          count={count}
          pageSize={pageSize}
          onPageChange={this.handPageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
