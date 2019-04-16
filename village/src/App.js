import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";  // added import
import axios from "axios";  // added import

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';


// set URL for data source
const url = new URL('http://localhost:3333/smurfs/')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection
  //exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning 
  //inside of Smurfs.
  // You'll need to make sure you have the right properties on 
  //state and pass them down to props.

  componentDidMount() {
    axios
    .get(url)  // MVP GET - grab data from API
    .then(response => {
      this.setState({
        smurfs: response.data
      })
    })
  }

  // axios requests
  addSmurf = data => {
    axios
    .post(url, data)  // MVP POST 
    .then(response => {
      this.setState({
        smurfs: response.data
      })
    })
  }

  deleteSmurf = id => {  // STRETCH DELETE
    axios
    .delete(`${url} ${id}`)
    .then(response => {
      this.setState({
        smurfs: response.data
      })
    })
  }


  render() {
    return (
      <div className="App">  
        {/* MVP NAVIGATION */}
        <nav>    
          <NavLink to='/'>Home</NavLink>{' '}
          <NavLink to='/smurf-form'>Form</NavLink>
        </nav>
        {/* MVP ROUTES */}
        <Route exact path='/' render={props => <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} {...props} />}/>
        <Route path='/smurf-form' render={props => <SmurfForm addSmurf={this.addSmurf} {...props} />}/>
      </div>
    );
  }
}

export default App;
