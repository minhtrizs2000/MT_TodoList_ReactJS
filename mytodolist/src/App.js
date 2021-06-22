import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home'
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  );
}

export default App;
