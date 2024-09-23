// My Groupmates
const validStudents = [
    { name: 'Sam Araujo', id: '24-1822' },
    { name: 'Jeff Martin Mangaluz', id: '24-1838' },
    { name: 'Carter Carig', id: '24-1809' },
    { name: 'Miguel Samson', id: '24-1825' },
    { name: 'Ice Christian Mecarap', id: '24-1832' }
];

// DOM elements for sign-in
const signinForm = document.getElementById('signinForm');
const errorMessage = document.getElementById('errorMessage');

// DOM elements for attendance
const attendanceTable = document.getElementById('attendanceTable');
const studentInfo = document.getElementById('studentInfo');

// Function if student is valid to sign-in
function isValidStudent(name, id) {
    return validStudents.some(student => student.name === name && student.id === id);
}

// Handle form submission for sign-in
function handleSignIn(e) {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const studentID = document.getElementById('studentID').value;

    if (isValidStudent(studentName, studentID)) {
        errorMessage.textContent = '';
        localStorage.setItem('studentName', studentName);
        localStorage.setItem('studentID', studentID);
        window.location.href = 'attendance.html';
    } else {
        errorMessage.textContent = 'Student not recognized. Please try again.';
    }
}

// Handle displaying attendance records
function displayAttendance() {
    const studentName = localStorage.getItem('studentName');
    const studentID = localStorage.getItem('studentID');

    if (studentName && studentID) {
        studentInfo.textContent = `Welcome, ${studentName} (ID: ${studentID})`;
        addAttendanceRecord(studentName, studentID);
    } else {
        studentInfo.textContent = 'No student is signed in.';
    }
}

// to add a new attendance record to the table
function addAttendanceRecord(name, id) {
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString();
    const date = currentDate.toLocaleDateString();

    const row = `
        <tr>
            <td>${name}</td>
            <td>${id}</td>
            <td>${time}</td>
            <td>${date}</td>
        </tr>
    `;
    attendanceTable.innerHTML += row;
}

// URL
if (window.location.pathname.includes('index.html')) {
    signinForm.addEventListener('submit', handleSignIn);
} else if (window.location.pathname.includes('attendance.html')) {
    displayAttendance();
}
