import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Login } from '../components/login';
import { WebPlayback } from '../components/web_playback';
import React from 'react';

type Props = {
  token: string;
};

const Home: NextPage<Props> = (props: Props) => {
    return (
        <>
            <Head>
                <title>Spotify Web Playback Example</title>
                <meta
                    name="description"
                    content="An example app of Spotify Web Playback SDK based on Next.js and Typescript."
                />
            </Head>

            {props.token === '' ? <Login /> : <WebPlayback token={props.token} playbackDuration={1} />}
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
