import { Stack } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalNotif from "component/modal/ModalNotif";
import Logic from "./Logic";

const columns = [
  { field: "nama", headerName: "Nama", flex: 1 },
  { field: "jenis_pengajuan", headerName: "Jenis Pengajuan", flex: 1 },
  { field: "tanggal_lahir", headerName: "Tanggal Lahir", flex: 1 },
  { field: "tempat_lahir", headerName: "Tempat Lahir", flex: 1 },
];

const CekPermohonanPage = () => {
  const { value, func } = Logic();
  const { open, variant, message } = value.notif;
  return (
    <>
      <Typography variant="h5">Cek Permohonan</Typography>
      <Stack
        display="flex"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4, mt: 4 }}
      >
        <Stack display="flex" direction="column" alignItems="center">
          {/* <Button variant="outlined" onClick={func.onClickUpload}>
            Unggah Excell
          </Button> */}
          <input
            type="file"
            ref={value.inputUpload}
            style={{ display: "none" }}
            onChange={func.onChangeInputUpload}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          {false ? (
            <Typography color="error" sx={{ mt: 1 }}>
              File tidak support
            </Typography>
          ) : null}
        </Stack>

        <TextField
          name="filter_nik_kk"
          variant="outlined"
          label="Masukkan NIK / No. KK"
          onChange={func.onChangeFilter}
          onKeyDown={func.onSearch}
          type="number"
          value={value.filterNikKK}
          error={value.isError}
          helperText={value.isError ? "Inputan tidak boleh kurang dari 16 karakter" : null}
        />
      </Stack>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={value.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row["id"]}
        />
      </div>

      {/* modal */}
      <ModalNotif
        open={open}
        setOpen={value.setNotif}
        variant={variant}
        message={message}
        onSucces={func.resSucces}
      />
    </>
  );
};

export default CekPermohonanPage;
