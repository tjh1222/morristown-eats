import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { Route, Switch, useLocation} from 'react-router-dom';
import './App.css';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import SearchResults from './components/SearchResults';
import Restaurant from './components/Restaurant';


function renderSearchResults(location) {
  let params = new URLSearchParams(location.search);
  let name = params.get('name');
  let page = params.get('page');


  if (page) {
    return (
      <SearchResults name={name} page={page}/>
    )
  }
  return (
    <SearchResults name={name} page={1}/>
  )
}

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
          {renderSearchResults(location)}
        </Route>
      </Switch>
    </>

  );
}

export default App;
