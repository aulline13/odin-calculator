const calculatorButtonsContainer = document.querySelector(".buttons");
const calculatorButtons = calculatorButtonsContainer.querySelectorAll("button");
const calculatorDisplay = document.querySelector(".screen");

let a;
let operator;
let b;

calculatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculatorDisplay.innerText = button.textContent;
    })
})

function operate(a, operator, b) {
    if (operator === "+") {
        return sum(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "*") {
        return multiply(a, b);
    }
    else if (operator === "/") {
        return divide(a, b);
    }
    else {
        return "Error";
    }
}