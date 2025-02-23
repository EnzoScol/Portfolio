// Désactive tous les console.log en production
(() => {
  if (window.console) {
    const noop = () => {};
    const methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
      'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
      'info', 'log', 'markTimeline', 'profile', 'profileEnd',
      'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'
    ];
    methods.forEach(method => {
      console[method] = noop;
    });
  }
})(); 