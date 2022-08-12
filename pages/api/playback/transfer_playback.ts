import {NextApiRequest, NextApiResponse} from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const transfer_playback = async (req: NextApiRequest, res: NextApiResponse) => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: req.cookies['spotify-token']
    });

    console.log(spotifyApi.getAccessToken(), req.body.device_id);
    spotifyApi.transferMyPlayback([req.body.device_id])
        .then(function() {
            console.log('Transferring playback to ' + req.body.device_id);
            res.status(200);
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
};

export default transfer_playback;