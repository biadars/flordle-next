import {Guess} from '../components/playback_and_guesses';

export interface Progress {
    lastCompletedChallenge: number;
    lastChallengeStats: LastChallengeStats;
    overallStats: OverallStats;
}

export interface LastChallengeStats {
    userWon: boolean;
    secondsUsed: number;
    guesses: Guess[];
    track: Spotify.Track;
}

export interface OverallStats {
    guessesInOneSecond: number;
    guessesInTwoSeconds: number;
    guessesInFourSeconds: number;
    guessesInSevenSeconds: number;
    guessesInElevenSeconds: number;
    guessesInSixteenSeconds: number;
    failedGuesses: number;
    currentStreak: number;
    maxStreak: number;
}