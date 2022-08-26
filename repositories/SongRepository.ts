import {PrismaClient} from '@prisma/client';

export class SongRepository {
    private client: PrismaClient;

    public constructor() {
        this.client = new PrismaClient();
    }

    public getAllSongs = () => {
        return this.client.song.findMany();
    }
}