import React, {useEffect, VFC} from 'react';
import emoji from 'react-easy-emoji';
import {ShareButton} from './share_button';
import {Challenge} from '../models/challenge';
import {Guess} from './playback_and_guesses';
import {useCookies} from 'react-cookie';
import {LastChallengeStats, OverallStats, Progress} from '../models/progress';

interface Props {
    track: Spotify.Track;
    userWon: boolean;
    secondsUsed: number;
    challenge: Challenge;
    guesses: Guess[];
}
export const GameEndScreen: VFC<Props> = (props: Props) => {

    const [cookies, setCookie] = useCookies(['flordleProgress']);

    useEffect(() => {
        const updateOverallStats = () => {
            const overallStats: OverallStats = cookies.flordleProgress?.overallStats ?? {
                guessesInOneSecond: 0,
                guessesInTwoSeconds: 0,
                guessesInFourSeconds: 0,
                guessesInSevenSeconds: 0,
                guessesInElevenSeconds: 0,
                guessesInSixteenSeconds: 0,
                failedGuesses: 0,
                currentStreak: 0,
                maxStreak: 0
            };


            if (!props.userWon) {
                overallStats.failedGuesses += 1;
                overallStats.currentStreak = 0;
                return overallStats;
            }

            overallStats.currentStreak += 1;

            if (overallStats.currentStreak > overallStats.maxStreak) {
                overallStats.maxStreak = overallStats.currentStreak;
            }

            if (props.secondsUsed === 1) {
                overallStats.guessesInOneSecond += 1;
            }
            if (props.secondsUsed === 2) {
                overallStats.guessesInTwoSeconds += 1;
            }
            if (props.secondsUsed === 4) {
                overallStats.guessesInFourSeconds += 1;
            }
            if (props.secondsUsed === 11) {
                overallStats.guessesInElevenSeconds += 1;
            }
            if (props.secondsUsed === 16) {
                overallStats.guessesInSixteenSeconds += 1;
            }

            return overallStats;
        };

        const saveProgressForTodaysChallenge = () => {
            const lastChallengeStats = {
                userWon: props.userWon,
                secondsUsed: props.secondsUsed,
                guesses: props.guesses,
                track: props.track
            };
            const overallStats = updateOverallStats();
            const progress: Progress = {
                lastCompletedChallenge: props.challenge.Number,
                lastChallengeStats,
                overallStats
            };

            setCookie('flordleProgress', progress);
        };

        if (cookies['flordleProgress']?.lastCompletedChallenge !== props.challenge.Number) {
            saveProgressForTodaysChallenge();
        }
    }, [props, cookies, setCookie]);

    const getResultEmoji = () => {
        return props.userWon
            ? emoji('🎉')
            : emoji('👎');
    };

    const getResultsMessage = () => {
        return props.userWon
            ? 'That\'s right, well done!'
            : 'Better luck next time';
    };

    return (
        <div className="gameEndScreen">
            <div className="resultsMessage">
                <span className="resultsEmoji">{getResultEmoji()}</span>
                <span>{getResultsMessage()}</span>
            </div>
            {props.userWon && (
                <div className="resultsMessage">You got it in {props.secondsUsed} {props.secondsUsed > 1 ? 'seconds' : 'second'}!</div>
            )}
            {props.track && props.track.album.images[0].url ? (
                <img
                    src={props.track.album.images[0].url}
                    className="albumCover"
                    alt=""
                />
            ) : null}

            <div className="songInfo">
                <div className="songName">{props.track?.name}</div>
                <div className="artistName">
                    {props.track?.artists[0].name}
                </div>
            </div>

            <div className="shareButtonContainer">
                <ShareButton challenge={props.challenge} guesses={props.guesses}/>
            </div>
        </div>
    );
};
