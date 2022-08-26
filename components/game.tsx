import React, {useEffect, useState, VFC} from 'react';
import {PlaybackAndGuesses} from './playback_and_guesses';
import {GameEndScreen} from './game_end_screen';
import {Challenge} from '../models/challenge';

interface Props {
    token: string;
}
export const Game: VFC<Props> = (props: Props) => {
    const [track, setTrack] = useState<Spotify.Track | undefined>(undefined);
    const [gameOver, setGameOver] = useState(false);
    const [userWon, setUserWon] = useState<boolean | undefined>(undefined);
    const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);

    const getTodaysChallenge = () => {
        fetch('/api/challenge/todays_challenge')
            .then((res) => res.json())
            .then((res) => setChallenge(res))
            .catch((err) => console.log('Something went wrong fetching challenge', err));
    };

    useEffect(() => {
        getTodaysChallenge();
    }, [setChallenge]);

    return (
        <div className="container">
            <div className="mainWrapper">
                {!gameOver && challenge && <PlaybackAndGuesses token={props.token}
                    challenge={challenge}
                    setTrack={setTrack}
                    setGameOver={setGameOver}
                    setUserWon={setUserWon}/>}
                {gameOver && <GameEndScreen track={track} userWon={userWon}/>}
            </div>
        </div>
    );
};
