import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, Dropdown } from "flowbite-react";

const SelectRuanganModal = ({showTokenModal, setShowTokenModal}) => {

    const [selectedRuangan, setSelectedRuangan] = useState('');
    const [ruanganData, setRuanganData] = useState([])

    useEffect(() => {
        const fetchRuanganData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/ruangan`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": token
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setRuanganData(result.data);
                } else {
                    throw new Error('Failed to fetch ruangan data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRuanganData();
    }, []);

    return (
        <Modal show={showTokenModal} size="md" onClose={() => setShowTokenModal(false)} popup>
            <div>
                <Label className="mb-2 block" htmlFor="ruangan" value="Ruangan" />
                <Dropdown style={{ width: '100%' }} label={selectedRuangan ? selectedRuangan : "Ruangan"} onSelect={(value) => setSelectedRuangan(value)} selected={selectedRuangan}>
                    {ruanganData.map((ruangan) => (
                        <Dropdown.Item key={ruangan.id} value={ruangan.id} onClick={() => {
                            setSelectedRuangan(ruangan.id)
                            sessionStorage.setItem('ruangan', {selectedRuangan})
                        }
                            }>
                            {ruangan.nama_ruangan}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
        </Modal>
    )
}

export default SelectRuanganModal