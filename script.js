class Calculator {
  constructor() {
    this.digit = document.querySelectorAll(".digit");
    this.operator = document.querySelectorAll(".operator");
    this.equal = document.querySelector(".equal");
    this.acFunc = document.querySelector(".btn-ac");
    this.displayValues = document.querySelector(".display-values");
    this.actualValue = "";
    this.previousValue = "";
    this.choice;
    this.operation;
  }
  takeValues(item) {
    const buttonValue = item.target.textContent;
    if (item.target.classList.contains("active")) {
      let adding = this.actualValue + buttonValue;
      this.actualValue = adding;
      this.choice = this.actualValue;
      this.displayValues.textContent = this.choice;
    } else if (!item.target.classList.contains("active")) {
      let adding = this.previousValue + buttonValue;
      this.previousValue = adding;
      this.choice = this.previousValue;
      this.displayValues.textContent = this.choice;
    }
  }
  calculate() {
    if (this.operation === "divide") {
      this.choice =
        parseFloat(this.previousValue) / parseFloat(this.actualValue);
      this.displayValues.textContent = this.choice;
      this.previousValue = this.choice;
      this.actualValue = "";
    }
    if (this.operation === "multiply") {
      this.choice =
        parseFloat(this.previousValue) * parseFloat(this.actualValue);
      this.displayValues.textContent = this.choice;
      this.previousValue = this.choice;
      this.actualValue = "";
    }
    if (this.operation === "add") {
      this.choice =
        parseFloat(this.previousValue) + parseFloat(this.actualValue);
      this.displayValues.textContent = this.choice;
      this.previousValue = this.choice;
      this.actualValue = "";
    }
    if (this.operation === "subtract") {
      this.choice =
        parseFloat(this.previousValue) - parseFloat(this.actualValue);
      this.displayValues.textContent = this.choice;
      this.previousValue = this.choice;
      this.actualValue = "";
    }
  }

  operationSelected(item) {
    const focus = item.target;

    this.digit.forEach((buttons) => {
      buttons.classList.add("active");
    });

    if (focus.classList.contains("divide")) {
      this.operation = "divide";
    }
    if (focus.classList.contains("multiply")) {
      this.operation = "multiply";
    }
    if (focus.classList.contains("add")) {
      this.operation = "add";
    }
    if (focus.classList.contains("subtract")) {
      this.operation = "subtract";
    }
  }

  clearDisplay() {
    this.displayValues.textContent = 0;
    this.actualValue = "";
    this.previousValue = "";
    this.choice = "";
    this.digit.forEach((buttons) => {
      buttons.classList.remove("active");
    });
  }
}

//Create the object

const calculator = new Calculator();

//Events

calculator.digit.forEach((calc) => {
  calc.addEventListener("click", function (event) {
    calculator.takeValues(event);
  });
});
calculator.operator.forEach((operators) => {
  operators.addEventListener("click", function (event) {
    calculator.operationSelected(event);
  });
});
calculator.equal.addEventListener("click", function () {
  calculator.calculate();
});
calculator.acFunc.addEventListener("click", function () {
  calculator.clearDisplay();
});
