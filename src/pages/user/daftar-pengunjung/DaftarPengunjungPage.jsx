import { Stack } from "@mui/system";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Logic from "./Logic";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  constantBulan,
  constantJenisLayanan,
  constantLingkungan,
  constantTahun,
} from "values/Constant";
import "./style.scss";
import ModalNotif from "component/modal/ModalNotif";
import { DataGrid } from "@mui/x-data-grid";
import DialogConfirm from "component/modal/DialogConfirm";

const DaftarPengunjungPage = () => {
  const { func, value } = Logic();
  const { open, variant, message } = value.notif;

  const columns = [
    { field: "jenis_pengunjung", headerName: "Jenis kunjungan", width: 150 },
    { field: "nik", headerName: "NIK", width: 160 },
    { field: "no_kk", headerName: "NoKK", width: 160 },
    { field: "nama", headerName: "Nama Pengunjung", width: 180 },
    { field: "jenis_layanan", headerName: "Jenis Layanan", width: 250 },
    { field: "pekerjaan", headerName: "Pekerjaan", width: 150 },
    { field: "pendidikan", headerName: "Pendidikan", width: 150 },
    { field: "tanggal_lahir", headerName: "Tanggal Lahir", width: 150 },
    { field: "alamat", headerName: "Alamat", width: 350 },
    { field: "no_hp", headerName: "No Hp", width: 150 },
    {
      field: "action",
      headerName: "Aksi",
      align: "center",
      headerAlign: "center",
      editable: false,
      sortable: false,
      filterable: false,
      disableColumnMenu: false,
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        const row = params.row;

        // let newKel = {
        //   kartu_keluarga: false,
        //   ktp: false,
        //   kks: false,
        //   kis: false,
        //   sktm_desa_kelurahan: false,
        //   domisili: false,
        //   foto_kondisi_rumah: false,
        // };

        // if (typeof row.kelengkapan_berkas === "string") {
        //   const split = row.kelengkapan_berkas.split(",");

        //   split.forEach((val) => {
        //     newKel[val] = true;
        //   });
        // } else {
        //   newKel = row.kelengkapan_berkas;
        // }

        const data = {
          nik: row.nik,
          no_kk: row.no_kk,
          nama: row.nama,
          jenis_layanan: row.jenis_layanan,
          pekerjaan: row.pekerjaan,
          pendidikan: row.pendidikan,
          tanggal_lahir: row.tanggal_lahir,
          lingkungan: row.lingkungan,
          jalan: row.jalan,
          rw: row.rw,
          rt: row.rt,
          no_hp: row.no_hp,
          jenis_pengunjung: row.jenis_pengunjung,
          id: row.id,
          bulan: row.bulan,
          tahun: row.tahun,
        };
        return (
          <Stack direction="row" spacing={2}>
            <Button color="success" variant="outlined" onClick={(e) => func.onUbah(e, data)}>
              Ubah
            </Button>
            <Button color="error" variant="outlined" onClick={(e) => func.onHapus(e, id)}>
              Hapus
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h5">Daftar Pengunjung</Typography>

      <Stack sx={{ mb: 4, mt: 4 }} direction="row">
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel id="filter_lingkungan">Lingkungan</InputLabel>
          <Select
            name="filter_lingkungan"
            labelId="filter_lingkungan"
            label="Lingkungan"
            onChange={func.onChangeFilter}
            defaultValue=""
          >
            {constantLingkungan.map((e, i) => (
              <MenuItem key={i} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 170, mr: 2 }}>
          <InputLabel id="filter_jenis_layanan">Jenis layanan</InputLabel>
          <Select
            name="filter_jenis_layanan"
            labelId="filter_jenis_layanan"
            label="Jenis layanan"
            onChange={func.onChangeFilter}
            defaultValue=""
          >
            {constantJenisLayanan.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 170, mr: 2 }}>
          <InputLabel id="filter_bulan">Bulan</InputLabel>
          <Select
            name="filter_bulan"
            labelId="filter_bulan"
            label="Bulan"
            onChange={func.onChangeFilter}
            defaultValue=""
          >
            {constantBulan.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 170 }}>
          <InputLabel id="filter_tahun">Tahun</InputLabel>
          <Select
            name="filter_tahun"
            labelId="filter_tahun"
            label="Tahun"
            onChange={func.onChangeFilter}
            defaultValue=""
          >
            {constantTahun.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack alignItems="flex-end" style={{ width: "100vw" }}>
          <TextField
            name="filter_nik_kk"
            variant="outlined"
            label="Masukkan NIK"
            onChange={func.onChangeFilter}
          />
        </Stack>
      </Stack>

      <ShowData value={value} columns={columns} />

      <TambahData func={func} value={value} />

      <Stack flexDirection="row" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          style={{ color: "white" }}
          onClick={() => func.downloadExcell(value.data)}
        >
          Unduh Data
        </Button>
        <Button
          variant="contained"
          style={{ color: "white" }}
          onClick={() => func.handleClickOpen()}
        >
          Tambah Data
        </Button>
      </Stack>

      {/* modal */}
      <ModalNotif
        open={open}
        setOpen={value.setNotif}
        variant={variant}
        message={message}
        onSucces={func.resSucces}
      />

      <DialogConfirm
        open={value.confirm.open}
        message={value.confirm.message}
        onSucces={func.onSuccesConfirm}
        onClose={func.onCloseConfirm}
      />
    </>
  );
};

const ShowData = ({ value, columns }) => (
  <div style={{ height: 400, width: "100%" }}>
    <DataGrid
      rows={value.data}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      getRowId={(row) => row["id"]}
    />
  </div>
);

const TambahData = ({ func, value }) => {
  const { input, open } = value;
  const {
    onError,
    onHelperText,
    disableButton,
    onChange,
    onTambah,
    handleClose,
    onChangeDate,
    onUbahDb,
  } = func;
  const {
    nik,
    no_kk,
    nama,
    jenis_layanan,
    pekerjaan,
    pendidikan,
    tanggal_lahir,
    lingkungan,
    jalan,
    rw,
    rt,
    no_hp,
    nama_petugas,
    jenis_pengunjung,
  } = input;
  return (
    <Dialog open={open} onClose={handleClose} className="custom-dialog-tambah-data">
      <Stack alignItems="center">
        <DialogTitle>Tambah Data</DialogTitle>
      </Stack>

      <DialogContent
        sx={{
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "550px" },
          }}
        >
          <TextField
            name="nik"
            label="NIK"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 0, "input")}
            required
            value={nik}
            error={onError(nik, "nik")}
            helperText={onHelperText(nik, "nik")}
          />

          <TextField
            name="no_kk"
            label="No.KK"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 1, "input")}
            required
            value={no_kk}
            error={onError(no_kk, "no_kk")}
            helperText={onHelperText(no_kk, "no_kk")}
          />

          <TextField
            name="nama"
            label="Nama pengunjung"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 2, "input")}
            required
            value={nama}
            error={onError(nama)}
            helperText={onHelperText(nama)}
          />

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Jenis layanan</InputLabel>
            <Select
              name="jenis_layanan"
              label="Jenis layanan"
              onChange={(e) => onChange(e, 3, "input")}
              required
              value={jenis_layanan}
              error={onError(jenis_layanan)}
            >
              {constantJenisLayanan.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {onHelperText(jenis_layanan) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="pekerjaan"
            label="Pekerjaan"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 4, "input")}
            required
            value={pekerjaan}
            error={onError(pekerjaan)}
            helperText={onHelperText(pekerjaan)}
          />

          <TextField
            name="pendidikan"
            label="Pendidikan terakhir"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 5, "input")}
            required
            value={pendidikan}
            error={onError(pendidikan)}
            helperText={onHelperText(pendidikan)}
          />

          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Tanggal lahir"
              value={tanggal_lahir}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={onError(tanggal_lahir)}
                  helperText={onHelperText(tanggal_lahir)}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Lingkungan</InputLabel>
            <Select
              name="lingkungan"
              label="Lingkungan"
              defaultValue=""
              onChange={(e) => onChange(e, 7, "input")}
              required
              value={lingkungan}
              error={onError(lingkungan)}
            >
              {constantLingkungan.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {onHelperText(lingkungan) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="jalan"
            label="Nama jalan"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 8, "input")}
            required
            value={jalan}
            error={onError(jalan)}
            helperText={onHelperText(jalan)}
          />

          <Stack className="custom-stack">
            <TextField
              name="rw"
              label="RW"
              type="number"
              variant="outlined"
              onChange={(e) => onChange(e, 9, "input")}
              required
              value={rw}
              error={onError(rw)}
              helperText={onHelperText(rw)}
            />

            <TextField
              name="rt"
              label="RT"
              type="number"
              variant="outlined"
              onChange={(e) => onChange(e, 10, "input")}
              required
              value={rt}
              error={onError(rt)}
              helperText={onHelperText(rt)}
            />
          </Stack>

          <TextField
            name="no_hp"
            label="No HP"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 11, "input")}
            required
            value={no_hp}
            error={onError(no_hp)}
            helperText={onHelperText(no_hp)}
          />

          <TextField
            name="jenis_pengunjung"
            label="Jenis kunjungan"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 12, "input")}
            value={jenis_pengunjung}
            error={onError(jenis_pengunjung, "jenis_pengunjung")}
            helperText={onHelperText(jenis_pengunjung, "jenis_pengunjung")}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          mt: 2,
        }}
      >
        <Button className="cancel-btn" variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="succes-btn"
          variant="contained"
          onClick={input.id === undefined ? onTambah : onUbahDb}
          disabled={disableButton()}
        >
          {input.id === undefined ? "Tambah" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DaftarPengunjungPage;
