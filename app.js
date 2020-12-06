// defining the module packages
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");

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
            <div class="team-area col-12 d-flex justify-content-center">

            </div>
        </div>
    </div>
</body>
</html>`;

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
        const {name, id, email, officeNumber} = response;
        const manager = new Manager(name, id, email, officeNumber);
        team.push(manager);
        addTeamMember();
    })
}
// funciton that prompts question about the engineer
const addEngineer = ()=>{
    inquirer.prompt([
        {
            name: "name?",
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
            message: "What is the engineer's gitHub username?"
        }
    ]).then(response => {
        const {name, id, email, github} = response;
        const engineer = new Engineer(name, id, email, github);
        team.push(engineer);
        addEmployee();
    })
}
// funciton that prompts question about the intern
const addIntern = ()=>{
    inquirer.prompt([
        {
            name: "name?",
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
        const {name, id, email, school} = response;
        const intern = new Intern(name, id, email, school);
        team.push(intern)
        addEmployee();
    })
}


// funciton generates the employee cards based on user input
function generateHtml(){
    team.forEach(employee =>{
        // using a conditional statement
        if(employee.role === "Manager"){
            const managerCard = `
                <div class="card employee-card">
                    <div class="card-header">
                        <h2 class="card-title">${employee.name}</h2>
                        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employee.role}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${employee.id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                            <li class="list-group-item">Office number: ${employee.officeNumber}</li>
                        </ul>
                    </div>
                </div>`

            html += managerCard;
            
        }else if (employee.role = "Engineer") {
            const engineerCard = `
                <div class="card employee-card">
                    <div class="card-header">
                        <h2 class="card-title">${employee.name}</h2>
                        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employee.role}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${employee.id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                            <li class="list-group-item">Office number: ${employee.github}</li>
                        </ul>
                    </div>
                </div>`
            html += engineerCard;
        } else{
            const internCard = `
                <div class="card employee-card">
                    <div class="card-header">
                        <h2 class="card-title">${employee.name}</h2>
                        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${employee.role}</h3>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">ID: ${employee.id}</li>
                            <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                            <li class="list-group-item">Office number: ${employee.school}</li>
                        </ul>
                    </div>
                </div>`
            html += internCard;
           
        }
    });

    html += htmlEnd;
// output html file
    fs.writeFile("output/team.html", html, err => {
        if(err) throw err;
        console.log("Team profile generated!")
    })
}

// prompt question to add more team members
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
            generateHtml()
        }
    })
}
//
const addTeamMember = () =>{
    inquirer.prompt([
        {
            name:"role",
            message: "Which team member would you like to add?",
            choices: ["Engineer", "Intern"],
            type: "list"
        }
    ]).then(response =>{
        const role = response.role;
        if (role === "Engineer"){
            addEngineer();
        }else{
            addIntern();
        }
    })
}
addManager();

