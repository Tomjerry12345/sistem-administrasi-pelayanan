import FirebaseConfig from "config/FirebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "values/Utilitas";

const Logic = () => {
  const [input, setInput] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_pengajuan: "",
  });

  const [notif, setNotif] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const { addData } = FirebaseConfig();
  const navigate = useNavigate();

  const COLLECTION = "cek-permohonan";
  const COLLECTION_PENGUNJUNG = "pengunjung";

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeDate = (value) => {
    const format = value.format("L");

    setInput({
      ...input,
      tanggal_lahir: format,
    });
  };

  const onTambah = async () => {
    try {
      setNotif({
        open: true,
        message: "Sedang di proses...",
        variant: "progress",
      });

      const res = await addData(COLLECTION, input);
      await addData(COLLECTION_PENGUNJUNG, input);

      if (res) {
        setNotif({
          open: true,
          message: "Data berhasil di tambahkan",
          variant: "success",
        });

        navigate(0);
      } else
        setNotif({
          open: true,
          message: "Data gagal di tambahkan",
          variant: "error",
        });
    } catch (e) {
      log({ e });
    }
  };

  return {
    value: {
      input,
      notif,
    },
    func: {
      onChange,
      onChangeDate,
      onTambah,
      setNotif,
    },
  };
};

export default Logic;
