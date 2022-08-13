class Calculator {
      private allButtons: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("a");
      private digitsPlace: HTMLElement | null = document.querySelector(".digits");
      private operationPlace: Element | null = document.querySelector(".operation");
      private firstNumPlace: HTMLElement | null = document.querySelector(".first-num");
      private secondNumPlace: HTMLElement | null = document.querySelector(".second-num");

      constructor() {
            this.onTransformClearBtn();
            this.onOperationClick();
            this.onKeyDown();
      }

      private assignNumPlace(numPlace: HTMLElement): void {
            if (this.digitsPlace)
                  if (this.digitsPlace.innerHTML !== "0" && this.digitsPlace.innerHTML !== "") {
                        numPlace.dataset.num = `${parseFloat(this.digitsPlace.innerHTML)}`;
                        if (this.digitsPlace.innerHTML.length <= 6) {
                              numPlace.innerHTML = `${parseFloat(
                                    this.digitsPlace.innerHTML
                              ).toPrecision(this.digitsPlace.innerHTML.length)}`;
                        } else {
                              numPlace.innerHTML = `${parseFloat(
                                    this.digitsPlace.innerHTML
                              ).toPrecision(6)}`;
                        }
                  } else {
                        numPlace.dataset.num = "0";
                        numPlace.innerHTML = "0";
                  }
      }

      private chooseOperation(operation: string): void {
            if (this.digitsPlace && this.secondNumPlace && this.firstNumPlace) {
                  if (operation.includes("img")) {
                        if (
                              this.digitsPlace.innerHTML === "Infinity" ||
                              this.digitsPlace.innerHTML === "NaN"
                        ) {
                              this.digitsPlace.innerHTML = "0";
                        } else {
                              const tempDigitsArr: string[] = this.digitsPlace.innerHTML.split("");
                              tempDigitsArr.pop();
                              if (tempDigitsArr.length === 0) {
                                    tempDigitsArr.push("0");
                              }
                              this.digitsPlace.innerHTML = tempDigitsArr.join("");
                        }
                  }

                  switch (operation) {
                        case "C":
                              this.digitsPlace.innerHTML = "0";
                              this.clearDisplay();
                              break;
                        case "/":
                              this.setOperation("/");
                              break;
                        case "*":
                              this.setOperation("*");
                              break;
                        case "+":
                              this.setOperation("+");
                              break;
                        case "-":
                              this.setOperation("-");
                              break;
                        case "%":
                              this.setOperation("%");
                              break;
                        case ".":
                              if (this.digitsPlace.innerHTML.indexOf(".") === -1) {
                                    this.digitsPlace.innerHTML += ".";
                              }
                              break;
                        case "=":
                              if (
                                    this.firstNumPlace.innerHTML !== "" &&
                                    this.secondNumPlace.innerHTML === ""
                              ) {
                                    this.secondNumPlace.dataset.num = this.digitsPlace.innerHTML;
                                    if (
                                          this.digitsPlace.innerHTML.length <= 6 &&
                                          !this.digitsPlace.innerHTML.includes(".")
                                    ) {
                                          this.secondNumPlace.innerHTML = `${parseFloat(
                                                this.digitsPlace.innerHTML
                                          ).toPrecision(this.digitsPlace.innerHTML.length)}`;
                                    } else {
                                          this.secondNumPlace.innerHTML = `${parseFloat(
                                                this.digitsPlace.innerHTML
                                          ).toPrecision(6)}`;
                                    }
                                    this.digitsPlace.innerHTML = "0";
                              }
                              break;
                  }
            }
      }

      private setOperation(operation: string): void {
            if (
                  this.firstNumPlace &&
                  this.secondNumPlace &&
                  this.digitsPlace &&
                  this.operationPlace
            ) {
                  this.operationPlace.classList.remove("inactive");
                  this.operationPlace.classList.add("active");
                  this.operationPlace.innerHTML = operation;
                  if (operation === "%") {
                        this.firstNumPlace.dataset.num = this.digitsPlace.innerHTML;
                        this.secondNumPlace.dataset.percent = "100";
                  } else {
                        if (
                              this.firstNumPlace.innerHTML !== "" &&
                              this.secondNumPlace.innerHTML !== ""
                        ) {
                              if (
                                    this.digitsPlace.innerHTML !== "0" &&
                                    this.digitsPlace.innerHTML !== ""
                              ) {
                                    this.secondNumPlace.dataset.num = "";
                                    this.secondNumPlace.innerHTML = "";
                              }
                        } else {
                              if (this.firstNumPlace.innerHTML === "") {
                                    this.assignNumPlace(this.firstNumPlace);
                              } else {
                                    this.assignNumPlace(this.secondNumPlace);
                              }
                              this.digitsPlace.innerHTML = "0";
                        }
                  }
            }
      }

      private clearDisplay(): void {
            if (this.firstNumPlace && this.secondNumPlace && this.operationPlace) {
                  this.firstNumPlace.dataset.num = "";
                  this.firstNumPlace.innerHTML = "";
                  this.secondNumPlace.dataset.num = "";
                  this.secondNumPlace.dataset.percent = "";
                  this.secondNumPlace.innerHTML = "";
                  this.operationPlace.classList.add("inactive");
                  this.operationPlace.classList.remove("active");
            }
      }

      private showResult(result: number): void {
            debugger;
            if (
                  this.firstNumPlace &&
                  this.secondNumPlace &&
                  this.digitsPlace &&
                  this.operationPlace
            ) {
                  if (result !== 0) {
                        if (result < Number.MAX_SAFE_INTEGER && result > Number.MIN_SAFE_INTEGER) {
                              if (
                                    !result.toString().includes(".") &&
                                    !result.toString().includes("e")
                              ) {
                                    if (result.toString().length > 40) {
                                          this.digitsPlace.innerHTML = `${result.toPrecision(20)}`;
                                    } else {
                                          this.digitsPlace.innerHTML = `${result}`;
                                    }
                              } else if (result.toString().length <= 20) {
                                    this.digitsPlace.innerHTML = `${result}`;
                              } else {
                                    if (
                                          !result.toString().includes(".") &&
                                          !result.toString().includes("e")
                                    ) {
                                          this.digitsPlace.innerHTML = `${result.toPrecision(25)}`;
                                    } else {
                                          this.digitsPlace.innerHTML = `${result.toPrecision(10)}`;
                                    }
                              }
                        } else {
                              this.digitsPlace.innerHTML = `${result.toPrecision(10)}`;
                        }
                        this.clearDisplay();
                  } else {
                        this.digitsPlace.innerHTML = "0";
                        this.clearDisplay();
                  }
            }
      }

      private computeResult(operation: string): void {
            if (this.digitsPlace && this.secondNumPlace && this.firstNumPlace)
                  switch (operation) {
                        case "/":
                              this.digitsPlace.dataset.result = (
                                    parseFloat(<string>this.firstNumPlace.dataset.num) /
                                    parseFloat(<string>this.secondNumPlace.dataset.num)
                              ).toString();
                              break;
                        case "*":
                              this.digitsPlace.dataset.result = (
                                    parseFloat(<string>this.firstNumPlace.dataset.num) *
                                    parseFloat(<string>this.secondNumPlace.dataset.num)
                              ).toString();
                              break;
                        case "+":
                              this.digitsPlace.dataset.result = (
                                    parseFloat(<string>this.firstNumPlace.dataset.num) +
                                    parseFloat(<string>this.secondNumPlace.dataset.num)
                              ).toString();
                              break;
                        case "-":
                              this.digitsPlace.dataset.result = (
                                    parseFloat(<string>this.firstNumPlace.dataset.num) -
                                    parseFloat(<string>this.secondNumPlace.dataset.num)
                              ).toString();
                              break;
                        case "%":
                              this.digitsPlace.dataset.result = (
                                    parseFloat(<string>this.firstNumPlace.dataset.num) /
                                    parseFloat(<string>this.secondNumPlace.dataset.percent)
                              ).toString();
                              break;
                  }
      }

      private checkDigitsLength(operation: string): void {
            if (this.digitsPlace)
                  if (
                        this.digitsPlace.innerHTML.length <= 43 &&
                        (parseFloat(operation) || operation === "0")
                  ) {
                        if (
                              (parseFloat(operation) || operation === "0") &&
                              this.digitsPlace.innerHTML !== "0"
                        ) {
                              this.digitsPlace.innerHTML = this.digitsPlace.innerHTML + operation;
                        } else if (this.digitsPlace.innerHTML === "0") {
                              this.digitsPlace.innerHTML = "";
                              this.digitsPlace.innerHTML = this.digitsPlace.innerHTML + operation;
                        }
                  } else if (this.digitsPlace.innerHTML.length > 43 && parseFloat(operation)) {
                        alert("YOU CAN ENTER ONLY 43 DIGITS!");
                  }
      }

      get result(): string | undefined {
            return this.digitsPlace?.dataset.result;
      }

      private onTransformClearBtn(): void {
            const clearButtonContainer = document.querySelector(".clear-button-container");
            const clearButton: HTMLImageElement | null = document.querySelector(".clear-button");
            if (clearButtonContainer) {
                  clearButtonContainer.addEventListener("mouseover", () => {
                        if (clearButton) clearButton.src = "img/clear-btn-colored.svg";
                  });
                  clearButtonContainer.addEventListener("mouseout", () => {
                        if (clearButton) clearButton.src = "img/clear-btn.svg";
                  });
            }
      }

      private onOperationClick(): void {
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
                                    this.computeResult(this.operationPlace.innerHTML);
                                    if (el.innerHTML === "=" && this.result) {
                                          this.showResult(parseFloat(this.result));
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
                                    this.checkDigitsLength(el.innerText);
                                    this.chooseOperation(el.innerHTML);
                              }
                        }
                  });
            });
      }

      private onKeyDown(): void {
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

new Calculator();
