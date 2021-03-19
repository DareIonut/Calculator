class Calculator {
  constructor() {
    this.digit = document.querySelectorAll(".digit");
    this.operator = document.querySelectorAll(".operator");
    this.equal = document.querySelector(".equal");
    this.displayValues = document.querySelector(".display-values");
    this.actualValue = "";
  }
  takeValue(ex) {
    const buttonValue = ex.target.textContent;
    let adding = this.actualValue + buttonValue;
    this.actualValue = adding;
  }
  calculate() {
    let value = eval(this.actualValue);
    this.actualValue = value;
    this.displayValues.textContent = value;
  }
  updateDisplay() {
    this.displayValues.textContent = this.actualValue;
  }

  clearDisplay(e) {
    if (e.target.textContent === "AC") {
      this.displayValues.textContent = 0;
      this.actualValue = "";
    }
  }
}

const calculator = new Calculator();

calculator.digit.forEach((calc) => {
  calc.addEventListener("click", function (e) {
    calculator.takeValue(e);
    calculator.updateDisplay();
    calculator.clearDisplay(e);
  });
});

calculator.equal.addEventListener("click", function () {
  calculator.calculate();
});
