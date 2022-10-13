
// Copyright Jining Liu. MIT License. More on GitHub.

var flashjs = (function () {

  var started = false;

  var config = {
    ar: null,
    tar: null,
    br: null,
    bg: null,
    d: null
  }

  var w = parseFloat(window.getComputedStyle(document.querySelector('body')).width.replace('px', '')) * 0.9;
  var h = parseFloat(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) * 0.9;

  config.d = w < h ? w : h;

  var movementAllowed = [];

  var usedIds = [];

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

          const collisionObjects = document.querySelectorAll('[collision="true"]');
          collisionObjects.forEach(function (el) {
            collision(el);
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
    // if ((el.getAttribute('flashjs-id') || '') == '') {
      var elId = uuid();
      while (usedIds.includes(elId)) {
        elId = uuid();
      }
      console.log(elId)
      movementAllowed.push(elId);
      usedIds.push(elId);
      el.setAttribute('flashjs-id', elId);
    // } else if (!movementAllowed.includes(el.getAttribute('flashjs-id'))) {
    //   movementAllowed.push(el.getAttribute('flashjs-id'));
    //   if (!usedIds.includes(el.getAttribute('flashjs-id'))) {
    //     usedIds.push(el.getAttribute('flashjs-id'));
    //   }
    // }
    console.log(el.getAttribute('flashjs-id'))
    if (started) {
      gravity(el, mul)
    }
  }

  async function gravity(el, mul) {
    var velocity = 2;
    setInterval(async function () {
      console.log(movementAllowed)
      console.log(el)
      console.log(document.querySelectorAll('[gravity="true"]')[0])
      console.log(document.querySelectorAll('[gravity="true"]')[0].getAttribute('flashjs-id'))
      console.log(el.getAttribute('flashjs-id'))
      if (movementAllowed.includes(el.getAttribute('flashjs-id'))) {
        el.style.marginTop = parseFloat(window.getComputedStyle(el).marginTop.replace('px', '')) + velocity * (mul || 1);
        velocity += 0.5;
      }
    }, 20);
  }

  function applyCollision(el) {
    el.setAttribute('collision', 'true');
    if (started) {
      collision(el)
    }
  }

  async function collision(el1, el2a) {
    const el2 = el2a || document.querySelector('flashjs');
    const collide = isCollide(el1, el2);
    observeStyle(el1, function (mr) {
      console.log(mr.target.style.margionTop);
      console.log(collide);
      console.log(isCollide);
      console.log('--------------------');
    });
    // var el1Id = uuid();
    // var el2Id = uuid();
    // if ((el1.getAttribute('flashjs-id') || '') == '') {
    //   var elId = uuid();
    //   while (usedIds.includes(elId)) {
    //     elId = uuid();
    //   }
    //   console.log(elId)
    //   el1Id = elId;
    //   usedIds.push(el1Id);
    //   el1.setAttribute('flashjs-id', el1Id);
    // } else if (!usedIds.includes(el1.getAttribute('flashjs-id'))) {
    //   usedIds.push(el1.getAttribute('flashjs-id'));
    // }
    // if ((el2.getAttribute('flashjs-id') || '') == '') {
    //   var elId = uuid();
    //   while (usedIds.includes(elId)) {
    //     elId = uuid();
    //   }
    //   console.log(elId)
    //   el2Id = elId;
    //   usedIds.push(el2Id);
    //   el2.setAttribute('flashjs-id', el2Id);
    // } else if (!usedIds.includes(el2.getAttribute('flashjs-id'))) {
    //   usedIds.push(el2.getAttribute('flashjs-id'));
    // }
    // console.log('applying collision to:');
    // console.log(el1);
    // console.log('and');
    // console.log(el2);
    // const onStyleChange = function (mutationRecord) {
    //   console.log(mutationRecord.target)
    //   console.log(mutationRecord.target.style);
    //   var target = document.querySelectorAll('[flashjs-id="' + el1Id + '"]')[0];
    //   if (mutationRecord.target.getAttribute('flashjs-id') == el1Id) {
    //     target = document.querySelectorAll('[flashjs-id="' + el2Id + '"]')[0]; 
    //   }
    //   var elMargin = [parseFloat(window.getComputedStyle(mutationRecord.target).marginTop.replace('px', '')), parseFloat(window.getComputedStyle(mutationRecord.target).marginBottom.replace('px', '')), parseFloat(window.getComputedStyle(mutationRecord.target).marginLeft.replace('px', '')), parseFloat(window.getComputedStyle(mutationRecord.target).marginRight.replace('px', ''))];
    //   var elSize = [parseFloat(window.getComputedStyle(mutationRecord.target).width.replace('px', '')), parseFloat(window.getComputedStyle(mutationRecord.target).height.replace('px', ''))];
    //   var targetMargin = [parseFloat(window.getComputedStyle(target).marginTop.replace('px', '')), parseFloat(window.getComputedStyle(target).marginBottom.replace('px', '')), parseFloat(window.getComputedStyle(target).marginLeft.replace('px', '')), parseFloat(window.getComputedStyle(target).marginRight.replace('px', ''))];
    //   var targetSize = [parseFloat(window.getComputedStyle(target).width.replace('px', '')), parseFloat(window.getComputedStyle(target).height.replace('px', ''))];
    //   if (elMargin[0] <= 0 || elMargin[0] >= targetMargin[0] || elMargin[2] <= 0 || elMargin[2] >= targetMargin[2] || ((mutationRecord.target.id == 'flashjs-id') && ((elMargin[0] >= (parseFloat(window.getComputedStyle(document.querySelector('body')).height.replace('px', '')) - targetSize[1]) / 2 + targetSize[1])))) {
    //     movementAllowed = movementAllowed.filter(e => e !== mutationRecord.target.getAttribute('flashjs-id'));
    //     console.log('gravity disabled (due to collision) on:');
    //     console.log(mutationRecord.target);
    //   }
    // };
    // observeStyle(el1, onStyleChange);
    // observeStyle(el2, onStyleChange);
  }

  function observeStyle(el, func) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutationRecord) {
        func(mutationRecord);
      });
    });
    observer.observe(el, { attributes: true, attributeFilter: ['style'] });
  }

  function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function isCollide(a, b) {
    var aRect = a.getBoundingClientRect();
    var bRect = b.getBoundingClientRect();
    return !(
      ((aRect.top + aRect.height) < (bRect.top)) ||
      (aRect.top > (bRect.top + bRect.height)) ||
      ((aRect.left + aRect.width) < bRect.left) ||
      (aRect.left > (bRect.left + bRect.width))
    );
  }

  return {
    svd: config.d / 90,
    init: init,
    start: start,
    applyGravity: applyGravity,
    applyCollision: applyCollision
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

Object.defineProperty(HTMLElement.prototype, "applyCollision", {
  value: function applyCollision() {
    flashjs.applyCollision(this)
  },
  writable: true,
  configurable: true
});