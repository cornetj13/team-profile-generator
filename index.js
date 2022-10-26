// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./Develop/util/generateHtml');

// Import the classes
const Engineer = require('./Develop/lib/Engineer');
const Intern = require('./Develop/lib/Intern');
const Manager = require('./Develop/lib/Manager');

// Create an empty team member array to fill as members are added.
const teamMembersArray = [];

// Create the menu question array.
const menuQuestion = [
  {
    type: 'list',
    name: 'menuOption',
    message: 'Add a team member: ',
    choices: ['Engineer', 'Intern', 'Finished'],
  }
];

// Create an array of questions for the manager.
const managerQuestions = [
  {
    type: 'input',
    name: 'manager',
    message: "What is your team manager's name? ",
  },
  {
    type: 'input',
    name: 'id',
    message: "What is your team manager's ID? ",
  },
  {
    type: 'input',
    name: 'email',
    message: "What is your team manager's email? ",
  },
  {
    type: 'input',
    name: 'office',
    message: "What is your team manager's office number? ",
  }
];

// Create an array of questions for the Engineer.
const engineerQuestions = [
  {
    type: 'input',
    name: 'engineer',
    message: "What is your engineer's name? ",
  },
  {
    type: 'input',
    name: 'id',
    message: "What is your engineer's  ID? ",
  },
  {
    type: 'input',
    name: 'email',
    message: "What is your engineer's  email? ",
  },
  {
    type: 'input',
    name: 'github',
    message: "What is your engineer's GitHub username? ",
  }
];

// Create an array of questions for the Intern.
const internQuestions = [
  {
    type: 'input',
    name: 'intern',
    message: "What is your intern's name? ",
  },
  {
    type: 'input',
    name: 'id',
    message: "What is your intern's ID? ",
  },
  {
    type: 'input',
    name: 'email',
    message: "What is your intern's email? ",
  },
  {
    type: 'input',
    name: 'school',
    message: "What is your intern's school? ",
  }
];

// Create a function to initialize app
function init() {
  inquirer
  .prompt(managerQuestions)
  .then((response) => {
    const teamManager = new Manager(response.manager, response.id, response.email, response.office);
    teamMembersArray.push(teamManager);
    teamMemberQuestions();
  });
};

// Team Member Questions Function.
function teamMemberQuestions() {
  inquirer
  .prompt(menuQuestion)
  .then((answer => {
    if (answer.menuOption === "Engineer") {
      console.log("You have selected the Engineer!");
      inquirer
      .prompt(engineerQuestions)
      .then((response => {
        const teamEngineer = new Engineer(response.engineer, response.id, response.email, response.github);
        teamMembersArray.push(teamEngineer);
        teamMemberQuestions();
      }));
    } else if (answer.menuOption === "Intern") {
      console.log("You have selected the Intern!");
      inquirer
      .prompt(internQuestions)
      .then((response => {
        const teamIntern = new Intern(response.intern, response.id, response.email, response.school);
        teamMembersArray.push(teamIntern);
        teamMemberQuestions();
      }));
    } else if (answer.menuOption === "Finished") {
      console.log("Goodbye!");
      // Take responses and generate an HTML
      fs.writeFileSync("index.html", generateHTML(teamMembersArray), "utf-8");
    }
  }));
};

// Function call to initialize app
init();