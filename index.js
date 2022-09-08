// QUERIES
const lastOperation = document.querySelector('.last-operation');
const currentOperation = document.querySelector('.current-operation');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
const decimalButton = document.querySelector('.decimal-button');
const equalButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clear-button');


// LET VARIABLES
let a = "";
let b = "";
let secondOperation;
let myOperator;
let result;
let decimalState = true;
let infinitum;


// var displayValue = 0;



// FUNCTION
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
  // if(!a || decimalState === true) {   
  //   secondOperation = true; 
  //   a += e.target.textContent;
  //   currentOperation.textContent = a;
  //   console.log(a);
  // } else if(e.target.textContent === "." && secondOperation) {
  //   console.log(`decimal and secondOperation ${secondOperation}`)
  //   a += ".";
  //   decimalState = true;
  //   console.log(`new a = ${a}`);
  // } else if(e.target.textContent === "." && !secondOperation) {
  //   console.log(`decimalState: ${decimalState}`)
  //   console.log(`decimal and secondOperation ${secondOperation}`)
  //   b += ".";
  //   currentOperation.textContent = b;
  //   console.log(`b at the last else if: ${b}`);
  // } else if(!b || decimalState === false) {
  //   if(decimalState) {
  //     a += e.target.textContent;
  //     return;
  //   } 
    
  //   secondOperation = false;
  //   b += parseFloat(e.target.textContent);
  //   currentOperation.textContent = b;
  //   console.log(b);    
  //   operate(parseFloat(a), parseFloat(b), translateOperator(myOperator));
  
  //   // Remember that operate() doesn't return a result
  //   // Do not console.log(result)
  //   // Go to operate()
  // } 
};



const clearCalc = () => {
  if (infinitum) {
    currentOperation.classList.remove("we-do-not");
    operators.forEach(operator => {
      operator.classList.remove("operator-disabled");
    });
    equalButton.classList.remove("operator-disabled");
    infinitum = false;
  }
  
  lastOperation.textContent = "";
  currentOperation.textContent = "";
 
  a = "";
  secondOperation = false;
  b = "";
  result = 0;
  // decimalState = true;
}


const dividedByZero = () => {
  currentOperation.classList.add("we-do-not");
  currentOperation.textContent = `We Don't Do That Here`;
  operators.forEach(operator => {
    operator.classList.add("operator-disabled");
  });
  equalButton.classList.add("operator-disabled");
  infinitum = true;
}

///////////////////
// EVENT LISTENERS
//////////////////
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
  if (!secondOperation) {
    a += ".";
    currentOperation.textContent = parseFloat(a, 10); // DISPLAY
    console.log(`a = ${a}`);
  } else {
    b += ".";
    currentOperation.textContent = parseFloat(b, 10); // DISPLAY
    console.log(`b = ${b}`);
  }
});


// operators.forEach(operator =>
//   operator.addEventListener('click', (e) => {    
//     if (secondOperation) {
//       myOperator = e.target.textContent;
//       console.log(myOperator);
//       decimalState = false;   
//     } else {
//         myOperator = e.target.textContent;
//         console.log(myOperator);    
//         currentOperation.textContent = result;
//         result ? a = result : a = "";       
//         b = null;
//         secondOperation = true;
//         decimalState = false;
//     }   
// }));





equalButton.addEventListener('click', () => {
  a = result;
  b = "";
  currentOperation.textContent = result;
});



clearButton.addEventListener('click', clearCalc);





// OPERATORS


const add = (a, b) => {
  return a + b;   
}

const subtract = (a, b) => {
  return a - b;
}

const multiply = (a, b) => {
  return Number((a * b).toFixed(4));
}

const divide = (a, b) => {
  if(b === 0) {
    dividedByZero();         
    return;
  } 
  
  return Number((a / b).toFixed(4));  
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










