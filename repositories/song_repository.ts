import { Challenge, PrismaClient } from '@prisma/client';

export class SongRepository {
    private client: PrismaClient;

    public constructor() {
        this.client = new PrismaClient();
    }

    public getAllSongs = () => {
        return this.client.song.findMany();
    }

    public getUnusedSong = () => {
        return this.client.song.findFirst({where: {UsedInChallenge: {equals: false}}});
    };

    public getSongForChallenge = (challenge: Challenge | null) => {
        if (!challenge) {
            return null;
        }

        return this.client.song.findFirst({where: {Id: {equals: challenge.SongId}}});
    }

    public markSongAsUsedInChallenge = (songId: number) => {
        return this.client.song.update({
            where: { Id: songId },
            data: { UsedInChallenge: true }
        });
    };
}