import React, { Component } from 'react'
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
import getUserCookie, {addUserCookie} from '../utils/CookieUtils';
import Navigation from '../components/Navigation';
import {Navigate} from 'react-router-dom';
import sha512 from 'js-sha512';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          email: '',
          password: '',
          validate: {
            usernameState: '',
            passwordState: '',
            emailState: ''
          },
          userError: false,
          existingError: false,
          spinner: false,
          user: getUserCookie()
        }
        this.handleChange = this.handleChange.bind(this);
    }

    doRegisterRequest = (e) => {
        e.preventDefault();
        this.setState({spinner: true});
        if(this.hasValidFields()) {
            let data = {
                username: this.state.username,
                email: this.state.email.toLowerCase(),
                password: sha512(this.state.password)
            }
            fetch('http://localhost:5000/users', {
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
                    this.setState({userError: false, existingError: true, spinner: false});
                }
            }).catch((error) => {
                console.log(error);
            }).then(response => {
                    this.setState({user: response});
            })
        } else {
            this.setState({userError: true, existingError: false, spinner: false});
        }
    }

    hasValidFields = () => {
        return ((this.state.validate.emailState.trim() !== 0 && this.state.validate.emailState !== 'has-danger') &&
                (this.state.validate.usernameState.trim() !== 0 && this.state.validate.usernameState !== 'has-danger') &&
                (this.state.validate.passwordState.trim() !== 0 && this.state.validate.passwordState !== 'has-danger'));
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
        let user = this.state.user;
        let errorMessage;
        if(this.state.userError) {
            errorMessage = <p id='error-message'>Error logging in! Make sure your username, email, password are formatted correctly!</p>
        } 
        else if(this.state.existingError) {
            errorMessage = <p id='error-message'>Error logging in! Username or email already exist!</p>
        }
        else {
            errorMessage = <p/>
        }

        let spinner;
        if(this.state.spinner)
            spinner = <Spinner color="primary" size="" style={{margin:'20px'}}>Loading...</Spinner>

        if(!user) {
            console.log("Email", this.state.email);
            return (
                <div>
                <Navigation user={null}/>
                <div id='center-stack'>
                <h2>Register</h2>
                <Form id='login-container' onSubmit={this.doRegisterRequest}>
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
                    <Label for='emailInput'>Email:</Label>
                    <Input
                        type='email'
                        name='email'
                        id='emailInput'
                        placeholder='Enter Email'
                        valid={this.state.validate.emailState === 'has-success'}
                        invalid={this.state.validate.emailState === 'has-danger'}
                        onChange={(e) => {
                            this.checkEmail(e);
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
                    {spinner}
                    <Button>Submit</Button>
                </Form>
                </div>
            </div>
            );
        } else {
            return(
                <Navigate to="/" replace={true}/>
            );
        }
    }
}

