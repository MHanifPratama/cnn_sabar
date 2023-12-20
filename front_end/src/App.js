<<<<<<< HEAD
import './App.css';
import Login from './pages/Login';
import Dosen from './pages/Dosen';
import Register from './pages/Register';
import Absensi from './pages/Absensi';
import Kelas from './pages/Kelas';
import Mahasiswa from './pages/Mahasiswa';
import Ruangan from './pages/Ruangan';
import PrivateRoutes from './utils/PrivateRoutes';
import Periode from './pages/Periode';
import MataKuliah from './pages/MataKuliah';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
=======
import "./App.css";
import Login from "./pages/Login";
import Dosen from "./pages/Dosen";
import Register from "./pages/Register";
import Absensi from "./pages/Absensi";
import Kelas from "./pages/Kelas";
import Mahasiswa from "./pages/Mahasiswa";
import Ruangan from "./pages/Ruangan";
import PrivateRoutes from "./utils/PrivateRoutes";
import Periode from "./pages/Periode";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
>>>>>>> 258ee40c613d6054b863ba0a266c05632fc03ff3
import { Routes, Route } from "react-router-dom";
import { Flowbite } from "flowbite-react";
import Matakuliah from "./pages/Matakuliah";

const App = () => {
   return (
      <Flowbite>
         <div className="App">
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />

<<<<<<< HEAD
  return (
    <Flowbite>
    <div className="App">
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/absensi" element={<Absensi />} />
            <Route path="/dosen" element={<Dosen />} />
            <Route path="/mahasiswa" element={<Mahasiswa />} />
            <Route path="/kelas" element={<Kelas />} />
            <Route path="/periode" element={<Periode />} />
            <Route path="/ruangan" element={<Ruangan />} />
            <Route path="/matakuliah" element={<MataKuliah />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
    </div>
    </Flowbite>
  );
}
=======
               <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/absensi" element={<Absensi />} />
                  <Route path="/dosen" element={<Dosen />} />
                  <Route path="/mahasiswa" element={<Mahasiswa />} />
                  <Route path="/kelas" element={<Kelas />} />
                  <Route path="/periode" element={<Periode />} />
                  <Route path="/ruangan" element={<Ruangan />} />
                  <Route path="/matakuliah" element={<Matakuliah />} />
                  <Route path="*" element={<NotFound />} />
               </Route>
            </Routes>
         </div>
      </Flowbite>
   );
};
>>>>>>> 258ee40c613d6054b863ba0a266c05632fc03ff3

export default App;
