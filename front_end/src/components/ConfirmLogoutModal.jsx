'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const ConfirmLogoutModal = ({ showModal, setShowModal }) => {

  const navigate = useNavigate()

  return (
    <>
      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={ () => {
                setShowModal(false)
                sessionStorage.removeItem('user-info')
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('status')
                sessionStorage.removeItem('username')
                navigate('/login')
                } }>
                Yes, i'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmLogoutModal
