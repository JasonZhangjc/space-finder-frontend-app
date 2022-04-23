import React, { SyntheticEvent } from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import history from '../utils/history'


// a component cannot change its properties
// properties are from outside
interface LoginProps {
    authService: AuthService,
    // interface can contain both fields and functions
    // the following is a function
    setUser:(user: User) => void
}

// a component can change its state
// state is just inside the component
// they need initial values
interface LoginState {
    userName: string,
    password: string,
    loginAttempted: boolean,
    loginSuccessful: boolean
}

// the event is used in the class 'Login'
interface CustomEvent {
    target: HTMLInputElement
}

// LoginProps cannot be changed and is from outside
// LoginProps carries the authentication service
// LoginState can be changed and is inside
export class Login extends React.Component<LoginProps, LoginState> {

    // set initial values for LoginState
    state: LoginState = {
        userName: '',
        password: '',
        loginAttempted: false,
        loginSuccessful: false
    }

    // a private method is only used locally
    // get HTML input element and set userName to it
    private setUserName(event: CustomEvent){
        this.setState({userName: event.target.value})
    }

    private setPassword(event: CustomEvent){
        this.setState({password: event.target.value})
        // print things to the console when you use 'inspect' in a webpage
    }
    
    // SyntheticEvent is from React
    private async handleSubmit(event: SyntheticEvent){
        // we don't want default
        event.preventDefault();
        // The login is attempted
        this.setState({loginAttempted: true})
        // if this.state.userName and this.state.password
        // are consistent with this.props.authService,
        // return the User;
        // otherwise return False.
        const result = await this.props.authService.login(
            this.state.userName,
            this.state.password
        )
        if (result) {
            this.setState({loginSuccessful: true})
            this.props.setUser(result)
            history.push('/profile')
        } else {
            this.setState({loginSuccessful: false})
        }
    }


    render(){

        // define loginMessage as a var with any type
        let loginMessage: any;
        if (this.state.loginAttempted) {
            if (this.state.loginSuccessful) {
                // set loginMessage to a message
                loginMessage = <label>Login successful</label>
            } else {
                loginMessage = <label>Login failed</label>
            }
        }

        return (
            <div>
                <h2>Please login</h2>
                {/* call handleSubmit in the form */}
                <form onSubmit={e => this.handleSubmit(e)}>
                    {/* The first line is for userName */}
                    <input value={this.state.userName} onChange = {e => this.setUserName(e)}/><br/>
                    {/* The second line is for password */}
                    <input value={this.state.password} onChange = {e => this.setPassword(e)} type='password'/><br/>
                    <input type='submit'value='Login'/>
                </form>
                {loginMessage}
            </div>
        )
    }
}