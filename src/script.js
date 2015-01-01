(function main() {
  var time = document.querySelector('.Color__Time');
  var code = document.querySelector('.Color__Code');
  var style = document.body.style;
  (function tick() {
    var now = moment();
    time.innerText = now.format('HH : mm : ss');
    style.backgroundColor = code.innerText = now.format('#HHmmss');
    setTimeout(tick, 1000);
  }(style.width));
}());
