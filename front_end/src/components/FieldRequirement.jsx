import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const FieldRequirement = ({ showFieldReqModal, setShowFieldReqModal}) => {
    return (
        <Modal show={showFieldReqModal} size="md" onClose={() => setShowFieldReqModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Please fill in all fields!
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setShowFieldReqModal(false)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default FieldRequirement