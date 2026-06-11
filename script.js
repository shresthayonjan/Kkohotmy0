const circleTrack = document.getElementById("circleTrack");
const cards = document.querySelectorAll(".card");

let rotation = 0;

// Positive value makes auto rotation go opposite direction
let autoSpeed = 0.30;

let scrollVelocity = 0;

let isScrolling = false;
let isHoveringCard = false;
let scrollStopTimer;

// Mobile touch variables
let isTouching = false;
let lastTouchY = 0;

function animate() {
  // Auto animation runs only when user is not interacting
  if (!isScrolling && !isHoveringCard && !isTouching) {
    rotation += autoSpeed;
  }

  // Wheel and touch movement
  rotation += scrollVelocity;
  scrollVelocity *= 0.92;

  circleTrack.style.transform = `rotateX(${rotation}deg) rotateZ(-8deg)`;

  requestAnimationFrame(animate);
}

// Desktop mouse wheel
window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    isScrolling = true;

    // Positive value reverses direction from your old code
    scrollVelocity += event.deltaY * 0.035;

    clearTimeout(scrollStopTimer);

    scrollStopTimer = setTimeout(() => {
      isScrolling = false;
    }, 180);
  },
  { passive: false }
);

// Desktop hover pause
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    isHoveringCard = true;
    scrollVelocity = 0;
  });

  card.addEventListener("mouseleave", () => {
    isHoveringCard = false;
  });
});

// Mobile touch start
window.addEventListener(
  "touchstart",
  (event) => {
    isTouching = true;
    lastTouchY = event.touches[0].clientY;
    scrollVelocity = 0;
  },
  { passive: false }
);

// Mobile swipe move
window.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();

    const currentTouchY = event.touches[0].clientY;
    const difference = currentTouchY - lastTouchY;

    // Negative value reverses mobile swipe direction
    scrollVelocity += difference * -0.08;

    lastTouchY = currentTouchY;
  },
  { passive: false }
);

// Mobile touch end
window.addEventListener("touchend", () => {
  isTouching = false;
});

animate();