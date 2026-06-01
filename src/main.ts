import "./styles.css";
import {
  applyPercent,
  chooseOperator,
  clearAll,
  createCalculatorState,
  deleteDigit,
  evaluate,
  formatDisplayValue,
  getExpression,
  inputDecimal,
  inputDigit,
  toggleSign,
  type Operator
} from "./calculator";

const displayElement = getRequiredElement<HTMLOutputElement>("[data-display]");
const expressionElement =
  getRequiredElement<HTMLParagraphElement>("[data-expression]");
const statusElement = getRequiredElement<HTMLParagraphElement>("[data-status]");
const buttonGrid = getRequiredElement<HTMLDivElement>(".button-grid");
const operatorButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-operator]")
);

let state = createCalculatorState();

buttonGrid.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    "button"
  );

  if (!button) {
    return;
  }

  if (button.dataset.digit) {
    state = inputDigit(state, button.dataset.digit);
    render(`Added ${button.dataset.digit}`);
    return;
  }

  if (button.dataset.operator) {
    state = chooseOperator(state, button.dataset.operator as Operator);
    render(`Operator set to ${button.textContent?.trim() ?? button.dataset.operator}`);
    return;
  }

  switch (button.dataset.action) {
    case "clear":
      state = clearAll();
      render("Calculator reset");
      break;
    case "backspace":
      state = deleteDigit(state);
      render("Removed last entry");
      break;
    case "percent":
      state = applyPercent(state);
      render(getStatusMessage("Converted to percentage"));
      break;
    case "toggle-sign":
      state = toggleSign(state);
      render("Sign toggled");
      break;
    case "decimal":
      state = inputDecimal(state);
      render("Decimal added");
      break;
    case "equals":
      state = evaluate(state);
      render(getStatusMessage("Calculation complete"));
      break;
    default:
      break;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  if (/^\d$/.test(event.key)) {
    event.preventDefault();
    state = inputDigit(state, event.key);
    render(`Added ${event.key}`);
    return;
  }

  if (isOperatorKey(event.key)) {
    event.preventDefault();
    state = chooseOperator(state, event.key);
    render(`Operator set to ${event.key}`);
    return;
  }

  switch (event.key) {
    case ".":
    case ",":
      event.preventDefault();
      state = inputDecimal(state);
      render("Decimal added");
      break;
    case "%":
      event.preventDefault();
      state = applyPercent(state);
      render(getStatusMessage("Converted to percentage"));
      break;
    case "Backspace":
      event.preventDefault();
      state = deleteDigit(state);
      render("Removed last entry");
      break;
    case "Escape":
      event.preventDefault();
      state = clearAll();
      render("Calculator reset");
      break;
    case "Enter":
    case "=":
      event.preventDefault();
      state = evaluate(state);
      render(getStatusMessage("Calculation complete"));
      break;
    default:
      break;
  }
});

render("Keyboard input enabled");

function render(statusMessage: string): void {
  displayElement.textContent = formatDisplayValue(state.currentValue);
  expressionElement.textContent = getExpression(state);
  statusElement.textContent = statusMessage;
  displayElement.classList.toggle("display--error", state.currentValue === "Error");

  operatorButtons.forEach((button) => {
    const isActive = button.dataset.operator === state.operator;
    button.dataset.active = String(isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getStatusMessage(defaultMessage: string): string {
  return state.currentValue === "Error"
    ? "Division by zero is not allowed"
    : `${defaultMessage}: ${formatDisplayValue(state.currentValue)}`;
}

function getRequiredElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing element for selector: ${selector}`);
  }

  return element;
}

function isOperatorKey(key: string): key is Operator {
  return key === "+" || key === "-" || key === "*" || key === "/";
}
