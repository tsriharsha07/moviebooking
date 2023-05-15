import axios from 'axios';

export const getAllMovies=async()=>{
    
    try {
        const data=await axios.get('/api/v1/getmovies');
        if(data.status!==200){
            return console.log("No Data");
        }  
        const movies=await data.data;
        return movies;
    } catch (error) {
        return console.log(error)
    }
}

export const sendUserAuthRequest = async(data,signup)=>{
    const res = await axios
    .post(`/api/v1/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
}

export const sendAdminAuthRequest = async (data) => {
    const res = await axios
      .post("/api/v1/admin/login", {
        email: data.email,
        password: data.password,
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpectyed Error");
    }
  
    const resData = await res.data;
    return resData;
  };

  export const getMovieDetails = async (id) => {
    const res=await axios.get(`/api/v1/movie/${id}`)
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  
  export const newBooking = async (data) => {
    const res = await axios
      .post("/api/v1/newbooking", {
        movie: data.movie,
        seatNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
  
    if (res.status !== 201) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };

  export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios
      .get(`/api/v1/user/bookings/${id}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    console.log(res);
    const resData = await res.data;
    return resData;
  };

  export const deleteBooking = async (id) => {
    const res = await axios
      .delete(`/api/v1/booking/delete/${id}`)
      .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("Unepxected Error");
    }
  
    const resData = await res.data;
    return resData;
  };
  
  export const getUserDetails = async () => {
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/api/v1/user/${id}`).catch((err) => console.log(err));
    if (res.status !== 200) {
      return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
  };
  
  