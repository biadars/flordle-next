import React, {VFC, useState, useEffect} from 'react';
import {ScaleLoader} from 'react-spinners';
import PlayCircleFilledOutlined from '@material-ui/icons/PlayCircleFilledOutlined';

type Props = {
  token: string;
  playbackDuration: number;
};

export const WebPlayback: VFC<Props> = (props: Props) => {
    const [is_active, setActive] = useState<boolean>(false);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        const pauseAndRewindPlayback = (player: Spotify.Player) => {
            return player.pause()
                .then(() => player.seek(0))
                .then();
        };

        const stopPlaybackAfterDuration = (player: Spotify.Player) => {
            setTimeout(() => pauseAndRewindPlayback(player), props.playbackDuration * 1000);
        };

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'flordle',
                getOAuthToken: (cb) => {
                    cb(props.token);
                },
                volume: 0.5,
            }, );

            const playSong = (device_id: string) => {
                const body = JSON.stringify({device_id: device_id});
                fetch('/api/playback/play_song', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body}).then();
            };

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                playSong(device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) {
                    return;
                }

                if (!state.paused) {
                    stopPlaybackAfterDuration(player);
                }

                player.getCurrentState().then((state) => {
                    if (!state) {
                        setActive(false);
                    } else {
                        setActive(true);
                    }
                });
            });

            player.connect().then();
        };
    }, [props.token, props.playbackDuration]);

    const renderPlayer = () => {
        return (
            <>
                <div className="play-button-container">

                    <button
                        className="play-button"
                        onClick={() => {
                            player?.resume();
                        }}
                    >
                        <PlayCircleFilledOutlined fontSize='large'/>
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <ScaleLoader loading={!player || !is_active} color={'#ffffff'}/>
                    {player && is_active && renderPlayer()}
                </div>
            </div>
        </>
    );
};
