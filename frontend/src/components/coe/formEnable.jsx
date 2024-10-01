// /* eslint-disable react/prop-types */
// import { useState, useEffect, useMemo } from "react";
// import { MaterialReactTable } from "material-react-table";
// import { Switch } from "@mui/material";
// import axios from "axios";

// const FormEnableComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/getAllStudents"
//         );
//         // Initialize `formEnabled` field with false for all students
//         const studentsWithFormEnabledField = response.data.map((student) => ({
//           ...student,
//           formEnabled: student.formEnabled || false, // Default to false if not present
//         }));
//         setData(studentsWithFormEnabledField);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleToggle = async (rowIndex) => {
//     const student = data[rowIndex];
//     const updatedFormEnabledStatus = !student.formEnabled;

//     // Update the enabled status in the data array
//     const updatedData = data.map((row, index) =>
//       index === rowIndex
//         ? { ...row, formEnabled: updatedFormEnabledStatus }
//         : row
//     );
//     setData(updatedData); // Set the updated data

//     // Send the updated enabled status to the backend
//     try {
//       await axios.put(
//         `http://localhost:3000/api/v1/updateStudentFormStatus/${student.esim_id}`,
//         {
//           formEnabled: updatedFormEnabledStatus,
//         }
//       );
//     } catch (error) {
//       console.error("Error updating student:", error);
//       // Revert the data in case of an error
//       setData(
//         data.map((row, index) =>
//           index === rowIndex
//             ? { ...row, formEnabled: !updatedFormEnabledStatus }
//             : row
//         )
//       );
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "esim_id",
//         header: "ESIM ID",
//         size: 150,
//       },
//       {
//         accessorKey: "student_name",
//         header: "Student Name",
//         size: 200,
//       },
//       {
//         accessorKey: "department",
//         header: "Department",
//         size: 200,
//       },
//       {
//         accessorKey: "year",
//         header: "Year",
//         size: 150,
//       },
//       {
//         accessorKey: "semester",
//         header: "Semester",
//         size: 150,
//       },
//       {
//         accessorKey: "formEnabled",
//         header: "Enable/Disable",
//         size: 150,
//         Cell: ({ row }) => (
//           <Switch
//             checked={row.original.formEnabled || false} // Default to false if not present
//             onChange={() => handleToggle(row.index)} // Toggle switch handler
//           />
//         ),
//       },
//     ],
//     [data] // Dependencies for useMemo, updating when data changes
//   );

//   return <MaterialReactTable columns={columns} data={data} />;
// };

// export default FormEnableComponent;

import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Switch, Snackbar, Alert } from "@mui/material";
import axios from "axios";

const FormEnableComponent = () => {
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Can be 'success' or 'error'

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllStudents"
        );
        // Initialize `formEnabled` field with false for all students
        const studentsWithFormEnabledField = response.data.map((student) => ({
          ...student,
          formEnabled: student.formEnabled || false, // Default to false if not present
        }));
        setData(studentsWithFormEnabledField);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggle = async (rowIndex) => {
    const student = data[rowIndex];
    const updatedFormEnabledStatus = !student.formEnabled;

    // Update the enabled status in the data array
    const updatedData = data.map((row, index) =>
      index === rowIndex
        ? { ...row, formEnabled: updatedFormEnabledStatus }
        : row
    );
    setData(updatedData); // Set the updated data

    // Send the updated enabled status to the backend
    try {
      await axios.put(
        `http://localhost:3000/api/v1/updateStudentFormStatus/${student.esim_id}`,
        {
          formEnabled: updatedFormEnabledStatus,
        }
      );
      // Show success message
      setSnackbarMessage(
        `Form ${
          updatedFormEnabledStatus ? "enabled" : "disabled"
        } successfully!`
      );
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error updating student:", error);
      // Revert the data in case of an error
      setData(
        data.map((row, index) =>
          index === rowIndex
            ? { ...row, formEnabled: !updatedFormEnabledStatus }
            : row
        )
      );
      // Show error message
      setSnackbarMessage("Error updating form status. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      // Open snackbar
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "esim_id",
        header: "ESIM ID",
        size: 150,
      },
      {
        accessorKey: "student_name",
        header: "Student Name",
        size: 200,
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 200,
      },
      {
        accessorKey: "year",
        header: "Year",
        size: 150,
      },
      {
        accessorKey: "semester",
        header: "Semester",
        size: 150,
      },
      {
        accessorKey: "formEnabled",
        header: "Enable/Disable",
        size: 150,
        Cell: ({ row }) => (
          <Switch
            checked={row.original.formEnabled || false} // Default to false if not present
            onChange={() => handleToggle(row.index)} // Toggle switch handler
          />
        ),
      },
    ],
    [data] // Dependencies for useMemo, updating when data changes
  );

  return (
    <>
      <MaterialReactTable columns={columns} data={data} />

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Automatically close after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormEnableComponent;
