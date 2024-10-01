// import { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   AppBar,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   useTheme,
//   Divider,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Person as PersonIcon,
//   Notifications as NotificationsIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext"; // Import the authentication context
// import StatusComponent from "../../components/coe/statusComponent.jsx";
// import FormEnableComponent from "../../components/coe/formEnable.jsx";
// import LoginImage from "../../assets/logos.svg";
// import { StudentStatus } from "../../components/coe/studentStatus.jsx";

// export const COEDashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Status");
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   const isProfileMenuOpen = Boolean(profileAnchorEl);
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
//   const navigate = useNavigate();
//   const { logout } = useAuth(); // Use logout function from context

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const handleTabClick = (tab) => () => {
//     setActiveTab(tab);
//   };

//   const handleProfileMenuOpen = (event) => {
//     setProfileAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setProfileAnchorEl(null);
//   };

//   const handleLogoutClick = () => {
//     setLogoutDialogOpen(true);
//   };

//   const handleLogoutConfirm = () => {
//     logout();
//     navigate("/");
//   };

//   const handleLogoutCancel = () => {
//     setLogoutDialogOpen(false);
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//         <Toolbar className="toolbar">
//           {!isDesktop && (
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer(true)}
//               sx={{ marginRight: 2 }}
//               className="menuButton"
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <img
//             src={LoginImage}
//             alt="Login Image"
//             style={{ zIndex: theme.zIndex.drawer + 1, width: "15%" }}
//           />
//           <Typography variant="h6" className="title">
//             COE Dashboard
//           </Typography>
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="notifications"
//             sx={{
//               color: "black",
//               zIndex: theme.zIndex.drawer + 1,
//               marginLeft: "70%",
//             }}
//           >
//             <NotificationsIcon />
//           </IconButton>
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="profile"
//             onClick={handleProfileMenuOpen}
//             sx={{
//               marginLeft: 0,
//               marginRight: 8,
//               color: "black",
//               zIndex: theme.zIndex.drawer + 1,
//             }}
//           >
//             <PersonIcon />
//           </IconButton>
//           <Menu
//             anchorEl={profileAnchorEl}
//             open={isProfileMenuOpen}
//             onClose={handleProfileMenuClose}
//             sx={{ mt: "45px" }}
//           >
//             <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
//             <MenuItem onClick={handleProfileMenuClose}>My Account</MenuItem>
//             <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//         {isDesktop && (
//           <Drawer
//             variant="persistent"
//             anchor="left"
//             open={true}
//             sx={{ width: 240, flexShrink: 0, zIndex: theme.zIndex.drawer }}
//             className="drawer"
//             classes={{ paper: "drawerPaper" }}
//           >
//             <List style={{ paddingTop: 75 }}>
//               <ListItem
//                 button
//                 selected={activeTab === "Status"}
//                 onClick={handleTabClick("Status")}
//                 sx={{
//                   bgcolor:
//                     activeTab === "Status"
//                       ? theme.palette.action.selected
//                       : "transparent",
//                 }}
//               >
//                 <ListItemText primary="Status" />
//               </ListItem>
//               <ListItem
//                 button
//                 selected={activeTab === "FormEnable"}
//                 onClick={handleTabClick("FormEnable")}
//                 sx={{
//                   bgcolor:
//                     activeTab === "FormEnable"
//                       ? theme.palette.action.selected
//                       : "transparent",
//                 }}
//               >
//                 <ListItemText primary="Form Enable" />
//               </ListItem>
//             </List>
//             <Divider />
//             <List sx={{ mt: "auto" }}>
//               <ListItem button onClick={handleLogoutClick}>
//                 <LogoutIcon sx={{ mr: 1 }} />
//                 <ListItemText primary="Logout" />
//               </ListItem>
//             </List>
//           </Drawer>
//         )}
//       </AppBar>

//       {!isDesktop && (
//         <Drawer
//           variant="temporary"
//           anchor="left"
//           open={drawerOpen}
//           onClose={toggleDrawer(false)}
//           sx={{ width: 240, flexShrink: 0, zIndex: theme.zIndex.drawer }}
//           className="drawer"
//           classes={{ paper: "drawerPaper" }}
//         >
//           <List>
//             <ListItem
//               button
//               selected={activeTab === "Status"}
//               onClick={handleTabClick("Status")}
//               sx={{
//                 bgcolor:
//                   activeTab === "Status"
//                     ? theme.palette.action.selected
//                     : "transparent",
//               }}
//             >
//               <ListItemText primary="Status" />
//             </ListItem>
//             <ListItem
//               button
//               selected={activeTab === "FormEnable"}
//               onClick={handleTabClick("FormEnable")}
//               sx={{
//                 bgcolor:
//                   activeTab === "FormEnable"
//                     ? theme.palette.action.selected
//                     : "transparent",
//               }}
//             >
//               <ListItemText primary="Form Enable" />
//             </ListItem>
//           </List>
//           <Divider />
//           <List sx={{ mt: "auto" }}>
//             <ListItem button onClick={handleLogoutClick}>
//               <LogoutIcon sx={{ mr: 1 }} />
//               <ListItemText primary="Logout" />
//             </ListItem>
//           </List>
//         </Drawer>
//       )}

//       <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
//         <DialogTitle>Confirm Logout</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to log out?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLogoutCancel} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleLogoutConfirm} color="primary">
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <div className="content" style={{ backgroundColor: "#d2d2d2" }}>
//         {activeTab === "Status" && <StatusComponent />}
//         {activeTab === "FormEnable" && <FormEnableComponent />}
//         {activeTab == "Student Status" && <StudentStatus/>}
//       </div>
//     </>
//   );
// };

// export default COEDashboard;
import { useState } from "react";
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
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the authentication context
import StatusComponent from "../../components/coe/statusComponent.jsx";
import FormEnableComponent from "../../components/coe/formEnable.jsx";
import LoginImage from "../../assets/logos.svg";
import { StudentStatus } from "../../components/coe/studentStatus.jsx";

export const COEDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Status");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use logout function from context

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
            style={{ width: "120px", marginRight: "auto" }} // Adjust size
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            COE Dashboard
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="notifications"
            sx={{ color: "white" }}
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
            "& .MuiDrawer-paper": {
              width: 240,
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
              selected={activeTab === "FormEnable"}
              onClick={handleTabClick("FormEnable")}
              sx={{
                bgcolor:
                  activeTab === "FormEnable"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Form Enable" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Student Status"}
              onClick={handleTabClick("Student Status")}
              sx={{
                bgcolor:
                  activeTab === "Student Status"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Student Status" />
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
          open
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
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
              selected={activeTab === "FormEnable"}
              onClick={handleTabClick("FormEnable")}
              sx={{
                bgcolor:
                  activeTab === "FormEnable"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Form Enable" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "Student Status"}
              onClick={handleTabClick("Student Status")}
              sx={{
                bgcolor:
                  activeTab === "Student Status"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Student Status" />
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

      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px", // Ensure content starts below the AppBar
          marginLeft: { xs: 0, md: "240px" }, // Shift content based on Drawer width
          backgroundColor: "#f5f5f5", // Mild background color for content
        }}
      >
        {activeTab === "Status" && <StatusComponent />}
        {activeTab === "FormEnable" && <FormEnableComponent />}
        {activeTab === "Student Status" && <StudentStatus />}
      </Box>
    </>
  );
};

export default COEDashboard;
