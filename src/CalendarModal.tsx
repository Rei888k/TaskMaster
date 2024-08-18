import { Button } from '@mui/material';
import { useState } from 'react';
import Modal from 'react-modal';
import { FETCH_UPDATETASK_REQUEST, fetchUpdateTaskRequest, settingCalendar } from './actions';
import { useDispatch } from 'react-redux';
import { DateCalendar } from '@mui/x-date-pickers';
import { UpdateTask } from './interface';
import { getCurrentTime } from './common';
import React from 'react';

Modal.setAppElement('#root');

interface CalendarModalProps {
    id: number | null
    date: Date | null
    disabled: boolean
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

function CalendarModal(props: CalendarModalProps) {
    const { id, date, disabled } = props
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [value, setValue] = useState<Date | null>(date);

    const dispatch = useDispatch()

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // はいボタン押下
    const handleOnYesClick = () => {
        if (id === null) {
            dispatch(settingCalendar(value))
        } else {
            const task: UpdateTask = {
                taskId: id,
                limitDate: value != null ? value.toLocaleDateString() : null,
                updateDate: getCurrentTime()
            }

            dispatch(fetchUpdateTaskRequest({ type: FETCH_UPDATETASK_REQUEST, updateTask: task }))
            // dispatch(updateDateButton(id, value != null ? value.toLocaleDateString() : null))
        }
        closeModal()
    }

    return (
        <div>
            <Button onMouseUp={openModal} disabled={disabled} variant='contained'>{date === null ? '期限なし' : date.toLocaleDateString()}</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                />
                <Button onClick={() => setValue(null)}>日付削除</Button>
                <Button onClick={handleOnYesClick}>はい</Button>
                <Button onClick={closeModal}>いいえ</Button>
            </Modal>
        </div>
    );
};

export default CalendarModal;