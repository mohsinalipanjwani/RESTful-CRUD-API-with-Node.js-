const movieModel = require("../models/movies.model");

module.exports = {
  getById: (req, res, next) => {
    console.log(req.body);
    movieModel.findById(req.params.movieId, (err, movieInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "Success",
          message: "movie Found",
          data: { movie: movieInfo },
        });
      }
    });
  },
  getAll: (req, res, next) => {
    let movieList = [];

    movieModel.find({}, (err, movies) => {
      if (err) {
        next(err);
      } else {
        for (let movie of movies) {
          movieList.push({
            id: movie._id,
            name: movie.name,
            released_on: movie.released_on,
          });
        }
        res.json({
          status: "Success",
          message: "movie list Found",
          data: { movies: movieList },
        });
      }
    });
  },

  updateById: (req, res, next) => {
    movieModel.findByIdAndUpdate(
      req.params.movieId,
      { name: req.body.name },
      (err, movieInfo) => {
        if (err) {
          next(err);
        } else {
          res.json({ status: "success", message: "movie updated", data: null });
        }
      }
    );
  },

  deleteById: (req, res, next) => {
    movieModel.findByIdAndDelete(
      req.params.movieId,
      { name: req.body.name },
      (err, movieInfo) => {
        if (err) {
          next(err);
        } else {
          res.json({ status: "Success", message: "Movie deleted", data: null });
        }
      }
    );
  },

  create: (req, res, next) => {
    movieModel.create(
      { name: req.body.name, released_on: req.body.released_on },
      (err, result) => {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Movie added Successfully",
            data: null,
          });
        }
      }
    );
  },
};
