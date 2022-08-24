import React, {VFC} from 'react';

interface Props {
    track: Spotify.Track | undefined;
    userWon: boolean | undefined;
}
export const GameEndScreen: VFC<Props> = (props: Props) => {
    return (
        <div className="gameEndScreen">
            <div className="resultMessage">{props.userWon ? 'That\'s right, well done!' : 'Nope, better luck next time!'}</div>
            {props.track && props.track.album.images[0].url ? (
                <img
                    src={props.track.album.images[0].url}
                    className="now-playing__cover"
                    alt=""
                />
            ) : null}

            <div className="now-playing__side">
                <div className="now-playing__name">{props.track?.name}</div>
                <div className="now-playing__artist">
                    {props.track?.artists[0].name}
                </div>

            </div>
        </div>
    );
};
