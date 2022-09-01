import React, {VFC} from 'react';
import {CheckBoxOutlineBlank, Close} from '@material-ui/icons';

interface Props {
    guesses: string[];
}

export const PreviousGuesses: VFC<Props> = (props: Props) => {
    const guessNumbers = [0, 1, 2, 3, 4, 5];

    const getGuessForNumber = (guessNumber: number) => {
        return props.guesses.length >= guessNumber ? props.guesses[guessNumber] : '';
    };

    const isSkip = (guess: string) => {
        return guess === 'SKIPPED';
    };

    const renderGuessSymbol = (guess: string) => {
        if (!guess) {
            return;
        }

        return isSkip(guess)
            ? <CheckBoxOutlineBlank/>
            : <Close/>;
    };

    const renderGuess = (guessNumber: number) => {
        const guess = getGuessForNumber(guessNumber);

        return <div className="guess" key={guessNumber}>
            <div className={isSkip(guess) ? 'skippedGuess' : 'guessText'}>
                <span className="guessSymbol">{renderGuessSymbol(guess)}</span>
                {guess}
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