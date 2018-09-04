import React, { Component } from 'react';
import Navigation from'./components/Navigation/Navigation';
import Logo from'./components/Logo/Logo';
import ImageLinkForm from'./components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from'./components/FaceRecognition/FaceRecognition';
import Rank from'./components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

import './App.css';
//https://samples.clarifai.com/celebrity.jpeg


const initialState ={
   input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      user:{        
        id: '',
  name: '',
  email:'', 
  entries: 0,
  joined: ''
}
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
     
      }     
      
  loadUser = (data) => {
    this.setState({user:{
    id: data.id,
  name: data.name,
  email: data.email, 
  entries: data.entries,
  joined: data.joined

    }})
  }

  faceLocation = (data) =>{
 const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 const image = document.getElementById('inputimage');
 const width = Number(image.width);
 const height = Number(image.height);
return{
  leftCol: clarifaiFace.left_col * width,
  topRow:  clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
}

 }

 displayFaceBox = (box) => {

  this.setState({box: box});
 }


  onInputChange = (event) => {
 this.setState({input: event.target.value});
  }

  onButtonSubmit = (event) => {   
  this.setState({imageUrl: this.state.input})  
 fetch('http://localhost:3000/imageUrl',{
    method: 'post',
    headers:{'Content-type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
  })
   .then(response => response.json())
.then(response => {
  if(response){
    fetch('http://localhost:3000/image',{
    method: 'put',
    headers:{'Content-type': 'application/json'},
    body: JSON.stringify({
      id: this.state.user.id
    })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user,{entries: count}))       
     
    })
    .catch(console.log)
  }

  this.displayFaceBox(this.faceLocation(response))  
})
 .catch(err => console.log(err)) 
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if( route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
 
  render() {
  const {isSignedIn,box, imageUrl,route} = this.state;
    return (
       <div className="App">
     
     
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' 
     
      ? <div>
      <Logo/>
      <Rank
      name={this.state.user.name}
      entries={this.state.user.entries}
      />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={box}imageUrl={imageUrl}/>
      

      </div>
      :(
       route === 'signin'
        ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      )
      
        }
     </div>
    );
  }
}

export default App;
