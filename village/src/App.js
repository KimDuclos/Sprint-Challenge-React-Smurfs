import React, { Component } from 'react';
import axios from "axios";
import { NavLink, Route } from 'react-router-dom';

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
  // add any needed code to ensure that the smurfs collection e
  //xists on state and it has data coming from the server
  // Notice what your map function is looping over and returning 
  //inside of Smurfs.
  // You'll need to make sure you have the right properties on 
  //state and pass them down to props.

  componentDidMount() {
    axios
    .get(url)  // MVP - GET to the endpoint /smurfs
    .then(response => {
      console.log(response.data);
      this.setState({
        smurfs: response.data
      })
    })
    .catch(err => console.log(err))
  }

  addSmurf = data => {
    axios
    .post(url, data)  // MVP - POST add Smurf to DB
    .then(response => {
      console.log(response);
      this.setState({
        smurfs: response.data
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
      <navBar>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/smurf-form'>Form</NavLink>
      </navBar>
      <Route 
        exact path='/'
        render={props => <Smurfs smurfs={this.state.smurfs} {...props} />}
        />
        <Route path='/smurf-form' 
        render={props => <SmurfForm addSmurf={this.addSmurf} {...props} />}
        />
      </div>
    );
  }
}

//initial commit

export default App;
