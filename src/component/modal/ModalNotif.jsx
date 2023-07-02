import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import "./ModalNotif.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SetIcon = ({ variant }) =>
  variant === "success" ? (
    <CheckCircleOutlineOutlinedIcon className="custom-icon" color="success" />
  ) : (
    <CancelOutlinedIcon className="custom-icon" color="error" />
  );

const ModalNotif = ({ open, setOpen, message, variant, onSucces }) => {
  const handleClose = () =>
    setOpen({
      open: false,
      message: "",
      variant: "",
    });
  return (
    <Modal className="modal-notif" open={open} onClose={handleClose}>
      <Box className="custom-box" sx={style}>
        {variant === "progress" ? (
          <CircularProgress className="custom-icon" />
        ) : (
          <SetIcon variant={variant} />
        )}

        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        {variant === "progress" ? null : (
          <Button
            variant="outlined"
            sx={{ mt: 4 }}
            color={variant}
            onClick={variant === "success" ? onSucces : handleClose}
          >
            {variant === "success" ? "Lanjut" : "Kembali"}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default ModalNotif;
