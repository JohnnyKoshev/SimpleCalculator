interface CalculatorInterface {
      onTransformClearBtn: () => void;
      onOperationClick: () => void;
      onKeyDown: () => void;
}

class Calculator implements CalculatorInterface {
      private clearButtonContainer: Element | null;
      private clearButton: HTMLImageElement | null;
      private allButtons: NodeListOf<HTMLAnchorElement>;
      private digitsPlace: HTMLElement | null;
      private operationPlace: Element | null;
      private firstNumPlace: HTMLElement | null;
      private secondNumPlace: HTMLElement | null;

      constructor() {
            this.clearButtonContainer = document.querySelector(".clear-button-container");
            this.clearButton = document.querySelector(".clear-button");
            this.allButtons = document.querySelectorAll("a");
            this.digitsPlace = document.querySelector(".digits");
            this.operationPlace = document.querySelector(".operation");
            this.firstNumPlace = document.querySelector(".first-num");
            this.secondNumPlace = document.querySelector(".second-num");
      }

      private assignNumPlace(numPlace: HTMLElement, digitsPlace: Element): void {
            if (digitsPlace.innerHTML !== "0" && digitsPlace.innerHTML !== "") {
                  numPlace.dataset.num = `${parseFloat(digitsPlace.innerHTML)}`;
                  if (digitsPlace.innerHTML.length <= 6) {
                        numPlace.innerHTML = `${parseFloat(digitsPlace.innerHTML).toPrecision(
                              digitsPlace.innerHTML.length
                        )}`;
                  } else {
                        numPlace.innerHTML = `${parseFloat(digitsPlace.innerHTML).toPrecision(6)}`;
                  }
            } else {
                  numPlace.dataset.num = "0";
                  numPlace.innerHTML = "0";
            }
      }

      private chooseOperation(
            firstNumPlace: HTMLElement,
            secondNumPlace: HTMLElement,
            digitsPlace: HTMLElement,
            operationPlace: Element,
            operation: string
      ): void {
            if (operation.includes("img")) {
                  if (digitsPlace.innerHTML === "Infinity" || digitsPlace.innerHTML === "NaN") {
                        digitsPlace.innerHTML = "0";
                  } else {
                        const tempDigitsArr: string[] = digitsPlace.innerHTML.split("");
                        tempDigitsArr.pop();
                        if (tempDigitsArr.length === 0) {
                              tempDigitsArr.push("0");
                        }
                        digitsPlace.innerHTML = tempDigitsArr.join("");
                  }
            }

            switch (operation) {
                  case "C":
                        digitsPlace.innerHTML = "0";
                        this.clearDisplay(firstNumPlace, secondNumPlace, operationPlace);
                        break;
                  case "/":
                        this.setOperation(
                              firstNumPlace,
                              secondNumPlace,
                              digitsPlace,
                              operationPlace,
                              "/"
                        );
                        break;
                  case "*":
                        this.setOperation(
                              firstNumPlace,
                              secondNumPlace,
                              digitsPlace,
                              operationPlace,
                              "*"
                        );
                        break;
                  case "+":
                        this.setOperation(
                              firstNumPlace,
                              secondNumPlace,
                              digitsPlace,
                              operationPlace,
                              "+"
                        );
                        break;
                  case "-":
                        this.setOperation(
                              firstNumPlace,
                              secondNumPlace,
                              digitsPlace,
                              operationPlace,
                              "-"
                        );
                        break;
                  case "%":
                        this.setOperation(
                              firstNumPlace,
                              secondNumPlace,
                              digitsPlace,
                              operationPlace,
                              "%"
                        );
                        break;
                  case ".":
                        if (digitsPlace.innerHTML.indexOf(".") === -1) {
                              digitsPlace.innerHTML += ".";
                        }
                        break;
                  case "=":
                        if (firstNumPlace.innerHTML !== "" && secondNumPlace.innerHTML === "") {
                              secondNumPlace.dataset.num = digitsPlace.innerHTML;
                              if (
                                    digitsPlace.innerHTML.length <= 6 &&
                                    !digitsPlace.innerHTML.includes(".")
                              ) {
                                    secondNumPlace.innerHTML = `${parseFloat(
                                          digitsPlace.innerHTML
                                    ).toPrecision(digitsPlace.innerHTML.length)}`;
                              } else {
                                    secondNumPlace.innerHTML = `${parseFloat(
                                          digitsPlace.innerHTML
                                    ).toPrecision(6)}`;
                              }
                              digitsPlace.innerHTML = "0";
                        }
                        break;
            }
      }

      private setOperation(
            firstNumPlace: HTMLElement | null,
            secondNumPlace: HTMLElement | null,
            digitsPlace: HTMLElement | null,
            operationPlace: Element | null,
            operation: string
      ): void {
            if (
                  firstNumPlace instanceof HTMLElement &&
                  secondNumPlace instanceof HTMLElement &&
                  digitsPlace &&
                  operationPlace
            ) {
                  operationPlace.classList.remove("inactive");
                  operationPlace.classList.add("active");
                  operationPlace.innerHTML = operation;
                  if (operation === "%") {
                        firstNumPlace.dataset.num = digitsPlace.innerHTML;
                        secondNumPlace.dataset.percent = "100";
                  } else {
                        if (firstNumPlace.innerHTML !== "" && secondNumPlace.innerHTML !== "") {
                              if (digitsPlace.innerHTML !== "0" && digitsPlace.innerHTML !== "") {
                                    secondNumPlace.dataset.num = "";
                                    secondNumPlace.innerHTML = "";
                              }
                        } else {
                              if (firstNumPlace.innerHTML === "") {
                                    this.assignNumPlace(firstNumPlace, digitsPlace);
                              } else {
                                    this.assignNumPlace(secondNumPlace, digitsPlace);
                              }
                              digitsPlace.innerHTML = "0";
                        }
                  }
            }
      }

      private clearDisplay(
            firstNumPlace: HTMLElement,
            secondNumPlace: HTMLElement,
            operationPlace: Element
      ): void {
            firstNumPlace.dataset.num = "";
            firstNumPlace.innerHTML = "";
            secondNumPlace.dataset.num = "";
            secondNumPlace.dataset.percent = "";
            secondNumPlace.innerHTML = "";
            operationPlace.classList.add("inactive");
            operationPlace.classList.remove("active");
      }

      private showResult(
            firstNumPlace: Element | null,
            secondNumPlace: Element | null,
            operationPlace: Element | null,
            digitsPlace: Element | null,
            result: number
      ): void {
            debugger;
            if (
                  firstNumPlace instanceof HTMLElement &&
                  secondNumPlace instanceof HTMLElement &&
                  digitsPlace &&
                  operationPlace
            ) {
                  if (result !== 0) {
                        if (result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER) {
                              if (
                                    !result.toString().includes(".") &&
                                    !result.toString().includes("e")
                              ) {
                                    if (result.toString().length > 40) {
                                          digitsPlace.innerHTML = `${result.toPrecision(20)}`;
                                    } else {
                                          digitsPlace.innerHTML = `${result}`;
                                    }
                              } else if (result.toString().length <= 20) {
                                    digitsPlace.innerHTML = `${result}`;
                              } else {
                                    if (
                                          !result.toString().includes(".") &&
                                          !result.toString().includes("e")
                                    ) {
                                          digitsPlace.innerHTML = `${result.toPrecision(25)}`;
                                    } else {
                                          digitsPlace.innerHTML = `${result.toPrecision(10)}`;
                                    }
                              }
                        } else {
                              digitsPlace.innerHTML = `${result.toPrecision(10)}`;
                        }
                        this.clearDisplay(firstNumPlace, secondNumPlace, operationPlace);
                  } else {
                        digitsPlace.innerHTML = "0";
                        this.clearDisplay(firstNumPlace, secondNumPlace, operationPlace);
                  }
            }
      }

      private computeResult(
            firstNumPlace: HTMLElement,
            secondNumPlace: HTMLElement,
            digitsPlace: HTMLElement,
            operation: string
      ): void {
            switch (operation) {
                  case "/":
                        digitsPlace.dataset.result = (
                              parseFloat(<string>firstNumPlace.dataset.num) /
                              parseFloat(<string>secondNumPlace.dataset.num)
                        ).toString();
                        break;
                  case "*":
                        digitsPlace.dataset.result = (
                              parseFloat(<string>firstNumPlace.dataset.num) *
                              parseFloat(<string>secondNumPlace.dataset.num)
                        ).toString();
                        break;
                  case "+":
                        digitsPlace.dataset.result = (
                              parseFloat(<string>firstNumPlace.dataset.num) +
                              parseFloat(<string>secondNumPlace.dataset.num)
                        ).toString();
                        break;
                  case "-":
                        digitsPlace.dataset.result = (
                              parseFloat(<string>firstNumPlace.dataset.num) -
                              parseFloat(<string>secondNumPlace.dataset.num)
                        ).toString();
                        break;
                  case "%":
                        digitsPlace.dataset.result = (
                              parseFloat(<string>firstNumPlace.dataset.num) /
                              parseFloat(<string>secondNumPlace.dataset.percent)
                        ).toString();
                        break;
            }
      }

      private checkDigitsLength(digitsPlace: HTMLElement, operation: string): void {
            if (
                  digitsPlace.innerHTML.length <= 43 &&
                  (parseFloat(operation) || operation === "0")
            ) {
                  if (
                        (parseFloat(operation) || operation === "0") &&
                        digitsPlace.innerHTML !== "0"
                  ) {
                        digitsPlace.innerHTML = digitsPlace.innerHTML + operation;
                  } else if (digitsPlace.innerHTML === "0") {
                        digitsPlace.innerHTML = "";
                        digitsPlace.innerHTML = digitsPlace.innerHTML + operation;
                  }
            } else if (digitsPlace.innerHTML.length > 43 && parseFloat(operation)) {
                  alert("YOU CAN ENTER ONLY 43 DIGITS!");
            }
      }

      get result(): string | undefined {
            return this.digitsPlace?.dataset.result;
      }

      public onTransformClearBtn(): void {
            if (this.clearButtonContainer) {
                  this.clearButtonContainer.addEventListener("mouseover", () => {
                        if (this.clearButton) this.clearButton.src = "img/clear-btn-colored.svg";
                  });
                  this.clearButtonContainer.addEventListener("mouseout", () => {
                        if (this.clearButton) this.clearButton.src = "img/clear-btn.svg";
                  });
            }
      }

      public onOperationClick(): void {
            this.allButtons.forEach((el: HTMLAnchorElement) => {
                  el.addEventListener("click", (e: MouseEvent) => {
                        e.preventDefault();
                        if (
                              this.digitsPlace instanceof HTMLElement &&
                              this.operationPlace &&
                              this.firstNumPlace instanceof HTMLElement &&
                              this.secondNumPlace instanceof HTMLElement
                        ) {
                              if (
                                    (this.operationPlace.innerHTML !== "" &&
                                          this.firstNumPlace.dataset.num &&
                                          this.secondNumPlace.dataset.percent) ||
                                    (this.secondNumPlace.dataset.num &&
                                          this.firstNumPlace.dataset.num &&
                                          this.firstNumPlace.dataset.num !== "" &&
                                          this.secondNumPlace.dataset.num !== "")
                              ) {
                                    this.computeResult(
                                          this.firstNumPlace,
                                          this.secondNumPlace,
                                          this.digitsPlace,
                                          this.operationPlace.innerHTML
                                    );
                                    if (el.innerHTML === "=" && this.result) {
                                          this.showResult(
                                                this.firstNumPlace,
                                                this.secondNumPlace,
                                                this.operationPlace,
                                                this.digitsPlace,
                                                parseFloat(this.result)
                                          );
                                    }
                              } else {
                                    this.allButtons.forEach((btn: HTMLAnchorElement) => {
                                          if (btn.innerText !== el.innerText) {
                                                btn.classList.remove("clicked");
                                                btn.classList.add("unclicked");
                                          }
                                    });
                                    el.classList.remove("unclicked");
                                    el.classList.add("clicked");
                                    this.checkDigitsLength(this.digitsPlace, el.innerText);
                                    this.chooseOperation(
                                          this.firstNumPlace,
                                          this.secondNumPlace,
                                          this.digitsPlace,
                                          this.operationPlace,
                                          el.innerHTML
                                    );
                              }
                        }
                  });
            });
      }

      public onKeyDown(): void {
            document.addEventListener("keydown", (el: KeyboardEvent) => {
                  for (let i = 0; i < this.allButtons.length; i++) {
                        if (this.allButtons[i].innerText.toLowerCase() === el.key.toLowerCase()) {
                              this.allButtons[i].dispatchEvent(new Event("click"));
                        } else if (el.key === "Enter") {
                              this.allButtons.forEach((btn: HTMLAnchorElement) => {
                                    if (btn.innerText === "=") {
                                          btn.dispatchEvent(new Event("click"));
                                    }
                              });
                              break;
                        } else if (el.key === "Backspace") {
                              if (!this.allButtons[i].innerText.length) {
                                    this.allButtons[i].dispatchEvent(new Event("click"));
                              }
                        }
                  }
            });
      }
}

const calculator = new Calculator();

calculator.onTransformClearBtn();
calculator.onOperationClick();
calculator.onKeyDown();
