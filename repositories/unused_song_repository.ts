import { PrismaClient } from '@prisma/client';

export const getUnusedSong = () => {
    const prisma = new PrismaClient();
    return prisma.song.findFirst({where: {UsedInChallenge: {equals: false}}});
};

