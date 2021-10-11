import './Background.css';


function Background() {
  return (
    <div className="background-container">
      <form>
        <input className="search" type="search" name ="q" placeholder="Where do you want to go?" autocomplete="on"></input>
        <button>Search</button>
      </form>
    </div>

  );
}

export default Background;


