import React, { useState } from "react";

/**
 * QuickCalc main container/component.
 * Light-themed calculator UI providing basic arithmetic: +, -, ×, ÷, and reset.
 * 
 * PUBLIC_INTERFACE
 */
function QuickCalc() {
  // Internal state for display/input, stored operand, operator, and error states
  const [display, setDisplay] = useState("0");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [operand, setOperand] = useState(null);
  const [error, setError] = useState(null);

  // Handles digit/decimal button press
  // PUBLIC_INTERFACE
  function inputDigit(digit) {
    if (error) {
      setError(null);
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForOperand(false);
      setOperator(null);
      setOperand(null);
      return;
    }
    if (waitingForOperand) {
      setDisplay(digit === "." ? "0." : digit);
      setWaitingForOperand(false);
    } else {
      if (digit === ".") {
        if (!display.includes(".")) {
          setDisplay(display + ".");
        }
      } else {
        if (display === "0") {
          setDisplay(digit);
        } else {
          setDisplay(display + digit);
        }
      }
    }
  }

  // Handles operator button press
  // PUBLIC_INTERFACE
  function handleOperator(nextOperator) {
    if (error) return;
    const inputValue = parseFloat(display);

    if (operator && !waitingForOperand) {
      const result = performCalculation(operand, inputValue, operator);
      if (typeof result === "string" && result.startsWith("Error")) {
        setError(result);
        setDisplay("Error");
        setOperand(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      setOperand(result);
      setDisplay(String(result));
    } else {
      setOperand(inputValue);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  /**
   * PUBLIC_INTERFACE
   * Performs calculation given two operands and an operator.
   */
  function performCalculation(left, right, op) {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "×":
        return left * right;
      case "÷":
        if (right === 0) return "Error: Division by zero";
        return left / right;
      default:
        return right;
    }
  }

  // Handles equals button (=)
  // PUBLIC_INTERFACE
  function handleEquals() {
    if (error || operator == null) return;
    const nextValue = parseFloat(display);
    const result = performCalculation(operand, nextValue, operator);
    if (typeof result === "string" && result.startsWith("Error")) {
      setError(result);
      setDisplay("Error");
      setOperand(null);
      setOperator(null);
      setWaitingForOperand(true);
      return;
    }
    setDisplay(String(result));
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(true);
  }

  // Handles clear (C) button
  // PUBLIC_INTERFACE
  function handleClear() {
    setDisplay("0");
    setOperand(null);
    setOperator(null);
    setWaitingForOperand(false);
    setError(null);
  }

  // Button grid layout
  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C"]
  ];

  // Color system for theme
  const colors = {
    primary: "#ffffff",
    secondary: "#f0f0f0",
    accent: "#007bff",
    operator: "#e5eaff",
    clear: "#ffe5e5",
    error: "#ffcccc",
    text: "#222"
  };

  return (
    <div
      className="quickcalc-container"
      style={{
        background: colors.primary,
        boxShadow: "0 3px 14px rgba(0,0,0,0.08)",
        borderRadius: 16,
        maxWidth: 340,
        margin: "56px auto",
        padding: "2rem 1.25rem 1.25rem",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        className="quickcalc-display"
        style={{
          background: error ? colors.error : colors.secondary,
          color: error ? "#ad1818" : "#16192b",
          borderRadius: 8,
          minHeight: 56,
          fontSize: "2rem",
          textAlign: "right",
          padding: "1rem",
          boxSizing: "border-box",
          marginBottom: "1.25rem",
          fontWeight: 600,
          overflowX: "auto"
        }}
        data-testid="calculator-display"
        aria-label="Calculator display"
        title={display}
      >
        {display}
      </div>
      <div
        className="quickcalc-buttons"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "0.6rem"
        }}
      >
        {buttons.flat().map((btn, idx) => {
          let buttonColor = colors.secondary;
          if (["+", "-", "×", "÷"].includes(btn)) buttonColor = colors.operator;
          if (btn === "=") buttonColor = colors.accent;
          if (btn === "C") buttonColor = colors.clear;
          let gridColumn = undefined;
          if (btn === "C") gridColumn = "span 4";

          return (
            <button
              key={btn + idx}
              style={{
                background: buttonColor,
                color:
                  btn === "="
                    ? "#fff"
                    : ["+", "-", "×", "÷"].includes(btn)
                    ? colors.accent
                    : colors.text,
                fontWeight: btn === "=" ? 700 : 500,
                fontSize: "1.25rem",
                padding: "1rem 0",
                border: "none",
                borderRadius: 6,
                boxShadow: "0 1.5px 6px rgba(0,0,0,0.03)",
                cursor: "pointer",
                gridColumn: gridColumn,
                transition: "background 0.12s"
              }}
              onClick={() => {
                if (/^\d$/.test(btn)) inputDigit(btn);
                else if (btn === ".") inputDigit(".");
                else if (["+", "-", "×", "÷"].includes(btn))
                  handleOperator(btn);
                else if (btn === "=") handleEquals();
                else if (btn === "C") handleClear();
              }}
              aria-label={btn === "C" ? "Clear" : btn}
              data-testid={`btn-${btn}`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickCalc;
