/* eslint-disable no-unused-vars */
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Menu,
  Box,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ApprovalStatus from "../../components/student/approvalStatus";
import RequestForm from "../../components/student/requestForm";
import LoginImage from "../../assets/logos.svg";

export const StudentDashboard = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("Status");
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
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

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#00796b", // Mild teal background
          color: "white",
          height: "64px", // Ensure AppBar height is consistent
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
            alt="Logo"
            style={{ width: "120px", marginRight: "auto" }} // Adjust size for consistency
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="notifications"
            sx={{ color: "white", marginLeft: "auto" }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
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

      {!isDesktop && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: 240,
            flexShrink: 0,
            zIndex: theme.zIndex.drawer,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#e0f2f1", // Mild background color
            },
          }}
        >
          <List sx={{ pt: 8 }}>
            <ListItem
              button
              selected={activeTab === "Status"}
              onClick={handleTabClick("Status")}
              sx={{
                bgcolor:
                  activeTab === "Status"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Status" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Request Form"}
              onClick={handleTabClick("Request Form")}
              sx={{
                bgcolor:
                  activeTab === "Request Form"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Request Form" />
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
      )}

      {isDesktop && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={true}
          sx={{
            width: 240,
            flexShrink: 0,
            zIndex: theme.zIndex.drawer,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: "#e0f2f1", // Mild background color
            },
          }}
        >
          <List sx={{ pt: 8 }}>
            <ListItem
              button
              selected={activeTab === "Status"}
              onClick={handleTabClick("Status")}
              sx={{
                bgcolor:
                  activeTab === "Status"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Status" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Request Form"}
              onClick={handleTabClick("Request Form")}
              sx={{
                bgcolor:
                  activeTab === "Request Form"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Request Form" />
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
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px", // Ensure content starts below the AppBar
          marginLeft: { xs: 0, md: "240px" }, // Shift content based on Drawer width
          backgroundColor: "#fafafa", // Light background for content area
        }}
      >
        {activeTab === "Status" && <ApprovalStatus />}
        {activeTab === "Request Form" && <RequestForm />}
      </Box>

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

export default StudentDashboard;
