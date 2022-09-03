import React, {useEffect, useState, VFC} from 'react';
import {Guess, PlaybackAndGuesses} from './playback_and_guesses';
import {GameEndScreen} from './game_end_screen';
import {Challenge} from '../models/challenge';
import {Song} from '../models/song';

interface Props {
    token: string;
}

export const Game: VFC<Props> = (props: Props) => {
    const [track, setTrack] = useState<Spotify.Track | undefined>(undefined);
    const [gameOver, setGameOver] = useState(false);
    const [userWon, setUserWon] = useState<boolean | undefined>(undefined);
    const [challenge, setChallenge] = useState<Challenge | undefined>(undefined);
    const [songs, setSongs] = useState<Song[] | undefined>(undefined);
    const [outOfSongs, setOutOfSongs] = useState(false);
    const [secondsUsed, setSecondsUsed] = useState(1);
    const [guesses, setGuesses] = useState<Guess[]>([]);

    const getTodaysChallenge = () => {
        fetch('/api/challenge/todays_challenge')
            .then(loadChallengeResponse)
            .then(setChallenge);
    };

    const loadChallengeResponse = (response: Response) => {
        if (response.status === 404) {
            setOutOfSongs(true);
            return undefined;
        }
        return response.json();
    };

    const getAllSongs = () => {
        fetch('/api/songs/all_songs')
            .then((res) => res.json())
            .then((res) => setSongs(res))
            .catch((err) => console.log('Something went wrong fetching song list', err));
    };

    useEffect(() => {
        getTodaysChallenge();
        getAllSongs();
    }, [setChallenge, setSongs]);

    return (
        <div className="container">
            <div className="gameHeader">flordle</div>
            <div className="mainWrapper">
                {!gameOver && challenge && songs && <PlaybackAndGuesses token={props.token}
                    challenge={challenge}
                    songs={songs}
                    setTrack={setTrack}
                    setGameOver={setGameOver}
                    setUserWon={setUserWon}
                    setSecondsUsed={setSecondsUsed}
                    guesses={guesses}
                    setGuesses={setGuesses}/>}
                {gameOver && challenge && <GameEndScreen track={track}
                    userWon={userWon}
                    secondsUsed={secondsUsed} 
                    challenge={challenge}
                    guesses={guesses}/>}
                {outOfSongs && <div>That was all the Florence and Hozier songs, well done!</div>}
            </div>
        </div>
    );
};
