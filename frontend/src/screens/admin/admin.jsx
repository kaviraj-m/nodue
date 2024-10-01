import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginImage from "../../assets/logos.svg";
import Report from "../../components/admin/Report";
import Mapping from "../../components/admin/mapping";
import StaffMapping from "../../components/admin/StaffMapping";

export const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Reports");
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [staffDialogOpen, setStaffDialogOpen] = React.useState(false);
  const [staffDetails, setStaffDetails] = React.useState([]);
  const [newStaff, setNewStaff] = React.useState({
    department: "",
    semester: "",
    year: "",
    staffid: "",
    hodid: "",
    advicerid: "",
  });
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleTabClick = (tab) => () => {
    setActiveTab(tab);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    navigate("/");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleStaffDialogOpen = () => {
    setStaffDialogOpen(true);
  };

  const handleStaffDialogClose = () => {
    setStaffDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = () => {
    if (staffDetails.length < 5) {
      setStaffDetails((prev) => [...prev, newStaff]);
      setNewStaff({
        department: "",
        semester: "",
        year: "",
        staffid: "",
        hodid: "",
        advicerid: "",
      });
      handleStaffDialogClose();
    } else {
      alert("You can only add up to 5 staff details.");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#00796b", // Mild teal background
          color: "#ffffff",
        }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <img
            src={LoginImage}
            alt="Login Image"
            style={{ width: "15%", zIndex: theme.zIndex.drawer + 1 }}
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="notifications"
            sx={{
              color: "#ffffff",
              marginLeft: "auto",
            }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
            sx={{ marginLeft: 2 }}
          >
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={profileAnchorEl}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
            sx={{ mt: "45px" }}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen || isDesktop}
        onClose={!isDesktop ? toggleDrawer(false) : undefined}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#e0f2f1", // Mild background color
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        <List sx={{ pt: 8 }}>
          <ListItem
            button
            selected={activeTab === "Reports"}
            onClick={handleTabClick("Reports")}
            sx={{
              bgcolor:
                activeTab === "Reports"
                  ? theme.palette.action.selected
                  : "transparent",
            }}
          >
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem
            button
            selected={activeTab === "Mapping"}
            onClick={handleTabClick("Mapping")}
            sx={{
              bgcolor:
                activeTab === "Mapping"
                  ? theme.palette.action.selected
                  : "transparent",
            }}
          >
            <ListItemText primary="Mapping" />
          </ListItem>
          <ListItem
            button
            selected={activeTab === "StaffMapping"}
            onClick={handleTabClick("StaffMapping")}
            sx={{
              bgcolor:
                activeTab === "StaffMapping"
                  ? theme.palette.action.selected
                  : "transparent",
            }}
          >
            <ListItemText primary="Staff Mapping" />
          </ListItem>
        </List>
        <Divider />
        <List sx={{ mt: "auto" }}>
          <ListItem button onClick={handleLogoutClick}>
            <LogoutIcon sx={{ mr: 1 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <div
        style={{
          padding: isDesktop ? "80px 20px 20px 260px" : "80px 20px 20px 20px", // Adjust padding for desktop
          backgroundColor: "#f5f5f5", // Mild background color
          minHeight: "100vh",
        }}
      >
        {activeTab === "Reports" && <Report />}
        {activeTab === "Mapping" && <Mapping />}
        {activeTab === "StaffMapping" && <StaffMapping />}
      </div>

      <Dialog
        open={staffDialogOpen}
        onClose={handleStaffDialogClose}
        aria-labelledby="staff-dialog-title"
        aria-describedby="staff-dialog-description"
      >
        <DialogTitle id="staff-dialog-title">{"Add Staff Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="staff-dialog-description">
            Fill in the details to add a new staff member.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Department"
            name="department"
            value={newStaff.department}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Semester"
            name="semester"
            value={newStaff.semester}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Year"
            name="year"
            value={newStaff.year}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Staff ID"
            name="staffid"
            value={newStaff.staffid}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="HOD ID"
            name="hodid"
            value={newStaff.hodid}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Advicer ID"
            name="advicerid"
            value={newStaff.advicerid}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStaffDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStaff} color="primary">
            Add Staff
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
