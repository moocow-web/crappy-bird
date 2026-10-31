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
const pillarTop = {
    width: 20,
    height: 200,
    x: 300,
    y: 0
}
const pillarBottom = {
    width: 20,
    height: 300,
    x: 300,
    y: 300
}
var score = 0;
var highscore = 0;
var cooldown = 0;
//renders the bot/player object
function renderBot(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';    
    ctx.fillRect(x, y, bot.width, bot.height);
}
function pillarGen() {
    if (pillarTop.x <= 0) {
        pillarTop.x = 800;
        pillarBottom.x = 800;
        pillarTop.height = Math.floor(Math.random() * 300);
        pillarBottom.height = 600 - pillarTop.height - 100;
        pillarBottom.y = pillarTop.height + 100;
        score++;
    }
}
function renderPillar(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, pillarTop.width, pillarTop.height);
    ctx.fillRect(pillarBottom.x, pillarBottom.y, pillarBottom.width, pillarBottom.height);
}
//physics, runs every frame to update pretty much everything. srry for the super spaghetti that is this function.
function update() {
    bot.y = bot.y + bot.velocity;
    bot.velocity += bot.gravity;
    cooldown--;
    if (bot.y - bot.height > canvas.height) {
        bleh();
    }
    if (bot.y + bot.height < 0) {
        bleh();
    }
    if (bot.x < pillarTop.x + pillarTop.width && bot.x + bot.width > pillarTop.x && bot.y < pillarTop.y + pillarTop.height && bot.y + bot.height > pillarTop.y) {
        bleh();
    }
    if (bot.x < pillarBottom.x + pillarBottom.width && bot.x + bot.width > pillarBottom.x && bot.y < pillarBottom.y + pillarBottom.height && bot.y + bot.height > pillarBottom.y) {
        bleh();
    }
    pillarTop.x -= 2;
    pillarBottom.x -= 2;
    pillarGen();
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
    renderPillar(pillarTop.x, pillarTop.y);
    requestAnimationFrame(gameLoop);
}
//main loop, calls all functions

gameLoop();