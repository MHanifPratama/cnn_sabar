'use client';

import { Button, Modal } from 'flowbite-react';
import { HiExclamation } from "react-icons/hi";

const ErrorModal = ({ openModal, setOpenModal }) => {

  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Error Occured
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={ () => setOpenModal(false) }>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ErrorModal
