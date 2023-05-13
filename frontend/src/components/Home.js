import { Box,Button,Typography } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { getAllMovies } from '../api-helpers/api-helper';
import MovieItem from './movies/MovieItem';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      getAllMovies()
        .then((data) => setMovies(data.movies))
        .catch((err) => console.log(err));
    }, []);
  return (
    <Box height={'100%'} marginTop={2} margin={'auto'}>
      <Box margin={'auto'} height={'50vh'} width={'80%'} padding={2}> 
      <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="100%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
