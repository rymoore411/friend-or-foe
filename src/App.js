import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      image: 'https://cdn.pixabay.com/photo/2013/07/12/12/55/black-widow-146550_1280.png',
      friend: null,
      name: '',
    }
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    event.preventDefault();
    this.setState({friend: null});
  }

  async handleDrop(file){
    const data = new FormData()
    data.append('file', file[0]);
    const response = await axios.post('/spider', data);
    const spiderBro = response.data;
    spiderBro.score >= .7 ? this.setState({friend: false}) : this.setState({friend: true});
    console.log(this.state.friend);
  }

  render() {
    const {image, friend} = this.state;
    const {handleDrop, handleClick} = this;

    if(friend === null){
      return (
        <div>
          <h2>Spider Bro App</h2>
          <Dropzone onDrop={handleDrop}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()}/>
                  <p>Drag spider pics on spider bro</p>
                  <img src={image} style={{ width: '20%', height: 250 }}/>
              </div>
            </section>
          )}
          </Dropzone>
        </div>
      )
    }
    else if(friend === true){
      return(
        <div>
          <h2>He's Chill</h2>
          <img src="https://cdn.pixabay.com/photo/2014/04/02/16/29/spider-307448_1280.png" style={{ width: '20%', height: 250 }}/>
          <button onClick={handleClick}>Find More Spider bros</button>
        </div>
      )
    }
    else{
      return(
        <div>
          <h2>Watch out!</h2>
          <img src="https://images.pexels.com/photos/2665108/pexels-photo-2665108.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" style={{ width: '20%', height: 250 }}/>
          <button onClick={handleClick}>Find More Spider bros</button>
        </div>
      )
    }
  }


}
