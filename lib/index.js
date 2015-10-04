
/**
 * Dependencies.
 */

var spawn = require('child_process').spawn;

/**
 * Network scanners.
 */

var scannersByPlatform = {
  darwin: {
    cmd: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport',
    args: ['-s'],
    parse: parseDarwin
  },
  linux: {
    cmd: 'iwlist',
    args: ['wlan0', 'scan'],
    parse: parseLinux
  },
  win32: {
    cmd: 'netsh',
    args: ['wlan', 'show', 'all'],
    parse: parseWindows
  }
};

/**
 * Expose `Scanner`.
 */

module.exports = Scanner;

/**
 * Scanner.
 */

function Scanner() {
  if (!(this instanceof Scanner)) return new Scanner();
}

/**
 * Scan for available wireless networks.
 *
 * @param {Function} done
 */

Scanner.prototype.scan = function(done) {
  var nativeScanner = scannersByPlatform[process.platform];

  var child = spawn(nativeScanner.cmd, nativeScanner.args);
  child.stdout.on('data', handleOut);
  child.stderr.on('data', handleErr);
  child.on('close', handleClose);

  var self = this;
  var output;
  var error;

  function handleOut(buffer) {
    output = buffer.toString();
  }

  function handleErr(buffer) {
    error = buffer.toString();
  }

  function handleClose() {
    if (error) {
      return done(new Error(error), null);
    }

    if (!output) {
      return self.scan(done);
    }

    done(null, nativeScanner.parse(output));
  }
};

/**
 * Parse the output on OS X.
 *
 * @param {String} output
 * @return {Array}
 */

function parseDarwin(output) {
  var re = /(.+) (([0-9a-fA-F][0-9a-fA-F]:){5}[0-9a-fA-F][0-9a-fA-F]) -\d{2}  (\S+)/;
  return output
    .split('\n')
    .map(function(line) {
      var result = line.trim().match(re);
      if (!result) return;
      return { ssid: result[1], bssid: result[2], channel: result[4] };
    })
    .filter(function(line) { return line; });
}

/**
 * Parse the output on Linux.
 *
 * @param {String} output
 * @return {Array}
 */

function parseLinux(output) {
  var re = /Cell \d+ - Address: (([0-9a-fA-F][0-9a-fA-F]:){5}[0-9a-fA-F][0-9a-fA-F])\s+ESSID:"(.+)"(\s+.+\s+){2} Frequency:.+\(Channel (\d+)\)/g;
  var ret = [];
  var result;

  while (result = re.exec(output)) {
    ret.push({ ssid: result[3], bssid: result[1], channel: result[5] });
  }

  return ret;
}

/**
 * Parse the output on Windows.
 *
 * Note: I haven't tested this one yet. If you test it and it
 * works, please let me know :)
 *
 * @param {String} output
 */

function parseWindows(output) {
  var re = /SSID\s\d+\s+:(.+)\s+Network type\s+:\s+\w+\s+Authentication\s+:\s+\w+\s+BSSID 1\s+:\s+(([0-9a-fA-F][0-9a-fA-F]:){5}[0-9a-fA-F][0-9a-fA-F])\s+Signal\s+:\s+\d+%\s+Radio type\s+:\s+\d+.\d+\w+\s+Channel\s+:\s+(\d+)/g;
  var ret = [];
  var result;

  while (result = re.exec(output)) {
    ret.push({ ssid: result[1], bssid: result[2], channel: result[4] });
  }

  return ret;
}
