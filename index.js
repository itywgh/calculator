// QUERIES
const lastOperation = document.querySelector('.last-operation');
const currentOperation = document.querySelector('.current-operation');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
const decimalButton = document.querySelector('.decimal-button');
const deleteButton = document.querySelector('.delete-button');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');


// LET VARIABLES
let a = "";
let b = "";
let secondOperation;
let myOperator;
let result;
let infinitum;
let equalPressed;



// FUNCTIONS
const saveOperand = (e) => {
  if(!a && a !== 0 || !secondOperation) {    
    a += e.target.textContent;
    currentOperation.textContent = parseFloat(a, 10); // DISPLAY
    console.log(`a = ${a}`);
  } else if(!b || secondOperation) {            
      b += e.target.textContent;
      currentOperation.textContent = parseFloat(b, 10); // DISPLAY
      console.log(`b = ${b}`);    
      operate(parseFloat(a), parseFloat(b), translateOperator(myOperator)); // OPERATION
    } 
};


const clearCalc = () => {
  if (infinitum) {
    currentOperation.classList.remove("we-do-not");
    operators.forEach(operator => {
      operator.classList.remove("operator-disabled");
    });
    operands.forEach(operand => {
      operand.classList.remove("operand-disabled");
    });
    decimalButton.classList.remove("operand-disabled");
    deleteButton.classList.remove("operand-disabled");
    equalButton.classList.remove("operator-disabled");
    infinitum = false;
  }
  
  lastOperation.textContent = "";
  currentOperation.textContent = "";
 
  a = "";
  secondOperation = false;
  b = "";
  result = 0;
}


const dividedByZero = () => {
  currentOperation.classList.add("we-do-not");
  currentOperation.textContent = `We Don't Do That Here`;
  operators.forEach(operator => {
    operator.classList.add("operator-disabled");
  });
  operands.forEach(operand => {
    operand.classList.add("operand-disabled");
  });
  decimalButton.classList.add("operand-disabled");
  deleteButton.classList.add("operand-disabled");
  equalButton.classList.add("operator-disabled");
  infinitum = true;
}


function translateOperator(operator) {
  if(operator === '+') {
    return add;
  } else if(operator === '−') {
    return subtract;
  } else if(operator === 'x') { 
    return multiply;
  } else if(operator === '÷') {
    return divide;
  } else {
    return modulo;
  }
}

function operate (a, b, operator) {  
  result = operator(a,b);  
  console.log(result);
}



// EVENT LISTENERS
operands.forEach(operand => 
  operand.addEventListener('click', saveOperand));

operators.forEach(operator =>
  operator.addEventListener('click', (e) => {    
    
    if (!secondOperation) {
      myOperator = e.target.textContent;
      console.log(myOperator);
      secondOperation = true;
         
    } else {
        myOperator = e.target.textContent;
        console.log(myOperator);    
        currentOperation.textContent = result;
        result ? a = result : a = 0;      
        console.log(`result = ${result} and a = ${a}`); 
        b = "";       
        
    }   
}));


decimalButton.addEventListener('click', () => {
  if (b.includes(".")) { // Avoid adding a dot while input b    
    return;
  }

  if (b === "" && equalPressed === true) { // If the input is decimal point after equal signed was pressed.
    secondOperation = false;               // We "reset" and start receiving 'a' input
    a = ".";
    currentOperation.textContent = a;
    equalPressed = false;
    return;
  }

  if (!secondOperation) {
    if (a.includes(".")) { // Avoid adding a dot while input a
      return;
    }
    a += ".";
    currentOperation.textContent = a;//parseFloat(a, 10); // DISPLAY
    console.log(`a = ${a}`);
  } else {
      console.log("b here");
      b += ".";
      currentOperation.textContent = b;//parseFloat(b, 10); // DISPLAY
      console.log(`b = ${b}`);
    }
});


equalButton.addEventListener('click', () => {
  if (a === "" || b === "") { // If a or b are not defined yet
    console.log("undefined");
    return;
  } 
  // secondOperation = false;
  a = result;    
  b = "";
  currentOperation.textContent = result;
  equalPressed = true;
});


clearButton.addEventListener('click', clearCalc);



// OPERATORS
const add = (a, b) => Number((a + b).toFixed(6));
const subtract = (a, b) => Number((a - b).toFixed(6));
const multiply = (a, b) => Number((a * b).toFixed(6));
const modulo = (a, b) => a % b;
const divide = (a, b) => {
  if(b === 0) {
    dividedByZero();         
    return;
  } 
  
  return Number((a / b).toFixed(6));  
}



// function operate (a, b, operator) {  
//   result = operator(a,b);  
//   console.log(result);
// }










