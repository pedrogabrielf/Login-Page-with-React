import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import Home from './view/home/Home';
import Login from './view/login/Login';
import { gapi } from 'gapi-script';

const clientId = "992997871464-00rq3r9n4hng2ngu0ljmdmjef4ib51pj.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    const initializeGoogleAuth = async () => {
      await gapi.load('client:auth2');

      try {
        await gapi.client.init({
          clientId: clientId,
          scope: ""
        });
      } catch (error) {
        console.error("Error initializing Google Auth:", error);
      }
    };

    initializeGoogleAuth();

    return () => {
      // Limpeza ou desalocação de recursos ao desmontar o componente
      // Por exemplo: desconectar o usuário, limpar o estado, etc.
    };
  }, []); // O array vazio garante que este efeito ocorra apenas uma vez durante o montagem do componente

  // Verifica se o usuário está autenticado com o Google
  const isAuthenticated = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    return authInstance.isSignedIn.get();
  };

  return (
    <div className="App">
      {isAuthenticated() ? <Home /> : <Login />}
    </div>
  );
}

export default App;
