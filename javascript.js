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

function clearCalcVariables() {
    a = "";
    b = "";
    operator = "";
    result = ""; 
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
        if (b == 0) {
            calculatorDisplay.innerText = "Cannot divide by 0!";
            clearCalcVariables();
        }
        else {
            return divide(a, b);
        }
    }
    else {
        calculatorDisplay.innerText = "Error";
    }
}

calculatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList.contains("number")) {
            if (operator === "") { // Read and display first number if no operator set yet
                a += e.target.innerText;
                calculatorDisplay.innerText = a;
                a = +a;
            } 
            else { // Read and display second number if operator already pressed
                b += e.target.innerText;
                calculatorDisplay.innerText = b;
                b = +b;
            }
        }
        else if (button.classList.contains("operator")) {
            if (operator === "") { // If no operator, read and display operator
                operator = e.target.innerText;;
                calculatorDisplay.innerText = operator;
            }
            else { 
                if (b === "") { // If consecutive operator buttons are pressed, calculator only takes the last operator
                    operator = e.target.innerText;;
                    calculatorDisplay.innerText = operator;
                }
                else { // If a, b, and operator are chosen and then operator button is pressed instead of "=", 
                // calculate a and b using first operator and use result as "a" for calculation with second operator
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
            a = result; // If operator button is pressed after getting the result, use result as a in the next calculation
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



