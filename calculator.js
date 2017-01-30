var screen,
    num,
    output,
    operator,
    buffer,
    runningTotal,
    prevNum = "",
    prevOper,
    clickedEqual,
    decAdded = false;

screen = document.getElementById("displayequation");
result = document.getElementById("displaytotal");

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

// check if num is empty, null or undefined
function isEmpty(num){
  return (!num || /^\s*$/.test(num));
};

// round number to 2 decimal points
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

// gets the last value of the output
function lastChar(output){
  return output.substring(output.length-1, output.length);
}

var elem = document.querySelectorAll(".num");
var len = elem.length;

// displays number(s)
for (var i = 0; i < len; i++ ) {

  elem[i].addEventListener("click", function() {
    num = this.value;

    // checks if there's a value before decimal if not add a zero before value
    if (num == '.' && isEmpty(prevNum)){
      output = screen.innerHTML += "0" + num ;

    // checks for extra decimal
    } else if (num == ".") {

      if (!decAdded){
        decAdded = true;
        screen.innerHTML += num;
      };

    } else {
      output = screen.innerHTML += num;
    };

    prevNum += num;
    prevOper = operator;

    if (isEmpty(buffer)){
      buffer = runningTotal;
    };

    clickedEqual = false;

  }, false);
};

var elem1 = document.querySelectorAll(".operator");
var len1 = elem1.length;

// displays operator(s)
for (var i = 0; i < len1; i++) {

  elem1[i].addEventListener("click", function() {

    operator = this.value;
    if (output && operator) {
      clickedEqual = false;

      check = output.concat(operator);

      // check for double operators after clear entry
      if (isNaN(check.slice(-2, -1))){
        output = output.slice(0, -1);
        output = output.concat(operator);
        screen.innerHTML = output;
      } else {
        screen.innerHTML = check;
      };

      runningTotal = buffer;

      // error handling if they clear then change number/operator
      if (isEmpty(prevOper) && !isEmpty(prevNum)) {
        buffer = parseFloat(prevNum);
      } else if (isEmpty(buffer)) {
        buffer = runningTotal;

      } else {

        // if equal isnt clicked, calculate running total
        if (!isEmpty(prevNum) && !isEmpty(runningTotal)){
          runningTotal = calculateEquation[prevOper](buffer, parseFloat(prevNum));
        } else if (isEmpty(runningTotal)){
          runningTotal = buffer;
        };

        result.innerHTML = runningTotal;
        buffer = runningTotal;

      };

      if (isEmpty(buffer) && isEmpty(prevOper)){
        runningTotal = buffer;
      };

      prevNum = "";
      decAdded = false;
    };

  }, false);
};

// remove previous entry
document.querySelector(".clear").addEventListener("click", function() {
  if (!isEmpty(output)) {
    output = output.slice(0, -prevNum.length);
    screen.innerHTML = output;
    prevNum = "";
    buffer;
    prevOper = "";
    result.innerHTML = "";
  };
  runningTotal = buffer;
  clickedEqual = false;
  decAdded = false;
}, false);

// remove all entries
document.querySelector(".delete").addEventListener("click", function() {
  num ="";
  output = "";
  operator = "";
  buffer = "";
  runningTotal = "";
  prevNum = "";
  prevOper = "";
  clickedEqual = false;
  decAdded = false;
  screen.innerHTML = "";
  result.innerHTML = "";
}, false);

// calculate total
document.querySelector(".equal").addEventListener("click", function() {

  if (!clickedEqual && !isEmpty(operator) && !isEmpty(buffer)){

    total = calculateEquation[operator](buffer, parseFloat(prevNum));
    checkFloat = parseFloat(lastChar(screen.innerHTML));

    // checks if there is no operator or decimal afterwards
    if (isEmpty(checkFloat)){
      screen.innerHTML = screen.innerHTML.slice(0, -1);

    } else {
      result.innerHTML = roundToTwo(total);
      screen.innerHTML = output;
    };

    if (lastChar(prevNum) == "."){
      result.innerHTML = roundToTwo(total);
    }

  };

  clickedEqual = true;
  decAdded = false;

}, false);
