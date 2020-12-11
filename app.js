// defining the module packages
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


// defining empty team array
const team = [];

// defining the html variable
let html = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/e9279bf72f.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">`;

let htmlEnd = `              
            </div>
        </div>
    </div>
</body>
</html>`;

// funciton that prompts question about the manager
const addManager = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the manager's name?"
        },
        {
            name: "id",
            message: "What is the manager's ID number?",
            type: "number"
        },
        {
            name: "email",
            message: "What is the manager's email address",
        },
        {
            name: "officeNumber",
            message: "What is the manager's office number?",
            type: "number"
        }
    ]).then(response => {
        
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);

        const managerCard = `
        <div class="card employee-card m-3">
            <div class="card-header">
                <h2 class="card-title">${response.name}</h2>
                <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Manager</h3>
            </div>
            <div class="card-body">
                <ul class="list-group">
                    <li class="list-group-item">ID: ${response.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${response.email}">${response.email}</a></li>
                    <li class="list-group-item">Office number: ${response.officeNumber}</li>
                </ul>
            </div>
        </div>`;

        html += managerCard;

        team.push(manager);
        addTeamMember();
    })
}
// funciton that prompts question about the engineer
const addEngineer = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message:"What is the engineer's name?"
        },
        {
            name: "id",
            message: "What is the engineer's ID number?",
            type: "number"
        },
        {
            name:"email",
            message:"What is the engineer's email address?"
        },
        {
            name: "github",
            message: "What is the engineer's gitHub username?",
            type: "input"
        }
    ]).then(response => {
        const engineer = new Engineer(response.name,  response.id, response.email, response.github);
        
        const engineerCard = `
            <div class="card employee-card m-3">
                <div class="card-header">
                    <h2 class="card-title">${response.name}</h2>
                    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>Engineer</h3>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item">ID: ${response.id}</li>
                        <li class="list-group-item">Email: <a href="mailto:${response.email}">${response.email}</a></li>
                        <li class="list-group-item">GitHub: <a href="https://github.com/${response.github}" target="_blank" rel="noopener noreferrer">${response.github}</a></li>
                    </ul>
                </div>
            </div>`;
        html += engineerCard;

        team.push(engineer);
        addEmployee();
    })
}
// // funciton that prompts question about the intern
const addIntern = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message:"What is the intern's name?"
        },
        {
            name: "id",
            message: "What is the intern's ID number?",
            type: "number"
        },
        {
            name:"email",
            message:"What is the intern's email address?"
        },
        {
            name: "school",
            message: "What school is the intern attending?"
        }
    ]).then(response => {
    const intern = new Intern( response.name, response.id, response.email, response.school);

    const internCard = `
                <div class="card employee-card m-3">
                    <div class="card-header">
                        <h2 class="card-title">${response.name}</h2>
                        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>Intern</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${response.id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${response.email}">${response.email}</a></li>
                            <li class="list-group-item">School: ${response.school}</li>
                        </ul>
                    </div>
                </div>`;
        html += internCard;

        team.push(intern);
        addEmployee();
    })
}

// // funciton generates the employee cards based on user input
function generateHtml() {
    html += htmlEnd;
// output html file
    fs.writeFile("output/team.html", html, err => {
        if(err) throw err;
        console.log("Team profile generated!")
    })
}

// // prompt question to add more team members
const addEmployee = () =>{
    inquirer.prompt([
        {
            name: "add",
            message: "Would you like to add another team member?",
            type: "confirm"
        }
    ]).then(response => {
        // conditional statement that adds a team member based on the user selection 
        if(response.add === true){
            addTeamMember();
        } else{
            generateHtml();
            console.log(team)
        }
    })
}

// //
const addTeamMember = () =>{
    inquirer.prompt([
        {
            name:"role",
            message: "Which team member would you like to add?",
            choices: ["Engineer", "Intern"],
            type: "list"
        }
    ]).then(response => {
        const employee = response.role;
        if (employee === "Engineer"){
            addEngineer();
        } else{
            addIntern();
        }
        
    })
}
addManager();


