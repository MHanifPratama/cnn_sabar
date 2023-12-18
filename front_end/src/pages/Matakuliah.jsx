"use client";
import CustomSidebar from "../components/CustomSidebar";
import DeleteMatakuliahModal from "../components/DeleteMatakuliahModal";
import { Label, TextInput, Button, Modal, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import FieldRequirement from "../components/FieldRequirement";
import SuccessModal from "../components/SuccessModal";
import { GrSearch } from "react-icons/gr";
import TokenExpired from "../utils/TokenExpired";

const Matakuliah = () => {
   const [userData, setUserData] = useState([]);
   const [showAddModal, setShowAddModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [title, setTitle] = useState("");
   const [sks, setSKS] = useState("");
   const [kelas, setKelas] = useState("");
   const [search, setSearch] = useState("");
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [showFieldReqModal, setShowFieldReqModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
   const [showTokenModal, setShowTokenModal] = useState(false);

   const onCloseAddModal = () => {
      setShowAddModal(false);
      setTitle("");
      setSKS("");
      setKelas("");
   };

   const onCloseEditModal = () => {
      setShowEditModal(false);
      setTitle("");
      setSKS("");
      setKelas("");
   };

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: token,
               },
            });

            if (response.ok) {
               const result = await response.json();
               setUserData(result.data);
               if (result.message === "Invalid Token") {
                  setShowTokenModal(true);
               }
            } else {
               throw new Error("Failed to fetch data");
            }
         } catch (error) {
            console.error(error);
         }
      };

      fetchData();
   }, []);

   const matakuliahAddHandler = async () => {
      if (!title || !sks || !kelas) {
         setShowFieldReqModal(true);
      } else {
         try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: token,
               },
               body: JSON.stringify({
                  title: title,
                  sks: sks,
                  kelas: kelas,
               }),
            });

            if (response.ok) {
               const result = response.json();
               if (result.message === "Invalid Token") {
                  setShowTokenModal(true);
               } else {
                  setShowSuccessModal(true);
               }
            } else {
               throw new Error("Failed to fetch data");
            }
         } catch (error) {
            alert(error);
         }
      }
   };

   const matakuliahEditHandler = async () => {
      if (!title || !sks || !kelas) {
         setShowFieldReqModal(true);
      } else {
         try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/matakuliah/${selectedId}`, {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: token,
               },
               body: JSON.stringify({
                  title: title,
                  sks: sks,
                  kelas: kelas,
               }),
            });

            if (response.ok) {
               const result = response.json();
               if (result.message === "Invalid Token") {
                  setShowTokenModal(true);
               } else {
                  setShowSuccessModal(true);
               }
            } else {
               throw new Error("Failed to fetch data");
            }
         } catch (error) {
            alert(error);
         }
      }
   };

   return (
      <div className="flex dark:bg-gray-900">
         <CustomSidebar />

         <div className="w-full h-screen overflow-x-auto">
            <Modal show={showAddModal} size="md" onClose={onCloseAddModal} popup>
               <Modal.Header />
               <Modal.Body>
                  <div className="space-y-6">
                     <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Matakuliah</h3>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="title" value="TITLE" />
                        </div>

                        <TextInput
                           id="title"
                           placeholder="TITLE"
                           type="text"
                           onChange={(event) => {
                              const re = /^[0-9\b]+$/; // Regex pattern to allow only numbers
                              if (event.target.value === "" || re.test(event.target.value)) {
                                 setTitle(event.target.value);
                              }
                           }}
                           onKeyDown={(event) => {
                              const re = /^[0-9\b]+$/; // Regex pattern to allow only numbers
                              if (event.key !== "Backspace" && !re.test(event.key)) {
                                 event.preventDefault();
                              }
                           }}
                           required
                        />
                     </div>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="sks" value="Nama" />
                        </div>

                        <TextInput
                           id="sks"
                           type="text"
                           placeholder="Nama"
                           onChange={(event) => {
                              const enteredValue = event.target.value;
                              setSKS(enteredValue);
                           }}
                           pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                           required
                        />
                     </div>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="kelas" value="kelas" />
                        </div>

                        <TextInput id="kelas" placeholder="kelas" onChange={(event) => setKelas(event.target.value)} required />
                     </div>
                     <Button
                        disabled={!title || !sks || !kelas}
                        onClick={() => {
                           setShowAddModal(false);
                           matakuliahAddHandler();
                        }}
                     >
                        Add Matakuliah
                     </Button>
                  </div>
               </Modal.Body>
            </Modal>

            <Modal show={showEditModal} size="md" onClose={onCloseEditModal} popup>
               <Modal.Header />
               <Modal.Body>
                  <div className="space-y-6">
                     <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Edit Matakuliah</h3>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="title" value="TITLE" />
                        </div>
                        <TextInput
                           id="title"
                           placeholder="TITLE"
                           type="text"
                           onChange={(event) => {
                              const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                              if (event.target.value === "" || re.test(event.target.value)) {
                                 setTitle(event.target.value);
                              }
                           }}
                           onKeyDown={(event) => {
                              const re = /^[0-9]+$/; // Regex pattern to allow only numbers
                              if (event.key !== "Backspace" && !re.test(event.key)) {
                                 event.preventDefault();
                              }
                           }}
                           required
                        />
                     </div>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="sks" value="Nama" />
                        </div>
                        <TextInput id="sks" placeholder="Nama" onChange={(event) => setSKS(event.target.value)} required />
                     </div>
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="kelas" value="kelas" />
                        </div>
                        <TextInput id="kelas" type="kelas" placeholder="kelas" onChange={(event) => setKelas(event.target.value)} required />
                     </div>
                     <Button
                        disabled={!title || !sks || !kelas}
                        onClick={() => {
                           setShowEditModal(false);
                           matakuliahEditHandler();
                        }}
                     >
                        Edit Matakuliah
                     </Button>
                  </div>
               </Modal.Body>
            </Modal>

            <div className="flex max-w-md m-7 justify-between items-center relative">
               <div className="mb-2 block flex-grow">
                  <Label className="text-xl" htmlFor="base" value="Search Matakuliah" />
                  <TextInput placeholder="search" rightIcon={GrSearch} className="mt-2" id="base" type="text" sizing="md" onChange={(e) => setSearch(e.target.value)} />
               </div>
               <div className="absolute right-0" style={{ left: "250%" }}>
                  <Button onClick={() => setShowAddModal(true)} className="p-3 rounded-full text-white">
                     +
                  </Button>
               </div>
            </div>

            <div className="m-auto ml-7 overflow-x-auto overflow-y-auto" style={{ height: "78%", width: "95%" }}>
               <Table hoverable style={{ width: "100%", borderCollapse: "collapse" }}>
                  <Table.Head className="sticky top-0 z-10 bg-cyan-600">
                     <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: "30%" }}>
                        TITLE
                     </Table.HeadCell>
                     <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: "30%" }}>
                        SKS
                     </Table.HeadCell>
                     <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white" style={{ width: "30%" }}>
                        kelas
                     </Table.HeadCell>
                     <Table.HeadCell className="dark:bg-cyan-600 bg-cyan-600 text-white flex item-center" style={{ width: "10%" }}>
                        Action
                     </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                     {userData &&
                        userData
                           .filter((data) => {
                              return search.toLowerCase() === "" ? data : data.sks.toLowerCase().includes(search);
                           })
                           .map((data) => (
                              <Table.Row key={data.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: "30%" }}>
                                    {data.title}
                                 </Table.Cell>
                                 <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" style={{ width: "30%" }}>
                                    {data.sks}
                                 </Table.Cell>
                                 <Table.Cell style={{ width: "30%" }}>{data.kelas}</Table.Cell>
                                 <Table.Cell style={{ width: "10%" }}>
                                    <a
                                       onClick={() => {
                                          setShowEditModal(true);
                                          setSelectedId(data.id);
                                       }}
                                       className="font-medium text-cyan-600 hover:cursor-pointer dark:text-cyan-500"
                                    >
                                       Edit
                                    </a>
                                    <a
                                       onClick={() => {
                                          setShowDeleteModal(true);
                                          setSelectedId(data.id);
                                       }}
                                       className="ml-5 font-medium text-cyan-600 hover:cursor-pointer dark:text-cyan-500"
                                    >
                                       Delete
                                    </a>
                                 </Table.Cell>
                              </Table.Row>
                           ))}
                  </Table.Body>
               </Table>
            </div>
         </div>

         <>
            <SuccessModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
            <FieldRequirement showFieldReqModal={showFieldReqModal} setShowFieldReqModal={setShowFieldReqModal} />
            <DeleteMatakuliahModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} id={selectedId} setUserData={setUserData} userData={userData} />
            <TokenExpired showTokenModal={showTokenModal} setShowTokenModal={setShowTokenModal} />
         </>
      </div>
   );
};

export default Matakuliah;