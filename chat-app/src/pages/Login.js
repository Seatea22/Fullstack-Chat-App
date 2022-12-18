import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import './Login.css';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormText
} from 'reactstrap';
import Cookies from 'js-cookie';
import sha512 from 'js-sha512';
import { createHashHistory } from '@remix-run/router';

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
      error: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  doLoginRequest = (e) => {
    e.preventDefault();
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
        this.setState({error: true});
      }
    }).catch((error) => {
        console.log(error);
    }).then(response => {
        this.addCookies(response);
        window.location.reload(false);
    })
  }

  addCookies = (response) => {
    console.log(response);
    Cookies.set('id', response.id, { expires: 7 });
    Cookies.set('username', response.username, { expires: 7 });
    Cookies.set('email', response.email, { expires: 7 });
    Cookies.set('session_key', response.session_key, { expires: 7 });
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
    console.log(name, e.target.value);
  }

  checkEmail = (e) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validate = this.state.validate;

    if (emailRegex.test(e.target.value) && e.target.value.trim().length !== 0) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({validate: validate});
  }

  checkUsername = (e) => {
    const spaceRegex = /\s/g;
    let validate = this.state.validate;
    
    if(!spaceRegex.test(e.target.value) && e.target.value.trim().length !== 0) {
      validate.usernameState = 'has-sucess';
    } else {
      validate.usernameState = 'has-danger';
    }

    this.setState({validate: validate});
  }

  checkPassword = (e) => {
    const spaceRegex = /\s/g;
    let validate = this.state.validate;
    
    if(!spaceRegex.test(e.target.value) && e.target.value.trim().length !== 0 && e.target.value.length >= 8) {
      validate.passwordState = 'has-sucess';
    } else {
      validate.passwordState = 'has-danger';
    }

    this.setState({validate: validate});
  }

  render() {
    let errorMessage;
    if(this.state.error) {
      errorMessage = <p id='error-message'>Error logging in! Make sure your username and password are correct!</p>
    } else {
      errorMessage = <p/>
    }

    if(Cookies.get('id'))
      return (
        <div>
          <Navigation />
          <div id='login-container' style={{width: "auto"}}>
            <p>id: {Cookies.get('id')}</p>
            <p>username: {Cookies.get('username')}</p>
            <p>email: {Cookies.get('email')}</p>
            <p>session key: {Cookies.get('session_key')}</p>
          </div>
        </div>
      );
    else {
      return (
        <div>
          <Navigation />
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
                    this.checkUsername(e);
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
                    this.checkPassword(e);
                    this.handleChange(e);
                  }}
                />
                <FormText>Password must not contain spaces and must be 8 or more characters long.</FormText>
              </FormGroup>
              {errorMessage}
              <Button>Submit</Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}
