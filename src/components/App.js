import React, { Component } from 'react';
import Header from './Header';
import AddPlant from './AddPlant';
// import List from './List';
import ListItem from './ListItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strains: [
        {name: 'GDP', type: 'indica', flower: 65},
        {name: 'Sour Diesel', type: 'sativa', flower: 60},
        {name: 'Girl Scout Cookies', type: 'hybrid', flower: 63},
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AddPlant />
        <ul className="list">
          {this.state.strains.map((strain, index) => 
            <ListItem 
              key={index} name={strain.name} type={strain.type} flower={strain.flower}
            />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
