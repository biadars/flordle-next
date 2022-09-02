import React, {VFC} from 'react';
import emoji from 'react-easy-emoji';

interface Props {
    track: Spotify.Track | undefined;
    userWon: boolean | undefined;
    secondsUsed: number;
}
export const GameEndScreen: VFC<Props> = (props: Props) => {
    const getResultEmoji = () => {
        return props.userWon
            ? emoji('🎉')
            : emoji('👎');
    };

    const getResultsMessage = () => {
        return props.userWon
            ? 'That\'s right, well done!'
            : 'Better luck next time';
    };

    return (
        <div className="gameEndScreen">
            <div className="resultsMessage">
                <span className="resultsEmoji">{getResultEmoji()}</span>
                <span>{getResultsMessage()}</span>
            </div>
            {props.userWon && (
                <div className="resultsMessage">You got it in {props.secondsUsed} {props.secondsUsed > 1 ? 'seconds' : 'second'}!</div>
            )}
            {props.track && props.track.album.images[0].url ? (
                <img
                    src={props.track.album.images[0].url}
                    className="albumCover"
                    alt=""
                />
            ) : null}

            <div className="songInfo">
                <div className="songName">{props.track?.name}</div>
                <div className="artistName">
                    {props.track?.artists[0].name}
                </div>

            </div>
        </div>
    );
};
