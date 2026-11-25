// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()", causing the form to submit and refresh the page.
// Error 2 (grade.html, Line 17): Function call 'showtable()' used lowercase 't', but the function name is 'showTable()'.
// Error 3 (grade.js, Line 9): Function name 'isNan()' had a lowercase 'n', should be 'isNaN()'.
// Error 4 (grade.js, Line 14): Logical operator used '&&' instead of '||' for checking out-of-range marks (< 0 or > 100).
// Error 5 (grade.js, Line 30): Property '.style.colour' used British spelling instead of DOM standard '.style.color'.
// Error 6 (grade.js, Line 38): The loop in showTable() started at i = 1 instead of i = 0, skipping grade "A".
// Error 7 (grade.js, Line 37): Table HTML was missing the header row (Grade | Mark range).
// Error 8 (grade.js): Missing input validation check for an empty mark field.

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extended: Validate empty mark field
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Fixed Error 3: isNan() corrected to isNaN()
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseFloat(mark);

    // Fixed Error 4: Changed '&&' to '||' so out-of-range values are caught correctly
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let gradeColor = "";

    // Determine grade and color (Extended: green for A & B, orange for C, red for F)
    if (mark >= 80) {
        grade = "A";
        gradeColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        gradeColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        gradeColor = "orange";
    } else {
        grade = "F";
        gradeColor = "red";
    }

    // Display result message
    document.getElementById("result").innerHTML = name + " got grade " + grade;
    
    // Fixed Error 5: Changed style.colour to style.color and applied dynamic color
    document.getElementById("result").style.color = gradeColor;

    // Extended: Display date and time the grade was checked using Date()
    document.getElementById("checkDate").innerHTML = "Checked on: " + new Date();

    return false; // Prevents form from reloading the page
}

// Extended: Generates a random whole number from 0 to 100 and puts it into the mark field
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Function to display the grade table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    
    // Fixed Error 7: Added table header row
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    // Fixed Error 6: Loop starts at i = 0 instead of i = 1 to include grade "A"
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}