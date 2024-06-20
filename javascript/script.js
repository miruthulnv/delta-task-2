const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

const randomInt = (arr) =>{return Math.floor(Math.random()*(arr[1]-arr[0]+1)+arr[0])}

const game = new Game();