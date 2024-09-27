let currentOperand = '0';
        let previousOperand = '';
        let operator = null;
        let shouldResetScreen = false;

        const currentOperandDisplay = document.getElementById('current-operand');
        const previousOperandDisplay = document.getElementById('previous-operand');

        function updateDisplay() {
            currentOperandDisplay.textContent = currentOperand;
            if (operator != null) {
                previousOperandDisplay.textContent = `${previousOperand} ${operator}`;
            } else {
                previousOperandDisplay.textContent = '';
            }
        }

        function appendNumber(number) {
            if (currentOperand === '0' || shouldResetScreen) {
                currentOperand = String(number);
                shouldResetScreen = false;
            } else {
                currentOperand += number;
            }
            updateDisplay();
        }

        function appendDecimal() {
            if (shouldResetScreen) {
                currentOperand = '0';
                shouldResetScreen = false;
            }
            if (!currentOperand.includes('.')) {
                currentOperand += '.';
            }
            updateDisplay();
        }

        function setOperator(op) {
            if (operator !== null) calculate();
            operator = op;
            previousOperand = currentOperand;
            shouldResetScreen = true;
            updateDisplay();
        }

        function calculate() {
            if (operator === null || shouldResetScreen) return;
            if (operator === '/' && currentOperand === '0') {
                alert("Error: Division by zero");
                return;
            }
            let result = operate(operator, parseFloat(previousOperand), parseFloat(currentOperand));
            currentOperand = String(roundResult(result));
            operator = null;
            previousOperand = '';
            shouldResetScreen = true;
            updateDisplay();
        }

        function clearDisplay() {
            currentOperand = '0';
            previousOperand = '';
            operator = null;
            shouldResetScreen = false;
            updateDisplay();
        }

        function backspace() {
            if (currentOperand.length > 1) {
                currentOperand = currentOperand.slice(0, -1);
            } else {
                currentOperand = '0';
            }
            updateDisplay();
        }

        function roundResult(number) {
            return Math.round(number * 1000000) / 1000000;
        }

        function add(a, b) {
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

        function operate(operator, a, b) {
            switch (operator) {
                case '+':
                    return add(a, b);
                case '-':
                    return subtract(a, b);
                case '*':
                    return multiply(a, b);
                case '/':
                    return divide(a, b);
                default:
                    return null;
            }
        }

        // Event listeners for buttons
        document.getElementById('clear').addEventListener('click', clearDisplay);
        document.getElementById('backspace').addEventListener('click', backspace);
        document.getElementById('equals').addEventListener('click', calculate);
        document.getElementById('decimal').addEventListener('click', appendDecimal);

        const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        numbers.forEach((id, index) => {
            document.getElementById(id).addEventListener('click', () => appendNumber(index));
        });

        const operators = {
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/'
        };

        Object.entries(operators).forEach(([id, op]) => {
            document.getElementById(id).addEventListener('click', () => setOperator(op));
        });

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendDecimal();
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                setOperator(event.key);
            } else if (event.key === 'Enter' || event.key === '=') {
                calculate();
            } else if (event.key === 'Backspace') {
                backspace();
            } else if (event.key === 'Escape') {
                clearDisplay();
            }
        });

updateDisplay();