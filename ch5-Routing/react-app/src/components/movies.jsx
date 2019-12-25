import React, { Component } from "react";
import * as API from "../data/fakeMovieService";
import { getGenres } from "../data/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Classify from "./common/classify";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: API.getMovies(),
    pageSize: 2,
    currentPage: 1,
    genres: [{ name: "All Genres", _id: "" }, ...getGenres()],
    selectedGenrn: null,
    sortColumn: { title: "title", order: "asc" }
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
  handleSelect = item => {
    this.setState({ selectedGenrn: item, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      currentPage,
      pageSize,
      selectedGenrn,
      sortColumn,
      movies: allMovies
    } = this.state;

    // 过滤
    let filterMovies =
      selectedGenrn && selectedGenrn._id
        ? allMovies.filter(item => item.genre._id === selectedGenrn._id)
        : allMovies;

    // 排序
    filterMovies = _.orderBy(
      filterMovies,
      [sortColumn.title],
      [sortColumn.order]
    );

    // 分页
    const movies = paginate(filterMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-md4">
          <Classify
            items={this.state.genres}
            selectedItem={this.state.selectedGenrn}
            onSelect={this.handleSelect}
          />
        </div>
        <div className="col">
          <h2>have total: {filterMovies.length} </h2>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            count={filterMovies.length}
            pageSize={pageSize}
            onPageChange={this.handPageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
