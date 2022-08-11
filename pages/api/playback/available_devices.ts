import {NextApiRequest, NextApiResponse} from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const available_devices = async (req: NextApiRequest, res: NextApiResponse) => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: req.cookies['spotify-token']
    });

    console.log(spotifyApi.getAccessToken(), req.body.device_id);
    return spotifyApi.getMyDevices()
        .then(function(data) {
            let availableDevices = data.body.devices;
            console.log('available devices', availableDevices);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
}

export default available_devices;