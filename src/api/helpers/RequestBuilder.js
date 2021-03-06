const getLocalArcher = require('api/helpers/getLocalArcher');

module.exports = function(path, method, callbacks) {
  var xmlhttp = new XMLHttpRequest();
  var url = 'http://localhost:8080';
  if (path !== '/login/') {
    var archer = getLocalArcher();
    if (typeof archer !== 'undefined') {
      url += ['/archers/', archer.id].join('');
    } else {
      callbacks.failure.call(callbacks.context,
                             new ReferenceError('Missing Token.'));
      return;
    }
  }
  url += path;

  xmlhttp.open(method, url, true);
  if (path !== '/login/') {
    xmlhttp.setRequestHeader("X-AAA-Authorization", localStorage.loggedToken);
  }
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.setRequestHeader("Connection", "close");

  if (typeof callbacks !== 'undefined') {
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        if (typeof callbacks[xmlhttp.status] !== 'undefined') {
          callbacks[xmlhttp.status].call(callbacks.context, xmlhttp);
        } else if (typeof callbacks.failure === 'undefined') {
          console.error("Cannot callback after finishing request.", xmlhttp);
        } else {
          callbacks.failure.call(callbacks.context, xmlhttp);
        }
      }
    };
  }

  return xmlhttp;
};
