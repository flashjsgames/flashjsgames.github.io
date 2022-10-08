
// Copyright Jining Liu. MIT License. More on GitHub.

var flashjs = (function () {

  var config = {
    ar: null,
    tar: null,
    br: null,
    d: null
  }

  var w = parseInt(window.getComputedStyle(document.querySelector('body')).width.replace('px', '')) * 0.9;
  var h = parseInt(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) * 0.9;

  config.d = w < h ? w : h;

  function init(userConfig) {
    const configuration = userConfig || {
      aspectRatio: '1:1',
      borderRadius: config.d / 90 + 'px'
    }
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
      aspectRatioInt.push(parseFloat(val));
    });
    aspectRatio = aspectRatioInt;

    config.ar = aspectRatio;
    config.tar = typeof configuration.sizeBasedAspectRatio == "boolean" ? !configuration.sizeBasedAspectRatio : true
    config.br = configuration.borderRadius;

    console.log(config);

    document.querySelector('flashjs').style.width = config.d + 'px';
    document.querySelector('flashjs').style.height = config.d + 'px';

    document.querySelector('flashjs').style.borderRadius = config.br || 0 + 'px';

    document.querySelector('loading').style.opacity = 1;
  }

  function start() {
    if (!(config.d || 1)) {
      console.error('flashjs: script was unable to find or calculate the config.d (flashjs.svd) value (null).');
      return
    }

    if (config.tar == null) {
      console.error('flashjs: unable to find required variable values. (Make sure to run flashjs.init(config) before running flashjs.start().)');
      return
    }

    setTimeout(function () {
      document.querySelector('loading').style.width = '0';
      document.querySelector('loading').style.height = '0';

      setTimeout(function () {
        document.querySelector('loading').style.marginBottom = h + h / 9 + 64 + 'px';
        if (config.tar) {
          document.querySelector('flashjs').style.width = config.d + 'px';
          document.querySelector('flashjs').style.height = config.d / (config.ar[0] / config.ar[1]) + 'px';
        } else {
          document.querySelector('flashjs').style.width = config.d / config.ar[1] + 'px';
          document.querySelector('flashjs').style.height = config.d / config.ar[0] + 'px';
        }
        console.log('started');

        setTimeout(function () {
          document.querySelector('loading').remove();
          document.querySelector('flashjs').style.transition = 'unset';
        }, 500);
      }, 500);
    }, 1000);
  }

  window.addEventListener('resize', function () {
    w = parseInt(window.getComputedStyle(document.querySelector('body')).width.replace('px', '')) * 0.9;
    h = parseInt(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) * 0.9;

    config.d = w < h ? w : h;

    if (config.tar) {
      document.querySelector('flashjs').style.width = config.d + 'px';
      document.querySelector('flashjs').style.height = config.d / (config.ar[0] / config.ar[1]) + 'px';
    } else {
      document.querySelector('flashjs').style.width = config.d / config.ar[1] + 'px';
      document.querySelector('flashjs').style.height = config.d / config.ar[0] + 'px';
    }

    document.querySelector('flashjs').style.borderRadius = config.br || 0 + 'px';
  });

  return {
    svd: config.d / 90,
    init: init,
    start: start
  }

})();