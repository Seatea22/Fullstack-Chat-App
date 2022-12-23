import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import './Auth.css';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Spinner
} from 'reactstrap';
import sha512 from 'js-sha512';
import getUserCookie, {addUserCookie} from '../utils/CookieUtils';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      validate: {
        usernameState: '',
        passwordState: ''
      },
      error: false,
      spinner: false,
      user: getUserCookie()
    }
    this.handleChange = this.handleChange.bind(this);
  }

  doLoginRequest = (e) => {
    e.preventDefault();
    this.setState({spinner: true});
    let data = {
      username: this.state.username,
      password: sha512(this.state.password)
    }

    fetch('http://localhost:5000/auth', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': "application/json; charset=UTF-8"
      }
    }).then((response) => {
      if(response.status === 200) {
          console.log("Successful POST: " + response.status + ": " + response.statusText);
          return (response.json());
      }
      else {
        console.log("Failed POST: " + response.status + ": " + response.statusText);
        this.setState({error: true, spinner: false});
      }
    }).catch((error) => {
        console.log(error);
    }).then(response => {
        if(response) {
          addUserCookie(response);
          window.location.reload(false);
        }
    })
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
    console.log(name, e.target.value);
  }

  render() {
    let user = this.state.user;
    console.log("user", user);
    let errorMessage;
    if(this.state.error) {
      errorMessage = <p id='error-message'>Error logging in! Make sure your username and password are correct!</p>
    } else {
      errorMessage = <p/>
    }

    let spinner;
    if(this.state.spinner)
      spinner = <Spinner color="primary" size="" style={{margin:'20px'}}>Loading...</Spinner>

    if(user) {
      return (
        <div>
          <Navigation user={user}/>
          <div id='login-container' style={{width: "auto"}}>
            <p>id: {user.id}</p>
            <p>username: {user.username}</p>
            <p>email: {user.email}</p>
            <p>session key: {user.session_key}</p>
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <Navigation user={user}/>
          <div id='center-stack'>
            <h2>Login</h2>
            <Form id='login-container' onSubmit={this.doLoginRequest}>
              <FormGroup style={{width: '75%'}}>
                <Label for='usernameInput'>Username:</Label>
                <Input
                  type='username'
                  name='username'
                  id='usernameInput'
                  placeholder='Enter Username'
                  valid={this.state.validate.usernameState === 'has-success'}
                  invalid={this.state.validate.usernameState === 'has-danger'}
                  onChange={(e) => {
                    // this.checkUsername(e);
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              <FormGroup style={{width: '75%'}}>
                <Label for='passwordInput'>Password:</Label>
                <Input
                  type='password'
                  name='password'
                  id='passwordInput'
                  placeholder='********'
                  valid={this.state.validate.passwordState === 'has-success'}
                  invalid={this.state.validate.passwordState === 'has-danger'} 
                  onChange={(e) => {
                    // this.checkPassword(e);
                    this.handleChange(e);
                  }}
                />
              </FormGroup>
              {errorMessage}
              {spinner}
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}
