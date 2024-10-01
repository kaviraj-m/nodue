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
  CircularProgress,
  Typography,
} from "@mui/material";

const ApproveRejectComponent = () => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [pendingRowSelection, setPendingRowSelection] = useState({});
  const [rejectedRowSelection, setRejectedRowSelection] = useState({});
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [actionType, setActionType] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [esimId, setEsimId] = useState(""); // State for esim_id

  useEffect(() => {
    const storedUserJson = sessionStorage.getItem("user");

    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson);
        const storedEmail = storedUser.useremail;

        if (storedEmail) {
          setEmail(storedEmail);
        }

        console.log("staff id is", storedEmail);
      } catch (error) {
        console.error("Error parsing user JSON from session storage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (email) {
      fetchEsimIdByEmail(email);
    }
  }, [email]);

  const columns = useMemo(
    () => [
      { accessorKey: "esim_id", header: "ESIM ID" },
      { accessorKey: "student_name", header: "Student Name" },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "year", header: "Year" },
      { accessorKey: "semester", header: "Semester" },
    ],
    []
  );

  const pendingTable = useMantineReactTable({
    columns,
    data: pendingStudents,
    enableRowSelection: true,
    getRowId: (row) => row.esim_id,
    onRowSelectionChange: setPendingRowSelection,
    state: { rowSelection: pendingRowSelection },
  });

  const rejectedTable = useMantineReactTable({
    columns,
    data: rejectedStudents,
    enableRowSelection: true,
    getRowId: (row) => row.esim_id,
    onRowSelectionChange: setRejectedRowSelection,
    state: { rowSelection: rejectedRowSelection },
  });

  const selectedPendingIds = Object.keys(pendingRowSelection);
  const selectedRejectedIds = Object.keys(rejectedRowSelection);

  const handleOpenDialog = (type) => {
    setActionType(type);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setComment("");
  };

  const fetchEsimIdByEmail = async (email) => {
    const url = `http://localhost:3000/api/v1/getStaffId/${email}`;
    console.log("The url is ", url);
    try {
      const response = await axios.get(url);
      console.log("fetchEsimIdByEmail", response);
      setEsimId(response.data.esim_id);
    } catch (error) {
      console.error("Error fetching esim_id", error);
    }
  };

  const fetchStudentData = async () => {
    setLoading(true);
    const url = `http://localhost:3000/api/v1/getRequestsForStaff/${esimId}`;
    var data = [];
    try {
      const response = await axios.get(url);
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        Object.assign(obj[0], {
          id: response.data[i][1],
        });

        data.push(obj);
      }

      const pendingData = data
        .filter((item) => item[2] === null)
        .map((item) => item[0]);
      const rejectedData = data
        .filter((item) => item[2] === false)
        .map((item) => item[0]);

      setPendingStudents(pendingData);
      setRejectedStudents(rejectedData);
    } catch (error) {
      console.error("Error fetching student data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (esimId) {
      fetchStudentData();
    }
  }, [esimId]);

  const handleAction = async () => {
    const status = actionType === "Approved";
    const selectedStudentIds =
      selectedPendingIds.length > 0 ? selectedPendingIds : selectedRejectedIds;

    console.log("Approve student check", selectedStudentIds);
    try {
      for (const id of selectedStudentIds) {
        console.log("The student id is", id);
        const student =
          pendingStudents.find((stu) => stu.esim_id === id) ||
          rejectedStudents.find((stu) => stu.esim_id === id);
        const uuid = student ? student.id : null;

        if (uuid) {
          console.log("the uuid is ", uuid);
          const url = `http://localhost:3000/api/v1/updateStaffAppStatus/${uuid}`;
          const body = {
            status: status,
            comment: comment,
          };

          await axios.put(url, body);

          console.log(`Updated status for UUID: ${uuid}`);
        }
      }

      fetchStudentData();
      setDialogOpen(false);
      setPendingRowSelection({});
      setRejectedRowSelection({});
    } catch (error) {
      console.error("Error updating student status", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Pending Requests
      </Typography>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <CircularProgress />
        </div>
      ) : (
        <MantineReactTable table={pendingTable} />
      )}
      {selectedPendingIds.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog("Approved")}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOpenDialog("Rejected")}
          >
            Reject
          </Button>
        </div>
      )}

      <Typography variant="h6" gutterBottom style={{ marginTop: 40 }}>
        Rejected Requests
      </Typography>
      <MantineReactTable table={rejectedTable} />
      {selectedRejectedIds.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDialog("Approved")}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
        </div>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{`Add a comment for ${actionType}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAction} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApproveRejectComponent;
