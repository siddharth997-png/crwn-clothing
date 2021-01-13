import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import {Switch,Route, Redirect} from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unSubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log('onAuthStateChanged fired');
      if(userAuth) {
        //console.log(userAuth);
        const userRef = await createUserProfileDocument(userAuth);

        (await userRef).onSnapshot(snapShot => {
          setCurrentUser({
            id : snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null)
      }   
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' 
          render={() => 
          (this.props.currentUser ? 
          <Redirect to='/'/> : <SignInAndSignUpPage/> )}  />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
