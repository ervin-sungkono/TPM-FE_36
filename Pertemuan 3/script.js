const highScoreView = document.getElementById('high-score-text')
const scoreView = document.getElementById('score-text')
const livesRemaining = document.getElementById('lives-remaining-text')

const rockButton = document.getElementById('rock-button')
const paperButton = document.getElementById('paper-button')
const scissorsButton = document.getElementById('scissors-button')

const playerOptionView = document.getElementById('player-option')
const computerOptionView = document.getElementById('computer-option')

const defaultGameData = {
    highScore: 0,
    score: 0,
    livesRemaining: 3,
}

let gameData = JSON.parse(localStorage.getItem('gameData')) ?? defaultGameData

const gameDict = {
    0: 'rock',
    1: 'paper',
    2: 'scissors'
}

const loseTo = {
    'rock': 'paper',
    'paper': 'scissors',
    'scissors': 'rock'
}

function playOption(option){
    const computerIndex = Math.floor(Math.random() * 3)
    const computerOption = gameDict[computerIndex]

    playerOptionView.src = `assets/${option}.png`
    computerOptionView.src = `assets/${computerOption}.png`

    rockButton.disabled = true
    paperButton.disabled = true
    scissorsButton.disabled = true

    if(loseTo[option] === computerOption){
        gameData.livesRemaining--
        console.log("Player Lose")
    }else if(loseTo[computerOption] === option){
        gameData.score++
        console.log("Player Win")
    }else{
        console.log("Tie")
    }

    if(gameData.livesRemaining === 0){
        gameData.highScore = Math.max(gameData.highScore, gameData.score)
        gameData.score = 0
        gameData.livesRemaining = 3
    }

    setTimeout(() => {
        playerOptionView.src = `assets/default.png`
        computerOptionView.src = `assets/default.png`

        rockButton.disabled = false
        paperButton.disabled = false
        scissorsButton.disabled = false
    }, 1500)

    updateGameDisplay()
}

function updateGameDisplay(){
    highScoreView.innerHTML = `High Score: ${gameData.highScore}`
    scoreView.innerHTML = `Score: ${gameData.score}`
    livesRemaining.innerHTML = `Lives Remaining: ${gameData.livesRemaining}`

    localStorage.setItem('gameData', JSON.stringify(gameData))
}

updateGameDisplay()

rockButton.addEventListener('click', () => playOption('rock'))
paperButton.addEventListener('click', () => playOption('paper'))
scissorsButton.addEventListener('click', () => playOption('scissors'))

localStorage.getItem(key)

'{"highScore":3,"score":0,"livesRemaining":3}' -> value localStorage

const obj = {highScore:3,score:0,livesRemaining:3} -> parsed value localStorage

localStorage.setItem(key, value)

localStorage.removeItem('gameData')

localStorage.clear()