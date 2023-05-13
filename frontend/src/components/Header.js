import React, { useEffect, useState } from 'react';
import { AppBar, Box, Toolbar, TextField, Autocomplete, Tabs, Tab } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import { getAllMovies } from '../api-helpers/api-helper';
import { Link } from 'react-router-dom';

const Header = () => {
  const [value,setValue]=useState(0);
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies));
  },[])
  return (
    <AppBar sx={{bgcolor:'#2b2d42'}} position='sticky'>
      <Toolbar>
        <Box width={'20%'}>
          <MovieIcon />
        </Box>
        <Box width={"20%"} margin={'auto'}>
          <Autocomplete
            id="free-solo-demo"
            options={movies?.map((option) => option.title)}
            renderInput={(params) => <TextField sx={{input:{color:'white'}}} variant="standard" {...params} label="Search Movies" />}
          />
        </Box>
        <Box display={'flex'}>
          <Tabs indicatorColor='secondary' textColor='inherit' value={value} onChange={(e,val)=>{setValue(val)}}>
            <Tab LinkComponent={Link} to="/movies" label="Movies"/>
            <Tab LinkComponent={Link} to="/admin" label="Admin"/>
            <Tab LinkComponent={Link} to="/auth" label="Auth"/>
          </Tabs>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default Header;
