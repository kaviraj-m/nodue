// import React, { useState } from "react";

// export const StudentStatus = () => {
//   const [esimId, setEsimId] = useState(""); // State to store search input
//   const [statusData, setStatusData] = useState([]); // State to store fetched data
//   const [error, setError] = useState(null); // State to store errors

//   // Function to handle search
//   const handleSearch = () => {
//     // Fetch data from API
//     fetch(`http://localhost:3000/api/v1/requestId/${esimId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setStatusData(data); // Set fetched data to state
//         setError(null); // Clear any previous errors
//       })
//       .catch((err) => {
//         setError("Failed to fetch data. Please try again."); // Handle errors
//         setStatusData([]); // Clear any previous data
//       });
//   };

//   return (
//     <div>
//       <h2>Student Status</h2>
//       <div>
//         <input
//           type="text"
//           value={esimId}
//           onChange={(e) => setEsimId(e.target.value)}
//           placeholder="Enter esimId"
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* Display error message if there's an error */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Display the status data */}
//       {statusData.length > 0 ? (
//         <div>
//           <h3>Status Results:</h3>
//           <ul>
//             {statusData.map((status, index) => (
//               <li key={index}>
//                 <p>
//                   <strong>Staff ID:</strong> {status.staffid}
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   {status.status ? "Approved" : "Pending"}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {status.date || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Comment:</strong> {status.comment || "No comments"}
//                 </p>
//                 <hr />
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No status data available. Enter a valid `esimId` to search.</p>
//       )}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/styles/statusStudent.css"; // Make sure to create and link this CSS file

export const StudentStatus = () => {
  const [studentStatusList, setStudentStatusList] = useState([]);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [error, setError] = useState(null);
  const [esimId, setEsimId] = useState(""); // For handling the search input

  const getStatusName = (status) => {
    switch (status) {
      case true:
        return <span style={{ color: "#28a745" }}>Approved</span>;
      case false:
        return <span style={{ color: "#dc3545" }}>Pending</span>;
      default:
        return <span style={{ color: "#333" }}>Unknown</span>;
    }
  };

  // Fetch student status data based on the esimId input
  const fetchStudentStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/requestId/${esimId}`
      );

      if (response.status === 200) {
        setStudentStatusList(response.data); // Assuming the data is directly the array of statuses
        setError(null);
      } else {
        setError("Student status not found");
        setStudentStatusList([]);
      }
    } catch (err) {
      setError("Server error");
      setStudentStatusList([]);
    }
  };

  // Handles search button click to fetch student status
  const handleSearch = () => {
    if (esimId) {
      fetchStudentStatus();
    } else {
      setError("Please enter a valid esimId");
    }
  };

  const handleStudentClick = (staffId) => {
    setExpandedStudent((prevStudent) =>
      prevStudent === staffId ? null : staffId
    );
  };

  return (
    <div className="track-container">
      <h2>Student Status Tracker</h2>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          value={esimId}
          onChange={(e) => setEsimId(e.target.value)}
          placeholder="Enter esimId"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* List of student status items */}
      <ul className="ticket-list">
        {studentStatusList.map((status, index) => (
          <li key={index} className="ticket-item">
            <div
              className={`ticket-box ${
                expandedStudent === status.staffid ? "expanded" : ""
              }`}
              onClick={() => handleStudentClick(status.staffid)}
            >
              <div className="ticket-number">{status.staffid}</div>
              <div className="ticket-status">
                {getStatusName(status.status)}
              </div>
              <div className="ticket-timestamp">
                {status.date ? new Date(status.date).toLocaleString() : "N/A"}
              </div>
            </div>

            {/* Expandable details */}
            {expandedStudent === status.staffid && (
              <div className="ticket-details">
                <p>
                  <strong>Staff ID:</strong> {status.staffid}
                </p>
                <p>
                  <strong>Status:</strong> {getStatusName(status.status)}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {status.date ? new Date(status.date).toLocaleString() : "N/A"}
                </p>
                <p>
                  <strong>Comment:</strong> {status.comment || "No comments"}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentStatus;
