import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Box,
  Stack,
  Grid,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../assets/logos.svg";
import LoginImage from "../assets/login_image.svg";
import { login } from "../redux/authSlice"; // Import the login action

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use dispatch for Redux actions

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/getUser")
      .then((response) => {
        console.log("The response is", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching user data:",
          error.response ? error.response.data : error.message
        );
        console.log(error.message);
      });
  }, []);

  const handleLogin = () => {
    console.log("Backend values are", users);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const user = users.find(
      (u) => u.useremail === trimmedEmail && u.password === trimmedPassword
    );

    if (user) {
      dispatch(login(user)); // Dispatch login action

      switch (user.usertype) {
        case "student":
          navigate("/student-dashboard");
          break;
        case "staff":
          navigate("/authoritie-dashboard");
          break;
        case "COE":
          navigate("/coe-dashboard");
          break;
        case "admin":
          navigate("admin");
          break;
        default:
          navigate("/error");
          break;
      }
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e0f2f1", // Mild teal background
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "90%",
          px: 2,
          py: 4,
          width: "100%",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={LoginImage}
                alt="Login Image"
                style={{ maxWidth: "90%", borderRadius: "8px" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ width: "100%", maxWidth: 400, mx: "auto", p: 3, boxShadow: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <img src={Logo} alt="Logo" style={{ maxWidth: "80%" }} />
              </Box>
              <CardContent>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  <Typography variant="h4" color="#00796b">Login</Typography>
                </Stack>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff color="action" /> : <Visibility color="action" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                  sx={{ mt: 3, bgcolor: "#004d40", "&:hover": { bgcolor: "#00332d" } }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginPage;
