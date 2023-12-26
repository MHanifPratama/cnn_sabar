'use client';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const TokenExpired = ({showTokenModal, setShowTokenModal}) => {

    const navigate = useNavigate()  

    return (
        <>
          <Modal show={showTokenModal} size="md" onClose={() => setShowTokenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Your Token is already expired, you need to login first.
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={() => {
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('username')
                    navigate('/login')
                    setShowTokenModal(false)
                    }}>
                    "Ok"
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
    )
}

export default TokenExpired