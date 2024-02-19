import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

import registerImg from './img/register.svg';
import logImg from './img/log.svg';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
  const containerRef = useRef(null);
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);

  // Estado para dados de login
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Estado para dados de registro
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Substitua a URL pelo endpoint correto do seu servidor Flask
      const response = await axios.post('http://localhost:5000/login', loginData);
      console.log(response.data);
      // Implemente aqui a lógica pós-login (ex.: redirecionamento ou armazenamento em local storage)
    } catch (error) {
      console.error("Erro ao fazer login:", error.response);
    }
  };

  // Função para lidar com o registro
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Substitua a URL pelo endpoint correto do seu servidor Flask
      const response = await axios.post('http://localhost:5000/users', registerData);
      console.log(response.data);
      // Implemente aqui a lógica pós-registro (ex.: redirecionamento ou mensagem de sucesso)
    } catch (error) {
      console.error("Erro ao registrar:", error.response);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (signUpBtnRef.current && signUpBtnRef.current.classList.contains('active')) {
          signUpBtnRef.current.classList.remove('active');
        }
        if (signInBtnRef.current) {
          signInBtnRef.current.classList.add('active');
        }
        if (containerRef.current) {
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
              <div id="signInButton"> 
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single-host-origin'}
                isSignedIn={true}
            />
        </div>
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            {/* Os ícones de mídia social e outros elementos permanecem inalterados */}
          </form>
          <form action="#" className="sign-up-form" onSubmit={handleRegister}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            {/* Os ícones de mídia social e outros elementos permanecem inalterados */}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            {/* Conteúdo e imagem para o painel esquerdo */}
          </div>
          <img src={logImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            {/* Conteúdo e imagem para o painel direito */}
          </div>
          <img src={registerImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
