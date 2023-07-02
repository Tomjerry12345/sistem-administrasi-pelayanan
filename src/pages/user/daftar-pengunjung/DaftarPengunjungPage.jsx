import { Stack } from "@mui/system";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  constantKelengkapanBerkas,
  constantKelurahan,
  constantTahun,
} from "values/Constant";
import { constantKecamatan } from "values/Constant";
import "./style.scss";
import ModalNotif from "component/modal/ModalNotif";
import { DataGrid } from "@mui/x-data-grid";
import DialogConfirm from "component/modal/DialogConfirm";

const DaftarPengunjungPage = () => {
  const { func, value } = Logic();
  const { open, variant, message } = value.notif;

  const columns = [
    { field: "nik", headerName: "NIK", width: 150 },
    { field: "no_kk", headerName: "NoKK", width: 150 },
    { field: "nama", headerName: "Nama Pengunjung", width: 180 },
    { field: "kecamatan", headerName: "Kecamatan", width: 200 },
    { field: "kelurahan", headerName: "Kelurahan", width: 200 },
    { field: "jenis_layanan", headerName: "Jenis Layanan", width: 150 },
    { field: "no_telpon", headerName: "No telepon", width: 150 },
    { field: "nama_petugas", headerName: "Nama Petugas", width: 150 },
    { field: "tanggal_lahir", headerName: "Tanggal Lahir", width: 150 },
    { field: "alamat", headerName: "Alamat", width: 150 },
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

        const newKel = {
          kartu_keluarga: false,
          ktp: false,
          kks: false,
          kis: false,
          sktm_desa_kelurahan: false,
          domisili: false,
          foto_kondisi_rumah: false,
        };

        const split = row.kelengkapan_berkas.split(",");

        split.forEach((val) => {
          newKel[val] = true;
        });

        const data = {
          nama_petugas: row.nama_petugas,
          nama: row.nama,
          no_kk: row.no_kk,
          nik: row.nik,
          kelurahan: row.kelurahan,
          kecamatan: row.kecamatan,
          alamat: row.alamat,
          no_telpon: row.no_telpon,
          jenis_layanan: row.jenis_layanan,
          kelengkapan_berkas: newKel,
          tanggal_lahir: row.tanggal_lahir,
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
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 120,
    //   renderCell: renderDetailsButton,
    //   disableClickEventBubbling: true,
    // },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
  ];

  return (
    <>
      <Typography variant="h5">Daftar Pengunjung</Typography>

      <Stack sx={{ mb: 4, mt: 4 }} direction="horizontal">
        <FormControl sx={{ mr: 2, minWidth: 150 }}>
          <InputLabel id="filter_kecamatan">Kecamatan</InputLabel>
          <Select
            name="filter_kecamatan"
            labelId="filter_kecamatan"
            label="Kecamatan"
            onChange={func.onChangeFilter}
          >
            {constantKecamatan.map((kec, i) => (
              <MenuItem key={i} value={kec}>
                {kec}
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
      getRowId={(row) => row["nik"]}
    />
  </div>
);

const TambahData = ({ func, value }) => {
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
    nama_petugas,
    nama,
    no_kk,
    nik,
    kelurahan,
    kecamatan,
    alamat,
    no_telpon,
    jenis_layanan,
    kelengkapan_berkas,
    tanggal_lahir,
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
            name="nama_petugas"
            label="Nama Petugas"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 0, "input")}
            required
            value={nama_petugas}
            // error={onError(nama_petugas)}
            // helperText={onHelperText(nama_petugas)}
          />

          <TextField
            name="nama"
            label="Nama pengunjung"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 1, "input")}
            required
            value={nama}
            error={onError(nama)}
            helperText={onHelperText(nama)}
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
          <TextField
            name="no_kk"
            label="No.KK"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 2, "input")}
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
            onChange={(e) => onChange(e, 3, "input")}
            required
            value={nik}
            error={onError(nik, "nik")}
            helperText={onHelperText(nik, "nik")}
          />
          <Stack className="custom-stack-kecamatan-kelurahan">
            <FormControl sx={{ ml: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-label">Kecamatan</InputLabel>
              <Select
                name="kecamatan"
                label="Kecamatan"
                onChange={(e) => onChange(e, 4, "input")}
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
                onChange={(e) => onChange(e, 5, "input")}
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
            name="alamat"
            label="Alamat tempat tinggal"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e, 6, "input")}
            required
            value={alamat}
            error={onError(alamat)}
            helperText={onHelperText(alamat)}
          />

          <TextField
            name="no_telpon"
            label="Nomor Telepon"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e, 7, "input")}
            required
            value={no_telpon}
            error={onError(no_telpon)}
            helperText={onHelperText(no_telpon)}
          />

          <FormControl className="custom-select" fullWidth>
            <InputLabel>Jenis layanan</InputLabel>
            <Select
              name="jenis_layanan"
              label="Jenis layanan"
              onChange={(e) => onChange(e, 8, "input")}
              required
              value={jenis_layanan}
              error={onError(jenis_layanan)}
            >
              {constantJenisLayanan.map((value) => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
            {onHelperText(jenis_layanan) ? (
              <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
            ) : null}
          </FormControl>

          <Typography
            sx={{
              mt: 3,
              ml: 2,
              fontWeight: 600,
            }}
          >
            Kelengkapan berkas
          </Typography>

          <Stack
            className="custom-stack-kelengkapan-berkas"
            direction="horizontal"
            justifyContent="space-between"
          >
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {constantKelengkapanBerkas[0].map((value) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={kelengkapan_berkas[value.name]}
                          onChange={(e) => onChange(e, 9, "checkbox")}
                          name={value.name}
                        />
                      }
                      label={value.label}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                {constantKelengkapanBerkas[1].map((value) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={kelengkapan_berkas[value.name]}
                          onChange={(e) => onChange(e, 9, "checkbox")}
                          name={value.name}
                        />
                      }
                      label={value.label}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>
          </Stack>
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
