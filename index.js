// QUERIES
const lastOperation = document.querySelector('.last-operation');
const currentOperation = document.querySelector('.current-operation');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
// const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');


// LET VARIABLES
let a = 0;
let b = 0;
let isOperator;
let myOperator;
let result;
let isDecimal;


// var displayValue = 0;



// FUNCTION
const saveOperand = (e) => {
  // if(e.target.textContent === "." && isOperator) {
  //   a += ".";
  // } else if (e.target.textContent === "." && !isOperator) {
  //   b += ".";
  // }

  if(!a || isDecimal === true) {
    isOperator = true;
    a += parseFloat(e.target.textContent);
    currentOperation.textContent = a;
    console.log(a);
  } else if(e.target.textContent === "." && isOperator) {
    console.log(`decimal and isOperator ${isOperator}`)
    a += ".";
    isDecimal = true;
    console.log(`new a = ${a}`);
  } else if(!b) {
    if(isDecimal) {
      a += e.target.textContent;
      return;
    }

    isOperator = false;
    b = e.target.textContent;
    currentOperation.textContent = b;
    console.log(b);    
    operate(parseFloat(a), parseFloat(b), translateOperator(myOperator));
    // Remember that operate() doesn't return a result
    // Do not console.log(result)
    // Go to operate()
  } else if(e.target.textContent === "." && !isOperator) {
    console.log(`decimal and isOperator ${isOperator}`)
    b += ".";
  }
};


// EVENT LISTENERS
operands.forEach(operand => 
  operand.addEventListener('click', saveOperand));

operators.forEach(operator =>
  operator.addEventListener('click', (e) => {
    if (isOperator) {
      myOperator = e.target.textContent;
      console.log(myOperator);
      isDecimal = false;   
    } else {
      myOperator = e.target.textContent;
      console.log(myOperator);    
      currentOperation.textContent = result;
      a = result;
      b = null;
      isOperator = true;
      isDecimal = false;
    }   
}));


// decimalButton.addEventListener('click', () => {
  
// });


equalButton.addEventListener('click', () => {
  a = result;
  b = null;
  currentOperation.textContent = result;
});


clearButton.addEventListener('click', () => {
  lastOperation.textContent = "";
  currentOperation.textContent = "";
  a = 0;
  b = 0;
  result = 0;
});






// OPERATORS


const add = (a, b) => {
  return a + b;   
}

const subtract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return a * b;
}

const divide = (a, b) => {
  return a / b;
}

const modulo = (a, b) => {
  return a % b;
}


//  FUNCTIONS
const translateOperator = (operator) => {
  if(operator === '+') {
    console.log("add");
    return add;
  } else if(operator === '-') {
    console.log("subtract");
    return subtract;
  } else if(operator === 'x') {
    console.log("multiply");
    return multiply;
  } else if(operator === '/') {
    console.log("divide");
    return divide;
  } else {
    console.log("modulo");
    return modulo;
  }
}



function operate (a, b, operator) {
  currentValue = operator(a,b);
  result = currentValue;
  console.log(result); 
  // currentOperation.textContent = currentValue;
}










