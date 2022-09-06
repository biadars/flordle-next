import {Guess} from '../components/playback_and_guesses';

export interface Progress {
    lastCompletedChallenge: number;
    userWon: boolean;
    secondsUsed: number;
    guesses: Guess[];
    track: Spotify.Track;
}