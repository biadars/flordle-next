import {NextApiRequest, NextApiResponse} from 'next';
import {ChallengeRepository} from '../../../backend/repositories/challenge_repository';
import {SongPlayer} from '../../../backend/services/song_player';

const play_song = async (req: NextApiRequest, res: NextApiResponse) => {
    const songPlayer = new SongPlayer(req.cookies['spotify-token']);
    return new Promise((resolve, reject) => {
        const challengeRepository = new ChallengeRepository();
        return challengeRepository.getTodaysSong()
            .then(song => songPlayer.playGivenSongWithRetryLogic(song, req.body.device_id))
            .then(() => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({}));
                resolve(res);
            })
            .catch((err) => {
                res.status(500);
                reject();
            });
    });
};

export default play_song;