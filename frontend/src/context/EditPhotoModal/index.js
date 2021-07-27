import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPhoto from './EditPhoto'

function EditPhotoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-photo-button btn'onClick={() => setShowModal(true)}>Edit Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPhoto />
        </Modal>
      )}
    </>
  );
}

export default EditPhotoModal;
