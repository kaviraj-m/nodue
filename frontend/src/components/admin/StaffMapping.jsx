// import "@mantine/core/styles.css";
// import "mantine-react-table/styles.css";
// import axios from "axios";
// import { useEffect, useMemo, useState } from "react";
// import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const StaffMapping = () => {
//   const [staffDetails, setStaffDetails] = useState([]);
//   const [rowSelection, setRowSelection] = useState({});
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [formOpen, setFormOpen] = useState(false);
//   const [newStaff, setNewStaff] = useState({
//     department: "",
//     semester: "",
//     year: "",
//     staffIds: [""],
//     hodid: "",
//     classadvisorid: "",
//     library: "", // Added
//     accounts: "", // Added
//   });

//   const [editStaff, setEditStaff] = useState(null);

//   useEffect(() => {
//     fetchStaffDetails();
//   }, []);

//   const fetchStaffDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/v1/staff");
//       setStaffDetails(response.data);
//     } catch (error) {
//       console.error("Failed to fetch staff details:", error);
//     }
//   };

//   const handleEditStaff = (staff) => {
//     setEditStaff(staff);
//     setDialogOpen(true);
//   };

//   const handleDeleteStaff = async (staffId) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/staff/${staffId}`);
//       setStaffDetails(
//         staffDetails.filter((staff) => staff.staffId !== staffId)
//       );
//       console.log("Deleted staff with ID:", staffId);
//     } catch (error) {
//       console.error("Failed to delete staff:", error);
//     }
//   };

//   const handleNextClick = () => {
//     if (Object.keys(rowSelection).length > 0) {
//       setDialogOpen(true);
//     }
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleSubmit = async () => {
//     console.log("Selected IDs:", Object.keys(rowSelection));
//     console.log("New Staff:", newStaff);
//     // Implement submission logic here
//     setDialogOpen(false);
//   };

//   const handleFormOpen = () => setFormOpen(true);
//   const handleFormClose = () => setFormOpen(false);

//   const handleFormSubmit = async () => {
//     console.log("Mapping ids", newStaff);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/insertStaff",
//         { ...newStaff, staffIds: newStaff.staffIds }
//       );

//       console.log("Staff added successfully:", response.data);
//       setStaffDetails([...staffDetails, response.data]);
//       setNewStaff({
//         department: "",
//         semester: "",
//         year: "",
//         staffIds: [""],
//         hodid: "",
//         classadvisorid: "",
//         library: "", // Reset
//         accounts: "", // Reset
//       });
//       setFormOpen(false);
//     } catch (error) {
//       console.error("Failed to add new staff:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleStaffIdChange = (index, value) => {
//     const updatedStaffIds = [...newStaff.staffIds];
//     updatedStaffIds[index] = value;
//     setNewStaff((prevState) => ({ ...prevState, staffIds: updatedStaffIds }));
//   };

//   const addStaffIdField = () => {
//     setNewStaff((prevState) => ({
//       ...prevState,
//       staffIds: [...prevState.staffIds, ""],
//     }));
//   };

//   const removeStaffIdField = (index) => {
//     setNewStaff((prevState) => ({
//       ...prevState,
//       staffIds: prevState.staffIds.filter((_, i) => i !== index),
//     }));
//   };

//   const columns = useMemo(
//     () => [
//       { accessorKey: "department", header: "Department" },
//       { accessorKey: "semester", header: "Semester" },
//       { accessorKey: "year", header: "Year" },
//       {
//         accessorKey: "staffIds",
//         header: "Staff IDs",
//         render: ({ row }) => row.original.staffIds.join(", "),
//       },
//       { accessorKey: "hodid", header: "HOD ID" },
//       { accessorKey: "classadvisorid", header: "Class Advisor ID" },
//       { accessorKey: "library", header: "Library" }, // Added
//       { accessorKey: "accounts", header: "Accounts" }, // Added
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         render: ({ row }) => (
//           <div>
//             <IconButton
//               color="primary"
//               onClick={() => handleEditStaff(row.original)}
//             >
//               <EditIcon />
//             </IconButton>
//             <IconButton
//               color="secondary"
//               onClick={() => handleDeleteStaff(row.original.staffId)}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useMantineReactTable({
//     columns,
//     data: staffDetails,
//     enableRowSelection: true,
//     getRowId: (row) => row.staffId,
//     onRowSelectionChange: setRowSelection,
//     state: { rowSelection },
//   });

//   return (
//     <div style={{ width: "100%", overflowX: "auto" }}>
//       <div style={{ minWidth: "100%" }}>
//         <MantineReactTable table={table} />
//       </div>
//       {Object.keys(rowSelection).length > 0 && (
//         <div style={{ marginTop: 16 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleNextClick}
//             style={{ marginRight: 8 }}
//           >
//             Next
//           </Button>
//           <Button variant="outlined" color="secondary">
//             Cancel
//           </Button>
//         </div>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleFormOpen}
//         style={{ marginTop: 16 }}
//       >
//         Add New Staff
//       </Button>

//       <Dialog open={formOpen} onClose={handleFormClose}>
//         <DialogTitle>Add New Staff</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Department"
//             fullWidth
//             name="department"
//             value={newStaff.department}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Semester"
//             fullWidth
//             name="semester"
//             value={newStaff.semester}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Year"
//             fullWidth
//             name="year"
//             value={newStaff.year}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="HOD ID"
//             fullWidth
//             name="hodid"
//             value={newStaff.hodid}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Class Advisor ID"
//             fullWidth
//             name="classadvisorid"
//             value={newStaff.classadvisorid}
//             onChange={handleInputChange}
//           />
//           <TextField
//             margin="dense"
//             label="Library"
//             fullWidth
//             name="library" // Added
//             value={newStaff.library} // Added
//             onChange={handleInputChange} // Added
//           />
//           <TextField
//             margin="dense"
//             label="Accounts"
//             fullWidth
//             name="accounts" // Added
//             value={newStaff.accounts} // Added
//             onChange={handleInputChange} // Added
//           />
//           {newStaff.staffIds.map((staffId, index) => (
//             <div
//               key={index}
//               style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
//             >
//               <TextField
//                 margin="dense"
//                 label={`Staff ID ${index + 1}`}
//                 fullWidth
//                 value={staffId}
//                 onChange={(e) => handleStaffIdChange(index, e.target.value)}
//               />
//               {index > 0 && (
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => removeStaffIdField(index)}
//                   style={{ marginLeft: 8 }}
//                 >
//                   Remove
//                 </Button>
//               )}
//             </div>
//           ))}
//           <Button variant="outlined" color="primary" onClick={addStaffIdField}>
//             Add Staff ID
//           </Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleFormClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleFormSubmit} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           Are you sure you want to proceed with the selected actions?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default StaffMapping;

import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StaffMapping = () => {
  const [staffDetails, setStaffDetails] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    department: "",
    semester: "",
    year: "",
    staffId: [""],
    classadvi: "",
    hod: "",
    library: "",
    accounts: "",
  });

  const [editStaff, setEditStaff] = useState(null);

  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const fetchStaffDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/staff");
      setStaffDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch staff details:", error);
    }
  };

  const handleEditStaff = (staff) => {
    setEditStaff(staff);
    setDialogOpen(true);
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/staff/${staffId}`);
      setStaffDetails(staffDetails.filter((staff) => staff.id !== staffId));
      console.log("Deleted staff with ID:", staffId);
    } catch (error) {
      console.error("Failed to delete staff:", error);
    }
  };

  const handleNextClick = () => {
    if (Object.keys(rowSelection).length > 0) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    console.log("Selected IDs:", Object.keys(rowSelection));
    console.log("New Staff:", newStaff);
    // Implement submission logic here
    setDialogOpen(false);
  };

  const handleFormOpen = () => setFormOpen(true);
  const handleFormClose = () => setFormOpen(false);

  const handleFormSubmit = async () => {
    console.log("Mapping ids", newStaff);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/insertStaff",
        {
          department: newStaff.department,
          semester: newStaff.semester,
          year: newStaff.year,
          staffIds: newStaff.staffId, // change staffId to staffIds
          classadvisorid: newStaff.classadvi, // change classadvi to classadvisorid
          hodid: newStaff.hod, // change hod to hodid
          library: newStaff.library,
          accounts: newStaff.accounts,
        }
      );

      console.log("Staff added successfully:", response.data);
      setStaffDetails([...staffDetails, response.data]);
      setNewStaff({
        department: "",
        semester: "",
        year: "",
        staffId: [""],
        classadvi: "",
        hod: "",
        library: "",
        accounts: "",
      });
      setFormOpen(false);
    } catch (error) {
      console.error("Failed to add new staff:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStaffIdChange = (index, value) => {
    const updatedStaffIds = [...newStaff.staffId];
    updatedStaffIds[index] = value;
    setNewStaff((prevState) => ({ ...prevState, staffId: updatedStaffIds }));
  };

  const addStaffIdField = () => {
    setNewStaff((prevState) => ({
      ...prevState,
      staffId: [...prevState.staffId, ""],
    }));
  };

  const removeStaffIdField = (index) => {
    setNewStaff((prevState) => ({
      ...prevState,
      staffId: prevState.staffId.filter((_, i) => i !== index),
    }));
  };

  const columns = useMemo(
    () => [
      { accessorKey: "department", header: "Department" },
      { accessorKey: "semester", header: "Semester" },
      { accessorKey: "year", header: "Year" },
      {
        accessorKey: "staffId",
        header: "Staff IDs",
        render: ({ row }) => row.original.staffId.join(", "),
      },
      { accessorKey: "hod", header: "HOD ID" },
      { accessorKey: "classadvi", header: "Class Advisor ID" },
      { accessorKey: "library", header: "Library" },
      { accessorKey: "accounts", header: "Accounts" },
      {
        accessorKey: "actions",
        header: "Actions",
        render: ({ row }) => (
          <div>
            <IconButton
              color="primary"
              onClick={() => handleEditStaff(row.original)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteStaff(row.original.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [handleEditStaff, handleDeleteStaff]
  );

  console.log("staff detail before return statement", staffDetails);

  const table = useMantineReactTable({
    columns,
    data: staffDetails,
    enableRowSelection: true,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ minWidth: "100%" }}>
        <MantineReactTable table={table} data={staffDetails} />
      </div>
      {Object.keys(rowSelection).length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            style={{ marginRight: 8 }}
          >
            Next
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleFormOpen}
        style={{ marginTop: 16 }}
      >
        Add New Staff
      </Button>

      <Dialog open={formOpen} onClose={handleFormClose}>
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Department"
            fullWidth
            name="department"
            value={newStaff.department}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Semester"
            fullWidth
            name="semester"
            value={newStaff.semester}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            name="year"
            value={newStaff.year}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="HOD ID"
            fullWidth
            name="hod"
            value={newStaff.hod}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Class Advisor ID"
            fullWidth
            name="classadvi"
            value={newStaff.classadvi}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Library"
            fullWidth
            name="library"
            value={newStaff.library}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Accounts"
            fullWidth
            name="accounts"
            value={newStaff.accounts}
            onChange={handleInputChange}
          />
          {newStaff.staffId.map((staffId, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <TextField
                margin="dense"
                label={`Staff ID ${index + 1}`}
                fullWidth
                value={staffId}
                onChange={(e) => handleStaffIdChange(index, e.target.value)}
              />
              {index > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeStaffIdField(index)}
                  style={{ marginLeft: 8 }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={addStaffIdField}
            style={{ marginTop: 8 }}
          >
            Add Staff ID
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to perform this action?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffMapping;
