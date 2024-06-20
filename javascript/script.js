const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const life = document.querySelector('.life');
const score = document.querySelector('.score');

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-100;

const randomInt = (arr) =>{return Math.floor(Math.random()*(arr[1]-arr[0]+1)+arr[0])}

const game = new Game();