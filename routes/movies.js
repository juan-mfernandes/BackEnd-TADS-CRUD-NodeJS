const express = require("express");
const { findMovies, findById, createMovie, updateMovie, deleteMovie } = require("../project/db/movies");
const moviesRouter = express.Router();

moviesRouter.get("/movies", async(req, res) => {
    const rate = req.query.rate;
    const movies = await findMovies(rate);
    if (movies.length === 0) return res.status(404).json({message: "Rate Not Found."});
    res.json({movies});
});

moviesRouter.get("/movies/:id", async(req, res) => {
    const id = Number(req.params.id);
    const movie = await findById(id);
    if (!movie) return res.status(404).json({message: `${id} id Not Found.`});
    res.json({movie});
});

moviesRouter.post("/movies", async(req, res) =>{
    const data = req.body;
    if (!data.name || !data.rate){
        return res.status(400).json({message: "Movie name and rate are required."});
    }
    if(typeof data.name !== "string" || typeof data.description != "string" || typeof data.rate !== "number")
        return res.status(400).json({message: "Invalid data formats."});
    const movie = await createMovie(data);
    res.status(201).json({movie});
});

moviesRouter.put("/movies/:id", async(req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    const movie = await updateMovie(id, data);
    if(!movie) return res.status(404).json({message: `Movie ${id} not found.`});
    res.json({movie});
});

moviesRouter.delete("/movies/:id", async(req, res) => {
    const id = Number(req.params.id);
    await deleteMovie(id);
    if(!id) return res.status(404).json({message: `Movie ${id} not found.`});
    res.json({message: `Movie ${id} deleted successfully.`});
});

module.exports = { moviesRouter };