import React, {useEffect, useState, VFC} from 'react';
import {
    usePlaybackState,
    usePlayerDevice,
    useSpotifyPlayer,
    useWebPlaybackSDKReady
} from 'react-spotify-web-playback-sdk';
import {PlayCircleOutlineOutlined} from '@material-ui/icons';
import {StreamingProgressBar} from './streaming_progress_bar';

interface Props {
    playbackDuration: number;
    setTrack: (value: Spotify.Track) => void;
    setPlaybackReady: (value: boolean) => void;
}

export const LimitedDurationPlayback: VFC<Props> = (props: Props) => {
    const webPlaybackSDKReady = useWebPlaybackSDKReady();
    const player = useSpotifyPlayer();
    const device = usePlayerDevice();
    const playbackState = usePlaybackState(true, 10);

    const [gameStarted, setGameStarted] = useState(false);
    const [millisecondsElapsed, setMillisecondsElapsed] = useState(0);

    const startPlayingSong = () => {
        const body = JSON.stringify({device_id: device?.device_id});
        fetch('/api/playback/play_song', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body})
            .then(() => player?.resume());
    };

    const resumePlayback = () => {
        if (gameStarted) {
            player?.resume().then();
        } else {
            startPlayingSong();
        }
    };

    useEffect(() => {
        const pausePlayback = () => {
            if (!player) {
                return;
            }
            player.pause()
                .then(() => player.seek(0))
                .then(() => setMillisecondsElapsed(0))
                .then();
        };

        if (!playbackState) {
            return;
        }

        setMillisecondsElapsed(playbackState.position);
        props.setTrack(playbackState.track_window.current_track);

        if (!gameStarted && !playbackState.paused) {
            setGameStarted(true);
        }

        if (!playbackState.paused && playbackState.position >= props.playbackDuration * 1000) {
            pausePlayback();
        }
    }, [playbackState, props.playbackDuration, player, setMillisecondsElapsed, gameStarted, setGameStarted]);

    useEffect(() => {
        props.setPlaybackReady(webPlaybackSDKReady);
    }, [props.setPlaybackReady, webPlaybackSDKReady]);

    return (
        <>
            {webPlaybackSDKReady && (
                <div className="webPlayback">
                    <StreamingProgressBar millisecondsElapsed={millisecondsElapsed}/>
                    <button
                        className="playButton"
                        onClick={resumePlayback}
                    >
                        <PlayCircleOutlineOutlined fontSize='inherit'/>
                    </button>
                </div>
            )}
        </>
    );
};