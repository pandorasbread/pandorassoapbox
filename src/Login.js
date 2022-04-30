import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth, provider} from './Firebase'

function Login() {
  return (
    <div className='login'>
        <h2>Login</h2>
        <div className='login__logo'>
            <img url='https://upload.wikimedia.org/wikipedia/sco/thumb/9/98/Discord_logo.svg/800px-Discord_logo.svg.png'></img>
        </div>
        <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

function signIn(){
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
}

export default Login