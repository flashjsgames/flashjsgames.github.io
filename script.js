
var script = (function() {

  // Version: web-alpha3

  // ---------- Setup ----------
  
  // Getting OS to show download button
  const os = function() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macOSPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin', 'macOS'],
        iOSPlatforms = ['iPhone', 'iPad', 'iPod', 'iOS', 'iPadOS'],
        userOS = null;
    if (macOSPlatforms.indexOf(platform) !== -1) {
      userOS = 'macOS';
    } else if (iOSPlatforms.indexOf(platform) !== -1) {
      userOS = 'iOS';
    } else if (/Android/.test(userAgent)) {
      userOS = 'Android';
    } else if (platform.replace(' ', '').includes('ChromeOS')) {
      userOS = 'Chrome OS';
    }
    return userOS;
  }

  var downloadButtons = function() {
    if (os() == 'iOS') {
      return `
      <a href="https://google.com"><img src="./assets/download/appstore.svg" alt="Download on the Mac App Store" height="48px" class="downloadBtn"></a>
      <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
      `;
    } else if (os() == 'macOS') {
      return `
      <a href="https://google.com"><img src="./assets/download/macappstore.svg" alt="Download on the App Store" height="48px" class="downloadBtn"></a>
      <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
      `;
    } else if (os() == 'Android' || os() == 'Chrome OS') {
      return `
      <a href="https://google.com"><img src="./assets/download/googleplay.png" alt="Download on Google Play" height="48px" class="downloadBtn"></a>
      <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
      `;
    } else {
      return `
      <button id="windows" type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold downloadBtn">Download for Windows</button>
      <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
      `;
    }
  }

  $('#downloadButtons').html(downloadButtons());
  $('.downloadBtn').css('transition', 'width 1s ease-in-out');
  $('#downloads').width($('.downloadBtn').width());
})();