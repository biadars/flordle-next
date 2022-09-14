import SpotifyWebApi from 'spotify-web-api-node';
import {Song} from '@prisma/client';

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
            console.log('no song found!');
            return;
        }

        return this.playGivenSong(song, deviceId)
            .then(() => {
                console.log(`Playing song with ID ${song.Id}`);
            })
            .catch((err) => {
                console.log('Something went wrong!', err);
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