const { prisma } = require("./prisma");

const findMovies = async (rate) => {
    const movies = await prisma.movies.findMany({
        orderBy: {
            rate: "desc"
        },
        where: {
            rate: rate ? Number(rate) : undefined
        }
    });
    return movies;
}

const findById = async(id) => {
    const movie = await prisma.movies.findFirst({
        where: {
            id
        }
    });
    return movie;
}

const createMovie = async(data) => {
    const newMovie = await prisma.movies.create({
        data
    });
    return newMovie;
}

const updateMovie = async(id, data) => {
    const movie = await prisma.movies.update({
        where: {
            id
        },
        data: {
            name: data.name,
            rate: data.rate,
            description: data.description
        }
    });
    return movie;
}

const deleteMovie = async(id) => {
    const movie = await prisma.movies.delete({
        where: {
            id
        }
    });
    return movie;
}

module.exports = {
    findMovies,
    findById,
    createMovie,
    updateMovie,
    deleteMovie
}