const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const NoDueRequestForm = require("../models/nodueRequestForm");
const NoDueStudentTable = require("../models/student");
const NoDueAutomationRequest = require("../models/nodueAutomationRequest");
const Staff = require("../models/staff");
const Student = require("../models/student");
const NodueAuthoritie = require("../models/authoritie");
const { where } = require("sequelize");
const QRCode = require("qrcode");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')


require('dotenv').config()

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["useremail", "password", "usertype"],
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateToken = (userPayload) => {
  return jwt.sign({ userPayload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      useremail: email,
    },
  });

  if (!user) {
    return res.json({
      status: 401,
      message: "user not registered",
      token: "",
    });
  }

  if ( password !== user.password) {
    return res.json({
      status: 401,
      message: "unauthorised user",
      token: "",
    });
  }
  console.log(user)
  return res.json({
    status: 200,
    message: "login success",
    token: generateToken({
      email: user.useremail,
      type: user.usertype
    }),
  });
}

// exports.insertRequestForm = async (req, res) => {
//   try {
//     const { reg_num, esim_id, department, semester,reson } = req.body;
//     if (!reg_num || !esim_id || !department || !semester) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }
//     const newFormId = uuidv4();
//     const newRequestForm = await NoDueRequestForm.create({
//       id: newFormId,
//       stu_id: esim_id,
//       reg_num: reg_num,
//       status: null,
//       submit_Date: new Date(),
//       ap_re_date: null,
//       comment: null,
//     });
//     const staffDetails = await Staff.findOne({
//       where: { department: department, semester: semester },
//       attributes: ["hod", "classadvi", "library", "accounts", "staffId"],
//     });

//     if (!staffDetails) {
//       return res.status(404).json({
//         message:
//           "No staff details found for the provided department and semester",
//       });
//     }
//     const studentDetails = await NoDueStudentTable.findOne({
//       where: { esim_id: esim_id },
//       attributes: ["mentor"],
//     });
//     if (!studentDetails || !studentDetails.mentor) {
//       return res
//         .status(404)
//         .json({ message: "No mentor found for the provided ESIM ID" });
//     }
//     const mentorId = studentDetails.mentor;
//     const staffIds = [
//       staffDetails.hod,
//       staffDetails.classadvi,
//       staffDetails.library,
//       staffDetails.accounts,
//       ...(staffDetails.staffId || []),
//       mentorId,
//     ].filter((id) => id);
//     console.log(staffIds);

//     const automationRequests = await Promise.all(
//       staffIds.map(async (staffId) => {
//         const automationRequestId = uuidv4();

//         return await NoDueAutomationRequest.create({
//           id: automationRequestId,
//           formRequestId: newFormId,
//           staffid: staffId,
//           status: null,
//           date: null,
//           comment: null,
//         });
//       })
//     );
//     res.status(201).json({
//       message:
//         "Request form submitted successfully and automation requests created",
//       data: {
//         newRequestForm,
//         automationRequests,
//       },
//     });
//   } catch (error) {
//     console.error("Error inserting request form:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


exports.insertRequestForm = async (req, res) => {
  try {
    // Extracting reason from the request body
    const { reg_num, esim_id, department, semester, reason } = req.body;

    // Check for required fields, including reason
    if (!reg_num || !esim_id || !department || !semester || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log(req.body.reason)

    const newFormId = uuidv4();

    // Including reason in the newRequestForm creation
    const newRequestForm = await NoDueRequestForm.create({
      id: newFormId,
      stu_id: esim_id,
      reg_num: reg_num,
      status: null,
      submit_Date: new Date(),
      ap_re_date: null,
      comment: null,
      reason: reason, // Add the reason field here
    });

    const staffDetails = await Staff.findOne({
      where: { department: department, semester: semester },
      attributes: ["hod", "classadvi", "library", "accounts", "staffId"],
    });

    if (!staffDetails) {
      return res.status(404).json({
        message:
          "No staff details found for the provided department and semester",
      });
    }

    const studentDetails = await NoDueStudentTable.findOne({
      where: { esim_id: esim_id },
      attributes: ["mentor"],
    });

    if (!studentDetails || !studentDetails.mentor) {
      return res
        .status(404)
        .json({ message: "No mentor found for the provided ESIM ID" });
    }

    const mentorId = studentDetails.mentor;
    const staffIds = [
      staffDetails.hod,
      staffDetails.classadvi,
      staffDetails.library,
      staffDetails.accounts,
      ...(staffDetails.staffId || []),
      mentorId,
    ].filter((id) => id);
    console.log(staffIds);

    const automationRequests = await Promise.all(
      staffIds.map(async (staffId) => {
        const automationRequestId = uuidv4();

        return await NoDueAutomationRequest.create({
          id: automationRequestId,
          formRequestId: newFormId,
          staffid: staffId,
          status: null,
          date: null,
          comment: null,
        });
      })
    );

    res.status(201).json({
      message:
        "Request form submitted successfully and automation requests created",
      data: {
        newRequestForm,
        automationRequests,
      },
    });
  } catch (error) {
    console.error("Error inserting request form:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllStudents = async (req, res) => {
  try {
    const students = await NoDueStudentTable.findAll({
      attributes: [
        "esim_id",
        "student_name",
        "department",
        "year",
        "semester",
        "date_of_birth",
        "mobile_number",
        "formEnabled",
        "mentor",
      ],
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudentFormStatus = async (req, res) => {
  try {
    const { esim_id } = req.params;
    const { formEnabled } = req.body;

    const [updated] = await NoDueStudentTable.update(
      { formEnabled },
      { where: { esim_id } }
    );

    if (updated) {
      res.status(200).json({ message: "Student updated successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentDetailsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const student = await NoDueStudentTable.findOne({
      where: { mail_id: email },
      attributes: [
        "esim_id",
        "student_name",
        "mail_id",
        "department",
        "semester",
        "formEnabled",
      ],
    });

    if (student) {
      res.status(200).json({
        message: "Student found",
        studentDetails: student,
        formEnabled: student.formEnabled,
      });
    } else {
      res.status(404).json({
        message: "Student not found",
        formEnabled: false,
      });
    }
  } catch (error) {
    console.error("Error fetching student details by email:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insertStaff = async (req, res) => {
  try {
    const {
      department,
      semester,
      year,
      staffIds,
      hodid,
      classadvisorid,
      library,
      accounts,
    } = req.body;

    if (
      !department ||
      !semester ||
      !year ||
      !staffIds ||
      !Array.isArray(staffIds) ||
      (typeof hodid !== "string" && hodid !== null) ||
      (typeof classadvisorid !== "string" && classadvisorid !== null) ||
      (typeof library !== "string" && library !== null) ||
      (typeof accounts !== "string" && accounts !== null)
    ) {
      return res.status(400).json({ error: "Invalid data provided" });
    }

    const newStaff = await Staff.create({
      id: uuidv4(),
      department,
      semester,
      year,
      staffId: staffIds,
      classadvi: classadvisorid,
      hod: hodid,
      library: library,
      accounts: accounts,
    });

    res.status(201).json({
      message: "Staff member added successfully",
      data: newStaff,
    });
  } catch (error) {
    console.error("Error inserting staff member:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { department, semester, year, staffid, classadvi, hod } = req.body;

    const [updated] = await Staff.update(
      { department, semester, year, staffid, classadvi, hod },
      { where: { id } }
    );

    if (updated) {
      res.status(200).json({ message: "Staff member updated successfully" });
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    console.error("Error updating staff member:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Staff.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: "Staff member deleted successfully" });
    } else {
      res.status(404).json({ message: "Staff member not found" });
    }
  } catch (error) {
    console.error("Error deleting staff member:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const { selectedIds, mentorId } = req.body;
    console.log("Request body:", req.body);
    if (
      !selectedIds ||
      !Array.isArray(selectedIds) ||
      selectedIds.length === 0 ||
      !mentorId
    ) {
      console.error("Invalid input:", { selectedIds, mentorId });
      return res.status(400).json({ message: "Invalid data provided" });
    }
    const updated = await NoDueStudentTable.update(
      { mentor: mentorId },
      {
        where: {
          esim_id: selectedIds,
        },
      }
    );

    if (updated[0] > 0) {
      res.status(200).json({
        message: "Mentor updated successfully for specified students",
        updatedCount: updated[0],
      });
    } else {
      res
        .status(404)
        .json({ message: "No students found with the provided ESIM IDs" });
    }
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getRequestsForStaff = async (req, res) => {
  const { staffid } = req.params;

  var stu_id = [];
  var stuDetails = [];

  try {
    const formRequestId = await NoDueAutomationRequest.findAll({
      attributes: ["formRequestId", "id","status"],
      where: {
        staffid,
        [Op.or] : [{ status: false}, {status: null}]
      }
    });

    for (let i = 0; i < formRequestId.length; i++) {
      const id = formRequestId[i].formRequestId;

      const stuID = await NoDueRequestForm.findAll({
        attributes: ["stu_id"],
        where: {
          id: id,
        },
      });

      // console.log(id, " ",stuID[0].stu_id)
      var esimId = stuID[0].stu_id;
      const student = await Student.findAll({
        where: {
          esim_id: esimId,
        },
      });

      student.push(formRequestId[i].id);
      student.push(formRequestId[i].status);
      stuDetails.push(student);
    }
    return res.send(stuDetails);
  } catch (error) {
    console.log(error);
    return res.send({
      message: "server error",
      error: error,
    });
  }
};

exports.getApprovedForStaff = async (req, res) => {
  const { staffid } = req.params;

  var stu_id = [];
  var stuDetails = [];

  try {
    const formRequestId = await NoDueAutomationRequest.findAll({
      attributes: ["formRequestId", "id", "status"],
      where: {
        staffid,
        status:true,
      },
    });

    for (let i = 0; i < formRequestId.length; i++) {
      const id = formRequestId[i].formRequestId;

      const stuID = await NoDueRequestForm.findAll({
        attributes: ["stu_id"],
        where: {
          id: id,
        },
      });

      // console.log(id, " ",stuID[0].stu_id)
      var esimId = stuID[0].stu_id;
      const student = await Student.findAll({
        where: {
          esim_id: esimId,
        },
      });

      student.push(formRequestId[i].id);
      student.push(formRequestId[i].status);
      stuDetails.push(student);
    }
    return res.send(stuDetails);
  } catch (error) {
    console.log(error);
    return res.send({
      message: "server error",
      error: error,
    });
  }
};

exports.getRequestsForStatus = async (req, res) => {
  const { staffid } = req.params;

  var stu_id = [];
  var stuDetails = [];

  try {
    const Status = await NoDueAutomationRequest.findAll({
      attributes: ["status", "date"],
      where: {
        staffid,
      },
    });

    // for (let i = 0; i < formRequestId.length; i++) {
    //   const id = formRequestId[i].formRequestId;

    //   const stuID = await NoDueRequestForm.findAll({
    //     attributes: ["stu_id"],
    //     where: {
    //       id: id,
    //     },
    //   });

    //   // console.log(id, " ",stuID[0].stu_id)
    //   var esimId = stuID[0].stu_id;
    //   const student = await Student.findAll({
    //     where: {
    //       esim_id: esimId,
    //     },
    //   });

    //   student.push(formRequestId[i].id);
    //   stuDetails.push(student);
    // }
    return res.send(Status);
  } catch (error) {
    console.log(error);
    return res.send({
      message: "server error",
      error: error,
    });
  }
};

exports.updateStaffAppStatus = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  try {
    const result = await NoDueAutomationRequest.update(
      { status, comment, date: new Date() },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({
      message: "update successful",
      status: 200,
      result: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
      error: error,
    });
  }
};

exports.updateMTStatus = async (req, res) => {
  try {
    const nodueReq = await NoDueRequestForm.findAll();

    console.log(nodueReq);
    for (let i = 0; i < nodueReq.length; i++) {
      console.log(i, " ", nodueReq[i].id);
      var formID = nodueReq[i].id;
      var nodueARRes = await NoDueAutomationRequest.findAll({
        where: {
          formRequestId: formID,
          status: false,
        },
      });
      console.log(nodueARRes);

      if (nodueARRes.length == 0) {
        var result = await NoDueRequestForm.update(
          { status: true, ap_re_date: new Date(), comment: "approved" },
          {
            where: {
              id: formID,
            },
          }
        );
        console.log("result", result);
      }
    }

    const qr = await NoDueRequestForm.findOne({
      where: {
        id: formID,
      },
      attributes: ["stu_id", "reg_num", "submit_Date", "ap_re_date", "comment"],
    });

    if (qr) {
      const today = new Date().toISOString().split("T")[0];
      const approvalDate = new Date(qr.ap_re_date).toISOString().split("T")[0];
      if (approvalDate === today) {
        const qrData = `Student ID: ${qr.stu_id}, Reg Num: ${qr.reg_num}, Submit Date: ${qr.submit_Date}, Approval Date: ${qr.ap_re_date}, Comment: ${qr.comment}`;
        const qrCodeImagePath = path.join(__dirname, "qrcode.png");
        await QRCode.toFile(qrCodeImagePath, qrData, {
          type: "png",
          width: 300,
          errorCorrectionLevel: "H",
        });
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "svinothkumar0301@gmail.com",
            pass: "olhd delx dvrn qekq",
          },
        });
        let mailOptions = {
          from: "svinothkumar0301@gmail.com",
          to: "svinothkumar0301@gmail.com", 
          subject: "Your Request is Approved",
          text: "Your submitted request is approved by all the authorities. Please find the attached QR code for verification.",
          attachments: [
            {
              filename: "qrcode.png",
              path: qrCodeImagePath,
            },
          ],

        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
            return res
              .status(500)
              .json({ message: "Error sending email", error: error });
          } else {
            console.log("Email sent: " + info.response);
            fs.unlinkSync(qrCodeImagePath);
            return res.json({
              message: "Complete, QR code generated and email sent.",
            });
          }
        });
      } else {
        return res.json({
          message: "Approval date is not today. QR code will not be generated.",
        });
      }
    } else {
      return res.json({
        message: "No data found for the specified form ID",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Server error",
      error: error,
    });
  }
};

exports.getStaffIdByEmail = async (req, res) => {
  console.log(req.params);
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const staff = await NodueAuthoritie.findOne({
      where: { email: email },
      attributes: ["esim_id"],
    });

    if (!staff) {
      return res
        .status(404)
        .json({ message: "Staff not found for the provided email ID" });
    }

    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff ID:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.requestId = async (req, res) => {
  try {
    const stuId = req.params.esim_id;

    const requestDetail = await NoDueRequestForm.findAll({
      where: { stu_id: stuId },
      attributes: ["id"],
    });
    const ids = requestDetail.map((request) => request.id);
    const formstatus = await NoDueAutomationRequest.findAll({
      attributes: ["staffid", "status", "date","comment"],
      where: {
        formRequestId: ids,
      },
    });

    if (!requestDetail || requestDetail.length === 0) {
      return res
        .status(404)
        .json({ message: "No requests found for the provided student ID" });
    }

    res.json(formstatus);
  } catch (error) {
    console.error("Error fetching request details:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getStaffRole = async (req, res) => {
  try {
    const id = req.params.esim_id;
    const requestDetail = await NodueAuthoritie.findAll({
      where: { esim_id: id },
      attributes: ["role", "subject_name","authoritie_name"],
    });

    res.json(requestDetail);
  } catch (error) {
    console.error("Error fetching request details:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await NodueAuthoritie.findAll({
      attributes: ["esim_id", "role", "department_id"],
    });
    const ids = reports.map((report) => report.esim_id);
    const requests = await NoDueAutomationRequest.findAll({
      where: {
        staffid: ids,
      },
      attributes: ["staffid", "status", "date"],
    });
    const mergedData = reports.map((report) => {
      const relatedRequest = requests.find(
        (request) => request.staffid === report.esim_id
      );
      return {
        ...report.dataValues,
        status: relatedRequest ? relatedRequest.status : null,
        date: relatedRequest ? relatedRequest.date : null,
      };
    });
    res.json(mergedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};