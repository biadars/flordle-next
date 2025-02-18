import React, {VFC} from 'react';
import Modal from 'react-modal';
import {CloseOutlined} from '@material-ui/icons';

interface Props {
    isModalOpen: boolean;
    closeModal: () => void;
}
export const InfoDialog: VFC<Props> = (props: Props) => {
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

    return <Modal
        isOpen={props.isModalOpen}
        onRequestClose={props.closeModal}
        contentLabel="Info"
        style={customStyles}
        closeTimeoutMS={2000}
    >
        <div>
            <div className="statsHeader">
                <span className="headerText">ABOUT</span>
                <button className="closeButton" onClick={props.closeModal}><CloseOutlined fontSize="inherit"/></button>
            </div>
            <div className="infoModal">
                <div className="infoContainer">
                    Each daily flordle features a clip from a Hozier or Florence and the Machine song.
                </div>
                <div className="infoContainer">
                    Guess in as few tries as possible, and come back the next day for a new song.
                </div>
            </div>
        </div>
    </Modal>;
};