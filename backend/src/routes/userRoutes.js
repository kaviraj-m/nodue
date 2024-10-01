const express = require("express");
const {
  getUsers,
  insertRequestForm,
  getAllStudents,
  updateStudentFormStatus,
  getStudentDetailsByEmail,
  getAllStaff,
  insertStaff,
  updateStaff,
  deleteStaff,
  updateMentor,
  getRequestsForStaff,
  getStaffIdByEmail,
  updateStaffAppStatus,
  getRequestsForStatus,
  requestId,
  getStaffRole,
  getReports,
  updateMTStatus,
  login,
  getApprovedForStaff,
  // getRequestsByStaffId,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/authenticate");

const router = express.Router();

router.post('/login', login)
router.get("/getUser", getUsers);
router.post("/insertRequestForm", insertRequestForm);

router.get('/health', isAuthenticated, async(req, res) => {
  const user = req.user

  console.log(user)

  return res.send(user)
})

router.put("/updateStudentFormStatus/:esim_id", updateStudentFormStatus);
router.get("/getStudentDetailsByEmail/:email", getStudentDetailsByEmail);
router.get("/staff", getAllStaff);

// Admin Mapping
router.get("/getAllStudents", getAllStudents);
router.post("/insertStaff", insertStaff);
router.put("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);
router.post("/updateMentor", updateMentor);

// Staff status and Approve and reject
router.get("/getRequestsForStaff/:staffid", getRequestsForStaff);
router.get("/getRequestsForStatus/:staffid", getRequestsForStatus);
router.put("/updateStaffAppStatus/:id", updateStaffAppStatus);
router.get("/getStaffId/:email", getStaffIdByEmail);

// Student
router.get("/requestId/:esim_id", requestId);
router.get("/getStaffRole/:esim_id", getStaffRole);

router.get("/updateMTStatus", updateMTStatus);
router.get("/getReports", getReports);
router.get("/getApprovedForStaff/:staffid", getApprovedForStaff);

module.exports = router;
