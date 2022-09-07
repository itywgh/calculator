let a = 4;
let b = 5;


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


function operate (a, b, operator) {
  operator(a,b);
  console.log(operator(a,b)); 
}

operate(a,b,add);







