"use strict";

let leftNameNode = document.querySelector("#leftPlayerName");
let leftScoreNode = document.querySelector("#leftPlayerScore");
let rightNameNode = document.querySelector("#rightPlayerName");
let rightScoreNode = document.querySelector("#rightPlayerScore");
let ballOnNode = document.querySelector("#ballOn");
let remainingRedsNode = document.querySelector("#remainingReds");
let redMenu = document.querySelector("#redMenu");
let outputNode = document.querySelector("#outputText");

leftNameNode.oninput = updateOutput;
leftScoreNode.oninput = updateOutput;
rightNameNode.oninput = updateOutput;
rightScoreNode.oninput = updateOutput;
ballOnNode.oninput = updateOutput;
remainingRedsNode.oninput = updateOutput;

updateOutput();

function updateOutput() {

    //Define player names, score difference and leading player

    let leftName = leftNameNode.value;
    let leftScore = Number(leftScoreNode.value);

    let rightName = rightNameNode.value;
    let rightScore = Number(rightScoreNode.value);

    let pointDifference;
    let leadingPlayer;
    let chasingPlayer;

    if (leftScore > rightScore) {
        pointDifference = leftScore - rightScore;
        leadingPlayer = leftName;
        chasingPlayer = rightName;
    }
    else if (rightScore > leftScore) {
        pointDifference = rightScore - leftScore;
        leadingPlayer = rightName;
        chasingPlayer = leftName;
    }
    else if (leftScore == rightScore) {
        pointDifference = 0;
        leadingPlayer = undefined;
        chasingPlayer = undefined;
    }

    //Define points left on table

    let ballOn = ballOnNode.value;
    let remainingReds = Number(remainingRedsNode.value);
    if (remainingReds == 0) {
        remainingRedsNode.value = 15;
        ballOnNode.value = "yellow";
        ballOn = "yellow";
    }
    if (remainingReds < 0 || remainingReds > 15) remainingReds = undefined;

    let remainingPoints;
    if (ballOn == "red") {
        redMenu.style.visibility = "visible";
        remainingPoints = 27 + (remainingReds * 8);
    }
    else {
        redMenu.style.visibility = "hidden";
        if (ballOn == "black") remainingPoints = 7;
        else if (ballOn == "pink") remainingPoints = 13;
        else if (ballOn == "blue") remainingPoints = 18;
        else if (ballOn == "brown") remainingPoints = 22;
        else if (ballOn == "green") remainingPoints = 25;
        else if (ballOn == "yellow") remainingPoints = 27;
    }

    //Define result

    let outputMessage;

    if (remainingReds == undefined) {
        outputMessage =
            `Not valid input.`;
    }
    else if (leftScore == rightScore) {
        outputMessage =
            `Scores are even, with ${remainingPoints} points on table.`;
    }
    else if (remainingPoints > pointDifference) {
        outputMessage =
            `${leadingPlayer} leads by ${pointDifference} points, ` +
            `with ${remainingPoints} points on table.`;
    }
    else if (remainingPoints == pointDifference) {
        outputMessage =
            `${leadingPlayer} leads by ${pointDifference} points. ` +
            `${chasingPlayer} can tie with ${remainingPoints} points on table.`;
    }
    else if (remainingPoints < pointDifference) {
        if (ballOn == "black") {
            outputMessage =
                `${leadingPlayer} leads by ${pointDifference} points, ` +
                `with ${remainingPoints} points on table. ` +
                `${leadingPlayer} has won the game.`;
        }
        else {
            let foulPointsNeeded = pointDifference - remainingPoints;
            outputMessage =
                `${leadingPlayer} leads by ${pointDifference} points, ` +
                `with ${remainingPoints} points on table. ` +
                `To be able to tie, ${chasingPlayer} needs ${foulPointsNeeded} points by his opponent's fouls.`;   
        }
    }

    outputNode.textContent = outputMessage;
}
