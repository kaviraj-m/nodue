// import React, { useState, useEffect, useMemo } from "react";
// import { MaterialReactTable } from "material-react-table";
// import axios from "axios";

// const StatusComponent = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/v1/getReports"
//         );
//         const requests = response.data;

//         // Process the data based on department
//         const departmentStats = {};
//         requests.forEach((request) => {
//           const { department_id, status, date } = request;
//           if (!departmentStats[department_id]) {
//             departmentStats[department_id] = {
//               departname: department_id,
//               approved: 0,
//               pending: 0,
//               rejected: 0,
//             };
//           }

//           // Determine the status of each request
//           if (status === true && date !== null) {
//             departmentStats[department_id].approved += 1;
//           } else if (status === null) {
//             departmentStats[department_id].pending += 1;
//           } else if (status === false && date === null) {
//             departmentStats[department_id].pending += 1;
//           } else if (status === false && date !== null) {
//             departmentStats[department_id].rejected += 1;
//           }
//         });

//         // Convert object to array
//         const processedData = Object.values(departmentStats);
//         setData(processedData);
//       } catch (error) {
//         console.error("Error fetching report data:", error);
//       }
//     };

//     fetchReports();
//   }, []);

//   // Define columns using useMemo to optimize performance
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "departname",
//         header: "Department Name",
//         size: 200,
//       },
//       {
//         accessorKey: "pending",
//         header: "Pending",
//         size: 100,
//       },
//       {
//         accessorKey: "approved",
//         header: "Approved",
//         size: 100,
//       },
//       {
//         accessorKey: "rejected",
//         header: "Rejected",
//         size: 100,
//       },
//     ],
//     []
//   );

//   // Render the table using MaterialReactTable
//   return <MaterialReactTable columns={columns} data={data} />;
// };

// export default StatusComponent;

import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import writeXlsxFile from "write-excel-file";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    backgroundColor: "#f2f2f2",
    paddingBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottom: "1px solid #f2f2f2",
  },
  tableCol: {
    width: "25%",
    paddingHorizontal: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
  },
});

// PDF Document Component
const MyDocument = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: "bold" }}>
        Department Report
      </Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCol, styles.tableCellHeader]}>
          Department Name
        </Text>
        <Text style={[styles.tableCol, styles.tableCellHeader]}>
          Total Requests
        </Text>
        <Text style={[styles.tableCol, styles.tableCellHeader]}>Pending</Text>
        <Text style={[styles.tableCol, styles.tableCellHeader]}>Approved</Text>
        <Text style={[styles.tableCol, styles.tableCellHeader]}>Rejected</Text>
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.tableCol}>{row.departname}</Text>
          <Text style={styles.tableCol}>{row.total}</Text>
          <Text style={styles.tableCol}>{row.pending}</Text>
          <Text style={styles.tableCol}>{row.approved}</Text>
          <Text style={styles.tableCol}>{row.rejected}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const StatusComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/getReports"
        );
        const requests = response.data;

        // Process the data based on department
        const departmentStats = {};
        requests.forEach((request) => {
          const { department_id, status, date } = request;
          if (!departmentStats[department_id]) {
            departmentStats[department_id] = {
              departname: department_id,
              total: 0,
              approved: 0,
              pending: 0,
              rejected: 0,
            };
          }

          // Determine the status of each request
          departmentStats[department_id].total += 1; // Increment total for each request

          if (status === true && date == null) {
            departmentStats[department_id].approved += 1;
          } else if (status === null || (status === false && date === null)) {
            departmentStats[department_id].pending += 1;
          } else if (status === false && date !== null) {
            departmentStats[department_id].rejected += 1;
          }
        });

        // Convert object to array
        const processedData = Object.values(departmentStats);
        setData(processedData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReports();
  }, []);

  // Function to export data as Excel using write-excel-file
  const exportToExcel = async () => {
    const schema = [
      {
        column: "Department Name",
        type: String,
        value: (data) => data.departname,
      },
      {
        column: "Total Requests",
        type: Number,
        value: (data) => data.total,
      },
      {
        column: "Pending",
        type: Number,
        value: (data) => data.pending,
      },
      {
        column: "Approved",
        type: Number,
        value: (data) => data.approved,
      },
      {
        column: "Rejected",
        type: Number,
        value: (data) => data.rejected,
      },
    ];

    // Exporting data
    await writeXlsxFile(data, {
      schema,
      fileName: "Report.xlsx",
    });
  };

  // Define columns using useMemo to optimize performance
  const columns = useMemo(
    () => [
      {
        accessorKey: "departname",
        header: "Department Name",
        size: 100,
      },
      {
        accessorKey: "total",
        header: "Total Requests",
        size: 50,
      },
      {
        accessorKey: "pending",
        header: "Pending",
        size: 50,
      },
      {
        accessorKey: "approved",
        header: "Approved",
        size: 50,
      },
      {
        accessorKey: "rejected",
        header: "Rejected",
        size: 50,
      },
    ],
    []
  );

  // Render the table and the buttons for generating reports
  return (
    <div>
      <button onClick={exportToExcel} style={{ margin: "10px" }}>
        Export to Excel
      </button>
      <PDFDownloadLink
        document={<MyDocument data={data} />}
        fileName="Report.pdf"
      >
        {({ loading }) =>
          loading ? (
            <button style={{ margin: "10px" }}>Loading PDF...</button>
          ) : (
            <button style={{ margin: "10px" }}>Export to PDF</button>
          )
        }
      </PDFDownloadLink>
      <MaterialReactTable columns={columns} data={data} />
    </div>
  );
};

export default StatusComponent;

