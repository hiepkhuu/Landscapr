import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPhoto from './EditPhoto'

function EditPhotoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPhoto />
        </Modal>
      )}
    </>
  );
}

export default EditPhotoModal;
