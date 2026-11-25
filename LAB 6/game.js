// Global variables to track game state, scores, and round history
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let resultsArray = [];

// startGame(): Reads the player name; alerts if empty, otherwise displays welcome message and start time
function startGame() {
    const playerNameInput = document.getElementById("playerName").value.trim();
    
    if (playerNameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    
    // Display welcome message using innerHTML
    const headerTitle = document.querySelector("header h1");
    headerTitle.innerHTML = `Welcome, ${playerNameInput}!`;

    // Display start date and time in startTime using Date()
    const startTimeElement = document.getElementById("startTime");
    startTimeElement.innerHTML = `Game Started: ${new Date()}`;
}

// getComputerChoice(): Returns a random choice from an array using Math.random()
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// playRound(playerChoice): Validates game start, plays round, evaluates rules, updates images, score, and history table
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();
    roundCount++;

    // Change the src of both images
    document.getElementById("playerImg").src = `${playerChoice}.png`;
    document.getElementById("computerImg").src = `${computerChoice}.png`;

    let roundResult = "";
    let color = "";

    // Decide result using if...else (rock beats scissors, scissors beats paper, paper beats rock)
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        color = "grey";
        draws++;
        resultsArray.push("Draw");
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        color = "green";
        wins++;
        resultsArray.push("Win");
    } else {
        roundResult = "Lose";
        color = "red";
        losses++;
        resultsArray.push("Lose");
    }

    // Show result in result element and change its color
    const resultElement = document.getElementById("result");
    resultElement.textContent = `You chose ${playerChoice}, Computer chose ${computerChoice}. You ${roundResult}!`;
    resultElement.style.color = color;

    // Update scoreboard
    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("draws").textContent = draws;

    // Add a new row to the history table using innerHTML +=
    const historyTable = document.getElementById("history");
    historyTable.innerHTML += `
        <tr>
            <td>${roundCount}</td>
            <td>${playerChoice}</td>
            <td>${computerChoice}</td>
            <td style="color: ${color}; font-weight: bold;">${roundResult}</td>
        </tr>
    `;
}

// showSummary(): Uses a for loop over results array to count wins and calculate win percentage using Math.round()
function showSummary() {
    if (resultsArray.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let loopWins = 0;
    for (let i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i] === "Win") {
            loopWins++;
        }
    }

    const winPercentage = Math.round((loopWins / resultsArray.length) * 100);
    alert(`You played ${resultsArray.length} rounds and won ${winPercentage}%`);
}

// resetGame(): Sets all scores back to 0, empties results array, clears history rows and result message
function resetGame() {
    gameStarted = false;
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    resultsArray = [];

    document.getElementById("wins").textContent = wins;
    document.getElementById("losses").textContent = losses;
    document.getElementById("draws").textContent = draws;

    document.getElementById("playerName").value = "";
    document.querySelector("header h1").innerHTML = "Rock, Paper, Scissors";
    document.getElementById("startTime").innerHTML = "";
    document.getElementById("result").textContent = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

    // Reset history table back to header row only
    const historyTable = document.getElementById("history");
    historyTable.innerHTML = `
        <tr>
            <th>Round</th>
            <th>You</th>
            <th>Computer</th>
            <th>Result</th>
        </tr>
    `;
}