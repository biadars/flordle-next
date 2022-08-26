import {NextApiRequest} from 'next';
import { Song } from '@prisma/client';
import SpotifyWebApi from 'spotify-web-api-node';
import {getUnusedSong} from '../../../repositories/unused_song_repository';

const play_song = async (req: NextApiRequest) => {
    return getUnusedSong()
        .then(song => playGivenSong(song, req.cookies['spotify-token'], req.body.device_id));

};

const playGivenSong = (song: Song | null, spotifyToken: string, deviceId: string) => {
    if (!song) {
        console.log('no song found!');
        return;
    }

    const spotifyApi = new SpotifyWebApi({
        accessToken: spotifyToken
    });

    return spotifyApi.play({device_id: deviceId, uris: [song.SpotifyUri]})
        .then(function() {
            console.log('playing track');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
};

export default play_song;