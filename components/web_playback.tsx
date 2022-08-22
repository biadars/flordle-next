import React, {VFC, useState, useEffect} from 'react';
import {ScaleLoader} from 'react-spinners';

type Props = {
  token: string;
  playbackDuration: number;
};

export const WebPlayback: VFC<Props> = (props: Props) => {
    const [is_paused, setPaused] = useState<boolean>(false);
    const [is_active, setActive] = useState<boolean>(false);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [current_track, setTrack] = useState<Spotify.Track | null>(null);

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

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

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
                {current_track && current_track.album.images[0].url ? (
                    <img
                        src={current_track.album.images[0].url}
                        className="now-playing__cover"
                        alt=""
                    />
                ) : null}

                <div className="now-playing__side">
                    <div className="now-playing__name">{current_track?.name}</div>
                    <div className="now-playing__artist">
                        {current_track?.artists[0].name}
                    </div>

                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player?.previousTrack();
                        }}
                    >
                        &lt;&lt;
                    </button>

                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player?.togglePlay();
                        }}
                    >
                        {is_paused ? 'PLAY' : 'PAUSE'}
                    </button>

                    <button
                        className="btn-spotify"
                        onClick={() => {
                            player?.nextTrack();
                        }}
                    >
                        &gt;&gt;
                    </button>
                </div>
            </>
        );
    };

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <div></div>
                    <ScaleLoader loading={!player || !is_active} color={'#ffffff'}/>
                    {player && is_active && renderPlayer()}
                </div>
            </div>
        </>
    );
};
