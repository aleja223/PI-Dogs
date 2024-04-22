import { Home, Landing, Detail, Form } from "./views";
import { React } from "react-dom";
import './App.css';
import { Route, useLocation, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";


function App() {

  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname!=="/" && <NavBar />}
      <Route exact path="/" component={Landing}/>
      <Route exact path="/detail" component={Detail}/>
      <Route exact path="/create" component={Form}/>
 
      <Route path="/Home" render={() => <Home/>}/>
    </div>
  );
}

export default App;
