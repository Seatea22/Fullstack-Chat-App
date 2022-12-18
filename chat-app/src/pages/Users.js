import React, { Component } from 'react'
import Navigation from '../components/Navigation';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        }
      }
    
      componentDidMount() {
        this.doFetchUsers();
      }
    
      doFetchUsers = () => {
        fetch('http://localhost:5000/users')
            .then(response => {
                if(response.status === 200) {
                    console.log("Successful GET: " + response.status + ": " + response.statusText);
                    return (response.json());
                }
                else console.log("HTTP error: " + response.status + ": " + response.statusText);
            }).catch((error) => {
                console.log(error);
            }).then (jsonOutput => {
              if(jsonOutput) {
                // console.log("Response", jsonOutput)
                this.updateUsers(jsonOutput);
              }
            });
      }
    
      updateUsers = (data) => {
        let userArray = [];
        for(let user of data) userArray.push(user[0]);
        console.log(userArray);
        this.setState({users: userArray});
      }
    
      render() {
        let userList = [];
        for(let i = 0; i < this.state.users.length; i++) {
          userList.push(
            <div key={i} style={{margin: "10px", 
                                 border: "4px solid #000000",
                                 padding: "5px",
                                 maxWidth: "400px"}}>
              <p>id: {this.state.users[i].id}</p>
              <p>username: {this.state.users[i].username}</p>
              <p>email: {this.state.users[i].email}</p>
              <p>session key: {this.state.users[i].session_key}</p>
            </div>
          );
        }
    
        return (
          <div>
            <Navigation />
            {userList}
          </div>
        )
      }
}
