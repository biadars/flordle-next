import React, {useEffect, useState, VFC} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';


type Props = {
    secondsElapsed: number;
}
export const StreamingProgressBar: VFC<Props> = (props: Props) => {
    const secondMarks = [1, 2, 4, 7, 11, 16];
    const stepPositions = [6.25, 12.5, 25, 43.75, 68.75, 100];
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log(props.secondsElapsed * 100 / 16);
        setProgress(props.secondsElapsed * 100 / 16);
    }, [props.secondsElapsed]);

    const progressForBar = (index: number) => {
        const percentage = props.secondsElapsed * 100 / 16;
        const minimumForBar = index > 0 ? stepPositions[index - 1] : 0;
        const maximumForBar = stepPositions[index];
        if (index === 0) {
            return Math.min(percentage, maximumForBar);
        }
        return percentage > minimumForBar ? Math.min(percentage, maximumForBar) - minimumForBar : 0;
    };

    return (
        <div className="streaming-progress-bar">
            Current progress: {props.secondsElapsed * 100 /16}
            <ProgressBar>
                <ProgressBar variant="success" now={progressForBar(0)} key={0}/>
                <ProgressBar variant="info" now={progressForBar(1)} key={1}/>
                <ProgressBar variant="warning" now={progressForBar(2)} key={2}/>
                <ProgressBar variant="danger" now={progressForBar(3)} key={3}/>
                <ProgressBar variant="success" now={progressForBar(4)} key={4}/>
                <ProgressBar variant="info" now={progressForBar(5)} key={5}/>
            </ProgressBar>
        </div>
    );
};