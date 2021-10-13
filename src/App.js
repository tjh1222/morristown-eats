import NavBar from './components/NavBar';
import Background from './components/Background';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';



function App() {
  return (

    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Background />  
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router> 
  );
}

export default App;
