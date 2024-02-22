import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import registerImg from './img/register.svg'
import logImg from './img/log.svg'
import { GoogleLogin } from 'react-google-login';

const clientId = "992997871464-00rq3r9n4hng2ngu0ljmdmjef4ib51pj.apps.googleusercontent.com";


const Login = () => {
  const containerRef = useRef(null);
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);

  const onSuccess = (res) => {
    console.log("LOGIN SUCESS! Current user:", res.profileObj);
}

const onFailure = (res) => {
    console.log("LOGIN FAILED! res:", res);
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (signUpBtnRef.current.classList.contains('active')) {
          signUpBtnRef.current.classList.remove('active');
          signInBtnRef.current.classList.add('active');
          containerRef.current.classList.remove('sign-up-mode');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="email"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
              <div id="sighInButton">
                                <GoogleLogin clientId={clientId}
                                    buttonText=""
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}/>
                            </div>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Confirme Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password"/>
            </div>
            <input type="submit" className="btn" value="Sign up"/>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
              <div id="sighInButton">
                                <GoogleLogin clientId={clientId}
                                    buttonText=""
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}/>
                            </div>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              ref={(node) => {
                signUpBtnRef.current = node;
              }}
              onClick={() => {
                signUpBtnRef.current.classList.add('active');
                signInBtnRef.current.classList.remove('active');
                containerRef.current.classList.add('sign-up-mode');
              }}
            >
              Sign up
            </button>
          </div>
          <img src={logImg}
            className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              ref={(node) => {
                signInBtnRef.current = node;
              }}
              onClick={() => {
                signInBtnRef.current.classList.add('active');
                signUpBtnRef.current.classList.remove('active');
                containerRef.current.classList.remove('sign-up-mode');
              }}
            >
              Sign in
            </button>
          </div>
          <img src={registerImg}
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;