import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({signUpStart}) => {

    const [userCred, setUserCred] = useState({
        displayName : '',
        email : '',
        password : '',
        confirmPassword : ''
    })
    
    const {email, displayName, password, confirmPassword} = userCred;

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords dont match');
              return;
        }
        signUpStart(email,password,displayName);
    }

    const handleChange = event => {
        const {value, name} = event.target;

        setUserCred({...userCred, [name] : value});
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I dont have an account</h2>
            <span>Sign up with email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput 
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput 
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton 
                    type='submit'
                >Sign UP</CustomButton>
            </form>

        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    signUpStart : (email,password,displayName) => dispatch(signUpStart({email,password,displayName}))
})

export default connect(
    null,
    mapDispatchToProps
)(SignUp);