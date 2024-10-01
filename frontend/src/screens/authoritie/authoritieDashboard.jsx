// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
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
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import AuthorityStatus from "../../components/authority/statusComponent";
// import ApproveRejectComponent from "../../components/authority/approveReject";

// export const AuthorityDashboard = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("Status");
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   const isProfileMenuOpen = Boolean(profileAnchorEl);

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
//           <Typography variant="h6" className="title">
//             Authority Dashboard
//           </Typography>
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="profile"
//             onClick={handleProfileMenuOpen}
//             sx={{
//               marginLeft: 5,
//               marginRight: 5,
//               color: "white",
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
//                 selected={activeTab === "Approve/Reject"}
//                 onClick={handleTabClick("Approve/Reject")}
//                 sx={{
//                   bgcolor:
//                     activeTab === "Approve/Reject"
//                       ? theme.palette.action.selected
//                       : "transparent",
//                 }}
//               >
//                 <ListItemText primary="Approve/Reject" />
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
//               selected={activeTab === "Approve/Reject"}
//               onClick={handleTabClick("Approve/Reject")}
//               sx={{
//                 bgcolor:
//                   activeTab === "Approve/Reject"
//                     ? theme.palette.action.selected
//                     : "transparent",
//               }}
//             >
//               <ListItemText primary="Approve/Reject" />
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

//       <div className="content" style={{ backgroundColor: "#d2d2d2" }}>
//         {activeTab === "Status" && <AuthorityStatus />}
//         {activeTab === "Approve/Reject" && <ApproveRejectComponent />}
//       </div>

//       <Dialog
//         open={logoutDialogOpen}
//         onClose={handleLogoutCancel}
//         aria-labelledby="logout-dialog-title"
//         aria-describedby="logout-dialog-description"
//       >
//         <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="logout-dialog-description">
//             Are you sure you want to log out?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleLogoutCancel} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleLogoutConfirm} color="primary" autoFocus>
//             Logout
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AuthorityDashboard;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthorityStatus from "../../components/authority/statusComponent";
import ApproveRejectComponent from "../../components/authority/approveReject";
import HistoryComponent from "../../components/authority/history";

export const AuthorityDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Status");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Authority Dashboard
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="profile"
            onClick={handleProfileMenuOpen}
            sx={{
              marginLeft: 5,
              marginRight: 5,
              color: "white",
              zIndex: theme.zIndex.drawer + 1,
            }}
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
              selected={activeTab === "Approve/Reject"}
              onClick={handleTabClick("Approve/Reject")}
              sx={{
                bgcolor:
                  activeTab === "Approve/Reject"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Approve/Reject" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "History"}
              onClick={handleTabClick("History")}
              sx={{
                bgcolor:
                  activeTab === "History"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="History" />
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
              selected={activeTab === "Approve/Reject"}
              onClick={handleTabClick("Approve/Reject")}
              sx={{
                bgcolor:
                  activeTab === "Approve/Reject"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="Approve/Reject" />
            </ListItem>
            <ListItem
              button
              selected={activeTab === "History"}
              onClick={handleTabClick("History")}
              sx={{
                bgcolor:
                  activeTab === "History"
                    ? theme.palette.action.selected
                    : "transparent",
              }}
            >
              <ListItemText primary="History" />
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
          marginTop: "64px", // Space for the AppBar
          marginLeft: { xs: 0, md: "240px" }, // Shift content for persistent Drawer
          backgroundColor: "#f5f5f5", // Mild background color for content
        }}
      >
        {activeTab === "Status" && <AuthorityStatus />}
        {activeTab === "Approve/Reject" && <ApproveRejectComponent />}
        {activeTab === "History" && <HistoryComponent />}
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
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

export default AuthorityDashboard;
