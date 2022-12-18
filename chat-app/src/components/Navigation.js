import Cookies from 'js-cookie';
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
    render() {
        return (
        <div>
            <Navbar color="faded" light>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <h2>Welcome {Cookies.get('username')}!</h2>
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