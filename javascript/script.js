const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const life = document.querySelector('.life');
const score = document.querySelector('.score');
const gameOver = document.querySelector('.game--over--modal');
const settings = document.querySelector('.settings--btn');

canvas.width = 1500;
canvas.height = 700;

const randomInt = (arr) => {
    return Math.floor(Math.random() * (arr[1] - arr[0] + 1) + arr[0])
}

const game = new Game();