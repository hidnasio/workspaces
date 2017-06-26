'use strict';

var versions = [
  { version: 1, callback: migrate_1_0_1 },
  { version: 2, callback: migrate_1_0_2 },
  { version: 3, callback: migrate_1_0_3 },
]

function migrate_1_0_1() {
  alert('going into migrate_1_0_1');
}

function migrate_1_0_2() {
  alert('going into migrate_1_0_2');
}

function migrate_1_0_3() {
  alert('going into migrate_1_0_3');
}

function migrate() {
  chrome.storage.local.get('db:version', function(value) {
    if(Object.keys(value).length === 0) {
      chrome.storage.local.set({'db:version': 0}, function() {
        return migrate();
      });
    }

    var currentDBVersion = value['db:version'];

    versions.forEach(function({version, callback}) {
      if(version > currentDBVersion) {
        callback();
        chrome.storage.local.set({'db:version': version}, function() {
        });
      }
    });
  });
}

chrome.runtime.onInstalled.addListener(function() {
  migrate();
});
