import { Challenge, PrismaClient, Song } from '@prisma/client';
import moment from 'moment/moment';
import {getUnusedSong} from './unused_song_repository';

export class ChallengeRepository {
    client: PrismaClient;

    constructor() {
        this.client = new PrismaClient();
    }

    ensureChallengeExistsForToday = () => {
        const todaysDate = moment().startOf('day').toDate();
        return this.client.challenge.findFirst({where: {Date: {equals: todaysDate}}})
            .then(this.createChallengeIfItDoesNotExist);
    };

    createChallengeIfItDoesNotExist = (challenge: Challenge | null) => {
        if (challenge) {
            return challenge;
        }
        return getUnusedSong().then(this.createChallengeForSong);
    }

    createChallengeForSong = (song: Song | null) => {
        if (!song) {
            console.log('No more songs to use!');
            return;
        }

        const todaysDate = moment().startOf('day').toDate();
        return this.client.challenge.create({data: {Date: todaysDate, SongId: song.Id}});
    }
}
