
// Copyright Jining Liu. MIT License. More on GitHub.

var flashjs = (function () {

  var started = false;

  var config = {
    ar,
    tar,
    br,
    bg,
    d
  }

  var w = parseFloat(window.getComputedStyle(document.querySelector('body')).width.replace('px', '')) * 0.9;
  var h = parseFloat(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) * 0.9;

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
    config.tar = typeof configuration.sizeBasedAspectRatio == 'boolean' ? !configuration.sizeBasedAspectRatio : true
    config.br = configuration.borderRadius;
    config.bg = configuration.backgroundColor || 'unset';

    console.log(config);

    document.querySelector('flashjs').style.width = config.d + 'px';
    document.querySelector('flashjs').style.height = config.d + 'px';

    document.querySelector('flashjs').style.borderRadius = config.br || 0;

    document.querySelector('flashjs').style.background = config.bg;

    document.querySelector('loading').style.opacity = 1;
  }

  function start() {
    if (!(config.d || 1)) {
      console.error('flashjs: script was unable to find or calculate the config.d (flashjs.svd) value (null).');
      return
    }

    if (config.tar == null || config.bg == null) {
      console.error('flashjs: unable to find required variable values. (Make sure to run flashjs.init(config) before running flashjs.start().)');
      return
    }

    document.querySelector('flashjs').innerHTML = document.querySelector('flashjs').innerHTML;

    setTimeout(function () {
      document.querySelector('loading').style.width = '0';
      document.querySelector('loading').style.height = '0';
      document.querySelector('flashjs').style.backgroundColor = config.bg;

      setTimeout(function () {
        document.querySelector('loading').style.marginBottom = h / 2 + 'px';
        document.querySelector('loading').style.opacity = 0;
        if (config.tar) {
          document.querySelector('flashjs').style.width = config.d + 'px';
          document.querySelector('flashjs').style.height = config.d / (config.ar[0] / config.ar[1]) + 'px';
        } else {
          document.querySelector('flashjs').style.width = config.d / config.ar[1] + 'px';
          document.querySelector('flashjs').style.height = config.d / config.ar[0] + 'px';
        }
        document.querySelector('flashjs').style.transition = 'all 500ms';
        document.querySelector('flashjs').style.opacity = 1;
        console.log('started');

        setTimeout(function () {
          document.querySelector('loading').remove();
          document.querySelector('flashjs').style.transition = 'unset';

          const gravityObjects = document.querySelectorAll('[gravity="true"]');
          gravityObjects.forEach(function (el) {
            const mul = parseFloat(el.getAttribute('gravity-multiplier'));
            gravity(el, mul);
          });

          started = true;
        }, 500);
      }, 500);
    }, 1000);
  }

  window.addEventListener('resize', function () {
    w = parseFloat(window.getComputedStyle(document.querySelector('body')).width.replace('px', '')) * 0.9;
    h = parseFloat(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) * 0.9;

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

  function applyGravity(el, mul) {
    el.setAttribute('gravity', 'true');
    el.setAttribute('gravity-multiplier', mul);
    if (started) {
      gravity(el, mul)
    }
  }

  async function gravity(el, mul) {
    console.log('applying gravity to:');
    console.log(el);
    var velocity = 1
    setInterval(async function () {
      el.style.marginTop = parseFloat(window.getComputedStyle(el).marginTop.replace('px', '')) + velocity;
      velocity += 1;
    }, 15 * (mul || 1));
  }

  return {
    svd: config.d / 90,
    init: init,
    start: start,
    applyGravity: applyGravity
  }

})();

Object.defineProperty(HTMLElement.prototype, "centered", {
  value: function centered() {
    const container = document.querySelector('flashjs');
    const marginVertical = (parseFloat(window.getComputedStyle(container).height) - (this.attributes.height.value || this.style.height)) / 2;
    const marginHorizontal = (parseFloat(window.getComputedStyle(container).width) - (this.attributes.width.value || this.style.width)) / 2;
    this.style.margin = marginVertical + 'px ' + marginHorizontal + 'px';
  },
  writable: true,
  configurable: true
});

Object.defineProperty(HTMLElement.prototype, "applyGravity", {
  value: function applyGravity(mul) {
    flashjs.applyGravity(this, mul)
  },
  writable: true,
  configurable: true
});