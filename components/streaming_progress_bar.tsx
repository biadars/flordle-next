import React, {useEffect, useState, VFC} from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

type Props = {
    secondsElapsed: number;
}
export const StreamingProgressBar: VFC<Props> = (props: Props) => {
    const secondMarks = [1, 2, 4, 7, 11, 16];
    const stepPositions = [6.25, 12.5, 25, 43.75, 68.75, 100];
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(props.secondsElapsed * 100 / 16);
    }, [props.secondsElapsed]);

    const renderStep = (secondMark: number) => {
        return <Step key={secondMark}>
            {() => (
                <div className='progressStep'>{secondMark}</div>
            )}
        </Step>;
    };

    return (
        <div className="streaming-progress-bar">
            <ProgressBar
                percent={progress}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                stepPositions={stepPositions}
            >
                {secondMarks.map(renderStep)}
            </ProgressBar>
        </div>
    );
};