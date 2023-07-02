import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import ModalNotif from "component/modal/ModalNotif";
import { colorPrimary } from "values/Colors";
import Logic from "./Logic";
import "./style.scss";

const LoginPage = () => {
  const { func, value } = Logic();
  const { onError, onHelperText, onChange, disableButton } = func;
  const { input, notif, setNotif } = value;
  const { username, password } = input;

  return (
    <Box
      className="fullHeight"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "#d3d3d3",
      }}
    >
      <Card sx={{ width: "600px", padding: "150px 30px" }}>
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="h4" color={colorPrimary}>
            Masuk
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{
              marginotom: "16px",
            }}
          >
            Silahkan login terlebih dahulu
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <Stack
              spacing={3}
              sx={{
                width: "500px",
                marginTop: "30px",
              }}
            >
              <TextField
                name="username"
                value={username}
                onChange={(e) => onChange(e, 0)}
                error={onError(username)}
                helperText={onHelperText(username)}
                fullWidth
                required
                label="username"
              />
              <TextField
                name="password"
                value={password}
                onChange={(e) => onChange(e, 1)}
                error={onError(password)}
                helperText={onHelperText(password)}
                type={value.visiblePassword ? "password" : "text"}
                fullWidth
                required
                label="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={func.onSetVisible}
                        edge="end"
                      >
                        {value.visiblePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className="btn-login"
                variant="contained"
                onClick={func.onLogin}
                disabled={disableButton()}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>

      {/* modal */}
      <ModalNotif
        open={notif.open}
        setOpen={setNotif}
        variant={notif.variant}
        message={notif.message}
      />
    </Box>
  );
};

export default LoginPage;
