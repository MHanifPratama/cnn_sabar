import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const EditMatakuliahModal = ({ showEditModal, setshowEditModal, id, setUserData, userData }) => {
    const editDataEntry = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/mahasiswa/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: token,
            },
          });
    
          if (response.ok) {
            const updatedUserData = userData.filter((data) => data.id !== id);
            setUserData(updatedUserData);
            setshowEditModal(false);
          } else {
            throw new Error('Failed to GET data');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      return (
        <Modal show={showEditModal} size="md" onClose={() => setshowEditModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to GET this entry?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={editDataEntry}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setshowEditModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
}


export default EditMatakuliahModal