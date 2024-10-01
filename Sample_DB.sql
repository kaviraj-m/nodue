use nodue;
-- Create the nodue_studenttable
CREATE TABLE nodue_studenttable (
    esim_id VARCHAR(255) NOT NULL,
    student_name TEXT,
    mail_id VARCHAR(255) UNIQUE,
    department VARCHAR(255),
    semester int,
    date_of_birth DATE,
    mobile_number VARCHAR(255),
    year VARCHAR(255),
    formEnabled BOOLEAN DEFAULT FALSE,
    mentor varchar(255) null,
    PRIMARY KEY (esim_id)
);

-- Create the nodue_requestform table with id as VARCHAR
CREATE TABLE nodue_requestform (
    id VARCHAR(255) NOT NULL,
    stu_id VARCHAR(255) NOT NULL,
    reg_num VARCHAR(255) NOT NULL,
    status bool,
    submit_Date DATE,
    ap_re_date DATE,
    comment TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (stu_id) REFERENCES nodue_studenttable(esim_id)
);

-- Create the nodue_qr table
CREATE TABLE nodue_qr (
    id VARCHAR(255) NOT NULL,
    stu_id VARCHAR(255) NOT NULL,
    generated_date DATE,
    status bool,
    PRIMARY KEY (id),
    FOREIGN KEY (stu_Id) REFERENCES nodue_studenttable(esim_id)
);

-- Create the nodue_authoritie table
CREATE TABLE nodue_authoritie (
    esim_id VARCHAR(255) NOT NULL,
    authoritie_name VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    department_id varchar(255),
     subject_name VARCHAR(255),
    PRIMARY KEY (esim_id)
);

UPDATE nodue_authoritie
SET role = "staff";

select * from nodue_authoritie;

-- Create the nodue_request_authorities table for mapping authorities to requests
CREATE TABLE nodue_request_authorities (
    request_id VARCHAR(255) NOT NULL,
    authority_id VARCHAR(255) NOT NULL,
    status bool,
    comment TEXT,
    action_date DATE,
    PRIMARY KEY (request_id, authority_id),
    FOREIGN KEY (request_id) REFERENCES nodue_requestform(id),
    FOREIGN KEY (authority_id) REFERENCES nodue_authoritie(esim_id)
);

Drop table nodue_request_authorities;

-- Create the nodue_coe table
CREATE TABLE nodue_coe (
    id VARCHAR(255) NOT NULL,
    stu_id VARCHAR(255) NOT NULL,
    exam_fee_status bool,
    qr_code TEXT,
    hall_ticket_issued bool,
    PRIMARY KEY (id),
    FOREIGN KEY (stu_id) REFERENCES nodue_studenttable(esim_id)
);



-- Create the user table
CREATE TABLE user (
    useremail VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    usertype VARCHAR(50),
    PRIMARY KEY (useremail)
);

CREATE TABLE nodue_automationrequest (
    id varchar(255) PRIMARY KEY,
    formRequestId VARCHAR(255) NOT NULL,
    staffid VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT FALSE,
    date TIMESTAMP NULL,
    comment TEXT NULL,
    FOREIGN KEY (formRequestId) REFERENCES nodue_requestform(id)
);

CREATE TABLE staff (
    id VARCHAR(255) PRIMARY KEY, -- UUID for unique ID
    department VARCHAR(100) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    year VARCHAR(4) NOT NULL,
    staffid JSON NOT NULL, -- Using JSON to store multiple staff IDs
    classadvi VARCHAR(100), -- Class advisor, can be NULL
    hod VARCHAR(100),
    library VARCHAR(255),
    accounts VARCHAR(255)
);

drop table staff;
select * from staff;
SELECT * FROM staff WHERE department = 'Computer Sciences' AND semester = '5';

select * from nodue_authoritie;

-- Insert sample data into nodue_studenttable
INSERT INTO nodue_studenttable (esim_id, student_name, mail_id, department, semester, date_of_birth, mobile_number, year,formEnabled)
VALUES
    ('E21CS025', 'Vinoth', 'e21cs025@gmail.com', 'Computer Science', 5, '2000-01-15', '1234567890', 'Third Year',0),
    ('E21CS026', 'Arun', 'e21cs026@gmail.com', 'Computer Science', 5, '2000-02-20', '0987654321', 'Third Year',0),
    ('E21CS027', 'Priya', 'e21cs027@gmail.com', 'Computer Science', 5, '2000-03-25', '1122334455', 'Third Year',0),
    ('E21CS028', 'Karthik', 'e21cs028@gmail.com', 'Computer Science', 5, '2000-04-30', '2233445566', 'Third Year',0),
    ('E21CS029', 'Meera', 'e21cs029@gmail.com', 'Computer Science', 5, '2000-05-10', '3344556677', 'Third Year',0);

select * from nodue_authorities;

-- Insert sample data into nodue_authoritie
INSERT INTO nodue_authoritie (esim_id, authoritie_name, email, role, department_id, subject_name)
VALUES
('hodid001', 'Anna Smith', 'hodid001@gmail.com', 'hod', 'dept001', 'Mathematics'),
('hodid002', 'Brian White', 'hodid002@gmail.com', 'hod', 'dept002', 'Physics'),
('hodid003', 'Emma Wilson', 'hodid003@gmail.com', 'hod', 'dept003', 'Chemistry'),
('hodid004', 'Liam Davis', 'hodid004@gmail.com', 'hod', 'dept004', 'Biology'),
('hodid005', 'Noah Miller', 'hodid005@gmail.com', 'hod', 'dept005', 'English'),
('staffid001', 'John Doe', 'staffid001@gmail.com', 'staff', 'dept001', 'Mathematics'),
('staffid002', 'Jane Doe', 'staffid002@gmail.com', 'staff', 'dept002', 'Physics'),
('staffid003', 'Michael Brown', 'staffid003@gmail.com', 'staff', 'dept003', 'Chemistry'),
('staffid004', 'Olivia Jones', 'staffid004@gmail.com', 'staff', 'dept004', 'Biology'),
('staffid005', 'Sophia Johnson', 'staffid005@gmail.com', 'staff', 'dept005', 'English'),
('staffid006', 'William Lee', 'staffid006@gmail.com', 'staff', 'dept006', 'History'),
('staffid007', 'James Harris', 'staffid007@gmail.com', 'staff', 'dept007', 'Geography'),
('staffid008', 'Charlotte Garcia', 'staffid008@gmail.com', 'staff', 'dept008', 'Computer Science'),
('staffid009', 'Amelia Clark', 'staffid009@gmail.com', 'staff', 'dept009', 'Biotechnology'),
('staffid010', 'Mia Lopez', 'staffid010@gmail.com', 'staff', 'dept010', 'Economics'),
('mentorid001', 'David Kim', 'mentorid001@gmail.com', 'mentor', 'dept001', 'Mathematics'),
('mentorid002', 'Emily Davis', 'mentorid002@gmail.com', 'mentor', 'dept003', 'Chemistry'),
('mentorid003', 'James King', 'mentorid003@gmail.com', 'mentor', 'dept005', 'English'),
('mentorid004', 'Sophia Lee', 'mentorid004@gmail.com', 'mentor', 'dept007', 'Geography'),
('classadvisorid001', 'Michael Green', 'classadvisorid001@gmail.com', 'classadvisor', 'dept002', 'Physics'),
('classadvisorid002', 'Jessica Clark', 'classadvisorid002@gmail.com', 'classadvisor', 'dept004', 'Biology'),
('classadvisorid003', 'Daniel Robinson', 'classadvisorid003@gmail.com', 'classadvisor', 'dept006', 'History'),
('classadvisorid004', 'Sarah Scott', 'classadvisorid004@gmail.com', 'classadvisor', 'dept008', 'Computer Science'),
('libid001', 'Olivia Brown', 'libid001@gmail.com', 'lib', 'libdept', 'Library Science'),
('accid001', 'Mason Johnson', 'accid001@gmail.com', 'accounts', 'accdept', 'Finance');

-- Insert sample data into nodue_qr
INSERT INTO nodue_qr (id, stu_id, generated_date, status)
VALUES
    ('QR001', 'E21CS025', '2024-08-20', true);

-- Insert sample data into nodue_coe
INSERT INTO nodue_coe (id, stu_id, exam_fee_status, qr_code, hall_ticket_issued)
VALUES
    ('COE001', 'E21CS025', true, 'QRCODE123456', true);
    
-- Insert sample data into user table
INSERT INTO user (useremail, password, usertype)
VALUES
('e21cs025@gmail.com', 'e21cs025pass', 'student'),
('e21cs026@gmail.com', 'e21cs026pass', 'student'),
('e21cs027@gmail.com', 'e21cs027pass', 'student'),
('e21cs028@gmail.com', 'e21cs028pass', 'student'),
('e21cs029@gmail.com', 'e21cs029pass', 'student'),
('staffid001@gmail.com', 'staff01pass', 'staff'),
('staffid002@gmail.com', 'staff02pass', 'staff'),
('staffid003@gmail.com', 'staff03pass', 'staff'),
('staffid004@gmail.com', 'staff04pass', 'staff'),
('staffid005@gmail.com', 'staff05pass', 'staff'),
('staffid006@gmail.com', 'staff06pass', 'staff'),
('staffid007@gmail.com', 'staff07pass', 'staff'),
('staffid008@gmail.com', 'staff08pass', 'staff'),
('staffid009@gmail.com', 'staff09pass', 'staff'),
('staffid010@gmail.com', 'staff10pass', 'staff'),
('hodid001@gmail.com', 'hod01pass', 'staff'),
('hodid002@gmail.com', 'hod02pass', 'staff'),
('hodid003@gmail.com', 'hod03pass', 'staff'),
('hodid004@gmail.com', 'hod04pass', 'staff'),
('hodid005@gmail.com', 'hod05pass', 'staff'),
('mentorid001@gmail.com', 'mentor01pass', 'staff'),
('mentorid002@gmail.com', 'mentor02pass', 'staff'),
('mentorid003@gmail.com', 'mentor03pass', 'staff'),
('mentorid004@gmail.com', 'mentor04pass', 'staff'),
('classadvisorid001@gmail.com', 'classadvisor01pass', 'staff'),
('classadvisorid002@gmail.com', 'classadvisor02pass', 'staff'),
('classadvisorid003@gmail.com', 'classadvisor03pass', 'staff'),
('classadvisorid004@gmail.com', 'classadvisor04pass', 'staff'),
('coe001@gmail.com', 'coe01pass', 'COE'),
('coe002@gmail.com', 'coe02pass', 'COE'),
('admin@gmail.com', 'adminpass', 'admin'),
('libid001@gmail.com', 'libid001pass', 'staff'),
('accid001@gmail.com', 'accid001pass', 'staff');
    
select * from user;
drop table user;
INSERT INTO user (useremail, password, usertype)
VALUES
	('admin01@institution.com', 'admin01pass', 'admin');

use nodue;

select * from nodue_studenttable;

select * from nodue_automationrequest;

select * from nodue_requestform;


INSERT INTO nodue_studenttable (esim_id, student_name, mail_id, department, semester, date_of_birth, mobile_number, year, formEnabled)
VALUES
    -- ECE Department
    ('E21EC030', 'Ravi', 'e21ec030@gmail.com', 'Electronics and Communication', 5, '2000-06-15', '4455667788', 'Third Year', 0),
    ('E21EC031', 'Anitha', 'e21ec031@gmail.com', 'Electronics and Communication', 5, '2000-07-20', '5566778899', 'Third Year', 0),
    ('E21EC032', 'Vijay', 'e21ec032@gmail.com', 'Electronics and Communication', 5, '2000-08-25', '6677889900', 'Third Year', 0),
    ('E21EC033', 'Lakshmi', 'e21ec033@gmail.com', 'Electronics and Communication', 5, '2000-09-30', '7788990011', 'Third Year', 0),
    ('E21EC034', 'Suresh', 'e21ec034@gmail.com', 'Electronics and Communication', 5, '2000-10-05', '8899001122', 'Third Year', 0),
    
    -- Mechanical Department
    ('E21ME035', 'Rajesh', 'e21me035@gmail.com', 'Mechanical Engineering', 5, '2000-11-10', '9900112233', 'Third Year', 0),
    ('E21ME036', 'Divya', 'e21me036@gmail.com', 'Mechanical Engineering', 5, '2000-12-15', '1011122233', 'Third Year', 0),
    ('E21ME037', 'Manoj', 'e21me037@gmail.com', 'Mechanical Engineering', 5, '2001-01-20', '1122334455', 'Third Year', 0),
    ('E21ME038', 'Pooja', 'e21me038@gmail.com', 'Mechanical Engineering', 5, '2001-02-25', '2233445566', 'Third Year', 0),
    ('E21ME039', 'Ajay', 'e21me039@gmail.com', 'Mechanical Engineering', 5, '2001-03-30', '3344556677', 'Third Year', 0),

    -- IT Department
    ('E21IT040', 'Kiran', 'e21it040@gmail.com', 'Information Technology', 5, '2000-04-10', '4455667788', 'Third Year', 0),
    ('E21IT041', 'Sneha', 'e21it041@gmail.com', 'Information Technology', 5, '2000-05-15', '5566778899', 'Third Year', 0),
    ('E21IT042', 'Naveen', 'e21it042@gmail.com', 'Information Technology', 5, '2000-06-20', '6677889900', 'Third Year', 0),
    ('E21IT043', 'Aishwarya', 'e21it043@gmail.com', 'Information Technology', 5, '2000-07-25', '7788990011', 'Third Year', 0),
    ('E21IT044', 'Ramesh', 'e21it044@gmail.com', 'Information Technology', 5, '2000-08-30', '8899001122', 'Third Year', 0),
    
    -- Agriculture Department
    ('E21AG045', 'Mohan', 'e21ag045@gmail.com', 'Agricultural Engineering', 5, '2000-09-05', '9900112233', 'Third Year', 0),
    ('E21AG046', 'Kavya', 'e21ag046@gmail.com', 'Agricultural Engineering', 5, '2000-10-10', '1011122233', 'Third Year', 0),
    ('E21AG047', 'Praveen', 'e21ag047@gmail.com', 'Agricultural Engineering', 5, '2000-11-15', '1122334455', 'Third Year', 0),
    ('E21AG048', 'Shalini', 'e21ag048@gmail.com', 'Agricultural Engineering', 5, '2000-12-20', '2233445566', 'Third Year', 0),
    ('E21AG049', 'Ashok', 'e21ag049@gmail.com', 'Agricultural Engineering', 5, '2001-01-25', '3344556677', 'Third Year', 0);

