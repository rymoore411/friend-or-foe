import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { MDBAnimation, MDBBtn} from 'mdbreact';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      image: 'https://cdn.pixabay.com/photo/2016/08/23/18/50/spider-1615195_1280.png',
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
            <MDBBtn gradient="near-moon">Spider Bro App</MDBBtn>
            <Dropzone onDrop={handleDrop}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()} className="text-center">
                  <input {...getInputProps()}/>
                    <MDBAnimation type={spinner === false ? 'bounce' : 'flash'} infinite>{spinner === true ? <div><MDBBtn gradient="near-moon">Spider Bro Is Machine Learning</MDBBtn></div> : ''}
                    <img src={image} className="fluid"  style={{maxWidth: '40%'}}/>
                    </MDBAnimation>
                </div>
              </section>
            )}
            </Dropzone>
              <div className="card-body">
                <MDBBtn gradient="near-moon">Drag spider pics on spider bro</MDBBtn>
              </div>
            </div>
          </div>
      )
    }
    else if(friend === true){
      return(
        <div className="container-fluid" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card" style={{maxWidth: '30%'}}>
            <div className="view overlay">
            <MDBAnimation type='wobble'>
                    <img src={file} className="card-img-top" alt="Card image cap"/>
            </MDBAnimation>
              <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>


          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4" ><i className="fas fa-share-alt white-text"></i>{' '}{species}</a>
            <h4 className="card-title">He's a Chill {' '}{species}!</h4>
            <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>Click here for more {species} bro info</a>
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
        <div className="container-fluid" style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <div className="card" style={{maxWidth: '30%'}}>
            <div className="view overlay">
              <MDBAnimation type='wobble'>
                      <img src={file} className="card-img-top" alt="Card image cap"/>
              </MDBAnimation>
              <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>
                <div className="mask rgba-white-slight"></div>
              </a>
            </div>

          <div className="card-body elegant-color white-text rounded-bottom">
            <a className="activator waves-effect mr-4" ><i className="fas fa-share-alt white-text"></i>{' '}{species}</a>
            <h4 className="card-title">Watch out! {' '}{species}!</h4>
            <a href={`https://en.wikipedia.org/w/index.php?search=${species}&title=Special%3ASearch&go=Go`}>Click here for more {species} bro info</a>
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
