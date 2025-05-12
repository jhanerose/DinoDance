const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "dinodance-2bde2.firebaseapp.com",
    projectId: "dinodance-2bde2",
    // ...
    };

    firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

game = new Game();
let gameScreen;
let gameSong = ""; // For when I implement more songs
let gameDifficulty = ""; // To choose the game difficulty
let font;
let color1 = '#f5f5f5';
let color2 = '#f5f5f5';
let color3 = '#f5f5f5';
let colorA = '#f5f5f5';
let colorB = '#f5f5f5';
let colorC = '#f5f5f5';
let color1a = '#ffc832';
let color2a = '#ffc832';
let color3a = '#ffc832';
let colorAa = '#ffc832';
let colorBa = '#ffc832';
let colorCa = '#ffc832';
let colorSTART = 245;
// Music Choice:
let musicDisco;
let musicRock;
let musicRnB;
// Timing the game to establish ending:
let gameSeconds = 0;
let gameTimer;
let totalGameTime = 64; // Total duration of the game in seconds (will be updated based on song choice)
// Volume Control:
let currentVolume = 1.0; // Default volume (max)
let isVolumeHovered = false;


function preload() {
    font = loadFont("assets/FutilePro.ttf");
    game.preload();
    musicDisco = loadSound('assets/Song1 Disco.wav');
    musicRock = loadSound('assets/Song2 Rock.mp3');
    musicRnB = loadSound('assets/Song3 RnB.mp3');
    startNoise = loadSound('assets/Wav/gameStart.wav')
    gameChoose = loadSound('assets/Wav/gameChoose.wav')
    errorNoise = loadSound('assets/Wav/errorNoise.wav')
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);

    cnv.style('position', 'fixed');
    cnv.style('top', '0');
    cnv.style('left', '0');
    cnv.style('width', '100vw');
    cnv.style('height', '100vh');
    cnv.style('z-index', '-1');

    game.setup();
    game.foreground.setup();
    gameScreen = "home";
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    // console.log(gameSong, gameScreen, gameDifficulty) -------> Checking if the game settings are working properly
    clear();
    game.draw();
    // HOME SCREEN and GAME SETTINGS...
    if (gameScreen == "home") {
        textFont(font);
        textAlign(CENTER)
        fill(89, 89, 89);
        textSize(60)
        // SHADOWS
        text("CHOOSE GAME MODE", width / 2 + 4, 300 + 4);
        text("START", width / 2 + 4, 540 + 4);
        textSize(40)
        fill(color1);
        text("Disco", width / 2 - 150 + 3, 380 + 3);
        fill(color2);
        text("Rock", width / 2 + 3, 380 + 3);
        fill(color3);
        text("RnB", width / 2 + 150 + 3, 380 + 3);
        fill(colorA);
        text("EASY", width / 2 - 150 + 3, 450 + 3);
        fill(colorB);
        text("MED", width / 2 + 3, 450 + 3);
        fill(colorC);
        text("HARD", width / 2 + 150 + 3, 450 + 3);
        textSize(60)
        // FRONT TEXT
        fill(colorSTART);
        text("START", width / 2, 540);
        fill(255, 200, 50);
        text("CHOOSE GAME MODE", width / 2, 300);
        textSize(40)
        fill(color1a);
        text("Disco", width / 2 - 150, 380);
        fill(color2a);
        text("Rock", width / 2, 380);
        fill(color3a);
        text("RnB", width / 2 + 150, 380);
        fill(colorAa);
        text("EASY", width / 2 - 150, 450);
        fill(colorBa);
        text("MED", width / 2, 450);
        fill(colorCa);
        text("HARD", width / 2 + 150, 450);
    }
    
    // GAME OVER SCREEN...
    else if (gameScreen == "end") {
        textFont(font);
        textAlign(CENTER)
        fill(color1);
        textSize(50)
        text("Play Again?", width / 2, 500)
        fill(245, 245, 245);
        textSize(70)
        if (game.p1score > game.p2score) {
            text(game.foreground.player1Name + " WINS!", width / 2, 400)
        } else if (game.p2score > game.p1score) {
            text(game.foreground.player2Name + " WINS!", width / 2, 400)
        } else {
            text("IT'S A DRAW!", width / 2, 400)
        }
        // TURNING OFF THE FIRE MULTIPLIER ANIMATIONS
        this.game.fires.animateNoFire1();
        this.game.fires.animateNoFire2();
    }
        // Add timer display during gameplay
        else if (gameScreen == "play") {
        textFont(font);
        textAlign(CENTER);
        stroke(89, 89, 89);
        strokeWeight(3);
        fill(255);  // White text
        textSize(40);
        const timeRemaining = totalGameTime - gameSeconds;
        text(formatTime(timeRemaining), width - 70, 75);
        noStroke();
    }
    function submitScore(name, score) {
        db.collection('leaderboard')
        .add({ name, score, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
        .then(() => console.log('Score saved!'))
        .catch(err => console.error(err));
    }
    function loadLeaderboard() {
        db.collection('leaderboard')
        .orderBy('score', 'desc')
        .limit(10)
        .get()
        .then(snapshot => {
        const list = document.getElementById('leaderboard');
        list.innerHTML = '';
        snapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = `${doc.data().name}: ${doc.data().score}`;
        list.appendChild(li);
    });
    });
}

    // MOUSE HOVERS:
    // Home Screen
    if (gameScreen === "home") {
        // Disco
        if (mouseX >= 493 && mouseX <= 598 && mouseY >= 352 && mouseY <= 380) {
            cursor('assets/Cursor/BlueCursor.cur');
            color1 = 89;
        }
        // Rock
        else if (mouseX >= 649 && mouseX <= 739 && mouseY >= 352 && mouseY <= 380) {
            cursor('assets/Cursor/BlueCursor.cur');
            color2 = 89;
        }
        // RnB
        else if (mouseX >= 809 && mouseX <= 877 && mouseY >= 352 && mouseY <= 380) {
            cursor('assets/Cursor/BlueCursor.cur');
            color3 = 89;
        }
        // EASY
        else if (mouseX >= 500 && mouseX <= 586 && mouseY >= 425 && mouseY <= 448) {
            cursor('assets/Cursor/BlueCursor.cur');
            colorA = 89;
        }
        // MED
        else if (mouseX >= 659 && mouseX <= 728 && mouseY >= 425 && mouseY <= 448) {
            cursor('assets/Cursor/BlueCursor.cur');
            colorB = 89;
        }
        // HARD
        else if (mouseX >= 796 && mouseX <= 892 && mouseY >= 425 && mouseY <= 448) {
            cursor('assets/Cursor/BlueCursor.cur');
            colorC = 89;
        }
        // START
        else if (mouseX >= 602 && mouseX <= 782 && mouseY >= 502 && mouseY <= 538) {
            cursor('assets/Cursor/BlueCursor.cur');
            colorSTART = 160;
        } else {
            cursor('assets/Cursor/GreenCursor.cur');
            color1 = 245;
            color2 = 245;
            color3 = 245;
            colorA = 245;
            colorB = 245;
            colorC = 245;
            colorSTART = 245;
        }
    }
    // Game Over screen
    if (gameScreen === "end") {
        // Play Again?
        if (mouseX >= 563 && mouseX <= 820 && mouseY >= 460 && mouseY <= 498) {
            cursor('assets/Cursor/BlueCursor.cur');
            color1 = 89;
        } else {
            cursor('assets/Cursor/GreenCursor.cur');
            color1 = 245;
        }
    }
    // Credit:
    textFont(font);
    textAlign(CENTER)
    fill(245);
    textSize(20)
    text("A game by Jhane Rose Sadicon", width - 160, 30);

    // Add volume control
    if (gameScreen === "play" || gameScreen === "home") {
        // Speaker icon
        fill(255);
        noStroke();
        rect(width - 250, 55, 8, 15); // Moved down to align with timer
        beginShape(); // Speaker cone
        vertex(width - 242, 55);
        vertex(width - 232, 50);
        vertex(width - 232, 75);
        vertex(width - 242, 70);
        endShape(CLOSE);
        
        // Add sound waves for visual effect
        if (currentVolume > 0) {
            noFill();
            stroke(255);
            strokeWeight(1.5);
            arc(width - 229, 62, 8, 12, -PI/3, PI/3);  // Adjusted y-position
            if (currentVolume > 0.3) {
                arc(width - 225, 62, 12, 18, -PI/3, PI/3);
            }
            if (currentVolume > 0.6) {
                arc(width - 221, 62, 16, 24, -PI/3, PI/3);
            }
        }
        
        // Volume bar background
        noStroke();
        fill(89, 89, 89, 200);
        rect(width - 210, 58, 70, 8, 4); // Adjusted y-position
        
        // Volume bar fill
        fill(255, 200, 50);
        rect(width - 210, 58, 70 * currentVolume, 8, 4);
        
        // Check if mouse is over volume bar
        if (mouseX >= width - 210 && mouseX <= width - 140 &&
            mouseY >= 58 && mouseY <= 66) {
            isVolumeHovered = true;
            cursor('assets/Cursor/BlueCursor.cur');
        } else if (isVolumeHovered) {
            isVolumeHovered = false;
            cursor('assets/Cursor/GreenCursor.cur');
        }
    }
}

function keyPressed() {
    /* --------------------------------------If you press ESC quit game to home screen-------------------------------------- */
    if (keyIsDown(27)) {
        gameScreen = "home";
        if (gameSong === "disco") musicDisco.stop();
        else if (gameSong === "rock") musicRock.stop();
        else if (gameSong === "rnb") musicRnB.stop();
        clearInterval(gameTimer);
        gameSeconds = 0;
        this.fruitsArr = [];
    }
    game.keyPressed()
}

function gameSecCounter() {
    gameSeconds += 1;
    if (gameSeconds == 32) {
        if (gameSong === "disco") musicDisco.play();
        else if (gameSong === "rock") musicRock.play();
        else if (gameSong === "rnb") musicRnB.play();
    }
    if ((gameSong === "disco" && gameSeconds == 64) || 
        (gameSong === "rock" && gameSeconds == 90) || 
        (gameSong === "rnb" && gameSeconds == 124)) {
        gameScreen = "end";
        if (gameSong === "disco") musicDisco.stop();
        else if (gameSong === "rock") musicRock.stop();
        else if (gameSong === "rnb") musicRnB.stop();
        clearInterval(gameTimer);
        gameSeconds = 0;
    }
}

function mouseClicked() {
    // Starts the game ONLY when mouse is clicked on the START button
    if (gameScreen == "home") {
        if ((gameSong === "disco" || gameSong === "rock" || gameSong === "rnb") && 
            gameDifficulty != "" && 
            mouseX >= 602 && mouseX <= 782 && mouseY >= 502 && mouseY <= 538) {
            game.foreground.updatePlayerNames(); // Update player names before starting
            gameScreen = "play";
            if (gameSong === "disco") {
                totalGameTime = 64;
                musicDisco.play(1);
            } else if (gameSong === "rock") {
                totalGameTime = 90;
                musicRock.play(1);
            } else if (gameSong === "rnb") {
                totalGameTime = 124;
                musicRnB.play(1);
            }
            startNoise.play();
            gameTimer = setInterval(gameSecCounter, 1000);
        }
        // CHOOSE YOUR SONG:
        // Disco
        if (mouseX >= 493 && mouseX <= 598 && mouseY >= 352 && mouseY <= 380) {
            gameSong = "disco"
            color1a = '#30b530';
            color2a = '#ffc832';
            color3a = '#ffc832';
            gameChoose.play();
        }
        // Rock
        else if (mouseX >= 649 && mouseX <= 739 && mouseY >= 352 && mouseY <= 380) {
            gameSong = "rock"
            color1a = '#ffc832';
            color2a = '#30b530';
            color3a = '#ffc832';
            gameChoose.play();
        }
        // RnB
        else if (mouseX >= 809 && mouseX <= 877 && mouseY >= 352 && mouseY <= 380) {
            gameSong = "rnb"
            color1a = '#ffc832';
            color2a = '#ffc832';
            color3a = '#30b530';
            gameChoose.play();
        }
        // CHOOSE YOUR DIFFICULTY:
        // EASY
        if (mouseX >= 500 && mouseX <= 586 && mouseY >= 425 && mouseY <= 448) {
            colorAa = '#ff8800';
            colorBa = '#ffc832';
            colorCa = '#ffc832';
            gameDifficulty = 'easy'
            gameChoose.play();
        }
        // MED
        else if (mouseX >= 659 && mouseX <= 728 && mouseY >= 425 && mouseY <= 448) {
            colorAa = '#ffc832';
            colorBa = '#ff8800';
            colorCa = '#ffc832';
            gameDifficulty = 'medium'
            gameChoose.play();
        }
        // HARD
        else if (mouseX >= 796 && mouseX <= 892 && mouseY >= 425 && mouseY <= 448) {
            colorAa = '#ffc832';
            colorBa = '#ffc832';
            colorCa = '#ff8800';
            gameDifficulty = 'hard'
            gameChoose.play();
        }
    }
    else if (gameScreen === "end") {
        if (mouseX >= 563 && mouseX <= 820 && mouseY >= 460 && mouseY <= 498) {
            gameScreen = "home";
            game.foreground.player1Input.show(); // Show input fields again
            game.foreground.player2Input.show();
        }
    }
}

function mousePressed() {
    // Volume control click handler
    if (mouseX >= width - 210 && mouseX <= width - 140 &&
        mouseY >= 58 && mouseY <= 66) {
        currentVolume = (mouseX - (width - 210)) / 70;
        currentVolume = constrain(currentVolume, 0, 1);
        // Update all music volumes
        musicDisco.setVolume(currentVolume);
        musicRock.setVolume(currentVolume);
        musicRnB.setVolume(currentVolume);
        startNoise.setVolume(currentVolume);
        gameChoose.setVolume(currentVolume);
        errorNoise.setVolume(currentVolume);
    }
}

function mouseDragged() {
    // Volume control drag handler
    if (mouseX >= width - 210 && mouseX <= width - 140 &&
        mouseY >= 58 && mouseY <= 66) {
        currentVolume = (mouseX - (width - 210)) / 70;
        currentVolume = constrain(currentVolume, 0, 1);
        // Update all music volumes
        musicDisco.setVolume(currentVolume);
        musicRock.setVolume(currentVolume);
        musicRnB.setVolume(currentVolume);
        startNoise.setVolume(currentVolume);
        gameChoose.setVolume(currentVolume);
        errorNoise.setVolume(currentVolume);
    }
}

// Add window unload handler to clean up input fields
window.addEventListener('unload', () => {
    game.foreground.cleanup();
});

// Add time formatting function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
