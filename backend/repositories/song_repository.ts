import { Challenge, PrismaClient } from '@prisma/client';
import {logger} from '../utils/logger';

export class SongRepository {
    private client: PrismaClient;

    public constructor() {
        this.client = new PrismaClient();
    }

    public getAllSongs = () => {
        logger.debug('Fetching all songs');
        return this.client.song.findMany();
    }

    public getUnusedSong = () => {
        return this.client.song.findFirst({
            where: {UsedInChallenge: {equals: false}},
            orderBy: {SpotifyUri: 'asc'}
        });
    };

    public getSongForChallenge = (challenge: Challenge | null) => {
        if (!challenge) {
            return null;
        }

        logger.debug(`Fetching song for challenge ${challenge.Id}`);
        return this.client.song.findFirst({where: {Id: {equals: challenge.SongId}}});
    }

    public markSongAsUsedInChallenge = (songId: number) => {
        logger.debug(`Marking song with ID ${songId} as used in challenge.`);
        return this.client.song.update({
            where: { Id: songId },
            data: { UsedInChallenge: true }
        });
    };
}