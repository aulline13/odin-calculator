const calculatorButtonsContainer = document.querySelector(".buttons");
const calculatorButtons = calculatorButtonsContainer.querySelectorAll("button");
const calculatorDisplay = document.querySelector(".display");

let a = "";
let operator = "";
let b = "";
let result = "";

function sum(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

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
        calculatorDisplay.innerText = "Error";
    }
}

function clearCalcVariables() {
    a = "";
    b = "";
    operator = "";
    result = ""; 
}

calculatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList.contains("number")) {
            if (operator === "") { // Read first number if no operator set yet
                a += e.target.innerText;
                calculatorDisplay.innerText = a;
                a = +a;
            } 
            else { // Read second number
                b += e.target.innerText;
                calculatorDisplay.innerText = b;
                b = +b;
            }
        }
        else if (button.classList.contains("operator")) {
            if (operator === "") {
                operator = e.target.innerText;;
                calculatorDisplay.innerText = operator;
            }
            else {
                if (b === "") {
                    operator = e.target.innerText;;
                    calculatorDisplay.innerText = operator;
                }
                else {
                    result = operate(a, operator, b);
                    calculatorDisplay.innerText = result;
                    a = result;
                    operator = e.target.innerText;
                    b = "";
                    result = "";
                }
            }
        }
        else if (button.classList.contains("equal")) {
            result = operate(a, operator, b);
            calculatorDisplay.innerText = result;
            a = result;
            b = "";
            operator = "";
            result = ""; 
        }
        else if (button.classList.contains("AC")) {
            calculatorDisplay.innerText = "";
            clearCalcVariables();
        }
        else if (button.classList.contains("C")) {
            clearCalcVariables();
        }
    })
})



