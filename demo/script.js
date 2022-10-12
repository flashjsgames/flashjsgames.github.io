
var script = (function () {

  // Import flashjs as a variable function from the current window
  const flashjs = window.flashjs;

  // Initializing with custom settings
  const flashjsConfig = {
    aspectRatio: '1:1',
    borderRadius: flashjs.svd + 'px', 
    backgroundColor: '#007ACC'
  }
  flashjs.init(flashjsConfig);

  // Adding variables and functions needed for game
  const game = document.querySelector('flashjs');

  // GAME CODE START
  const testSvg = document.createElement('svg');
  const testRect = document.createElement('rect');
  testRect.style.fill = '#1E1E1E';
  testRect.setAttribute('width', 5 * flashjs.svd);
  testRect.setAttribute('height', 5 * flashjs.svd);
  testSvg.setAttribute('width', 5 * flashjs.svd);
  testSvg.setAttribute('height', 5 * flashjs.svd);
  testSvg.style.borderRadius = '50%';
  testSvg.centered();
  testSvg.applyGravity();
  testSvg.applyCollision();
  testSvg.appendChild(testRect);
  game.appendChild(testSvg);

  // flashjs starts game
  flashjs.start();
})();