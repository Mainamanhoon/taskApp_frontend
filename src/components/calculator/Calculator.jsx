import React, { useState, useEffect } from 'react';
import Display from './Display';
import Button from './Button';
import '../../pages/CalculatorPage.css';
import { loadCalculatorWasm } from '../../utils/loadCalculatorWasm';

let wasmModule = null;

const initWasm = async () => {
  const wasm = await loadCalculatorWasm();
  wasmModule = wasm;
  return wasm;
};
 

const evaluateExpression = (expression) => {
  if (!wasmModule) {
    return Promise.reject(new Error('WASM module not loaded.'));
  }

  try {
    const result = wasmModule.evaluate_expression(expression);
    console.log('WASM result:', result);
    // If result is an object with a 'result' property, return that, else return as is
    let displayResult = result;
    if (typeof result === 'object' && result !== null && 'result' in result) {
      // If error is present and not null, show 'Invalid expression'
      if ('error' in result && result.error) {
        return Promise.resolve('Invalid expression');
      }
      displayResult = result.result;
    }
    // If result is not a valid number, return 'Invalid expression'
    if (
      displayResult === undefined ||
      displayResult === null ||
      (typeof displayResult === 'number' && isNaN(displayResult)) ||
      (typeof displayResult === 'string' && displayResult.trim() === '')
    ) {
      return Promise.resolve('Invalid expression');
    }
    return Promise.resolve(displayResult);
  } catch (error) {
    return Promise.resolve('Invalid expression');
  }
};

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [wasmError, setWasmError] = useState('');

  useEffect(() => {
    initWasm()
      .then(() => {
        setWasmLoaded(true);
        setWasmError('');
      })
      .catch((error) => {
        setWasmError('Failed to load WASM module: ' + error.message);
      });
  }, []);

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === 'C') {
      setInput((prevInput) => prevInput.slice(0, -1));
      setResult('');
    } else if (value === '=') {
      if (input === '' || !wasmLoaded) return;
      setResult('Calculating...');
      evaluateExpression(input.trim())
        .then((evalResult) => {
          setResult(evalResult.toString());
          setInput(evalResult.toString());
        })
        .catch((error) => {
          setResult(`Error: ${error.message}`);
        });
    } else {
      if (result !== '' && !['+', '-', '*', '/', '(', ')'].includes(value)) {
        setInput(value);
        setResult('');
      } else {
        setInput((prevInput) => prevInput + value);
      }
    }
  };

  return (
    <div className="calculator-page-container">
      <div className="calculator-frame">
        <h2>Rust Calculator (WASM)</h2>

        {/* WASM loaded status message removed */}

        {wasmError && (
          <div className="wasm-status error">{wasmError}</div>
        )}

        <div className="expression-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter expression (e.g., 2+2, 3*4, (5+7)/2)"
            className="expression-text-input"
            disabled={!wasmLoaded}
          />
          <button
            onClick={() => {
              if (input.trim() && wasmLoaded) {
                setResult('Calculating...');
                evaluateExpression(input.trim())
                  .then((result) => {
                    setResult(result.toString());
                  })
                  .catch((error) => {
                    setResult(`Error: ${error.message}`);
                  });
              }
            }}
            className="calculate-button"
            disabled={!wasmLoaded || !input.trim()}
          >
            Calculate
          </button>
        </div>

        <div className="result-display">
          <h3>Result:</h3>
          <div className="result-value">
            {!wasmLoaded ? 'Waiting for WASM module...' : (result || 'Enter an expression above')}
          </div>
        </div>

        <div className="button-grid">
          <Button value="AC" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="(" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value=")" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="C" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="7" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="8" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="9" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="/" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="4" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="5" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="6" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="*" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="1" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="2" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="3" onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="-" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="0" onClick={handleButtonClick} className="zero" disabled={!wasmLoaded} />
          <Button value="." onClick={handleButtonClick} disabled={!wasmLoaded} />
          <Button value="+" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
          <Button value="=" onClick={handleButtonClick} className="operator" disabled={!wasmLoaded} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
