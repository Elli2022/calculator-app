import { describe, expect, it } from "vitest";

import {
  applyPercent,
  chooseOperator,
  createCalculatorState,
  evaluate,
  formatDisplayValue,
  inputDecimal,
  inputDigit,
  toggleSign
} from "./calculator";

describe("calculator logic", () => {
  it("evaluates chained operations in sequence", () => {
    let state = createCalculatorState();

    state = inputDigit(state, "8");
    state = chooseOperator(state, "+");
    state = inputDigit(state, "2");
    state = evaluate(state);

    expect(state.currentValue).toBe("10");

    state = chooseOperator(state, "*");
    state = inputDigit(state, "3");
    state = evaluate(state);

    expect(state.currentValue).toBe("30");
  });

  it("supports decimal input and formatting", () => {
    let state = createCalculatorState();

    state = inputDigit(state, "1");
    state = inputDecimal(state);
    state = inputDigit(state, "5");

    expect(state.currentValue).toBe("1.5");
    expect(formatDisplayValue("12345.5")).toBe("12,345.5");
  });

  it("handles division by zero as an error state", () => {
    let state = createCalculatorState();

    state = inputDigit(state, "9");
    state = chooseOperator(state, "/");
    state = inputDigit(state, "0");
    state = evaluate(state);

    expect(state.currentValue).toBe("Error");
    expect(state.operator).toBeNull();
  });

  it("can toggle sign and convert to percent", () => {
    let state = createCalculatorState();

    state = inputDigit(state, "5");
    state = inputDigit(state, "0");
    state = toggleSign(state);
    state = applyPercent(state);

    expect(state.currentValue).toBe("-0.5");
  });
});
