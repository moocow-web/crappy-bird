const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
//defines initial bot properties
const bot = {
    gravity: .1,
    jump: 9,
    width: 20,
    height: 20,
    x: 100,
    y: 100,
    velocity: 0
}
var score = 0;
var highscore = 0;
var cooldown = 0;
//renders the bot/player object
function renderBot(x, y,) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';    
    ctx.fillRect(x, y, bot.width, bot.height);
}
//physics, runs every frame to update pretty much everything
function update() {
    bot.y = bot.y + bot.velocity;
    bot.velocity += bot.gravity;
    cooldown--;
    if (bot.y + bot.height > canvas.height) {
        bleh();
    }
    if (bot.y - bot.height < 0) {
        bleh();
    }
}
//adds upward velocity and resets cooldown so the pressing space dosn't press it like 1000 times
function jump() {
    bot.velocity = bot.velocity - bot.jump;
    cooldown = 15 
} 
//death function, resets pos, and sets score
function bleh() {
    if (score > highscore) {
        highscore = score;
    }
    bot.y = 100;
    bot.velocity = 0;
    score = 0;
}
//executes jump function manually
document.addEventListener('keypress', (event) => {
    if (event.code === 'Space' && cooldown <= 0) {
        jump();
    }
});

function gameLoop() {
    update();
    renderBot(bot.x, bot.y);
    requestAnimationFrame(gameLoop);
}
//main loop, calls all functions

gameLoop();