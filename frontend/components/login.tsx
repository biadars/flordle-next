import React, { VFC } from 'react';
import Link from 'next/link';

export const Login: VFC = () => {
    return (
        <div className="App">
            <header className="appHeader">
                <Link href="/api/auth/login">
                    <a className="loginButton">Login with Spotify</a>
                </Link>
            </header>
        </div>
    );
};
