import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      image: 'https://cdn.pixabay.com/photo/2013/07/12/12/55/black-widow-146550_1280.png',
    }
    this.handleDrop = this.handleDrop.bind(this);
  }

  async handleDrop(file){
    console.log(file);
    const response = await axios.post('/spider', file);
    const status = response.data;
    console.log(status);
  }

  render() {
    const {image} = this.state;
    const {handleDrop} = this;

    return (
      <div>
        <h2>Spider Bro App</h2>
        <Dropzone onDrop={handleDrop}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
                 <p>Drag spider pics on spider bro</p>
                 <img src={image} style={{ width: '20%', height: 250 }}/>
            </div>
          </section>
        )}
        </Dropzone>
      </div>
    )
  }


}
