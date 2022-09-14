import React, {VFC} from 'react';
import {CheckBoxOutlineBlank, Close} from '@material-ui/icons';
import {Guess, GuessState} from './playback_and_guesses';

interface Props {
    guesses: Guess[];
}

export const PreviousGuesses: VFC<Props> = (props: Props) => {
    const guessNumbers = [0, 1, 2, 3, 4, 5];

    const getGuessForNumber = (guessNumber: number) => {
        return props.guesses.length >= guessNumber ? props.guesses[guessNumber] : null;
    };

    const isSkip = (guess: Guess) => {
        return guess.state === GuessState.SKIP;
    };

    const renderGuessSymbol = (guess: Guess) => {
        if (!guess) {
            return;
        }

        return isSkip(guess)
            ? <CheckBoxOutlineBlank/>
            : <Close/>;
    };

    const renderGuess = (guessNumber: number) => {
        const guess = getGuessForNumber(guessNumber);

        if (!guess) {
            return <div className="guess" key={guessNumber}/>;
        }

        return <div className="guess" key={guessNumber}>
            <div className={isSkip(guess) ? 'skippedGuess' : 'guessText'}>
                <span className="guessSymbol">{renderGuessSymbol(guess)}</span>
                {isSkip(guess) ? 'SKIPPED' : guess.song}
            </div>
        </div>;
    };

    return (
        <>
            <div className="previousGuesses">
                {guessNumbers.map(renderGuess)}
            </div>
        </>
    );
};