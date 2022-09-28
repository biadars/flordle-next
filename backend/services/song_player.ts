import SpotifyWebApi from 'spotify-web-api-node';
import {Song} from '@prisma/client';
import {logger} from '../utils/logger';

export class SongPlayer {
    private spotifyApi: SpotifyWebApi;
    private hasRetried: boolean;
    
    public constructor(spotifyAccessToken: string) {
        this.spotifyApi = new SpotifyWebApi({
            accessToken: spotifyAccessToken
        });
        this.hasRetried = false;
    }

    public playGivenSongWithRetryLogic = (song: Song | null, deviceId: string) => {
        if (!song) {
            logger.error('No song found to play!');
            return;
        }

        return this.playGivenSong(song, deviceId)
            .then(() => {
                logger.info(`Playing song with ID ${song.Id}`);
            })
            .catch((err) => {
                logger.error(`Something went wrong playing song with ID ${song.Id}: `);
                logger.error(err);
                if (this.hasRetried) {
                    return;
                }

                this.hasRetried = true;
                return this.playGivenSong(song, deviceId);
            });
    };

    private playGivenSong = (song: Song, deviceId: string) => {
        return this.spotifyApi.play({device_id: deviceId, uris: [song.SpotifyUri]});
    }
}