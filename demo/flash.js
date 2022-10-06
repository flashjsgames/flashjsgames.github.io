
// Copyright Jining Liu. MIT License. More on GitHub.

var flashjs = (function() {

  var config = {
    ar: null,
    d: null
  }

  const w = parseInt(window.getComputedStyle(document.querySelector('flashjs')).width.replace('px', '')) / 100 * 90;
  const h = parseInt(window.getComputedStyle(document.querySelector('flashjs')).height.replace('px', '')) / 100 * 90;
  config.d = w < h ? w : h;

  document.querySelector('flashjs').style.width = config.d / config.ar[1] + 'px';
  document.querySelector('flashjs').style.height = config.d / config.ar[0] + 'px';

  function init(configuration) {
    var aspectRatio = configuration?.aspectRatio;
    if (aspectRatio == null) {
      console.error('flashjs: value "aspectRatio" is missing in the configuration variable object.');
      return;
    }
    aspectRatio = aspectRatio.split(':');
    if (aspectRatio.length != 2) {
      console.error('flashjs: variable aspectRatio must be a valid ratio. (Example: 1:1)');
      return;
    }
    const aspectRatioInt = [];
    aspectRatio.forEach((val) => {
      aspectRatioInt.push(parseInt(val));
    });
    aspectRatio = aspectRatioInt;

    config.ar = aspectRatio;

    console.log(config);
  }
  
  function start() {
    setTimeout(function() {
      document.querySelector('loading').style.width = '0';
      document.querySelector('loading').style.height = '0';

      setTimeout(function() {
        document.querySelector('loading').style.marginBottom = h + h / 10 + 8 + 'px';
        document.querySelector('flashjs').style.width = config.d / config.ar[1] + 'px';
        document.querySelector('flashjs').style.height = config.d / config.ar[0] + 'px';
        console.log('started');

        setTimeout(function() {
          document.querySelector('loading').remove();
        }, 500);
      }, 500);
    }, 1000);
  }

  return {
    init: init, 
    start: start
  }
  
})();