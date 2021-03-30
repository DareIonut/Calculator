//Global variables
const calculator = document.querySelector(".calculator-body");
const keys = document.querySelector(".calculator-keys");
const display = document.querySelector(".display-values");

//Events
keys.addEventListener("click", (e) => {
  const key = e.target;
  const action = key.dataset.action;
  const keyContent = key.textContent;
  const displayedNum = display.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;

  if (e.target.matches("button")) {
    //Number case
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      //setting previousKey
      calculator.dataset.previousKeyType = "number";
    }
    //Operator case
    if (
      action === "divide" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "add"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        //Update first value
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("choice");
      //Add custom atribute
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }
    //Decimal case
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = displayedNum + "0.";
      }

      //setting previousKey
      calculator.dataset.previousKeyType = "decimal";
    }
    //Equal case
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
      }

      display.textContent = calculate(firstValue, operator, secondValue);

      //setting previousKey
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
    //Clear case
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;

      //setting previousKey
      calculator.dataset.previousKeyType = "clear";
    }
    //Remove choice class after operator--HAVE TO REPAIR
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("choice")
    );
  }
});

const calculate = (n1, operator, n2) => {
  let result = "";

  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "divide") {
    result = n1 / parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  }

  return result;
};

//Remain at Tim The trouble maker
