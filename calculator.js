var screen,
    num,
    output,
    operator,
    buffer,
    runningTotal,
    prevNum = "",
    prevOper;

screen = document.getElementById("displayequation");
display = document.getElementById("displaytotal");

var calculateEquation = {
  '+': function(a, b) {
    return a + b;
  },
  '*': function(a, b) {
    return a * b;
  },
  '/': function(a, b) {
    return a / b;
  },
  '-': function(a, b) {
    return a - b;
  }
};

var elem = document.querySelectorAll(".num");
var len = elem.length;

// displays number(s)
for (var i = 0; i < len; i++ ) {
  elem[i].addEventListener("click", function() {
    num = this.value;
    output = screen.innerHTML += num;
    prevNum += num;
    prevOper = operator;
  }, false);
};

var elem1 = document.querySelectorAll(".operator");
var len1 = elem1.length;

// displays operator(s)
for (var i = 0; i < len1; i++) {
  elem1[i].addEventListener("click", function() {
    operator = this.value;
    if (output) {
      screen.innerHTML = output.concat(operator);
      if (prevOper == undefined || prevOper == "") {
        buffer = parseFloat(prevNum);
      } else {
        if (prevNum != ""){
          runningTotal = calculateEquation[prevOper](buffer, parseFloat(prevNum));
        }
        display.innerHTML = runningTotal;
        buffer = runningTotal;
      }
      prevNum = "";
    }
  }, false);
};

// remove previous entry
document.querySelector(".clear").addEventListener("click", function() {
  if (output == undefined) {
    console.log('error');
  }
  output = output.slice(0, -prevNum.length);
  prevNum = "";
  buffer = "";
  screen.innerHTML = output;
  display.innerHTML = "";

}, false);

// remove all entries
document.querySelector(".delete").addEventListener("click", function() {
  num;
  output = "";
  operator = "";
  buffer = "";
  runningTotal = "";
  prevNum = "";
  prevOper = "";
  screen.innerHTML = "";
  display.innerHTML = "";
}, false);

// calculate total
document.querySelector(".equal").addEventListener("click", function() {
  if (output != undefined){
    screen.innerHTML = output;
    display.innerHTML = calculateEquation[operator](buffer, parseFloat(prevNum));
  }
}, false);
