'use client';

import { Button, Modal } from 'flowbite-react';
import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const ConfirmLoginModal = ({ showModal, setShowModal }) => {

  const navigate = useNavigate()

  return (
    <>
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Login Successful!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={ () => {
                setShowModal(false)
                navigate('/')
                } }>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmLoginModal
