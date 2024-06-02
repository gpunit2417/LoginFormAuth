import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
      <Route exact path='/' component={HomePage}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
      </Router>
    </div>
  );
}

export default App;
