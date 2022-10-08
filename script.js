
var script = (function () {

  // ---------- Setup ----------

  // Getting OS to show download button
  const os = function () {
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

  var downloadButtons = function () {
    if (os() == 'iOS') {
      return `
      <a href="https://google.com" style="height: 48px;"><img src="./assets/download/appstore.svg" alt="Download on Google Play" height="48px" class="downloadBtn" style="margin-bottom: 8px;"></a>
      <br>
      <a href="https://google.com">All Downloads</a>
      `;
    } else if (os() == 'macOS') {
      return `
      <a href="https://google.com" style="height: 48px;"><img src="./assets/download/macappstore.svg" alt="Download on Google Play" height="48px" class="downloadBtn" style="margin-bottom: 8px;"></a>
      <br>
      <a href="https://google.com">All Downloads</a>
      `;
    } else if (os() == 'Android' || os() == 'Chrome OS') {
      return `
      <a href="https://google.com" style="height: 48px;"><img src="./assets/download/googleplay.png" alt="Download on Google Play" height="48px" class="downloadBtn" style="margin-bottom: 8px;"></a>
      <br>
      <a href="https://google.com">All Downloads</a>
      `;
    } else {
      return `
      <button id="windows" type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold downloadBtn" style="margin-bottom: 8px;">Download for Windows</button>
      <br>
      <a href="https://google.com">All Downloads</a>
      `;
    }
  }

  $('#downloadButtons').html(downloadButtons());
})();