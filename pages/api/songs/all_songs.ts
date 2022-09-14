import type {NextApiRequest, NextApiResponse} from 'next';
import {SongRepository} from '../../../backend/repositories/song_repository';
import {logger} from '../../../backend/utils/logger';

const all_songs = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        const songRepository = new SongRepository();
        return songRepository.getAllSongs()
            .then((songs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(songs));
                resolve(res);
            })
            .catch((err) => {
                logger.error('Something went wrong fetching the song list! ', err);
                res.status(500);
                reject();
            });
    });
};

export default all_songs;
