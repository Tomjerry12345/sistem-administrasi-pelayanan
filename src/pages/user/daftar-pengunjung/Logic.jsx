import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseConfig from "config/FirebaseConfig";
import InputValidator from "values/InputValidator";
import { getMonthNow, getYearNow, log } from "values/Utilitas";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Logic = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    nik: "",
    no_kk: "",
    nama: "",
    jenis_layanan: "",
    pekerjaan: "",
    pendidikan: "",
    tanggal_lahir: "",
    lingkungan: "",
    jalan: "",
    rw: "",
    rt: "",
    no_hp: "",
    nama_petugas: "",
    jenis_pengunjung: "",
    bulan: getMonthNow(),
    tahun: getYearNow(),
  });

  const [data, setData] = useState([]);

  const [click, setClick] = useState(false);

  const [inputFilter, setInputFilter] = useState({
    filter_lingkungan: "",
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

  const validator = InputValidator(null, 14);

  const { addData, getData, multipleSearching, deleteSpecifict, updateDataDoc } =
    FirebaseConfig();

  const COLLECTION = "daftar-pengunjung";

  useEffect(() => {
    const {
      filter_lingkungan,
      filter_jenis_layanan,
      filter_nik_kk,
      filter_bulan,
      filter_tahun,
    } = inputFilter;

    if (
      filter_lingkungan !== "" ||
      filter_jenis_layanan !== "" ||
      filter_bulan !== "" ||
      filter_tahun !== "" ||
      filter_nik_kk !== ""
    ) {
      getAllDataFilter(
        "lingkungan",
        filter_lingkungan,
        "jenis_layanan",
        filter_jenis_layanan,
        "bulan",
        filter_bulan,
        "tahun",
        filter_tahun,
        "nik",
        filter_nik_kk
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
      // const kelengkapanBerkas = docData.kelengkapan_berkas;
      // const newKelengkapanBerkas = [];

      // for (const i in kelengkapanBerkas) {
      //   if (kelengkapanBerkas[i] === true) {
      //     newKelengkapanBerkas.push(i);
      //   }
      // }

      // delete docData.kelengkapan_berkas;
      listData.push({
        ...docData,
        // kelengkapan_berkas: newKelengkapanBerkas.toString(),
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
    validator.changeDefault();
    if (input.id !== undefined) {
      setInput({
        nik: "",
        no_kk: "",
        nama: "",
        jenis_layanan: "",
        pekerjaan: "",
        pendidikan: "",
        tanggal_lahir: "",
        lingkungan: "",
        jalan: "",
        rw: "",
        rt: "",
        no_hp: "",
        nama_petugas: "",
        jenis_pengunjung: "",
        bulan: getMonthNow(),
        tahun: getYearNow(),
      });
    }
    setOpen(false);
    setClick(false);
  };

  const onChange = (event, index, variant) => {
    const { name, value } = event.target;

    if (variant === "input") {
      validator.updateValid(value, index, name);

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
    validator.updateValid(value, 6);

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

      let cInput = {
        ...input,
        alamat: `${input.jalan} RT ${input.rt} RW ${input.rw} LINGK. ${input.lingkungan}`,
      };

      const res = await addData(COLLECTION, cInput);

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
    setInput(data);
    setOpen(true);
  };

  const onUbahDb = () => {
    validator.setTofalseValue(input);

    setClick(true);

    const valid = validator.checkNotValidAll();

    if (!valid) {
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
      let cInput = {
        ...input,
        alamat: `${input.jalan} RT ${input.rt} RW ${input.rw} LINGK. ${input.lingkungan}`,
      };
      await updateDataDoc(COLLECTION, input.id, cInput);
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
    handleClose();
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
      data,
      notif,
      setNotif,
      filterNik: inputFilter.filter_nik_kk,
      confirm,
    },
  };
};

export default Logic;
