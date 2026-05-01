// --- Canvas Setup ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- Game Variables ---
const car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 20,
    height: 40,
    angle: -Math.PI / 2, // Start facing upwards (-90 degrees)
    speed: 0,
    maxSpeed: 5,
    acceleration: 0.1,
    friction: 0.97, // Multiplier for slowing down (closer to 1 = less friction)
    turnSpeed: 0.05, // Radians per frame
    color: '#f05e5e' // Reddish car color
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// --- Event Listeners ---
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }
}

function handleKeyUp(event) {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
}

// --- Game Loop ---
function gameLoop() {
    update(); // Update game state
    draw();   // Render the frame
    requestAnimationFrame(gameLoop); // Request next frame
}

// --- Update Function ---
function update() {
    // --- Input Handling ---
    // Acceleration
    if (keys.ArrowUp) {
        car.speed += car.acceleration;
        if (car.speed > car.maxSpeed) {
            car.speed = car.maxSpeed;
        }
    }

    // Braking / Reverse
    if (keys.ArrowDown) {
        car.speed -= car.acceleration * 0.7; // Less acceleration in reverse/braking
        if (car.speed < -car.maxSpeed / 2) { // Limit reverse speed
            car.speed = -car.maxSpeed / 2;
        }
    }

    // Apply Friction
    car.speed *= car.friction;
    // Stop car if speed is very low to prevent endless sliding
    if (Math.abs(car.speed) < 0.05) {
        car.speed = 0;
    }

    // Steering (only works when moving)
    if (car.speed !== 0) {
        const turnDirection = car.speed > 0 ? 1 : -1; // Allow steering reverse
        if (keys.ArrowLeft) {
            car.angle -= car.turnSpeed * turnDirection;
        }
        if (keys.ArrowRight) {
            car.angle += car.turnSpeed * turnDirection;
        }
    }

    // --- Movement ---
    const moveX = Math.cos(car.angle) * car.speed;
    const moveY = Math.sin(car.angle) * car.speed;

    car.x += moveX;
    car.y += moveY;

    // --- Boundary Collision (Simple Wrap Around) ---
    if (car.x > canvas.width + car.width / 2) {
        car.x = -car.width / 2;
    } else if (car.x < -car.width / 2) {
        car.x = canvas.width + car.width / 2;
    }
    if (car.y > canvas.height + car.height / 2) {
        car.y = -car.height / 2;
    } else if (car.y < -car.height / 2) {
        car.y = canvas.height + car.height / 2;
    }
}

// --- Draw Function ---
function draw() {
    // Clear canvas (draw background)
    ctx.fillStyle = '#66a166'; // Match canvas background color set in CSS
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- Draw Car ---
    // Save the current canvas state (position, rotation)
    ctx.save(); 
    
    // Move the canvas origin to the car's center
    ctx.translate(car.x, car.y); 
    
    // Rotate the canvas around the new origin
    ctx.rotate(car.angle); 
    
    // Set car color
    ctx.fillStyle = car.color; 
    
    // Draw the car rectangle centered around the origin (which is now the car's center)
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height); 
    
    // Add a small detail to show the front (optional)
    ctx.fillStyle = '#ffffff'; // White headlight area
    ctx.fillRect(-car.width / 2 + 2, -car.height / 2 - 2, car.width - 4, 5);

    // Restore the canvas state to what it was before save()
    ctx.restore(); 
}

// --- Start the Game ---
console.log("Simple Racing Game Initialized. Controls: Arrow Keys.");
requestAnimationFrame(gameLoop); // Start the loop