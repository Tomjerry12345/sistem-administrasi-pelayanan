import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseConfig from "config/FirebaseConfig";
import { constantKecamatan } from "values/Constant";
import InputValidator from "values/InputValidator";
import { getMonthNow, getYearNow } from "values/Utilitas";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Logic = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    nama_petugas: "",
    nama: "",
    no_kk: "",
    nik: "",
    kelurahan: "",
    kecamatan: "",
    alamat: "",
    no_telpon: "",
    jenis_layanan: "",
    kelengkapan_berkas: {
      kartu_keluarga: false,
      ktp: false,
      kks: false,
      kis: false,
      sktm_desa_kelurahan: false,
      domisili: false,
      foto_kondisi_rumah: false,
    },
    tanggal_lahir: "",
    bulan: getMonthNow(),
    tahun: getYearNow(),
  });

  const [data, setData] = useState([]);

  const [click, setClick] = useState(false);

  const [indexKecamatan, setIndexKecamatan] = useState(null);

  const [inputFilter, setInputFilter] = useState({
    filter_kecamatan: "",
    filter_jenis_layanan: "",
    filter_nik_kk: "",
    filter_bulan: "",
    filter_tahun: "",
  });

  const [notif, setNotif] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const [confirm, setConfirm] = useState({
    open: false,
    message: "",
    variant: "",
  });

  const [id, setId] = useState("");

  const navigate = useNavigate();

  const validator = InputValidator(null, 10);

  const { addData, getData, multipleSearching, deleteSpecifict, updateDataDoc } =
    FirebaseConfig();

  const COLLECTION = "daftar-pengunjung";
  const COLLECTION_DATA_MASYARAKAT = "data-masyarakat";

  useEffect(() => {
    const {
      filter_jenis_layanan,
      filter_nik_kk,
      filter_kecamatan,
      filter_bulan,
      filter_tahun,
    } = inputFilter;

    if (
      filter_tahun !== "" ||
      filter_bulan !== "" ||
      filter_nik_kk !== "" ||
      filter_kecamatan !== "" ||
      filter_jenis_layanan !== ""
    ) {
      getAllDataFilter(
        "tahun",
        filter_tahun,
        "bulan",
        filter_bulan,
        "nik",
        filter_nik_kk,
        "kecamatan",
        filter_kecamatan,
        "jenis_layanan",
        filter_jenis_layanan
      );
    } else {
      getAllData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputFilter]);

  const getAllData = async () => {
    const snapshot = await getData(COLLECTION);
    let listData = [];

    snapshot.forEach((doc) => {
      const docData = doc.data();
      const kelengkapanBerkas = docData.kelengkapan_berkas;
      const newKelengkapanBerkas = [];

      for (const i in kelengkapanBerkas) {
        if (kelengkapanBerkas[i] === true) {
          newKelengkapanBerkas.push(i);
        }
      }

      delete docData.kelengkapan_berkas;
      listData.push({
        ...docData,
        kelengkapan_berkas: newKelengkapanBerkas.toString(),
      });
    });
    setData(listData);
  };

  const getAllDataFilter = async (
    key,
    value,
    key1,
    value1,
    key2,
    value2,
    key3,
    value3,
    key4,
    value4
  ) => {
    const snapshot = await multipleSearching(
      COLLECTION,
      key,
      value,
      key1,
      value1,
      key2,
      value2,
      key3,
      value3,
      key4,
      value4
    );

    let listData = [];

    snapshot.forEach((doc) => {
      const docData = doc.data();
      listData.push(docData);
    });

    setData(listData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (input.id !== undefined) {
      setInput({
        nama_petugas: "",
        nama: "",
        no_kk: "",
        nik: "",
        kelurahan: "",
        kecamatan: "",
        alamat: "",
        no_telpon: "",
        jenis_layanan: "",
        kelengkapan_berkas: {
          kartu_keluarga: false,
          ktp: false,
          kks: false,
          kis: false,
          sktm: false,
          domisili: false,
          foto_kondisi_rumah: false,
        },
        tanggal_lahir: "",
        bulan: getMonthNow(),
        tahun: getYearNow(),
      });
    }
    setOpen(false);
  };

  const onChange = (event, index, variant) => {
    const { name, value, checked } = event.target;

    if (variant === "input") {
      validator.updateValid(value, index, name);

      if (name === "kecamatan") {
        let index = constantKecamatan.indexOf(value);
        setIndexKecamatan(index);
      }

      if (name === "no_kk" || name === "nik") {
        if (value.length <= 16) {
          setInput({
            ...input,
            [name]: value,
          });
        }
      } else {
        setInput({
          ...input,
          [name]: value,
        });
      }
    } else if (variant === "checkbox") {
      validator.updateValid("true", index);
      setInput({
        ...input,
        kelengkapan_berkas: {
          ...input.kelengkapan_berkas,
          [name]: checked,
        },
      });
    }
  };

  const onChangeFilter = (event) => {
    const { name, value } = event.target;
    setInputFilter({
      ...inputFilter,
      [name]: value,
    });
  };

  const onChangeDate = (value) => {
    validator.updateValid(value, 10);

    const format = value.format("L");

    setInput({
      ...input,
      tanggal_lahir: format,
    });
  };

  const onTambah = async (e) => {
    setClick(true);

    const valid = validator.checkNotValidAll();

    if (valid) {
      setNotif({
        open: true,
        message: "Sedang di proses...",
        variant: "progress",
      });

      const res = await addData(COLLECTION, input);

      if (input.jenis_layanan === "Usulan KIS") {
        await addData(COLLECTION_DATA_MASYARAKAT, input);
      }

      if (res) {
        setNotif({
          open: true,
          message: "Data berhasil di tambahkan",
          variant: "success",
        });
      } else
        setNotif({
          open: true,
          message: "Data gagal di tambahkan",
          variant: "error",
        });
    }
  };

  const resSucces = () => {
    navigate(0);
  };

  const onError = (value, key) => (click ? validator.checkNotValid(value, key) : null);

  const onHelperText = (value, key) => (click ? validator.messageNotValid(value, key) : null);

  const disableButton = () => (click ? !validator.checkNotValidAll() : null);

  const downloadExcell = async (datax, fileName) => {
    datax.forEach((val) => {
      delete val.id;
    });

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(datax);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excellBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excellBuffer], { type: fileType });
    FileSaver.saveAs(data, "daftar-pengunjung" + fileExtension);
  };

  const onUbah = (e, data) => {
    e.stopPropagation();
    let index = constantKecamatan.indexOf(data.kecamatan);
    setIndexKecamatan(index);
    setInput(data);
    setOpen(true);
  };

  const onUbahDb = () => {
    console.log("input", input);

    validator.setTofalseValue(input);

    setClick(true);

    const valid = validator.checkNotValidAll();

    if (valid) {
      setOpen(false);
      onOpenConfirm("Apakah anda yakin ingin mengubah data ini?", "edit");
    }
  };

  const onHapus = (e, id) => {
    e.stopPropagation(); // don't select this row after clicking
    setId(id);
    onOpenConfirm("Apakah anda yakin ingin menghapus?", "delete");
  };

  const onOpenConfirm = (message, variant) => {
    setConfirm({
      open: true,
      message: message,
      variant: variant,
    });
  };

  const onSuccesConfirm = async () => {
    let message;
    if (confirm.variant === "edit") {
      await updateDataDoc(COLLECTION, input.id, input);
      message = "Data berhasil di ubah";
      handleClose();
    } else {
      await deleteSpecifict(COLLECTION, id);
      message = "Data berhasil di hapus";
      onCloseConfirm();
    }

    setNotif({
      open: true,
      message: message,
      variant: "success",
    });
  };

  const onCloseConfirm = () => {
    setConfirm({
      open: false,
      message: "",
    });
  };

  return {
    func: {
      handleClickOpen,
      handleClose,
      onChange,
      onTambah,
      onError,
      onHelperText,
      disableButton,
      onChangeDate,
      resSucces,
      onChangeFilter,
      downloadExcell,
      onUbah,
      onHapus,
      onSuccesConfirm,
      onCloseConfirm,
      onUbahDb,
    },
    value: {
      open,
      input,
      indexKecamatan,
      data,
      notif,
      setNotif,
      filterNik: inputFilter.filter_nik_kk,
      confirm,
    },
  };
};

export default Logic;
