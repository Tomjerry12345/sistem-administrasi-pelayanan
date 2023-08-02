import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "pages/App";
import LoginPage from "pages/autentikasi/login/LoginPage";
import MainUserPage from "pages/user/MainUserPage";
import CekPermohonanPage from "pages/user/cek-permohonan/CekPermohonanPage";
import DaftarPengunjungPage from "pages/user/daftar-pengunjung/DaftarPengunjungPage";
import DataMasyarakatPage from "pages/user/data-masyarakat/DataMasyarakatPage";
import PermohonanPengunjungPage from "pages/pengunjung/permohonan-pengunjung/PermohonanPengunjungPage";

const RoutersConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ajukan-permohonan" element={<PermohonanPengunjungPage />} />
        <Route path="user" element={<MainUserPage />}>
          <Route index element={<CekPermohonanPage />} />
          <Route path="daftar-pengunjung" element={<DaftarPengunjungPage />} />
          <Route path="data-masyarakat" element={<DataMasyarakatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutersConfig;
