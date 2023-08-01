import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { constantJenisLayanan } from "values/Constant";
import "./style.scss";
import Logic from "./Logic";
import ModalNotif from "component/modal/ModalNotif";

const PermohonanPengunjungPage = () => {
  const { value, func } = Logic();
  const { nama, tempat_lahir, no_hp, tanggal_lahir, jenis_pengajuan } = value.input;
  const { open, variant, message } = value.notif;
  const { onChange, onChangeDate, onTambah, setNotif } = func;
  return (
    <Box
      className="permohonan-pengunjung-root"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "#d3d3d3",
      }}
    >
      <Card sx={{ width: "360px", padding: "16px" }}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Typography
            variant="h6"
            sx={{
              mb: "16px",
            }}
          >
            ISI FORMULIR
          </Typography>
          <TextField
            name="nama"
            label="Nama"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e)}
            required
            value={nama}
            fullWidth
          />
          <TextField
            name="tempat_lahir"
            label="Tempat lahir"
            type="text"
            variant="outlined"
            onChange={(e) => onChange(e)}
            required
            value={tempat_lahir}
            fullWidth
          />

          <TextField
            name="no_hp"
            label="No HP"
            type="number"
            variant="outlined"
            onChange={(e) => onChange(e)}
            required
            value={no_hp}
            fullWidth
          />

          <LocalizationProvider
            dateAdapter={AdapterMoment}
            style={{
              width: "100%",
              marginTop: "8px",
            }}
          >
            <DatePicker
              label="Tanggal lahir"
              value={tanggal_lahir}
              onChange={onChangeDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={false}
                  //   helperText={onHelperText(tanggal_lahir)}
                />
              )}
            />
          </LocalizationProvider>

          <FormControl
            fullWidth
            sx={{
              mt: "8px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Jenis pengajuan</InputLabel>
            <Select
              name="jenis_pengajuan"
              label="Jenis pengajuan"
              onChange={(e) => onChange(e, 4, "input")}
              required
              value={jenis_pengajuan}
              // error={onError(kecamatan)}
            >
              {constantJenisLayanan.map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
            {/* {onHelperText(kecamatan) ? (
                <FormHelperText sx={{ color: "red" }}>Form harus di isi</FormHelperText>
              ) : null} */}
          </FormControl>

          <Stack sx={{ mt: 8 }}>
            <Button
              className="succes-btn"
              variant="contained"
              onClick={onTambah}
              //   disabled={disableButton()}
            >
              Ajukan permohonan
            </Button>
          </Stack>
        </Box>
      </Card>

      <ModalNotif
        open={open}
        setOpen={setNotif}
        variant={variant}
        message={message}
        onSucces={func.resSucces}
      />
    </Box>
  );
};

export default PermohonanPengunjungPage;
