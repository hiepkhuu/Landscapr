import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadPhotoForm from './UploadPhotoForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadPhotoForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
