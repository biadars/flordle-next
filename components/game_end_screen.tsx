import React, {useEffect, VFC} from 'react';
import emoji from 'react-easy-emoji';
import {ShareButton} from './share_button';
import {Challenge} from '../models/challenge';
import {Guess} from './playback_and_guesses';
import {useCookies} from 'react-cookie';
import {LastChallengeStats, Progress} from '../models/progress';

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
        const saveProgressForTodaysChallenge = () => {
            const lastChallengeStats: LastChallengeStats = {
                userWon: props.userWon,
                secondsUsed: props.secondsUsed,
                guesses: props.guesses,
                track: props.track
            };
            const progress: Progress = {
                lastCompletedChallenge: props.challenge.Number,
                lastChallengeStats
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
