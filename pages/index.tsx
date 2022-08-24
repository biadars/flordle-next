import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Login } from '../components/login';
import React from 'react';
import {Game} from '../components/game';

type Props = {
  token: string;
};

const Home: NextPage<Props> = (props: Props) => {
    return (
        <>
            <Head>
                <title>flordle</title>
                <meta
                    name="description"
                    content="A song guessing game specific to Florence and the Machine and Hozier"
                />
            </Head>

            {props.token === '' ? <Login /> : <Game token={props.token}/>}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.req.cookies['spotify-token']) {
        const token: string = context.req.cookies['spotify-token'];
        return {
            props: { token: token },
        };
    } else {
        return {
            props: { token: '' },
        };
    }
};

export default Home;
