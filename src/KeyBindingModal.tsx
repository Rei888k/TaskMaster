import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import Modal from 'react-modal';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import React from 'react';

Modal.setAppElement('#root');

// interface KeyBindingModalProps {
//     id: number | null
//     date: Date | null
// }

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

function createData(
    explanation: string,
    keybinding: string,
) {
    return { explanation, keybinding };
}

const rows = [
    createData('タスクを追加する', 'Enter'),
    createData('タスクを続けて追加する', 'Ctrl + Enter'),
];

function KeyBindingModal() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);


    return (
        <div>
            <IconButton onMouseUp={openModal}>
                <KeyboardIcon />
            </IconButton>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <h2>ショートカットキー一覧</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: '30vw' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>説明</TableCell>
                                <TableCell>入力キー</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.explanation}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.explanation}
                                    </TableCell>
                                    <TableCell>{row.keybinding}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end'}} ><Button onClick={closeModal}>閉じる</Button></Grid>
            </Modal>
        </div>
    );
};

export default KeyBindingModal;