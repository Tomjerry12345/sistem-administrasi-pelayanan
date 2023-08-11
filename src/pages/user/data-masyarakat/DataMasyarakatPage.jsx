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
import PengusulanKisLogic from "./Logic";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  constantBulan,
  constantJenisKelamin,
  constantHubunganKeluarga,
  constantStatusKawin,
  constantTahun,
  constantLingkungan,
} from "values/Constant";
import "./style.scss";
import ModalNotif from "component/modal/ModalNotif";
import { DataGrid } from "@mui/x-data-grid";
import DialogConfirm from "component/modal/DialogConfirm";

const DataMasyarakatPage = () => {
  const { func, value } = PengusulanKisLogic();
  const { open, variant, message } = value.notif;

  const columns = [
    { field: "nik", headerName: "NIK", width: 160 },
    { field: "no_kk", headerName: "NoKK", width: 160 },
    { field: "nama", headerName: "Nama Lengkap", width: 180 },
    { field: "jenis_kelamin", headerName: "Jenis Kelamin", width: 150 },
    { field: "tempat_lahir", headerName: "Tempat Lahir", width: 150 },
    { field: "tanggal_lahir", headerName: "Tanggal Lahir", width: 150 },
    { field: "hubungan_keluarga", headerName: "Hubungan Keluarga", width: 150 },
    { field: "pekerjaan", headerName: "Pekerjaan", width: 150 },
    { field: "pendidikan", headerName: "Pendidikan terakhir", width: 150 },
    {
      field: "alamat",
      headerName: "Alamat Tempat Tinggal",
      width: 350,
    },
    { field: "no_hp", headerName: "No HP", width: 150 },
    { field: "status_kawin", headerName: "Status Kawin", width: 150 },
    {
      field: "action",
      headerName: "Action",
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

        const data = {
          no_kk: row.no_kk,
          nik: row.nik,
          nama: row.nama,
          jenis_kelamin: row.jenis_kelamin,
          tempat_lahir: row.tempat_lahir,
          tanggal_lahir: row.tanggal_lahir,
          hubungan_keluarga: row.hubungan_keluarga,
          pekerjaan: row.pekerjaan,
          pendidikan: row.pendidikan,
          alamat: row.alamat,
          lingkungan: row.lingkungan,
          jalan: row.jalan,
          rw: row.rw,
          rt: row.rt,
          status_kawin: row.status_kawin,
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
      <Typography variant="h5" sx={{ mb: 4 }}>
        Data Masyarakat
      </Typography>

      <Stack sx={{ mb: 4, mt: 4 }} direction="row">
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel id="filter_lingkungan">Lingkungan</InputLabel>
          <Select
            name="filter_lingkungan"
            labelId="filter_lingkungan"
            label="lingkungan"
            defaultValue=""
            onChange={func.onChangeFilter}
          >
            {constantLingkungan.map((e, i) => (
              <MenuItem key={i} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl sx={{ minWidth: 170, mr: 2 }}>
          <InputLabel id="filter_bulan">Bulan</InputLabel>
          <Select
            name="filter_bulan"
            labelId="filter_bulan"
            label="Bulan"
            defaultValue=""
            onChange={func.onChangeFilter}
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
            defaultValue=""
            onChange={func.onChangeFilter}
          >
            {constantTahun.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Stack alignItems="flex-end" style={{ width: "100vw" }}>
          <TextField
            name="filter_nik_kk"
            variant="outlined"
            label="Masukkan NIK"
            value={value.filterNik}
            onChange={func.onChangeFilter}
          />
        </Stack>
      </Stack>

      <ShowData value={value} columns={columns} />

      <TambahData value={value} func={func} />

      <Stack flexDirection="row" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          style={{ color: "white" }}
          onClick={() => func.downloadExcell(value.data)}
        >
          Unduh Data
        </Button>
        <Button variant="contained" style={{ color: "white" }} onClick={func.handleClickOpen}>
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
      getRowId={(row) => row["nik"]}
    />
  </div>
);

const TambahData = ({ value, func }) => {
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
    no_kk,
    nik,
    nama,
    tempat_lahir,
    jenis_kelamin,
    tanggal_lahir,
    hubungan_keluarga,
    pekerjaan,
    pendidikan,
    lingkungan,
    jalan,
    rw,
    rt,
    no_hp,
    status_kawin,
    nama_ayah,
    nama_ibu,
  } = input;
  return (
    <Dialog className="custom-dialog-tambah-data" open={open} onClose={handleClose}>
      <Stack alignItems="center">
        <DialogTitle>{input.id === undefined ? "Tambah Data" : "Edit Data"}</DialogTitle>
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
            name="no_kk"
            label="No.KK"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 0, "input")}
            required
            value={no_kk}
            error={onError(no_kk, "no_kk")}
            helperText={onHelperText(no_kk, "no_kk")}
          />

          <TextField
            name="nik"
            label="NIK"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 1, "input")}
            required
            value={nik}
            error={onError(nik, "nik")}
            helperText={onHelperText(nik, "nik")}
          />

          <TextField
            name="nama"
            label="Nama lengkap"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 2, "input")}
            required
            value={nama}
            error={onError(nama)}
            helperText={onHelperText(nama)}
          />

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Jenis Kelamin</InputLabel>
            <Select
              name="jenis_kelamin"
              label="Jenis Kelamin"
              defaultValue=""
              onChange={(e) => onChange(e, 3, "input")}
              required
              value={jenis_kelamin}
              error={onError(jenis_kelamin)}
            >
              {constantJenisKelamin.map((data, i) => (
                <MenuItem key={i} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {onHelperText(jenis_kelamin) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="tempat_lahir"
            label="Tempat lahir"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 4, "input")}
            required
            value={tempat_lahir}
            error={onError(tempat_lahir)}
            helperText={onHelperText(tempat_lahir)}
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
            <InputLabel>Hubungan Keluarga</InputLabel>
            <Select
              name="hubungan_keluarga"
              label="Hubungan Keluarga"
              defaultValue=""
              onChange={(e) => onChange(e, 6, "input")}
              required
              value={hubungan_keluarga}
              error={onError(hubungan_keluarga)}
            >
              {constantHubunganKeluarga.map((value, i) => (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {onHelperText(hubungan_keluarga) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="pekerjaan"
            label="Pekerjaan"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 7, "input")}
            required
            value={pekerjaan}
            error={onError(pekerjaan)}
            helperText={onHelperText(pekerjaan)}
          />

          <TextField
            name="pendidikan"
            label="Pendidikan"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 8, "input")}
            required
            value={pendidikan}
            error={onError(pendidikan)}
            helperText={onHelperText(pendidikan)}
          />

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Lingkungan</InputLabel>
            <Select
              name="lingkungan"
              label="Lingkungan"
              defaultValue=""
              onChange={(e) => onChange(e, 9, "input")}
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
            onChange={(e) => onChange(e, 10, "input")}
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
              onChange={(e) => onChange(e, 11, "input")}
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
              onChange={(e) => onChange(e, 12, "input")}
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
            onChange={(e) => onChange(e, 13, "input")}
            required
            value={no_hp}
            error={onError(no_hp)}
            helperText={onHelperText(no_hp)}
          />

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Status Kawin</InputLabel>
            <Select
              name="status_kawin"
              label="Status Kawin"
              defaultValue=""
              onChange={(e) => onChange(e, 14, "input")}
              required
              value={status_kawin}
              error={onError(status_kawin)}
            >
              {constantStatusKawin.map((data, i) => (
                <MenuItem key={i} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            {onHelperText(status_kawin) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="nama_ayah"
            label="Nama ayah"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 15, "input")}
            required
            value={nama_ayah}
            error={onError(nama_ayah)}
            helperText={onHelperText(nama_ayah)}
          />

          <TextField
            name="nama_ibu"
            label="Nama ibu"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 16, "input")}
            required
            value={nama_ibu}
            error={onError(nama_ibu)}
            helperText={onHelperText(nama_ibu)}
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

export default DataMasyarakatPage;
