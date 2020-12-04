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

const team = [];

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



function generateHtml(){
    team.forEach(employee =>{
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

    fs.writeFile("output/team.html", html, err => {
        if(err) throw err;
        console.log("Team profile generated!")
    })
}

const addEmployee = () =>{
    inquirer.prompt([
        {
            name: "add",
            message: "Would you like to add another team member?",
            type: "confirm"
        }
    ]).then(response => {
        if(response.add === true){
            addTeamMember();
        } else{
            generateHtml()
        }
    })
}

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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
