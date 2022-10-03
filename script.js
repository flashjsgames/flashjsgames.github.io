
var script = (function() {

  // Setup
  
  // Getting OS to show download button
  const os = function() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macuserOSPlatforms = ['MacintuserOSh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iuserOSPlatforms = ['iPhone', 'iPad', 'iPod'],
        userOS = null;
    if (macuserOSPlatforms.indexOf(platform) !== -1) {
      userOS = 'macOS';
    } else if (iuserOSPlatforms.indexOf(platform) !== -1) {
      userOS = 'iOS';
    } else if (/Android/.test(userAgent)) {
      userOS = 'Android';
    }
    return userOS;
  }

  var downloadButtons = `
  <button id="windows" type="button" class="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Download for Windows</button>
    <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
  `;
  
  if (os == 'iOS') {
    downloadButtons = `
    <a href="https://google.com"><img src="./assets/download/appstore.svg" alt="Download on the App Store" height="40px"></a>
    <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
    `;
  } else if (os == 'macOS') {
    downloadButtons = `
    <a href="https://google.com"><img src="./assets/download/macappstore.svg" alt="Download on the App Store" height="40px"></a>
    <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
    `;
  } else if (os == 'Android') {
    downloadButtons = `
    <a href="https://google.com"><img src="./assets/download/appstore.svg" alt="Download on the App Store" height="40px"></a>
    <button id="downloads" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">All Downloads</button>
    `;
  }

  $('#downloadButtons').html(downloadButtons);
  
})();