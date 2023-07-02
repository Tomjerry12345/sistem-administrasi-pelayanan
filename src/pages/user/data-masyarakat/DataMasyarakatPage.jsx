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
  constantKecamatan,
  constantKelurahan,
  constantPisat,
  constantStatusKawin,
  constantTahun,
} from "values/Constant";
import "./style.scss";
import ModalNotif from "component/modal/ModalNotif";
import { DataGrid } from "@mui/x-data-grid";
import DialogConfirm from "component/modal/DialogConfirm";

const DataMasyarakatPage = () => {
  const { func, value } = PengusulanKisLogic();
  const { open, variant, message } = value.notif;

  const columns = [
    { field: "nik", headerName: "NIK", width: 150 },
    { field: "no_kk", headerName: "NoKK", width: 150 },
    { field: "nama", headerName: "Nama Lengkap", width: 180 },
    { field: "kecamatan", headerName: "Kecamatan", width: 200 },
    { field: "kelurahan", headerName: "Kelurahan", width: 200 },
    { field: "pisat", headerName: "PISAT", width: 150 },
    { field: "tempat_lahir", headerName: "Tempat Lahir", width: 150 },
    { field: "tanggal_lahir", headerName: "Tanggal Lahir", width: 150 },
    { field: "jenis_kelamin", headerName: "Jenis Kelamin", width: 150 },
    { field: "status_kawin", headerName: "Status Kawin", width: 150 },
    {
      field: "alamat",
      headerName: "Alamat Tempat Tinggal",
      width: 150,
    },
    { field: "kode_pos", headerName: "Kode Pos", width: 150 },
    { field: "rw", headerName: "RW", width: 150 },
    { field: "rt", headerName: "RT", width: 150 },
    { field: "no_telpon", headerName: "Nomor Telepon", width: 150 },
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
          pisat: row.pisat,
          tempat_lahir: row.tempat_lahir,
          tanggal_lahir: row.tanggal_lahir,
          jenis_kelamin: row.jenis_kelamin,
          status_kawin: row.status_kawin,
          alamat: row.alamat,
          rw: row.rw,
          rt: row.rt,
          kode_pos: row.kode_pos,
          kecamatan: row.kecamatan,
          kelurahan: row.kelurahan,
          no_telpon: row.no_telpon,
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

      <Stack sx={{ mb: 4, mt: 4 }} direction="horizontal">
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel id="filter_kecamatan">Kecamatan</InputLabel>
          <Select
            name="filter_kecamatan"
            labelId="filter_kecamatan"
            label="Kecamatan"
            onChange={func.onChangeFilter}
          >
            {constantKecamatan.map((kec) => (
              <MenuItem value={kec}>{kec}</MenuItem>
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
          >
            {constantBulan.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
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
          >
            {constantTahun.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>

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
  const { input, open, indexKecamatan } = value;
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
    pisat,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    status_kawin,
    alamat,
    rw,
    rt,
    kode_pos,
    kecamatan,
    kelurahan,
    no_telpon,
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
            <InputLabel>PISAT</InputLabel>
            <Select
              name="pisat"
              label="PISAT"
              onChange={(e) => onChange(e, 3, "input")}
              required
              value={pisat}
              error={onError(pisat)}
            >
              {constantPisat.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
            {onHelperText(pisat) ? (
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
            <InputLabel>Jenis Kelamin</InputLabel>
            <Select
              name="jenis_kelamin"
              label="Jenis Kelamin"
              onChange={(e) => onChange(e, 6, "input")}
              required
              value={jenis_kelamin}
              error={onError(jenis_kelamin)}
            >
              {constantJenisKelamin.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
            {onHelperText(pisat) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Status Kawin</InputLabel>
            <Select
              name="status_kawin"
              label="Status Kawin"
              onChange={(e) => onChange(e, 7, "input")}
              required
              value={status_kawin}
              error={onError(status_kawin)}
            >
              {constantStatusKawin.map((data) => (
                <MenuItem value={data}>{data}</MenuItem>
              ))}
            </Select>
            {onHelperText(status_kawin) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <TextField
            name="alamat"
            label="Alamat tempat tinggal"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 8, "input")}
            required
            value={alamat}
            error={onError(alamat)}
            helperText={onHelperText(alamat)}
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
            name="kode_pos"
            label="Kode pos"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 11, "input")}
            required
            value={kode_pos}
            error={onError(kode_pos)}
            helperText={onHelperText(kode_pos)}
          />

          <Stack className="custom-stack">
            <FormControl sx={{ ml: 1, minWidth: 200 }}>
              <InputLabel>Kecamatan</InputLabel>
              <Select
                name="kecamatan"
                label="Kecamatan"
                onChange={(e) => onChange(e, 12, "input")}
                required
                value={kecamatan}
                error={onError(kecamatan)}
              >
                {constantKecamatan.map((kec) => (
                  <MenuItem value={kec}>{kec}</MenuItem>
                ))}
              </Select>
              {onHelperText(kecamatan) ? (
                <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl sx={{ mr: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label">Kelurahan</InputLabel>
              <Select
                name="kelurahan"
                label="Kelurahan"
                onChange={(e) => onChange(e, 13, "input")}
                required
                value={kelurahan}
                error={onError(kelurahan)}
                disabled={indexKecamatan !== null ? false : true}
              >
                {indexKecamatan !== null
                  ? constantKelurahan !== undefined
                    ? constantKelurahan[indexKecamatan].map((kel) => (
                        <MenuItem value={kel}>{kel}</MenuItem>
                      ))
                    : null
                  : null}
              </Select>
              {onHelperText(kelurahan) ? (
                <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
              ) : null}
            </FormControl>
          </Stack>

          <TextField
            name="no_telpon"
            label="Nomor Telepon"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 14, "input")}
            required
            value={no_telpon}
            error={onError(no_telpon)}
            helperText={onHelperText(no_telpon)}
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
