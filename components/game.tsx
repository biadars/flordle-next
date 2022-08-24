import React, {useState, VFC} from 'react';
import {PlaybackAndGuesses} from './playback_and_guesses';
import {GameEndScreen} from './game_end_screen';

interface Props {
    token: string;
}
export const Game: VFC<Props> = (props: Props) => {
    const [track, setTrack] = useState<Spotify.Track | undefined>(undefined);
    const [gameOver, setGameOver] = useState(false);
    const [userWon, setUserWon] = useState<boolean | undefined>(undefined);

    return (
        <div className="container">
            <div className="main-wrapper">
                {!gameOver && <PlaybackAndGuesses token={props.token}  setTrack={setTrack} setGameOver={setGameOver} setUserWon={setUserWon}/>}
                {gameOver && <GameEndScreen track={track} userWon={userWon}/>}
            </div>
        </div>
    );
};
