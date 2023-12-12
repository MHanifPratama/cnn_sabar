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
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import { Flowbite } from 'flowbite-react';

const App = () => {

  return (
    <div className="App">
      <Flowbite>
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
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </Flowbite>
    </div>
  );
}

export default App;