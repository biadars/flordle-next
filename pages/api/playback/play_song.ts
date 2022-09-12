import {NextApiRequest, NextApiResponse} from 'next';
import { Song } from '@prisma/client';
import SpotifyWebApi from 'spotify-web-api-node';
import {ChallengeRepository} from '../../../repositories/challenge_repository';

const play_song = async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        const challengeRepository = new ChallengeRepository();
        return challengeRepository.getTodaysSong()
            .then(song => playGivenSong(song, req.cookies['spotify-token'], req.body.device_id))
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({}));
                resolve(res);
            })
            .catch((err) => {
                console.log('Something went wrong playing this song! ', err);
                res.status(500);
                reject();
            });
    });
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