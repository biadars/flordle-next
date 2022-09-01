import React, {useEffect, useState, VFC} from 'react';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {WebPlaybackWrapper} from './web_playback_wrapper';
import {PreviousGuesses} from './previous_guesses';
import {Challenge} from '../models/challenge';
import {Song} from '../models/song';

interface SongOption {
    id: number;
    name: string;
}

interface Props {
    token: string;
    challenge: Challenge;
    songs: Song[];
    setTrack: (value: Spotify.Track) => void;
    setGameOver: (value: boolean) => void;
    setUserWon: (value: boolean) => void;
}

export const PlaybackAndGuesses: VFC<Props> = (props: Props) => {
    const guessPlaybackDurations = [1, 2, 4, 7, 11, 16];

    const [selectedOption, setSelectedOption] = useState<SongOption | undefined>(undefined);
    const [guessNumber, setGuessNumber] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [options, setOptions] = useState<SongOption[]>([]);

    useEffect(() => {
        const mapSongToOption = (song: Song) => {
            return { id: song.Id, name: `${song.Artist} - ${song.Title}` };
        };

        if (props.songs) {
            setOptions(props.songs.map(mapSongToOption));
        }
    }, [props.songs, setOptions]);

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
        if (selectedOption?.id === props.challenge.SongId) {
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
        </>
    );
};