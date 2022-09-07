import React, {useEffect, useState, VFC} from 'react';
import Modal from 'react-modal';
import {useCookies} from 'react-cookie';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface StatsDialogProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const StatsDialog: VFC<StatsDialogProps> = (props: StatsDialogProps) => {
    const [cookies] = useCookies(['flordleProgress']);
    const [series, setSeries] = useState({name: 'Guesses', data: []});

    const options = {
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
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
                height: 7
            }
        },
        grid: {
            show: false
        },
        chart: {
            toolbar: {
                show: false
            }
        }
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
        const stats = Object.values(cookies['flordleProgress']?.overallStats ?? {});
        console.log(stats);
    }, [cookies]);

    return <Modal
        isOpen={props.isModalOpen}
        onRequestClose={props.closeModal}
        contentLabel="Stats"
        style={customStyles}
        closeTimeoutMS={2000}
    >
        <div className="statsModal">
            <h2 className="statsHeader">Stats</h2>
            <ReactApexChart  options={options} series={series} type="bar" height={350} />
        </div>
    </Modal>;
};