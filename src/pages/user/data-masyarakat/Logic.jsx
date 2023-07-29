import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseConfig from "config/FirebaseConfig";
import InputValidator from "values/InputValidator";
import { getMonthNow, getYearNow } from "values/Utilitas";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const Logic = () => {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    no_kk: "",
    nik: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    hubungan_keluarga: "",
    pekerjaan: "",
    pendidikan: "",
    lingkungan: "",
    jalan: "",
    rw: "",
    rt: "",
    status_kawin: "",
    nama_ayah: "",
    nama_ibu: "",
    tahun: getYearNow(),
    bulan: getMonthNow(),
  });

  const [inputFilter, setInputFilter] = useState({
    filter_lingkungan: "",
    filter_bulan: "",
    filter_tahun: "",
    filter_nik_kk: "",
  });

  const [data, setData] = useState([]);

  const [click, setClick] = useState(false);

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

  const COLLECTION = "data-masyarakat";

  useEffect(() => {
    const { filter_lingkungan, filter_bulan, filter_tahun, filter_nik_kk } = inputFilter;

    if (
      filter_lingkungan !== "" ||
      filter_bulan !== "" ||
      filter_tahun !== "" ||
      filter_nik_kk !== ""
    ) {
      getAllDataFilter(
        "lingkungan",
        filter_lingkungan,
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
      listData.push(docData);
    });
    setData(listData);
  };

  const getAllDataFilter = async (key, value, key1, value1, key2, value2, key3, value3) => {
    let snapshot;

    snapshot = await multipleSearching(
      COLLECTION,
      key,
      value,
      key1,
      value1,
      key2,
      value2,
      key3,
      value3
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
        no_kk: "",
        nik: "",
        nama: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
        hubungan_keluarga: "",
        pekerjaan: "",
        pendidikan: "",
        lingkungan: "",
        jalan: "",
        rw: "",
        rt: "",
        status_kawin: "",
        nama_ayah: "",
        nama_ibu: "",
        tahun: getYearNow(),
        bulan: getMonthNow(),
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

  const onChangeDate = (value) => {
    validator.updateValid(value, 5);

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
      } else {
        setNotif({
          open: true,
          message: "Data gagal di tambahkan",
          variant: "error",
        });
      }
    }
  };

  const resSucces = () => {
    navigate(0);
  };

  const onError = (value, key) => (click ? validator.checkNotValid(value, key) : null);

  const onHelperText = (value, key) => (click ? validator.messageNotValid(value, key) : null);

  const disableButton = () => (click ? !validator.checkNotValidAll() : null);

  const downloadExcell = async (datax) => {
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
    FileSaver.saveAs(data, COLLECTION + fileExtension);
  };

  const onChangeFilter = (event) => {
    const { name, value } = event.target;
    setInputFilter({
      ...inputFilter,
      [name]: value,
    });
  };

  const onUbah = (e, data) => {
    e.stopPropagation(); // don't select this row after clicking

    setInput(data);
    setOpen(true);
  };

  const onUbahDb = () => {
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
    let massege;
    if (confirm.variant === "edit") {
      let cInput = {
        ...input,
        alamat: `${input.jalan} RT ${input.rt} RW ${input.rw} LINGK. ${input.lingkungan}`,
      };
      await updateDataDoc(COLLECTION, input.id, cInput);
      massege = "Data berhasil di ubah";
      handleClose();
    } else {
      await deleteSpecifict(COLLECTION, id);
      massege = "Data berhasil di hapus";
      onCloseConfirm();
    }

    setNotif({
      open: true,
      message: massege,
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
      onError,
      onHelperText,
      disableButton,
      onChange,
      onChangeDate,
      onTambah,
      resSucces,
      downloadExcell,
      onChangeFilter,
      onUbah,
      onHapus,
      onSuccesConfirm,
      onCloseConfirm,
      onUbahDb,
    },
    value: {
      open,
      input,
      notif,
      data,
      filterNik: inputFilter.filter_nik_kk,
      confirm,
    },
  };
};

export default Logic;
