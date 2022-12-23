import Cookies from 'js-cookie';
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { removeUserCookie } from '../utils/CookieUtils';

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
                session_key: this.props.user.session_key
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
                removeUserCookie();
                console.log(response);
                window.location.reload(false);
        });
    }

    render() {
        let authentication, welcomeBanner;
        if(!this.props.user) {
            authentication = <div>
                                <Button href='/register' style={{marginRight: "10px"}}>Register</Button>
                                <Button href='/login'>Login</Button>
                            </div>
            welcomeBanner = <h1/>
        } else {
            authentication = <Button onClick={this.logout}>Logout</Button>
            welcomeBanner = <h1>Welcome {this.props.user.username}!</h1>
        }

        return (
        <div>
            <Navbar color="faded" light>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                {welcomeBanner}
                {authentication}
                <Collapse isOpen={this.state.open} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/register">Register</NavLink>
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