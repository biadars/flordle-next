import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Login } from '../components/login';
import { WebPlayback } from '../components/web_playback';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

            {props.token === '' ? <Login /> : <WebPlayback token={props.token} playbackDuration={16} />}
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
