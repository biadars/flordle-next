import React, {useEffect, useState, VFC} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {WebPlaybackWrapper} from './web_playback_wrapper';
import {PreviousGuesses} from './previous_guesses';
import {Challenge} from '../models/challenge';
import {Song} from '../models/song';
import {ScaleLoader} from 'react-spinners';

interface SongOption {
    id: number;
    name: string;
}

export enum GuessState {
    SKIP,
    INCORRECT,
    CORRECT
}

export interface Guess {
    song?: string;
    state: GuessState;
}

interface Props {
    token: string;
    challenge: Challenge;
    songs: Song[];
    setTrack: (value: Spotify.Track) => void;
    setGameOver: (value: boolean) => void;
    setUserWon: (value: boolean) => void;
    setSecondsUsed: (value: number) => void;
    guesses: Guess[];
    setGuesses: (value: Guess[]) => void;
}

export const PlaybackAndGuesses: VFC<Props> = (props: Props) => {
    const guessPlaybackDurations = [1, 2, 4, 7, 11, 16];

    const [selectedOption, setSelectedOption] = useState<SongOption | undefined>(undefined);
    const [guessNumber, setGuessNumber] = useState(0);
    const [options, setOptions] = useState<SongOption[]>([]);
    const [playbackReady, setPlaybackReady] = useState(false);
    const [isGameReady, setIsGameReady] = useState(false);

    useEffect(() => {
        const mapSongToOption = (song: Song) => {
            return { id: song.Id, name: `${song.Artist} - ${song.Title}` };
        };

        if (props.songs) {
            setOptions(props.songs.map(mapSongToOption));
        }
    }, [props.songs, setOptions]);

    useEffect(() => {
        setIsGameReady(playbackReady && props.challenge !== undefined && options !== []);
    }, [setIsGameReady, playbackReady, props.challenge, options]);

    const handleOnSelect = (item: SongOption) => {
        setSelectedOption(item);
    };

    const goToNextGuess = () => {
        if (guessNumber < 5) {
            props.setSecondsUsed(guessPlaybackDurations[guessNumber + 1]);
            setGuessNumber(guessNumber + 1);
        } else {
            props.setUserWon(false);
            props.setGameOver(true);
        }
    };

    const skipGuess = () => {
        props.setGuesses([...props.guesses, {state: GuessState.SKIP}]);
        goToNextGuess();
    };

    const submitGuess = () => {
        const isGuessCorrect = selectedOption?.id === props.challenge.SongId;
        const newGuess = {
            song: selectedOption?.name,
            state: isGuessCorrect ? GuessState.CORRECT : GuessState.INCORRECT
        };
        props.setGuesses([...props.guesses, newGuess]);
        if (selectedOption?.id === props.challenge.SongId) {
            props.setUserWon(true);
            props.setGameOver(true);
        } else {
            goToNextGuess();
        }
    };

    return (
        <>
            <ScaleLoader loading={!isGameReady} color={'#dcd6f7ff'}/>
            {isGameReady && (
                <div className="previousGuessesContainer">
                    <PreviousGuesses guesses={props.guesses}/>
                </div>
            )}
            <WebPlaybackWrapper token={props.token} playbackDuration={guessPlaybackDurations[guessNumber]} setTrack={props.setTrack} setPlaybackReady={setPlaybackReady}/>
            {isGameReady && (
                <>
                    <div className="inputContainer">
                        <ReactSearchAutocomplete
                            items={options}
                            onSelect={handleOnSelect}
                            maxResults={3}
                            styling={{
                                height: '34px',
                                border: '1px solid #dcd6f7ff',
                                borderRadius: '4px',
                                backgroundColor: '#f2f4ffff',
                                boxShadow: 'none',
                                hoverBackgroundColor: '#dcd6f7ff',
                                color: '#9683EA',
                                fontSize: '12px',
                                fontFamily: 'Courier',
                                iconColor: '#9683EA',
                                lineColor: '#dcd6f7ff',
                                placeholderColor: '#9683EA',
                                clearIconMargin: '3px 8px 0 0',
                                zIndex: 2,
                            }}
                        />
                    </div>
                    <div className="actionsContainer">
                        <button className="skipButton" onClick={skipGuess}>SKIP</button>
                        <button className="submitButton" onClick={submitGuess} disabled={!selectedOption}>SUBMIT</button>
                    </div>
                </> )}
        </>
    );
};