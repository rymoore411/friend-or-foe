import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { MDBAnimation} from 'mdbreact';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      image: 'https://cdn.pixabay.com/photo/2013/07/12/12/55/black-widow-146550_1280.png',
      friend: null,
      name: '',
      spinner: false,
    }
    this.handleDrop = this.handleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    event.preventDefault();
    this.setState({friend: null});
    this.setState({spinner: false});
  }

  async handleDrop(file){
    this.setState({spinner: true});

    const data = new FormData()
    data.append('file', file[0]);
    const response = await axios.post('/spider', data);
    const spiderBro = response.data;
    spiderBro.score >= .7 ? this.setState({friend: false}) : this.setState({friend: true});
  }

  render() {
    const {image, friend, spinner} = this.state;
    const {handleDrop, handleClick} = this;

    if(friend === null){
      return (
        <div className="container-fluid">
          <h2>Spider Bro App</h2>
          <Dropzone onDrop={handleDrop}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()}/>
                  <p>Drag spider pics on spider bro</p>
                  <MDBAnimation type={spinner === false ? 'bounce' : 'flash'} infinite>
                  <img src={image} className="img-fluid" style={{maxWidth: '10%'}}/>
                  </MDBAnimation>
              </div>
            </section>
          )}
          </Dropzone>
        </div>
      )
    }
    else if(friend === true){
      return(
        <div className="container-fluid" style={{display: 'flex', maxWidth: '40%', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card">
            <div className="view overlay">
              <img className="card-img-top" src="https://cdn.pixabay.com/photo/2014/04/02/16/29/spider-307448_1280.png" alt="Card image cap"/>
              <a>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>


          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4"><i className="fas fa-share-alt white-text"></i></a>
            <h4 className="card-title">He's Chill</h4>
            <hr className="hr-light"/>
            <a href="#!" className="white-text d-flex justify-content-end"></a>
            <a href="#" className="btn btn-primary" onClick={handleClick}>Find More Spider Bros</a>
          </div>
        </div>
      </div>
      )
    }
    else{
      return(
        <div className="container-fluid" style={{display: 'flex', maxWidth: '40%', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card">
            <div className="view overlay">
              <img className="card-img-top" src="https://images.pexels.com/photos/2665108/pexels-photo-2665108.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="Card image cap"/>
              <a>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>


          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4"><i className="fas fa-share-alt white-text"></i></a>
            <h4 className="card-title">Watch out!</h4>
            <hr className="hr-light"/>
            <a href="#!" className="white-text d-flex justify-content-end"></a>
            <a href="#" className="btn btn-primary" onClick={handleClick}>Find More Spider Bros</a>
          </div>
        </div>
      </div>
      )
    }
  }


}
