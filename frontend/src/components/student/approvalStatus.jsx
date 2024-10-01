// import React, { useEffect, useState } from "react";
// import { Box, Typography, Grid, Collapse, IconButton } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import CancelIcon from "@mui/icons-material/Cancel";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import axios from "axios";

// const StyledTimeline = styled(Box)(({ theme }) => ({
//   position: "relative",
//   marginLeft: theme.spacing(2),
//   paddingLeft: theme.spacing(4),
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: "24px",
//     height: "100%",
//     width: "4px",
//     backgroundColor: theme.palette.grey[300],
//     borderRadius: "2px",
//     border: `2px dotted ${theme.palette.grey[300]}`,
//   },
// }));

// const StyledTimelineItem = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "flex-start",
//   position: "relative",
//   marginBottom: theme.spacing(5),
//   "&:last-child": {
//     marginBottom: 0,
//   },
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: "12px",
//     left: "22px",
//     height: "calc(100% - 24px)",
//     backgroundColor: theme.palette.grey[300],
//     zIndex: -1,
//   },
// }));

// const StyledTimelineDot = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: "-32px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   width: "48px",
//   height: "48px",
//   borderRadius: "50%",
//   backgroundColor: theme.palette.background.paper,
//   border: `4px solid ${theme.palette.grey[300]}`,
//   zIndex: 1,
// }));

// const ApprovalStatus = () => {
//   const [email, setEmail] = useState("");
//   const [esimId, setEsimId] = useState("");
//   const [statuses, setStatuses] = useState([]);
//   const [expandedRole, setExpandedRole] = useState(null);

//   useEffect(() => {
//     const storedUserJson = sessionStorage.getItem("user");
//     if (storedUserJson) {
//       try {
//         const storedUser = JSON.parse(storedUserJson);
//         const storedEmail = storedUser.useremail;
//         if (storedEmail) {
//           setEmail(storedEmail);
//         }
//         console.log("student id is", storedEmail);
//       } catch (error) {
//         console.error("Error parsing user JSON from session storage", error);
//       }
//     }
//   }, []);

//   const fetchEsimIdByEmail = async (email) => {
//     const url = `http://localhost:3000/api/v1/getStudentDetailsByEmail/${email}`;
//     try {
//       const response = await axios.get(url);
//       setEsimId(response.data.studentDetails.esim_id);
//     } catch (error) {
//       console.error("Error fetching esim_id", error);
//     }
//   };

//   const fetchAdditionalData = async (key) => {
//     const url = `http://localhost:3000/api/v1/getStaffRole/${key}`;
//     try {
//       const response = await axios.get(url);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching additional data for key ${key}`, error);
//       return null;
//     }
//   };

//   const fetchStudentData = async () => {
//     const url = `http://localhost:3000/api/v1/requestId/${esimId}`;
//     console.log(url);
//     try {
//       const response = await axios.get(url);
//       const requests = response.data;

//       const statusData = await Promise.all(
//         requests.map(async (request) => {
//           let statusValue = "pending";
//           if (request.status === true) {
//             statusValue = "approved";
//           } else if (request.status === null) {
//             statusValue = "in process";
//           } else if (request.status === false) {
//             statusValue = "rejected";
//           }

//           const additionalData = await fetchAdditionalData(request.staffid);
//           return {
//             key: request.staffid,
//             statusValue: statusValue,
//             date: request.date
//               ? new Date(request.date).toLocaleDateString()
//               : null,
//             comment: request.comment || "",
//             role: additionalData[0]?.role || "Unknown Role",
//             subjectName: additionalData[0]?.subject_name || "Unknown Subject",
//             staffName: additionalData[0]?.authoritie_name || "Unknown StaffName",

//           };
//         })
//       );

//       setStatuses(statusData);
//       console.log(statusData);
//     } catch (error) {
//       console.error("Error fetching student data", error);
//     }
//   };

//   useEffect(() => {
//     if (email) {
//       fetchEsimIdByEmail(email);
//     }
//   }, [email]);

//   useEffect(() => {
//     if (esimId) {
//       fetchStudentData();
//     }
//   }, [esimId]);

//   // Group statuses by role
//   const groupedStatuses = statuses.reduce((acc, status) => {
//     if (!acc[status.role]) {
//       acc[status.role] = [];
//     }
//     acc[status.role].push(status);
//     return acc;
//   }, {});

//   const handleToggle = (role) => {
//     setExpandedRole(expandedRole === role ? null : role);
//   };

//   return (
//     <Grid container direction="column" alignItems="flex-start">
//       <StyledTimeline>
//         {Object.entries(groupedStatuses).length === 0 ? (
//           <div
//             style={{ display: "flex", justifyContent: "center", fontSize: 25 }}
//           >
//             There no request found
//           </div>
//         ) : (
//           Object.entries(groupedStatuses).map(([role, roleStatuses]) => {
//             const latestStatus = roleStatuses[0];
//             let IconComponent = HourglassEmptyIcon;
//             let color = "grey";

//             if (latestStatus.statusValue === "approved") {
//               IconComponent = CheckCircleIcon;
//               color = "success";
//             } else if (latestStatus.statusValue === "in process") {
//               IconComponent = HourglassEmptyIcon;
//               color = "warning";
//             } else if (latestStatus.statusValue === "rejected") {
//               IconComponent = CancelIcon;
//               color = "error";
//             }

//             return (
//               <React.Fragment key={role}>
//                 <StyledTimelineItem>
//                   <StyledTimelineDot>
//                     <IconComponent color={color} style={{ fontSize: 28 }} />
//                   </StyledTimelineDot>
//                   <Box ml={6}>
//                     <Typography variant="h6" fontWeight="bold" color={color}>
//                       {role}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {latestStatus.statusValue === "approved" &&
//                         `Approved on: ${latestStatus.date}`}
//                       {latestStatus.statusValue === "rejected" &&
//                         `Rejected on: ${latestStatus.date}, Reason: ${latestStatus.comment}`}
//                       {latestStatus.statusValue === "in process" &&
//                         `Status: In process`}
//                     </Typography>
//                     {/* <IconButton onClick={() => handleToggle(role)}> `
//                       {expandedRole === role ? (
//                         <ExpandLessIcon />
//                       ) : (
//                         <ExpandMoreIcon />
//                       )}
//                     </IconButton> */}
//                   </Box>
//                 </StyledTimelineItem>
//                 <Collapse in={expandedRole === role}>
//                   {roleStatuses.slice(1).map((status) => (
//                     <Box ml={10} mb={3} key={status.key}>
//                       <Typography variant="body2" color="textSecondary">
//                         {status.staffName} - {status.subjectName}
//                       </Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         {status.statusValue === "approved" &&
//                           `Approved on: ${status.date}`}
//                         {status.statusValue === "rejected" &&
//                           `Rejected on: ${status.date}, Reason: ${status.comment}`}
//                         {status.statusValue === "in process" &&
//                           `Status: In process`}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Collapse>
//               </React.Fragment>
//             );
//           })
//         )}
//       </StyledTimeline>
//     </Grid>
//   );
// };

// export default ApprovalStatus;

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import LoginImage from "../../assets/nodata.svg";

const StyledTimeline = styled(Box)(({ theme }) => ({
  position: "relative",
  marginLeft: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "24px",
    height: "100%",
    width: "4px",
    backgroundColor: theme.palette.grey[300],
    borderRadius: "2px",
    border: `2px dotted ${theme.palette.grey[300]}`,
  },
}));

const StyledTimelineItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  marginBottom: theme.spacing(5),
  "&:last-child": {
    marginBottom: 0,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "12px",
    left: "22px",
    height: "calc(100% - 24px)",
    backgroundColor: theme.palette.grey[300],
    zIndex: -1,
  },
}));

const StyledTimelineDot = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: "-32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.paper,
  border: `4px solid ${theme.palette.grey[300]}`,
  zIndex: 1,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%", // Full width of the container
  marginRight: theme.spacing(3), // Adjust the right margin as needed
}));

const ApprovalStatus = () => {
  const [email, setEmail] = useState("");
  const [esimId, setEsimId] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading = "true"
    const storedUserJson = sessionStorage.getItem("user");
    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        const storedEmail = storedUser.useremail;
        if (storedEmail) {
          setEmail(storedEmail);
        }
        console.log("student id is", storedEmail);
      } catch (error) {
        console.error("Error parsing user JSON from session storage", error);
      }
    }
  }, []);

  const fetchEsimIdByEmail = async (email) => {
    const url = `http://localhost:3000/api/v1/getStudentDetailsByEmail/${email}`;
    try {
      const response = await axios.get(url);
      setEsimId(response.data.studentDetails.esim_id);
    } catch (error) {
      console.error("Error fetching esim_id", error);
    }
  };

  const fetchAdditionalData = async (key) => {
    const url = `http://localhost:3000/api/v1/getStaffRole/${key}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching additional data for key ${key}`, error);
      return null;
    }
  };

  const fetchStudentData = async () => {
    const url = `http://localhost:3000/api/v1/requestId/${esimId}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      const requests = response.data;

      const statusData = await Promise.all(
        requests.map(async (request) => {
          let statusValue = "pending";
          if (request.status === true) {
            statusValue = "approved";
          } else if (request.status === null) {
            statusValue = "in process";
          } else if (request.status === false) {
            statusValue = "rejected";
          }

          const additionalData = await fetchAdditionalData(request.staffid);
          return {
            key: request.staffid,
            statusValue: statusValue,
            date: request.date
              ? new Date(request.date).toLocaleDateString()
              : null,
            comment: request.comment || "",
            role: additionalData[0]?.role || "Unknown Role",
            subjectName: additionalData[0]?.subject_name || "Unknown Subject",
            staffName:
              additionalData[0]?.authoritie_name || "Unknown StaffName",
          };
        })
      );

      setStatuses(statusData);
      setIsLoading(false);
      console.log(statusData);
    } catch (error) {
      console.error("Error fetching student data", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchEsimIdByEmail(email);
    }
  }, [email]);

  useEffect(() => {
    if (esimId) {
      fetchStudentData();
    }
  }, [esimId]);

  // Group statuses by role
  const groupedStatuses = statuses.reduce((acc, status) => {
    if (!acc[status.role]) {
      acc[status.role] = [];
    }
    acc[status.role].push(status);

    return acc;
  }, {});

  return isLoading ? (
    <Box sx={{ display: "flex",justifyContent:'center',width:"75%" }}>
      <CircularProgress />
    </Box>
  ) : Object.entries(groupedStatuses).length === 0 ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: 25,
      }}
    >
      <img src={LoginImage} alt="No Data" style={{ width: "55%" }} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={4.5}>
        <StyledTimeline>
          {Object.entries(groupedStatuses).map(([role, roleStatuses]) => {
            const latestStatus = roleStatuses[0];
            let IconComponent = HourglassEmptyIcon;
            let color = "grey";

            if (latestStatus.statusValue === "approved") {
              IconComponent = CheckCircleIcon;
              color = "success";
            } else if (latestStatus.statusValue === "in process") {
              IconComponent = HourglassEmptyIcon;
              color = "warning";
            } else if (latestStatus.statusValue === "rejected") {
              IconComponent = CancelIcon;
              color = "error";
            }

            console.log("The value are", latestStatus);

            return (
              <StyledTimelineItem key={role}>
                <StyledTimelineDot>
                  <IconComponent color={color} style={{ fontSize: 28 }} />
                </StyledTimelineDot>
                <Box ml={6}>
                  <Typography variant="h6" fontWeight="bold" color={color}>
                    {role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {latestStatus.statusValue === "approved" &&
                      `Approved on: ${latestStatus.date}`}
                    {latestStatus.statusValue === "rejected" &&
                      `Rejected on: ${latestStatus.date}, Reason: ${latestStatus.comment}`}
                    {latestStatus.statusValue === "in process" &&
                      `Status: In process`}
                  </Typography>
                </Box>
              </StyledTimelineItem>
            );
          })}
        </StyledTimeline>
      </Grid>
      <Grid item xs={7} style={{ marginTop: 55, width: "100%" }}>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                  Staff Id
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                  Staff Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                  Subject Name
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                  Status Value
                </TableCell>
                <TableCell style={{ fontWeight: "bold", fontSize: 17 }}>
                  Comment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statuses
                .filter((status) => status.role.toLowerCase() === "staff")
                .map((status, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: 17 }}>{status.key}</TableCell>
                    <TableCell style={{ fontSize: 17 }}>
                      {status.staffName}
                    </TableCell>
                    <TableCell style={{ fontSize: 17 }}>
                      {status.subjectName}
                    </TableCell>
                    <TableCell style={{ fontSize: 17 }}>
                      {status.statusValue}
                    </TableCell>
                    <TableCell style={{ fontSize: 17 }}>
                      {status.statusValue}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Grid>
    </Grid>
  );
};

export default ApprovalStatus;
