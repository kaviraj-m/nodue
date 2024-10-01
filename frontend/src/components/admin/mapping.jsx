import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Mapping = () => {
  const [students, setStudents] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mentorId, setMentorId] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getAllStudents"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define columns
  const columns = useMemo(
    () => [
      { accessorKey: "esim_id", header: "ESIM ID" },
      { accessorKey: "student_name", header: "Student Name" },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "year", header: "Year" },
      { accessorKey: "semester", header: "Semester" },
      { accessorKey: "date_of_birth", header: "Date of Birth" },
      { accessorKey: "mentor", header: "Mentor ID" },
    ],
    []
  );

  // MantineReactTable setup
  const table = useMantineReactTable({
    columns,
    data: students,
    enableRowSelection: true,
    getRowId: (row) => row.esim_id, // Use a unique identifier from your data
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  // Get selected IDs
  const selectedIds = Object.keys(rowSelection);

  const handleNextClick = () => {
    if (selectedIds.length > 0) {
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/updateMentor", {
        selectedIds,
        mentorId,
      });
      console.log("Selected IDs:", selectedIds);
      console.log("Mentor ID:", mentorId);

      // Update local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          selectedIds.includes(student.esim_id)
            ? { ...student, mentor_id: mentorId }
            : student
        )
      );

      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating mentor ID:", error);
    }
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ minWidth: "100%" }}>
        <MantineReactTable table={table} />
      </div>
      {selectedIds.length > 0 && (
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Mentor ID</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mentor ID"
            fullWidth
            variant="standard"
            value={mentorId}
            onChange={(e) => setMentorId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mapping;
