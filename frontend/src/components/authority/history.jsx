import React, { useEffect, useMemo, useState } from "react";
import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";

const HistoryComponent = () => {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [esimId, setEsimId] = useState(""); // State for esim_id

  // Load user data from session storage on initial render
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

  // Fetch esim_id based on the email
  useEffect(() => {
    if (email) {
      fetchEsimIdByEmail(email);
    }
  }, [email]);

  // Column definitions for the table
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

  // Initialize MantineReactTable with options
  const approvedTable = useMantineReactTable({
    columns,
    data: approvedStudents,
    getRowId: (row) => row.esim_id,
  });

  // Fetch esim_id by email
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

  // Fetch approved student data associated with the staff
  const fetchApprovedStudentData = async () => {
    setLoading(true);
    const url = `http://localhost:3000/api/v1/getApprovedForStaff/${esimId}`; 
    console.log(url);
    try {
      const response = await axios.get(url);
      console.log(response.data);

      // Filter approved students
      const approvedData = response.data
        .filter((item) => item[2] === true)
        .map((item) => item[0]);

      setApprovedStudents(approvedData);
    } catch (error) {
      console.error("Error fetching approved student data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch approved student data when esim_id changes
  useEffect(() => {
    if (esimId) {
      fetchApprovedStudentData();
    }
  }, [esimId]);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h6" gutterBottom>
        Approved Students
      </Typography>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <CircularProgress />
        </div>
      ) : (
        <MantineReactTable table={approvedTable} />
      )}
    </div>
  );
};

export default HistoryComponent;
