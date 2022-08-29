import type {NextApiRequest, NextApiResponse} from 'next';
import {SongRepository} from '../../../repositories/song_repository';

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
                console.log('Something went wrong fetching today\'s challenge! ', err);
                res.status(500);
                reject();
            });
    });
};

export default all_songs;
