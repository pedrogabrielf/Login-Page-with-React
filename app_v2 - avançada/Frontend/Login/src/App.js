
import './App.css';
import Login from './components/views/Login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
const clientId = "46323615356-hrb6nd7thmcchfukfft26pg8cncbkq4d.apps.googleusercontent.com";



function App() {
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
  }


  useEffect(() => {
    google.accounts.id.initialize({
      clientId: "46323615356-hrb6nd7thmcchfukfft26pg8cncbkq4d.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, []);



  return (
        <div className='App'>
          <div id='signInDiv'></div>
        </div>
  );
}

export default App;
