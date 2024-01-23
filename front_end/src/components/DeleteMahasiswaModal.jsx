import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DeleteMahasiswaModal = ({ showDeleteModal, setShowDeleteModal, id, setUserData, userData }) => {
    const deleteDataEntry = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: token,
            },
          });
    
          if (response.ok) {
            const updatedUserData = userData.filter((data) => data.id !== id);
            setUserData(updatedUserData);
            setShowDeleteModal(false);
          } else {
            throw new Error('Failed to delete data');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <Modal show={showDeleteModal} size="md" onClose={() => setShowDeleteModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this entry?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={deleteDataEntry}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
}

export default DeleteMahasiswaModal