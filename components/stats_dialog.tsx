import React, {useEffect, useState, VFC} from 'react';
import Modal from 'react-modal';
import {useCookies} from 'react-cookie';
import dynamic from 'next/dynamic';
import {OverallStats} from '../models/progress';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatsDialogProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const StatsDialog: VFC<StatsDialogProps> = (props: StatsDialogProps) => {
    const [cookies] = useCookies(['flordleProgress']);
    const [data, setData] = useState<number[]>([]);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [totalGuesses, setTotalGuesses] = useState(0);
    const [correctPercentage, setCorrectPercentage] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    const labelFormatter = (value: number, ) => {
        if (value === 0) {
            return '';
        }
        return value;
    };

    const graphOptions = {
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '75',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top',
                }
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            formatter: labelFormatter,
            style: {
                fontSize: '12px',
                colors: ['#dcd6f7ff']
            }
        },
        stroke: {
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['1°', '2°', '4°', '7°', '11°', '16°', 'x'],
            labels: {
                style: {
                    colors: '#dcd6f7ff',
                    fontFamily: 'Helvetica'
                },
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        fill: {
            opacity: 1,
            colors: ['#9683EA'],
            type: 'pattern',
            pattern: {
                style: 'horizontalLines',
                strokeWidth: 10,
                height: 7,
            }
        },
        grid: {
            show: false
        },
        chart: {
            toolbar: {
                show: false
            }
        },
        tooltip: {
            enabled: false
        },
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#09003b'
        },
    };

    useEffect(() => {
        const progress = cookies['flordleProgress'];
        if (progress) {
            const overallStats = progress.overallStats as OverallStats;
            setData([
                overallStats.guessesInOneSecond,
                overallStats.guessesInTwoSeconds,
                overallStats.guessesInFourSeconds,
                overallStats.guessesInSevenSeconds,
                overallStats.guessesInElevenSeconds,
                overallStats.guessesInSixteenSeconds,
                overallStats.failedGuesses
            ]);
            const correctGuesses = overallStats.guessesInOneSecond + overallStats.guessesInTwoSeconds
                + overallStats.guessesInFourSeconds + overallStats.guessesInSevenSeconds
                + overallStats.guessesInElevenSeconds + overallStats.guessesInSixteenSeconds;
            const totalGuesses = correctGuesses + overallStats.failedGuesses;

            setCorrectGuesses(correctGuesses);
            setTotalGuesses(totalGuesses);
            setCorrectPercentage(correctGuesses * 100 / totalGuesses);
            setCurrentStreak(overallStats.currentStreak);
            setMaxStreak(overallStats.maxStreak);
        }
    }, [cookies, setData, setCurrentStreak, setMaxStreak, setCorrectGuesses, setTotalGuesses, setCorrectPercentage]);

    return <Modal
        isOpen={props.isModalOpen}
        onRequestClose={props.closeModal}
        contentLabel="Stats"
        style={customStyles}
        closeTimeoutMS={2000}
    >
        <div className="statsModal">
            <h2 className="statsHeader">Stats</h2>
            <div className="chartContainer">
                <ReactApexChart  options={graphOptions} series={[{name: 'Guesses', data}]} type="bar" height={300} />
                <div className="chartTitle">Your score distribution</div>
            </div>
            <div className="summaryStatsSection">
                <div className="summaryStat">
                    <div className="headlineStat">{correctGuesses}/{totalGuesses}</div>
                    <div className="statExplanation">Correct</div>
                </div>
                <div className="summaryStat">
                    <div className="headlineStat">{correctPercentage}%</div>
                    <div className="statExplanation">Correct %</div>
                </div>
                <div className="summaryStat">
                    <div className="headlineStat">{currentStreak}:{maxStreak}</div>
                    <div className="statExplanation">Current : Max<br/>streak</div>
                </div>
            </div>
        </div>
    </Modal>;
};