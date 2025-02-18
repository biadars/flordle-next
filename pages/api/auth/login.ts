import type { NextApiRequest, NextApiResponse } from 'next';
import {logger} from '../../../backend/utils/logger';

const generateRandomString = (length: number): string => {
    let text = 'x';
    const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const login = (req: NextApiRequest, res: NextApiResponse) => {
    const scope = 'streaming user-read-email user-read-private user-read-playback-state';
    const state: string = generateRandomString(16);

    let spotify_client_id = '';
    if (process.env.SPOTIFY_CLIENT_ID) {
        spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
    } else {
        logger.error(
            'Undefined Error: An environmental variable, "SPOTIFY_CLIENT_ID", has something wrong.'
        );
    }

    let spotify_redirect_uri = '';
    if (process.env.SPOTIFY_REDIRECT_URI) {
        spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
    } else {
        console.error('Undefined Error: An environmental variable, "SPOTIFY_REDIRECT_URI", has something wrong.');
    }

    const auth_query_parameters = new URLSearchParams({
        response_type: 'code',
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: spotify_redirect_uri,
        state: state,
    });

    res.redirect(
        'https://accounts.spotify.com/authorize/?' +
      auth_query_parameters.toString()
    );
};

export default login;
