import React from "react";
import { User } from "../model/Model";
import { Link } from 'react-router-dom'


// The entire navbar.tsx is for routing!
// Routing: which webpage to go

export class Navbar extends React.Component<{
    user: User | undefined
}> {

    render() {
        let loginLogOut: any

        // if user is consistent with authService,
        // go to logout page and print userName
        // otherwise go to login page
        // after login, the userName should be displayed on the webpage
        // however, if we reload the page, everything starts from the beginning
        // which means no userName and we need to redo the login
        if (this.props.user) {
            loginLogOut = <Link to='/logout' style={{ float: 'right' }} >{this.props.user.userName}</Link>
        } else {
            loginLogOut = <Link data-testid='login-link'  to='/login' style={{ float: 'right' }}>Login</Link>
        }


        return (
            <div className='navbar'>
                {/* The following links can only exist in routers */}
                {/* The data-testid is for data test in Navbar.test.tsx */}
                {/* The data-testid identify the corresponding link */}
                <Link data-testid='home-link' to='/'> Home</Link>
                <Link data-testid='profile-link' to='/profile'> Profile</Link>
                <Link data-testid='spaces-link' to='/spaces'> Spaces</Link>
                {loginLogOut}
            </div>
        )
    }
}