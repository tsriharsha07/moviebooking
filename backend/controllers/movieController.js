const jwt = require('jsonwebtoken')
const Movie = require('../models/Movie');
const Admin = require('../models/Admin');

exports.addMovie = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(404).json({ message: "Token not found" });
    }

    //Verify token
    let adminId;
    jwt.verify(token, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });
    try {
        const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
        const movie = new Movie({ title, description, releaseDate: new Date(`${releaseDate}`), featured, actors, posterUrl, admin: adminId });
        const adminUser = await Admin.findById(adminId);
        await movie.save();
        adminUser.addedMovies.push(movie);
        await adminUser.save();
        
        if (!movie) {
            return res.status(500).json({ message: "Request failed" });
        }
        return res.status(200).json({
            success: true,
            movie
        })
    } catch (error) {

    }
}

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        if (!movies) {
            return res.status(500).json({ message: "Unexpected error occured" });
        }
        return res.status(200).json({
            success: "true",
            movies: movies
        })
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occured" });
    }
}

exports.getMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(500).json({ message: "Unexpected error occured" });
        }
        return res.status(200).json({
            success: "true",
            movie
        })
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error occured" });
    }
}