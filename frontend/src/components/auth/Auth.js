import React from "react";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helper";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";
import {useDispatch} from 'react-redux'

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login(data));
    localStorage.setItem("userId", data.user._id);
    navigate("/");
  };
  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
       .then(onResReceived)
       .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm isAdmin={false} onSubmit={getData}/>
    </div>
  );
};

export default Auth;