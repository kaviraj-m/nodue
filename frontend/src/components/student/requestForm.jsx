// import { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// const RequestForm = () => {
//   const [formEnabled, setFormEnabled] = useState(true);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//   const [initialValues, setInitialValues] = useState({
//     reg_num: "",
//     esim_id: "",
//     student_name: "",
//     mail_id: "",
//     department: "",
//     semester: "",
//   });

//   useEffect(() => {
//     const sessionData = JSON.parse(sessionStorage.getItem("user"));
//     const email = sessionData?.useremail;

//     if (email) {
//       const url = `http://localhost:3000/api/v1/getStudentDetailsByEmail/${email}`;
//       axios
//         .get(url)
//         .then((response) => {
//           const studentDetails = response.data.studentDetails;
//           setFormEnabled(response.data.formEnabled);
//           setInitialValues({
//             reg_num: "", // Update this if necessary
//             esim_id: studentDetails.esim_id,
//             student_name: studentDetails.student_name,
//             mail_id: studentDetails.mail_id,
//             department: studentDetails.department,
//             semester: studentDetails.semester,
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching student details:", error);
//         });
//     } else {
//       console.error("No email found in session storage.");
//     }
//   }, []);

//   const validationSchema = Yup.object().shape({
//     reg_num: Yup.string().required("Registration Number is required"),
//     esim_id: Yup.string().required("ESIM ID is required"),
//     student_name: Yup.string().required("Student Name is required"),
//     mail_id: Yup.string()
//       .email("Invalid email format")
//       .required("Mail ID is required"),
//     department: Yup.string().required("Department is required"),
//     semester: Yup.string().required("Semester is required"),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     console.log(values);
//     axios
//       .post("http://localhost:3000/api/v1/insertRequestForm", values)
//       .then((response) => {
//         setSnackbarMessage("Form submitted successfully!");
//         setSnackbarSeverity("success");
//         setSnackbarOpen(true);
//         resetForm();
//       })
//       .catch((error) => {
//         setSnackbarMessage("Error submitting the form. Please try again.");
//         setSnackbarSeverity("error");
//         setSnackbarOpen(true);
//         console.error("Error submitting the form:", error);
//       });
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   return (
//     <Paper elevation={3} style={{ padding: 16 }}>
//       <Typography variant="h5" gutterBottom>
//         Request Form
//       </Typography>
//       {formEnabled ? (
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//           enableReinitialize={true}
//         >
//           {({ values, handleChange, handleBlur, errors, touched }) => (
//             <Form>
//               <Grid
//                 container
//                 spacing={2}
//                 justifyContent="center"
//                 alignItems="center"
//                 style={{ minHeight: "50vh" }}
//               >
//                 <Grid item xs={12} sm={5}>
//                   <TextField
//                     fullWidth
//                     label="Registration Number"
//                     name="reg_num"
//                     variant="outlined"
//                     value={values.reg_num}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.reg_num && Boolean(errors.reg_num)}
//                     helperText={<ErrorMessage name="reg_num" />}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={5}>
//                   <TextField
//                     fullWidth
//                     label="ESIM ID"
//                     name="esim_id"
//                     variant="outlined"
//                     value={values.esim_id}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.esim_id && Boolean(errors.esim_id)}
//                     helperText={<ErrorMessage name="esim_id" />}
//                     InputProps={{ readOnly: true }} // Make field read-only
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     fullWidth
//                     label="Student Name"
//                     name="student_name"
//                     variant="outlined"
//                     value={values.student_name}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.student_name && Boolean(errors.student_name)}
//                     helperText={<ErrorMessage name="student_name" />}
//                     InputProps={{ readOnly: true }} // Make field read-only
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     fullWidth
//                     label="Mail ID"
//                     name="mail_id"
//                     variant="outlined"
//                     value={values.mail_id}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.mail_id && Boolean(errors.mail_id)}
//                     helperText={<ErrorMessage name="mail_id" />}
//                     InputProps={{ readOnly: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     fullWidth
//                     label="Department"
//                     name="department"
//                     variant="outlined"
//                     value={values.department}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.department && Boolean(errors.department)}
//                     helperText={<ErrorMessage name="department" />}
//                     InputProps={{ readOnly: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     fullWidth
//                     label="Semester"
//                     name="semester"
//                     variant="outlined"
//                     value={values.semester}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={touched.semester && Boolean(errors.semester)}
//                     helperText={<ErrorMessage name="semester" />}
//                     InputProps={{ readOnly: true }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <Button type="submit" variant="contained" color="primary">
//                     Submit
//                   </Button>
//                 </Grid>
//               </Grid>
//             </Form>
//           )}
//         </Formik>
//       ) : (
//         <Typography variant="h6" color="error">
//           The form is currently disabled.
//         </Typography>
//       )}

//       {/* Snackbar for success and error messages */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Paper>
//   );
// };

// export default RequestForm;

import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RequestForm = () => {
  const [formEnabled, setFormEnabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [initialValues, setInitialValues] = useState({
    reg_num: "",
    esim_id: "",
    student_name: "",
    mail_id: "",
    department: "",
    semester: "",
    reason: "",
  });

  useEffect(() => {
    const sessionData = JSON.parse(sessionStorage.getItem("user"));
    const email = sessionData?.useremail;

    if (email) {
      const url = `http://localhost:3000/api/v1/getStudentDetailsByEmail/${email}`;
      axios
        .get(url)
        .then((response) => {
          const studentDetails = response.data.studentDetails;
          setFormEnabled(response.data.formEnabled);
          setInitialValues({
            reg_num: "", // Update this if necessary
            esim_id: studentDetails.esim_id,
            student_name: studentDetails.student_name,
            mail_id: studentDetails.mail_id,
            department: studentDetails.department,
            semester: studentDetails.semester,
            reason: "", 
          });
        })
        .catch((error) => {
          console.error("Error fetching student details:", error);
        });
    } else {
      console.error("No email found in session storage.");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    reg_num: Yup.string().required("Registration Number is required"),
    esim_id: Yup.string().required("ESIM ID is required"),
    student_name: Yup.string().required("Student Name is required"),
    mail_id: Yup.string()
      .email("Invalid email format")
      .required("Mail ID is required"),
    department: Yup.string().required("Department is required"),
    semester: Yup.string().required("Semester is required"),
    reason: Yup.string().required("Reason is required"), // Added reason validation
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    axios
      .post("http://localhost:3000/api/v1/insertRequestForm", values)
      .then((response) => {
        setSnackbarMessage("Form submitted successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        resetForm();
      })
      .catch((error) => {
        setSnackbarMessage("Error submitting the form. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error submitting the form:", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        Request Form
      </Typography>
      {formEnabled ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "50vh" }}
              >
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Registration Number"
                    name="reg_num"
                    variant="outlined"
                    value={values.reg_num}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.reg_num && Boolean(errors.reg_num)}
                    helperText={<ErrorMessage name="reg_num" />}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="ESIM ID"
                    name="esim_id"
                    variant="outlined"
                    value={values.esim_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.esim_id && Boolean(errors.esim_id)}
                    helperText={<ErrorMessage name="esim_id" />}
                    InputProps={{ readOnly: true }} // Make field read-only
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Student Name"
                    name="student_name"
                    variant="outlined"
                    value={values.student_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.student_name && Boolean(errors.student_name)}
                    helperText={<ErrorMessage name="student_name" />}
                    InputProps={{ readOnly: true }} // Make field read-only
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Mail ID"
                    name="mail_id"
                    variant="outlined"
                    value={values.mail_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.mail_id && Boolean(errors.mail_id)}
                    helperText={<ErrorMessage name="mail_id" />}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    variant="outlined"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.department && Boolean(errors.department)}
                    helperText={<ErrorMessage name="department" />}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Semester"
                    name="semester"
                    variant="outlined"
                    value={values.semester}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.semester && Boolean(errors.semester)}
                    helperText={<ErrorMessage name="semester" />}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    fullWidth
                    label="Reason"
                    name="reason"
                    variant="outlined"
                    value={values.reason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.reason && Boolean(errors.reason)}
                    helperText={<ErrorMessage name="reason" />}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <Typography variant="h6" color="error">
          The form is currently disabled.
        </Typography>
      )}

      {/* Snackbar for success and error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default RequestForm;
