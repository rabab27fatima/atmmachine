#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//initialize user balance and pin code
let myBalance = 50000;
let myPin = 5678;
//print welcome message
console.log(chalk.green("\n \tWelcome to ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.blue("Enter your pin code:")
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.yellow("\nPin is correct, login successfully!\n"));
    //console.log(`Current account balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw amount", "Check balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 5000, 10000, 20000, 30000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log("Insufficient Balance");
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} Withdraw Successfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw successfully`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check balance") {
        console.log(`Your account balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is incorrect, Try again!"));
}
