import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {apiResponse:[]};
    
  }
  callAPI(){
    fetch("http://localhost:5000/user")
    .then(res => res.json())
    .then(res => this.setState({apiResponse:res}));

    console.log(this.state)
  }

  componentDidMount(){
    this.callAPI();
  }
  render(){
    return (
      <div className="App">
        <nav className="navbar">
          <h1 className="navbar-brand">Google Photos</h1>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search..." />
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/upload" className="nav-link">Upload</Link>
            <Link to="/bin" className="nav-link">Bin</Link>
          </div>
        </nav>
        <div>
      <h1 className="text-center">Gallery</h1>
      <br />
      <Row xs={1} md={2} className="g-4">
        {this.state.apiResponse.map(item => (
            <Col key={item._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item._id}</Card.Title>
                  <Card.Img src={item.avatar} alt={item._id} />
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
        
        <Outlet />
      </div>
    );
  }
}



export default App;