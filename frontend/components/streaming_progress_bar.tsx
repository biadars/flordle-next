import React, {useEffect, useState, VFC} from 'react';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

type Props = {
    millisecondsElapsed: number;
}
export const StreamingProgressBar: VFC<Props> = (props: Props) => {
    const secondMarks = [1, 2, 4, 7, 11];
    const stepPositions = [6.25, 12.5, 25, 43.75, 68.75];
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (props.millisecondsElapsed === 0) {
            setProgress(0);
        } else {
            setProgress(props.millisecondsElapsed / 1000 * 100 / 16 + 3);
        }
    }, [props.millisecondsElapsed]);

    const renderStep = (secondMark: number) => {
        return <Step key={secondMark}>
            {() => (
                <div className='progressStep'></div>
            )}
        </Step>;
    };

    return (
        <div className="streaming-progress-bar">
            <ProgressBar
                percent={progress}
                unfilledBackground="#dcd6f7ff"
                filledBackground="linear-gradient(to right, #717fe3, #956fc7)"
                stepPositions={stepPositions}
            >
                {secondMarks.map(renderStep)}
            </ProgressBar>
        </div>
    );
};