import {NextApiRequest, NextApiResponse} from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const play_song = async (req: NextApiRequest, res: NextApiResponse) => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: req.cookies['spotify-token']
    });

    return spotifyApi.play({device_id: req.body.device_id, uris: ['spotify:track:4C4Pduzp8LfAtQXHAGQWM5']})
        .then(function(data) {
            console.log('playing track');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

export default play_song;