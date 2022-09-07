import React, {useState, VFC} from 'react';
import {BarChartOutlined} from '@material-ui/icons';
import {StatsDialog} from './stats_dialog';

export const StatsButton: VFC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (<>

        <StatsDialog isModalOpen={isModalOpen} closeModal={() => setModalOpen(false)}/>
        <button className="statsButton" onClick={() => setModalOpen(true)}>
            <BarChartOutlined fontSize="inherit"/>
        </button>
    </>);
};