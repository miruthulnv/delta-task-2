const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-10;

const game = new Game();