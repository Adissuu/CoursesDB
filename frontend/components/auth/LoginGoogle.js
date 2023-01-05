import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import { loginGoogle } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';

const LoginGoogle = () => {
    return (
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    )
}

export default LoginGoogle