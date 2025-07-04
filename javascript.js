const calculatorButtonsContainer = document.querySelector(".buttons");
const calculatorButtons = calculatorButtonsContainer.querySelectorAll("button");
const calculatorDisplay = document.querySelector(".display");
const calculatorDot = document.querySelector(".dot");

let a = "";
let operator = "";
let b = "";
let result = "";
let evaluatedFlag = false;

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
    let beforeRounding = a / b;
    let afterRounding = beforeRounding.toFixed(2);
    return afterRounding = +afterRounding;
}

function clearCalcVariables() {
    a = "";
    b = "";
    operator = "";
    result = ""; 
    calculatorDot.disabled = false; 
    evaluatedFlag = false;
}

function operate(a, operator, b) {
    a = +a;
    b = +b;
    if (operator === "+") {
        result = sum(a, b);
        calculatorDisplay.innerText = result;
        return result;
    }
    else if (operator === "-") {
        result = subtract(a, b);
        calculatorDisplay.innerText = result;
        return result;
    }
    else if (operator === "*") {
        result = multiply(a, b);
        calculatorDisplay.innerText = result;
        return result;
    }
    else if (operator === "/") {
        if (b === 0) {
            calculatorDisplay.innerText = "Cannot divide by 0!";
            clearCalcVariables();
        }
        else {
            result = divide(a, b);
            calculatorDisplay.innerText = result;
            return result;
        }
    }
}

calculatorButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.classList.contains("number")) {
            if (operator === "") { // Read and display first number if no operator set yet
                if (evaluatedFlag) { // Pressing a number after getting result of 1st calculation
                    a = ""; // resets value of a
                    evaluatedFlag = false;
                    calculatorDot.disabled = false; // allows pressing the dot button
                }
                if (a.length < 35) { // Prevent overflow
                    if (a === "" && button.classList.contains("dot")) { // If dot is pressed before any number, "0." is displayed
                        a = "0";
                        calculatorDisplay.innerText = a;
                    }
                    aArray = a.split("");
                    for (i of aArray) {
                        if (i === ".") {
                            calculatorDot.disabled = true;
                        }
                    }
                    a += e.target.innerText;
                    calculatorDisplay.innerText = a;
                }
            } 
            else { // Read and display second number if operator already pressed
                if (b.length  < 35) { // Prevent overflow
                    if (b === "" && button.classList.contains("dot")) { // If dot is pressed before any number, "0." is displayed
                        b = "0";
                        calculatorDisplay.innerText = b;
                    }
                    bArray = b.split("");
                    for (i of bArray) {
                        if (i === ".") {
                            calculatorDot.disabled = true;
                        }
                    }
                    b += e.target.innerText;
                    calculatorDisplay.innerText = b;
                }
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
            calculatorDot.disabled = false; // Allow to click the dot button when getting value of b
        }
        else if (button.classList.contains("equal")) {
            if (a === "" || operator === "" || b === "") {
                calculatorDisplay.innerText = "Error！Not all values were entered.";
                clearCalcVariables();
            }
            else {
                operate(a, operator, b);
                a = result.toString(); // If operator button is pressed after getting the result, use result as a in the next calculation
                b = "";
                operator = "";
                result = "";
                evaluatedFlag = true;
            }
            calculatorDot.disabled = false; // Allow to click the dot button after finishing calculation
        }
        else if (button.classList.contains("AC")) {
            calculatorDisplay.innerText = "";
            clearCalcVariables();
        }
        else if (button.classList.contains("C")) {
            if (operator === "") {
                // Remove last character from a
                a = a.slice(0, -1);
                calculatorDisplay.innerText = a;
            } else if (b !== "") {
                // Remove last character from b
                b = b.slice(0, -1);
                calculatorDisplay.innerText = b;
                if (b === "") {
                    calculatorDisplay.innerText = operator; // If b is empty, display operator
                }
            } else {
                // If operator is set but b is empty, allow removing operator
                operator = "";
                calculatorDisplay.innerText = a;
            }
        }
    })
})


document.addEventListener("keydown", (e) => {
    let key = e.key;

    // Map keyboard keys to button selectors
    let selector = "";
    if ((key >= "0" && key <= "9") || key === ".") {
        selector = `.number[data-key="${key}"]`;
    } else if (["+", "-", "*", "/"].includes(key)) {
        selector = `.operator[data-key="${key}"]`;
    } else if (key === "Enter" || key === "=") {
        selector = `.equal`;
    } else if (key === "Backspace") {
        selector = `.C`;
    } else if (key === "Delete" || key === "Escape") {
        selector = `.AC`;
    }

    if (selector) {
        const button = calculatorButtonsContainer.querySelector(selector);
        if (button) {
            button.click();
        }
    }
});

