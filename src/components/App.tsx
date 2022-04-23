import React from 'react';
import { User  } from '../model/Model'
import { AuthService } from '../services/AuthService'
import { Login } from './Login';
// Switch is replaced by Routes in react-router-dom v6
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history';
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Profile } from './Profile';
import { Spaces } from './spaces/Spaces'
import { DataService } from '../services/DataService';


// a typescript interface
interface AppState{
  user: User | undefined
}

// The class App has no properties as it is a base compoennt
// or the parent component
// The class App has AppState that can be changed

/* istanbul ignore file */
export class App extends React.Component<{}, AppState>{

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  // register setUser inside a constructor
  // the constructor receives some properties as parameters
  constructor(props: any){
    super(props)
    this.state = {
      user: undefined
    }

    this.setUser = this.setUser.bind(this)
  }

  // the 'setUser' is a callback function
  private setUser(user: User){
    this.setState({
      user: user
    })
    console.log('setting the user!: ' + user);
  }

  // Once we extends the React.Component,
  // the render() method has to be implemented.
  render(){
    return (
      // Use Routing Here
      <div className='wrapper'>
        <Router history={history}>
          {/* A navigation bar is defined below */}
          <div>
            <Navbar user={this.state.user}/>
            <Switch>
              {/* Route to the Home page */}
              <Route exact path='/' component={Home}/>
              {/* Route to the Login page */}
              <Route exact path='/login'>
                <Login authService={this.authService} setUser={this.setUser}/>
              </Route>
              {/* Route to the Profile page */}
              <Route exact path='/profile'>
                <Profile authService={this.authService} user={this.state.user}/>
              </Route>
              {/* Route to the Spaces page */}
              <Route exact path='/spaces'>
                <Spaces dataService={this.dataService}/>
              </Route>
            </Switch>
          </div>

        </Router>
        {/* The following line passes the 'authService'
            to its child component 'Login' */}
        {/* <Login authService={this.authService} setUser={this.setUser}/> */}
      </div>
    )
  }
}