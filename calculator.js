var screen,
    num,
    output,
    operator,
    buffer,
    runningTotal,
    prevNum = "",
    prevOper,
    clicked;

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

var elem = document.querySelectorAll(".num");
var len = elem.length;

// displays number(s)
for (var i = 0; i < len; i++ ) {

  elem[i].addEventListener("click", function() {
    //check if = is clicked;
    if (clicked == 'y') {
      output = "";
      screen.innerHTML = "";
      result.innerHTML = "";
      prevNum = "";
      buffer = "";
      prevOper ="";
      operator = "";
    };

    num = this.value;
    output = screen.innerHTML += num;
    prevNum += num;
    prevOper = operator;
    // buffer = num;

    if (isNaN(buffer)){
      buffer = runningTotal;
    };

    clicked = 'n';

  }, false);
};

var elem1 = document.querySelectorAll(".operator");
var len1 = elem1.length;

// displays operator(s)
for (var i = 0; i < len1; i++) {

  elem1[i].addEventListener("click", function() {
    operator = this.value;
    if (output || clicked == 'n') {
      clicked = 'n';
      check = output.concat(operator);

      if (isNaN(check.slice(-2, -1))){
        output = output.slice(0, -1);
        output = output.concat(operator);
        screen.innerHTML = output;
      } else {
        screen.innerHTML = check;
      };

      runningTotal = buffer;

      if (prevOper == undefined || prevOper == "") {
        buffer = parseFloat(prevNum);
      } else {
        if (prevNum != ""){
          runningTotal = calculateEquation[prevOper](buffer, parseFloat(prevNum));
        };
        result.innerHTML = runningTotal;
        buffer = runningTotal;
      };

      if (isNaN(buffer) && isNaN(prevOper)){
        runningTotal = buffer;
      };

      prevNum = "";

    };
  }, false);
};

// remove previous entry
document.querySelector(".clear").addEventListener("click", function() {
  if (output == undefined) {
    console.log('error');
  } else {
    output = output.slice(0, -prevNum.length);
    screen.innerHTML = output;
    prevNum = "";
    buffer;
    prevOper = "";
    result.innerHTML = "";
  };
  runningTotal = buffer;
  clicked = 'n';
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
  screen.innerHTML = "";
  result.innerHTML = "";

}, false);

// calculate total
document.querySelector(".equal").addEventListener("click", function() {
  if (operator == undefined) {
    console.log('error');
  } else if (output != undefined) {
    total = calculateEquation[operator](buffer, parseFloat(prevNum));
    check = screen.innerHTML.substr(screen.innerHTML.length -1);
    check = parseFloat(check);

    if (isNaN(check)){
      screen.innerHTML = screen.innerHTML.slice(0, -1);
    } else {
      result.innerHTML = total;
      screen.innerHTML = output;
    };

  };

  clicked = 'y';

}, false);
