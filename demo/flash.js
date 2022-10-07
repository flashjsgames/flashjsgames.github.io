
// Copyright Jining Liu. MIT License. More on GitHub.

var flashjs = (function() {

  var config = {
    ar: null,
    br: null,
    d: null
  }

  const w = parseInt(window.getComputedStyle(document.querySelector('flashjs')).width.replace('px', '')) / 105 * 90;
  const h = parseInt(window.getComputedStyle(document.querySelector('flashjs')).height.replace('px', '')) / 105 * 90;
  
  config.d = w < h ? w : h;

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
    config.br = configuration.borderRadius;

    console.log(config);
  
    document.querySelector('flashjs').style.width = config.d + 'px';
    document.querySelector('flashjs').style.height = config.d + 'px';
    
    document.querySelector('flashjs').style.borderRadius = config.br || 0 + 'px';
  
    document.querySelector('loading').style.opacity = 1;
  }
  
  function start() {
    setTimeout(function() {
      document.querySelector('loading').style.width = '0';
      document.querySelector('loading').style.height = '0';

      setTimeout(function() {
        document.querySelector('loading').style.marginBottom = h + h / 9 + 64 + 'px';
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