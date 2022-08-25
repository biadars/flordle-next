import React, {useState, VFC} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {WebPlaybackWrapper} from './web_playback_wrapper';
import {PreviousGuesses} from './previous_guesses';

interface SongOption {
    id: number;
    name: string;
}

interface Props {
    token: string;
    setTrack: (value: Spotify.Track) => void;
    setGameOver: (value: boolean) => void;
    setUserWon: (value: boolean) => void;
}

export const PlaybackAndGuesses: VFC<Props> = (props: Props) => {
    const guessPlaybackDurations = [1, 2, 4, 7, 11, 16];
    const options = [
        { id: 0, name: 'Hozier - Sedated' },
        { id: 1, name: 'Florence and the Machine - Free'}
    ];
    const correctOptionId = 0;

    const [selectedOption, setSelectedOption] = useState<SongOption | undefined>(undefined);
    const [guessNumber, setGuessNumber] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);


    const handleOnSelect = (item: SongOption) => {
        setSelectedOption(item);
    };

    const goToNextGuess = () => {
        if (guessNumber < 5) {
            setGuessNumber(guessNumber + 1);
        } else {
            props.setUserWon(false);
            props.setGameOver(true);
        }
    };

    const skipGuess = () => {
        setGuesses([...guesses, 'SKIPPED']);
        goToNextGuess();
    };

    const submitGuess = () => {
        if (selectedOption?.id === correctOptionId) {
            props.setUserWon(true);
            props.setGameOver(true);
        } else {
            if (selectedOption) {
                setGuesses([...guesses, selectedOption.name]);
            }
            goToNextGuess();
        }
    };

    return (
        <>
            <div className="previousGuessesContainer">
                <PreviousGuesses guesses={guesses}/>
            </div>
            <WebPlaybackWrapper token={props.token} playbackDuration={guessPlaybackDurations[guessNumber]} setTrack={props.setTrack}/>
            <div className="inputContainer">
                <ReactSearchAutocomplete
                    items={options}
                    onSelect={handleOnSelect}
                    styling={{
                        height: '34px',
                        border: '1px solid darkgreen',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        hoverBackgroundColor: 'lightgreen',
                        color: 'darkgreen',
                        fontSize: '12px',
                        fontFamily: 'Courier',
                        iconColor: 'green',
                        lineColor: 'lightgreen',
                        placeholderColor: 'darkgreen',
                        clearIconMargin: '3px 8px 0 0',
                        zIndex: 2,
                    }}
                />
            </div>
            <div className="actionsContainer">
                <button className="skipButton" onClick={skipGuess}>SKIP</button>
                <button className="submitButton" onClick={submitGuess} disabled={!selectedOption}>SUBMIT</button>
            </div>
        </>
    );
};