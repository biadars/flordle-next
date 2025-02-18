import React, {VFC, useCallback} from 'react';
import {WebPlaybackSDK} from 'react-spotify-web-playback-sdk';
import {LimitedDurationPlayback} from './limited_duration_playback';

type Props = {
  token: string;
  playbackDuration: number;
  setTrack: (value: Spotify.Track) => void;
  setPlaybackReady: (value: boolean) => void;
};

export const WebPlaybackWrapper: VFC<Props> = (props: Props) => {
    const getAccessToken = useCallback(callback => callback(props.token), []);

    return (
        <>
            <WebPlaybackSDK
                initialDeviceName='flordle'
                getOAuthToken={getAccessToken}
                initialVolume={1}>
                <LimitedDurationPlayback playbackDuration={props.playbackDuration} setTrack={props.setTrack} setPlaybackReady={props.setPlaybackReady}/>
            </WebPlaybackSDK>
        </>
    );
};
