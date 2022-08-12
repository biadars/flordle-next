import {NextApiRequest} from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

const available_devices = async (req: NextApiRequest) => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: req.cookies['spotify-token']
    });

    console.log(spotifyApi.getAccessToken(), req.body.device_id);
    return spotifyApi.getMyDevices()
        .then(function(data) {
            const availableDevices = data.body.devices;
            console.log('available devices', availableDevices);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
};

export default available_devices;