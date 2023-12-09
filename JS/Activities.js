const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;


// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");
  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}


// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^(66+\d{8})$/; // 66xxxxxxxx
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test (studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID. Please provide a valid Student ID in the format '66XXXXXXXX'.";;
    return false;
    
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
  
}


// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent = "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
    return true;
  }
 
}

function validateTypeWork(){
  const typeworkinput = document.getElementById("activityType");
  const errorElement = document.getElementById("activityTypeError");
  
  if(typeworkinput.value === ""){
    errorElement.textContent ="Please select.";
    return false;
  } else {
    errorElement.textContent= ""; 
    return true;
  }
}

const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const errorElement = document.getElementById("emailError");

function getEmailUsername(email) {
return email.split('@')[0]; 
}
function checkEmailUsername() {
const fullname = fullnameInput.value.trim();
const email = emailInput.value.trim();

if (email.length > 0) {
  const emailUsername = getEmailUsername(email).toLowerCase(); 

  const nameParts = fullname.split(' ');
  const firstName = nameParts[0].toLowerCase(); 
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
  const expectedUsername = `${firstName}.${lastName.slice(0, 3)}`;

  if (emailUsername === expectedUsername) 
  {
    errorElement.textContent= ""; 
    return true;
  }
  else 
  {
    errorElement.textContent = "Please enter the email address that corresponds to the name.";
    return false;
  }    
}
}
emailInput.addEventListener('change', checkEmailUsername);



function validateacademicYear(){
const academicYearinput = document.getElementById("academicYear");
const errorElement = document.getElementById("academicYearError");

if(academicYearinput.value === ""){
  errorElement.textContent ="Please select.";
  return false;
} else {
  errorElement.textContent= ""; 
  return true;
}
}
function validatesemester(){
const semesterinput = document.getElementById("semester");
const errorElement = document.getElementById("semesterError");

if(semesterinput.value === ""){
  errorElement.textContent ="Please select.";
  return false;
} else {
  errorElement.textContent= ""; 
  return true;
}
}

const errorElementid = document.getElementById("studentIDError");
const errorElementaca= document.getElementById("academicYearError");
const studentIDInput = document.getElementById('studentID');
const academicYearSelect = document.getElementById('academicYear');
function checkStudentIDYearMatch() {
const studentIDInput = document.getElementById('studentID');
const academicYearSelect = document.getElementById('academicYear');
const studentID = studentIDInput.value.trim();
const selectedYear = academicYearSelect.value;


if (studentID.length === 10 && selectedYear.length === 4) {
  const studentIDFirstTwoDigits = studentID.slice(0, 2);
  const academicYearLastTwoDigits = selectedYear.slice(2);

  if (studentIDFirstTwoDigits === academicYearLastTwoDigits) 
  {
    errorElementid.textContent= ""; 
    errorElementaca.textContent="";
    return true;
  } 
  else 
  {
    errorElementid.textContent ="Plese enter the student number that is associated with the academic year.";
    errorElementaca.textContent="Plese enter the student number that is associated with the academic year.";
    return false;
  }
}
}
studentIDInput.addEventListener('change', checkStudentIDYearMatch);
academicYearSelect.addEventListener('change', checkStudentIDYearMatch);


function validatestartDate(){
const startDateinput = document.getElementById("startDate");
const errorElement = document.getElementById("startDateError");

if(startDateinput.value === ""){
  errorElement.textContent ="Please select.";
  return false;
} else {
  errorElement.textContent= ""; 
  return true;
}
}

function validateendDate(){
const endDateinput = document.getElementById("endDate");
const errorElement = document.getElementById("endDateError");

if(endDateinput.value === ""){
  errorElement.textContent ="Please select.";
  return false;
} else {
  errorElement.textContent= ""; 
  return true;
}
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
  validateTypeWork();
  validateacademicYear()
  validatesemester();
  validatestartDate();
  validateendDate();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(config.backendUrl + "getActivityType");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail() || !validateTypeWork() || !validateacademicYear() || !validatesemester() || !validatestartDate() || !validateendDate()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }
  
  

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(config.backendUrl + "record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}


// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
function showFormData(event) {
  event.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const studentID = document.getElementById('studentID').value;
  const email = document.getElementById('email').value;
  const workTitle = document.getElementById('workTitle').value;
  const activityType = document.getElementById('activityType').value;
  const academicYear = document.getElementById('academicYear').value;
  const semester = document.getElementById('semester').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;
  const formDataString = `
    Full Name: ${fullname}
    Student ID: ${studentID}
    Email: ${email}
    Work/Activity Title: ${workTitle}
    Type of Work/Activity: ${activityType}
    Academic Year: ${academicYear}
    Semester: ${semester}
    Start Date/Time: ${startDate}
    End Date/Time: ${endDate}
    Location: ${location}
    Description: ${description}
  `;


const existingFormData = document.querySelector('.form-data-container');
  if (existingFormData) {
    existingFormData.remove();
  }
  const formDataDisplay = document.createElement('div');
  formDataDisplay.classList.add('form-data-container');
  const formDataContent = document.createElement('pre');
  formDataContent.textContent = formDataString;
const closeButton = document.createElement('button');
closeButton.textContent = 'Close';
closeButton.classList.add('close-button'); 
closeButton.addEventListener('click', function () {
  formDataDisplay.remove();
});
formDataDisplay.appendChild(formDataContent);
formDataDisplay.appendChild(closeButton);
document.body.appendChild(formDataDisplay);
}
const submitButton = document.querySelector('input[type="submit"]');
submitButton.addEventListener('click', showFormData);
