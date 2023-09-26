const calculatorData = [
    { id: "clear", value: "AC" },
    { id: "divide", value: "/" },
    { id: "multiply", value: "x" },
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "subtract", value: "-" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "equals", value: "=" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." }
]

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["AC", "/", "x", "+", "-", "="];

/* Setting the App Component */
function App() {
    const [input, setInput] = React.useState("")
    const [output, setOutput] = React.useState("")
    const [expression, setExpression] = React.useState("")

    /* Click Handler */
    function handleClick(value) {

        const number = numberArray.find((item) => item === value)
        const operator = operatorArray.find((item) => item === value)

        switch(value) {
            case "=":
                handleSubmit()
                break

            case "AC":
                handleClear()
                break

            case number:
                handleNumber(value)
                break

            case operator:
                handleOperator(value)
                break

            case ".":
                handleDot(value)
                break

            default:
                break
        }
    }

    /* Number Handler */
    function handleNumber(value) {
        if (!expression.length) {
            setInput(`${value}`)
            setExpression(`${value}`)
        }else{
            if (value === 0 && (expression === "0" || input === "0")) {
                setExpression(`${expression}`);
            }else {
                const lastChar = expression.charAt(expression.length - 1);
                const isLastCharOperator =
                lastChar === "*" || operatorArray.includes(lastChar);
        
                setInput(isLastCharOperator ? `${value}` : preValue => `${preValue}${value}`);
                setExpression(preValue => `${preValue + value}`);
            }
        }
    }

    /* Operator Handler */
    function handleOperator(value) {
        if (expression.length) {
            setInput(`${value}`);
            const beforeLastChar = expression.charAt(expression.length - 2);
            const beforeLastCharIsOperator = operatorArray.includes(beforeLastChar) || beforeLastChar === "*";

            const lastChar = expression.charAt(expression.length - 1);            
            const lastCharIsOperator = operatorArray.includes(lastChar) || lastChar === "*";

            const validOp = value === "x" ? "*" : value;

            if ( (lastCharIsOperator && value !== "-") || (lastCharIsOperator && beforeLastCharIsOperator)) {
                if (beforeLastCharIsOperator) {
                    const updatedValue = `${expression.substring(0, expression.length - 1)}`;
                    setExpression(`${updatedValue}`);
                } else {
                    setExpression(`${expression.substring(0, expression.length - 1)}${validOp}`);
                }
            } else {
                setExpression(`${expression}${validOp}`);
            }
        }
    }

    /* Dot Handler */
    function handleDot(value) {
        const lastChar = expression.charAt(expression.length - 1);

        if (!expression.length) {
            setInput("0.");
            setExpression("0.");
        } else {
            if (lastChar === "*" || operatorArray.includes(lastChar)) {
                setInput("0.");
                setExpression(preValue => `${preValue} 0.`);
            } else {
                setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}${value}`);
                const formattedValue = lastChar === "." || input.includes(".") ? `${expression}`: `${expression}${value}`;
                setExpression(formattedValue);
            }
        }
    }

    /* Submit Handler */
    function handleSubmit() {
        const total = eval(expression);
        setOutput(`= ${total}`);
        setInput(`${total}`);
        setExpression(`${total}`);
    }

    /* Clear Handler */
    function handleClear() {
        setInput("")
        setExpression("")
        setOutput("")
    }

    return(
        <div id="container">
            <Display input={input} expression={expression} output={output} />
            <Keyboard handleClick={handleClick}/>
        </div>
    )
}

/* Setting the Display Component */
function Display(props) {
    return (
        <div className="display-container">
            <div className="input-display display">{props.input}</div>
            <div className="expression-display display">{props.expression}</div>
            <div className="output-display display">{props.output}</div>
        </div>
    )
}

/* Setting the Keyboard Component */
function Keyboard(props) {
    return (
        <div id="key-container">
            {calculatorData.map((item) => {
                return <Key key={item.id} id={item.id} value={item.value} handleClick={props.handleClick}/>
            })}
        </div>
    )
}

/* Setting the Key Component */
function Key(props) {
    return (
        <button id={props.id} className="button" onClick={() => props.handleClick(props.value)}>{props.value}</ button>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)