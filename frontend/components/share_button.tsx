import {Guess, GuessState} from './playback_and_guesses';
import React, {VFC} from 'react';
import {Challenge} from '../models/challenge';
import copy from 'copy-to-clipboard';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

interface Props {
    challenge: Challenge;
    guesses: Guess[];
}

export const ShareButton: VFC<Props> = (props: Props) => {
    const tooltipContent = <div className="shareClicked">Copied to clipboard!</div>;

    const copyGuessesToClipboard = () => {
        const challengeHeader = `Flordle ${props.challenge.Number}`;
        const outcomeSymbol = props.guesses.find(g => g.state === GuessState.CORRECT)
            ? '🔊' : '🔈';
        const guessEmojis = props.guesses.map(mapGuessToEmoji).join('');

        copy(`${challengeHeader}\n ${outcomeSymbol} ${guessEmojis}`);
    };

    const mapGuessToEmoji = (guess: Guess) => {
        if (guess.state === GuessState.SKIP) {
            return '⬛';
        }
        if (guess.state === GuessState.CORRECT) {
            return '🟩';
        }
        return '🟥';
    };

    return <Tooltip
        trigger="click"
        placement="bottom"
        overlay={tooltipContent}
        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
    >
        <button className="submitButton" onClick={copyGuessesToClipboard}>Share</button>
    </Tooltip>;
};