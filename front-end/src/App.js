import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { Route, Switch, useLocation} from 'react-router-dom';
import './App.css';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import SearchResults from './components/SearchResults';
import Restaurant from './components/Restaurant';



function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <SearchBar />  
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
        <Route exact path="/restaurant/:id">
          <Restaurant/>
        </Route>

        <Route exact path="/search">
          <SearchResults name={new URLSearchParams(location.search).get('name')}/>
        </Route>
      </Switch>
    </>

  );
}

export default App;
