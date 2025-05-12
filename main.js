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
let volumeLevel = 1.0; // Volume control variable
let volumeButtonColor = '#f5f5f5'; // Volume button color variable
let isMuted = false; // Track mute state
let speakerSize = 24; // Size of the speaker icon
// Music Choice:
let musicDisco;
let musicRock;
let musicRnB;
// Timing the game to establish ending:
let gameSeconds = 0;
let gameTimer;
let totalGameTime = 64; // Total duration of the game in seconds (will be updated based on song choice)


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
    
    // Exit settings:
    textFont(font);
    textSize(20)
    textAlign(LEFT)
    fill(255, 200, 50);
    text("Press ESC to exit game", 20, 30);
    
    // Speaker Volume Icon - moved under ESC text
    push(); // Save current drawing state
    translate(20, 42); // New position under ESC text
    scale(1.5); // Keep the same size
    
    // Draw speaker icon and volume control
    fill(volumeButtonColor);
    noStroke();
    
    // Speaker body
    beginShape();
    vertex(0, 5);
    vertex(8, 5);
    vertex(8, 15);
    vertex(0, 15);
    endShape(CLOSE);
    
    // Speaker cone
    beginShape();
    vertex(8, 5);
    vertex(15, 0);
    vertex(15, 20);
    vertex(8, 15);
    endShape(CLOSE);

    if (isMuted) {
        // X mark for mute
        stroke(volumeButtonColor);
        strokeWeight(2);
        line(20, 5, 30, 15);
        line(30, 5, 20, 15);
    } else {
        // Volume slider background - moved further right
        noStroke();
        fill(89, 89, 89, 100);
        rect(35, 8, 30, 4, 2);
        
        // Volume slider fill
        fill(volumeButtonColor);
        rect(35, 8, 30 * volumeLevel, 4, 2);
        
        // Volume slider handle
        circle(35 + (30 * volumeLevel), 10, 8);
        
        // Volume level indicator - adjusted position
        noFill();
        stroke(volumeButtonColor);
        strokeWeight(2);
        
        if (volumeLevel >= 0.3) {
            arc(25, 10, 8, 8, -PI/3, PI/3);
        }
        if (volumeLevel >= 0.6) {
            arc(25, 10, 12, 12, -PI/3, PI/3);
        }
        if (volumeLevel >= 0.9) {
            arc(25, 10, 16, 16, -PI/3, PI/3);
        }
    }

    // Hover tooltip - adjusted position
    if (mouseX >= 20 && mouseX <= 20 + (45 * 1.5) && 
        mouseY >= 42 - 15 && mouseY <= 42 + (30 * 1.5)) {
        fill(0, 0, 0, 200);
        noStroke();
        rect(45, -5, 100, 20, 5);
        fill(255);
        textSize(8);
        textAlign(LEFT, CENTER);
        text(isMuted ? "Click to unmute" : "Click sound to mute", 50, 5);
    }
    
    pop(); // Restore drawing state
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
    // Volume Control Click Handler
    let speakerX = 20;
    let speakerY = 42;
    let iconWidth = 25 * 1.5; // Reduced to just cover the speaker icon
    let sliderX = speakerX + 52.5; // Starting position of slider
    let sliderWidth = 45;
    
    // Check if click is on the speaker icon (mute/unmute)
    if (mouseX >= speakerX && mouseX <= speakerX + iconWidth && 
        mouseY >= speakerY - 5 && mouseY <= speakerY + (30 * 1.5)) {
        // Toggle mute
        isMuted = !isMuted;
        if (isMuted) {
            volumeLevel = Math.max(0.3, volumeLevel);
            setAllVolumes(0);
        } else {
            setAllVolumes(volumeLevel);
        }
        gameChoose.play();
    }
    // Check if click is on the slider area
    else if (!isMuted && 
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth && 
        mouseY >= speakerY - 5 && mouseY <= speakerY + (30 * 1.5)) {
        // Adjust volume
        let newVolume = constrain((mouseX - sliderX) / sliderWidth, 0, 1);
        volumeLevel = Math.max(0.3, newVolume);
        setAllVolumes(volumeLevel);
        gameChoose.play();
    }
}

function mouseMoved() {
    // Volume Control Hover
    let speakerX = 20;
    let speakerY = 42;
    let iconWidth = 25 * 1.5;
    let sliderX = speakerX + 52.5;
    let sliderWidth = 45;
    
    // Check if mouse is over either the speaker icon or slider
    if ((mouseX >= speakerX && mouseX <= speakerX + iconWidth && 
         mouseY >= speakerY - 5 && mouseY <= speakerY + (30 * 1.5)) ||
        (!isMuted && mouseX >= sliderX && mouseX <= sliderX + sliderWidth && 
         mouseY >= speakerY - 5 && mouseY <= speakerY + (30 * 1.5))) {
        volumeButtonColor = '#89ff89';
        cursor('assets/Cursor/BlueCursor.cur');
    } else {
        volumeButtonColor = '#f5f5f5';
        // Don't reset cursor here as other elements might need it
    }
}

// Helper function to set volume for all audio elements
function setAllVolumes(level) {
    musicDisco.setVolume(level);
    musicRock.setVolume(level);
    musicRnB.setVolume(level);
    startNoise.setVolume(level);
    gameChoose.setVolume(level);
    errorNoise.setVolume(level);
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
