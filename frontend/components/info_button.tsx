import React, {useState, VFC} from 'react';
import {InfoOutlined} from '@material-ui/icons';
import {InfoDialog} from './info_dialog';

export const InfoButton: VFC = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    return (<>

        <InfoDialog isModalOpen={isModalOpen} closeModal={() =>setModalOpen(false)}/>
        <button className="statsButton" onClick={() => setModalOpen(true)}>
            <InfoOutlined fontSize="inherit"/>
        </button>
    </>);
};