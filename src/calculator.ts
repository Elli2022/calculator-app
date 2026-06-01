export type Operator = "+" | "-" | "*" | "/";

export interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operator: Operator | null;
  overwrite: boolean;
}

const MAX_INPUT_LENGTH = 16;
const ERROR_VALUE = "Error";

export function createCalculatorState(): CalculatorState {
  return {
    currentValue: "0",
    previousValue: null,
    operator: null,
    overwrite: true
  };
}

export function inputDigit(
  state: CalculatorState,
  digit: string
): CalculatorState {
  if (!/^\d$/.test(digit)) {
    return state;
  }

  if (state.currentValue === ERROR_VALUE) {
    return {
      ...createCalculatorState(),
      currentValue: digit,
      overwrite: false
    };
  }

  if (state.overwrite) {
    return {
      ...state,
      currentValue: digit,
      overwrite: false
    };
  }

  if (state.currentValue === "0") {
    return {
      ...state,
      currentValue: digit
    };
  }

  if (state.currentValue === "-0") {
    return {
      ...state,
      currentValue: `-${digit}`
    };
  }

  const characterCount = state.currentValue.replace(/[-.]/g, "").length;
  if (characterCount >= MAX_INPUT_LENGTH) {
    return state;
  }

  return {
    ...state,
    currentValue: `${state.currentValue}${digit}`
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.currentValue === ERROR_VALUE) {
    return {
      ...createCalculatorState(),
      currentValue: "0.",
      overwrite: false
    };
  }

  if (state.overwrite) {
    return {
      ...state,
      currentValue: "0.",
      overwrite: false
    };
  }

  if (state.currentValue.includes(".")) {
    return state;
  }

  return {
    ...state,
    currentValue: `${state.currentValue}.`
  };
}

export function toggleSign(state: CalculatorState): CalculatorState {
  if (state.currentValue === ERROR_VALUE) {
    return createCalculatorState();
  }

  if (Number.parseFloat(state.currentValue) === 0) {
    return state;
  }

  return {
    ...state,
    currentValue: state.currentValue.startsWith("-")
      ? state.currentValue.slice(1)
      : `-${state.currentValue}`
  };
}

export function deleteDigit(state: CalculatorState): CalculatorState {
  if (state.currentValue === ERROR_VALUE) {
    return createCalculatorState();
  }

  if (state.overwrite) {
    return {
      ...state,
      currentValue: "0"
    };
  }

  const nextValue = state.currentValue.slice(0, -1);

  if (!nextValue || nextValue === "-") {
    return {
      ...state,
      currentValue: "0",
      overwrite: true
    };
  }

  return {
    ...state,
    currentValue: nextValue
  };
}

export function applyPercent(state: CalculatorState): CalculatorState {
  if (state.currentValue === ERROR_VALUE) {
    return createCalculatorState();
  }

  return {
    ...state,
    currentValue: calculatePercent(state.currentValue),
    overwrite: false
  };
}

export function chooseOperator(
  state: CalculatorState,
  nextOperator: Operator
): CalculatorState {
  if (state.currentValue === ERROR_VALUE) {
    return createCalculatorState();
  }

  if (state.previousValue && state.operator && state.overwrite) {
    return {
      ...state,
      operator: nextOperator
    };
  }

  if (state.previousValue && state.operator && !state.overwrite) {
    const result = calculate(
      state.previousValue,
      state.currentValue,
      state.operator
    );

    if (result === ERROR_VALUE) {
      return createErrorState();
    }

    return {
      currentValue: result,
      previousValue: result,
      operator: nextOperator,
      overwrite: true
    };
  }

  return {
    ...state,
    previousValue: state.currentValue,
    operator: nextOperator,
    overwrite: true
  };
}

export function evaluate(state: CalculatorState): CalculatorState {
  if (
    !state.previousValue ||
    !state.operator ||
    state.overwrite ||
    state.currentValue === ERROR_VALUE
  ) {
    return state;
  }

  const result = calculate(
    state.previousValue,
    state.currentValue,
    state.operator
  );

  if (result === ERROR_VALUE) {
    return createErrorState();
  }

  return {
    currentValue: result,
    previousValue: null,
    operator: null,
    overwrite: true
  };
}

export function clearAll(): CalculatorState {
  return createCalculatorState();
}

export function getExpression(state: CalculatorState): string {
  if (!state.previousValue || !state.operator) {
    return "";
  }

  return `${formatDisplayValue(state.previousValue)} ${state.operator}`;
}

export function formatDisplayValue(value: string): string {
  if (value === ERROR_VALUE) {
    return value;
  }

  if (value === "" || value === "-") {
    return value || "0";
  }

  const isNegative = value.startsWith("-");
  const unsignedValue = isNegative ? value.slice(1) : value;
  const hasTrailingDecimal = unsignedValue.endsWith(".");
  const [integerPart, decimalPart] = unsignedValue.split(".");
  const formattedInteger = Number(integerPart || "0").toLocaleString("en-US");
  const sign = isNegative ? "-" : "";

  if (hasTrailingDecimal) {
    return `${sign}${formattedInteger}.`;
  }

  if (decimalPart !== undefined) {
    return `${sign}${formattedInteger}.${decimalPart}`;
  }

  return `${sign}${formattedInteger}`;
}

function calculate(leftText: string, rightText: string, operator: Operator): string {
  const left = Number.parseFloat(leftText);
  const right = Number.parseFloat(rightText);

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return ERROR_VALUE;
  }

  switch (operator) {
    case "+":
      return normalizeNumber(left + right);
    case "-":
      return normalizeNumber(left - right);
    case "*":
      return normalizeNumber(left * right);
    case "/":
      if (right === 0) {
        return ERROR_VALUE;
      }

      return normalizeNumber(left / right);
    default:
      return ERROR_VALUE;
  }
}

function calculatePercent(value: string): string {
  const parsedValue = Number.parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    return ERROR_VALUE;
  }

  return normalizeNumber(parsedValue / 100);
}

function normalizeNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return ERROR_VALUE;
  }

  const roundedValue = Number.parseFloat(value.toPrecision(12));

  if (Object.is(roundedValue, -0)) {
    return "0";
  }

  return roundedValue
    .toString()
    .replace(/(\.\d*?[1-9])0+$/u, "$1")
    .replace(/\.0+$/u, "");
}

function createErrorState(): CalculatorState {
  return {
    currentValue: ERROR_VALUE,
    previousValue: null,
    operator: null,
    overwrite: true
  };
}
