import Cookies from 'js-cookie';
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        open: false
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
        open: !this.state.open
        });
    }

    logout = () => {
        console.log("Ran");
        fetch('http://localhost:5000/auth', {
            method: 'DELETE',
            body: JSON.stringify({
                session_key: Cookies.get('session_key')
            }),
            headers: {
                'Content-Type': "application/json; charset=UTF-8"
            }
            }).then((response) => {
                if(response.status === 200) {
                    console.log("Successful DELETE: " + response.status + ": " + response.statusText);
                    return (response.json());
                }
                else {
                    this.setState({error: true});
                }
            }).catch((error) => {
                console.log(error);
            }).then(response => {
                Cookies.remove('id');
                Cookies.remove('username');
                Cookies.remove('email');
                Cookies.remove('session_key');
                console.log(response);
                window.location.reload(false);
        });
    }

    render() {
        let authenticationButton;
        let welcomeBanner;
        if(!Cookies.get('id')) {
            authenticationButton = <Button href='/login'>Login</Button>
            welcomeBanner = <h1/>
        } else {
            authenticationButton = <Button onClick={this.logout}>Logout</Button>
            welcomeBanner = <h1>Welcome {Cookies.get('username')}!</h1>
        }

        return (
        <div>
            <Navbar color="faded" light>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                {welcomeBanner}
                {authenticationButton}
                <Collapse isOpen={this.state.open} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>  
            </Navbar>
        </div>
        );
    }
}