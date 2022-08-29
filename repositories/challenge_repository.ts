import { Challenge, PrismaClient, Song } from '@prisma/client';
import moment from 'moment/moment';
import {SongRepository} from './song_repository';

export class ChallengeRepository {
    private client: PrismaClient;
    private songRepository: SongRepository;

    public constructor() {
        this.client = new PrismaClient();
        this.songRepository = new SongRepository();
    }

    public ensureChallengeExistsForToday = () => {
        return this.getTodaysChallenge()
            .then(this.createChallengeIfItDoesNotExist);
    };

    public getTodaysSong = () => {
        return this.getTodaysChallenge()
            .then(this.songRepository.getSongForChallenge);
    };

    private getTodaysChallenge = () => {
        const todaysDate = moment().startOf('day').toDate();
        return this.client.challenge.findFirst({where: {Date: {equals: todaysDate}}});
    };

    private createChallengeIfItDoesNotExist = (challenge: Challenge | null) => {
        if (challenge) {
            return challenge;
        }
        return this.songRepository.getUnusedSong().then(this.createChallengeForSong);
    };

    private createChallengeForSong = (song: Song | null) => {
        if (!song) {
            console.log('No more songs to use!');
            return;
        }

        const todaysDate = moment().startOf('day').toDate();
        return this.client.challenge.create({data: {Date: todaysDate, SongId: song.Id}})
            .then(this.markSongAsUsedAndReturnChallenge);
    };

    private markSongAsUsedAndReturnChallenge = (challenge: Challenge) => {
        return this.songRepository.markSongAsUsedInChallenge(challenge.SongId)
            .then(() => challenge);
    }
}
