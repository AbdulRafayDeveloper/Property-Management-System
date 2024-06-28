import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

function AddNotesModal({ open, handleClose }) {
	return (
		<Modal
			isOpen={open}
			toggle={() => {
				handleClose();
			}}
		>
            <ModalHeader>Add Notes</ModalHeader>
            <ModalBody>
                <div>
                    <textarea rows={5} className='form-control' placeholder='Add notes'></textarea>
                </div>
                <button className='btn btn-primary mt-3'>Add</button>
            </ModalBody>
        </Modal>
	);
}

export default AddNotesModal;
