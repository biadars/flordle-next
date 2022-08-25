import React, {VFC} from 'react';

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

    const renderGuess = (guessNumber: number) => {
        const guess = getGuessForNumber(guessNumber);

        return <div className="guess" key={guessNumber}>
            <div className={isSkip(guess) ? 'skippedGuess' : 'guessText'}>{guess}</div>
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