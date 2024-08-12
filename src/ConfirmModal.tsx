import { Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FETCH_DELETETASK_REQUEST, fetchDeleteTaskRequest } from './actions';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

Modal.setAppElement('#root');

interface ConfirmModalProps {
    id: string | null
    buttonName: string
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function ConfirmModal(props: ConfirmModalProps) {
    const { id, buttonName } = props
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch()

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // 削除ボタン押下
    const handleOnYesClick = () => {
        if (buttonName === '削除') {
            // dispatch(deleteButton(id))
            dispatch(fetchDeleteTaskRequest({ type: FETCH_DELETETASK_REQUEST, taskId: id }))
        }

        closeModal()
    }

    return (
        <div>
            <IconButton onMouseUp={openModal}>
                <DeleteIcon />
            </IconButton>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <h2>本当に{buttonName}しますか？</h2>
                <Button onClick={handleOnYesClick}>はい</Button>
                <Button onClick={closeModal}>いいえ</Button>
            </Modal>
        </div>
    );
};

export default ConfirmModal;