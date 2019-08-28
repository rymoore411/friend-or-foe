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
      species: '',
      spinner: false,
      file: null,
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
    this.setState({species: spiderBro.description, file: URL.createObjectURL(file[0])});
    spiderBro.danger === true ? this.setState({friend: false}) : this.setState({friend: true});
  }

  render() {
    const {image, friend, spinner, species, file} = this.state;
    const {handleDrop, handleClick} = this;

    if(friend === null){
      return (
        <div className="container-fluid" >
          <div className="text-center">
            <Dropzone onDrop={handleDrop}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} className="text-center">
                  <input {...getInputProps()}/>
                    <MDBAnimation type={spinner === false ? 'bounce' : 'flash'} infinite>
                    <img src={image} className="fluid"  style={{maxWidth: '25%'}}/>
                    </MDBAnimation>
                </div>
              </section>
            )}
            </Dropzone>
              <div className="card-body">
                <h4 className="card-title"><a>Spider Bro App</a></h4>
                <p className="card-text">Drag spider pics on spider bro</p>
              </div>
            </div>
          </div>
      )
    }
    else if(friend === true){
      return(
        <div className="container-fluid" style={{display: 'flex', maxWidth: '25%', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card">
            <div className="view overlay">
              <img className="card-img-top" src={file} alt="Card image cap" ></img>
              <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>


          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4" ><i className="fas fa-share-alt white-text"></i>{' '}{species}</a>
            <h4 className="card-title">He's a Chill {' '}{species}!</h4>
            <p>Click spider bro for spider answers</p>
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
        <div className="container-fluid" style={{display: 'flex', maxWidth: '25%', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card">
            <div className="view overlay">
              <img className="card-img-top" src={file} alt="Card image cap" ></img>
              <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4" ><i className="fas fa-share-alt white-text"></i>{' '}{species}</a>
            <h4 className="card-title">Watch out! {' '}{species}!</h4>
            <p>Click spider bro for spider answers</p>
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
