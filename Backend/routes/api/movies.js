
const express = require("express");
const app = express();
const { getAllMovies, createNewMovie, updateMovie, deleteMovie } = require("../../controller/moviesController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRole = require("../../middleware/verifyRole");

const router = express.Router();


// Unprotected route to get all movies

router.get('/', getAllMovies);


// Routes below this point will be protected using verifyJWT and verifyRole middleware
router.use(verifyJWT, verifyRole);


// Protected routes for creating, updating, and deleting movies

router.route('/')
.post(createNewMovie)
.patch(updateMovie)
.delete(deleteMovie)


module.exports = router;