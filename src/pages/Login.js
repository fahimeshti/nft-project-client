import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/apiCalls';
import classes from './Login.module.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state=>state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})

    };
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h1>SIGN IN</h1>
                <form className={classes.form}>
                    <input 
                        type="text" 
                        placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        onChange={(e) => setPassword(e.target.value)}
                     />
                    <button onClick={handleClick} disabled={isFetching}>LOG IN</button>
                    {error && <span className={classes.error}>Something went wrong!</span> }
                    <span>
                        <a href="www.google.com">DO NOT REMEMBER THE PASSWORD?</a> 
                    </span>
                    <span>
                        <a href="www.google.com">CREATE A NEW ACCOUNT</a> 
                    </span>
                    <span>
                        <Link to="/">BACK TO HOMEPAGE</Link> 
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;