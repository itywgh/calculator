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
  console.log(`secondOperation at the start of saveOperand = ${secondOperation}`);
  let helper = e;
  if (e.type === 'click') {
    helper = e.target.dataset.key;
  } else {
    helper = e.key;
  }

  if (b === "" && equalPressed === true) { // If we input after after equal signed was pressed.
    secondOperation = false;               // We "reset" and start receiving 'a' input
    a = helper;
    currentOperation.textContent = a;
    equalPressed = false;
  }


  else if(!a && a !== 0 || !secondOperation) {           
    // a += e.target.textContent;
    a += helper;
    // console.log(`A is ${a}`);
    currentOperation.textContent = parseFloat(a, 10); // DISPLAY
    console.log(`a = ${a}`);
  } else if(!b || secondOperation) {            
      // b += e.target.textContent;
      b += helper;
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
  } else if(operator === '-') {
    return subtract;
  } else if(operator === 'x' || operator === '*') { 
    return multiply;
  } else if(operator === '/') {
    return divide;
  } else {
    return modulo;
  }
}


function operate (a, b, operator) {  
  result = operator(a,b);  
  console.log(result);
}


function inputOperator(e) {
  console.log(`secondOperation at the start of inputOperation = ${secondOperation}`);
  let helper = e;
  if (e.type === 'click') {
    helper = e.target.dataset.key;
  } else {
    helper = e.key;
  }  
  
  if (!secondOperation) {
    myOperator = helper;
    console.log(myOperator);
    secondOperation = true;
    
       
  } else {
      myOperator = helper;
      console.log(myOperator);    
      currentOperation.textContent = result;
      result ? a = result : a = 0;      
      console.log(`result = ${result} and a = ${a}`); 
      b = ""; 
      console.log(`b after the 1st operator = ${b}`);
  }
  equalPressed = false;
}

function inputEqual(e) {
  if (a === "" || b === "") { // If a or b are not defined yet
    console.log("undefined");
    return;
  } 
  // secondOperation = false;
  a = result;    
  console.log(`after equalButton, a = ${a}`)
  b = "";
  console.log(`after equalButton, b = ${b}`)
  currentOperation.textContent = result;
  equalPressed = true;
  console.log(`equalPressed = ${equalPressed}`);
}

// EVENT LISTENERS
operands.forEach(operand => 
  operand.addEventListener('click', saveOperand));

operators.forEach(operator =>  
  // operator.addEventListener('click', (e) => {    
    operator.addEventListener('click', inputOperator));
  //   if (!secondOperation) {
  //     myOperator = e.target.textContent;
  //     console.log(myOperator);
  //     secondOperation = true;
         
  //   } else {
  //       myOperator = e.target.textContent;
  //       console.log(myOperator);    
  //       currentOperation.textContent = result;
  //       result ? a = result : a = 0;      
  //       console.log(`result = ${result} and a = ${a}`); 
  //       b = "";       
        
  //   }
//   // }
// ));


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



equalButton.addEventListener('click', inputEqual);



// equalButton.addEventListener('click', () => {
//   if (a === "" || b === "") { // If a or b are not defined yet
//     console.log("undefined");
//     return;
//   } 
//   // secondOperation = false;
//   a = result;    
//   console.log(`after equalButton, a = ${a}`)
//   b = "";
//   console.log(`after equalButton, b = ${b}`)
//   currentOperation.textContent = result;
//   equalPressed = true;
// });


clearButton.addEventListener('click', clearCalc);


// KEYBOARD EVENT LISTENER
window.addEventListener('keydown', e =>
{
    keyboardEvents(e);    
    // console.log(e.key);
})

function keyboardEvents(e)
{
    if(e.key >= 0 && e.key <= 9) {
      // console.log(e.key);
      saveOperand(e);
    } 
    else if(e.key === '+' || e.key === '-' || e.key === '*'  || e.key === '/' || e.key === '%') {      
      inputOperator(e);
    } 
    // else if(key === 'Backspace') {

    // }
    else if(e.key === 'Enter' || e.key === '=') {
      inputEqual(e);
    }
    else if(e.key === 'Delete') {
       
    }
}


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










