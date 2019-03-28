#!/usr/bin/env node

var inquirer = require("inquirer");
var chalk = require("chalk");

var response = chalk.bold.green;
var header = chalk.bold.underline.cyan;

var resume = require("./resume.json");

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

function main() {
  console.log(chalk.bgWhite("Hello, my name is Adrian and this is my _fancy_ resume. "));
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    clearScreen();
    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    console.log(header(option));
    resume[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    inquirer
      .prompt({
        type: "list",
        name: "exitOrBack",
        message: "Go back or Exit?",
        choices: ["Go Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitOrBack == "Go Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

function clearScreen() {
  console.log('\033[2J');
}

main();
