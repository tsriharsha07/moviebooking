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