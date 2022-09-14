import { Challenge, PrismaClient, Song } from '@prisma/client';
import moment from 'moment/moment';
import {SongRepository} from './song_repository';
import {logger} from '../utils/logger';

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
        logger.debug('Fetching todays song.');
        return this.getTodaysChallenge()
            .then(this.songRepository.getSongForChallenge);
    };

    private getTodaysChallenge = () => {
        const todaysDate = moment().utc().startOf('day').toDate();
        logger.info(`Finding challenge for date ${todaysDate}`);
        return this.client.challenge.findFirst({where: {Date: {equals: todaysDate}}});
    };

    private createChallengeIfItDoesNotExist = (challenge: Challenge | null) => {
        if (challenge) {
            logger.info(`Challenge found! Returning challenge with ID ${challenge.Id}`);
            return challenge;
        }
        logger.info('No challenge found! Creating challenge for today...');
        return this.songRepository.getUnusedSong().then(this.createChallengeForSong);
    };

    private createChallengeForSong = (song: Song | null) => {
        if (!song) {
            logger.error('No more songs left to use!');
            return null;
        }

        return this.client.challenge.count()
            .then(previousChallengesNumber => this.createChallengeWithSongAndNumber(song, previousChallengesNumber + 1))
            .then(this.markSongAsUsedAndReturnChallenge);
    };

    private createChallengeWithSongAndNumber = (song: Song, number: number) => {
        const todaysDate = moment().utc().startOf('day').toDate();
        logger.info(`Creating challenge: {number: ${number}, songId: ${song.Id}, date: ${todaysDate}}`);
        return this.client.challenge.create({data: {Date: todaysDate, SongId: song.Id, Number: number}});
    };

    private markSongAsUsedAndReturnChallenge = (challenge: Challenge) => {
        return this.songRepository.markSongAsUsedInChallenge(challenge.SongId)
            .then(() => challenge);
    }
}
