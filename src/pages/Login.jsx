import React from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../axios";
import { useAuth } from "../AuthContext";
import logo from "../shanti_transparencia.png";
import "../Components/estructura/css/inicio.css";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const defaultTheme = createTheme();

export default function Login() {
  const { setUser, csrfToken } = useAuth();
  const [error, setError] = React.useState(null);
  const [errorEmail, setErrorEmail] = React.useState(null);
  const [errorPass, setErrorPass] = React.useState(null);

  // login user
  const handleSubmit = async (e) => {
    setError(null);
    setErrorEmail(null);
    setErrorPass(null);
    e.preventDefault();
    const { email, password } = e.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
    await csrfToken();
    try {
      const resp = await axios.post("/login", body);
      if (resp.status === 200) {
        setUser(resp.data.user);
        return <Navigate to="/profile" />;
      }
    } catch (error) {
      if (error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        if (error.response.data.errors.email) {
          setErrorEmail(error.response.data.errors.email[0]);
        } else {
          setErrorEmail("");
        }
        if (error.response.data.errors.password) {
          setErrorPass(error.response.data.errors.password[0]);
        } else {
          setErrorPass("");
        }
      }
    }
  };

  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: 120, height: 120 }}
              src={logo}
              variant="rounded"
            />
            <br />
            <Typography component="h1" variant="h5">
              Iniciar Sesion
            </Typography>
            {error && (
              <Alert severity="error">
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                helperText={errorEmail}
                error={errorEmail ? true : false}
                margin="normal"
                type="email"
                required
                fullWidth
                id="email"
                label="Ingrese su correo electronico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                helperText={errorPass}
                error={errorPass ? true : false}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Ingrese su contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesion
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
