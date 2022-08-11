const clearButtonContainer = document.querySelector(".clear-button-container");
const clearButton: HTMLImageElement | null = document.querySelector(".clear-button");
const allButtons = document.querySelectorAll("a");
const digitsPlace = document.querySelector(".digits");
const operationPlace = document.querySelector(".operation");
const firstNumPlace = document.querySelector(".first-num");
const secondNumPlace = document.querySelector(".second-num");

function assignNumPlace(numPlace: HTMLElement, digitsPlace: Element): void {
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

function setOperation(
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
                    assignNumPlace(firstNumPlace, digitsPlace);
                } else {
                    assignNumPlace(secondNumPlace, digitsPlace);
                }
                digitsPlace.innerHTML = "0";
            }
        }
    }
}

function showResult(
    firstNumPlace: Element | null,
    secondNumPlace: Element | null,
    operationPlace: Element | null,
    digitsPlace: Element | null,
    result: number
): void {
    if (
        firstNumPlace instanceof HTMLElement &&
        secondNumPlace instanceof HTMLElement &&
        digitsPlace &&
        operationPlace
    ) {
        if (result !== 0) {
            if (!result.toString().includes(".")) {
                digitsPlace.innerHTML = `${parseFloat(result.toPrecision(10))}`;
            } else if (result.toString().length <= 10) {
                digitsPlace.innerHTML = `${parseFloat(result.toFixed(result.toString().length))}`;
            } else {
                digitsPlace.innerHTML = `${parseFloat(result.toFixed(10))}`;
            }
            firstNumPlace.dataset.num = "";
            firstNumPlace.innerHTML = "";
            secondNumPlace.dataset.num = "";
            secondNumPlace.dataset.percent = "";
            secondNumPlace.innerHTML = "";
            operationPlace.classList.add("inactive");
            operationPlace.classList.remove("active");
        } else {
            digitsPlace.innerHTML = "0";
            firstNumPlace.dataset.num = "";
            firstNumPlace.innerHTML = "";
            secondNumPlace.dataset.num = "";
            secondNumPlace.dataset.percent = "";
            secondNumPlace.innerHTML = "";
            operationPlace.classList.add("inactive");
            operationPlace.classList.remove("active");
        }
    }
}

if (
    digitsPlace instanceof HTMLElement &&
    operationPlace &&
    firstNumPlace instanceof HTMLElement &&
    secondNumPlace instanceof HTMLElement
) {
    allButtons.forEach((el: HTMLAnchorElement) => {
        el.addEventListener("click", (e: MouseEvent) => {
            e.preventDefault();
            if (
                (operationPlace.innerHTML !== "" &&
                    firstNumPlace.dataset.num &&
                    secondNumPlace.dataset.percent) ||
                (secondNumPlace.dataset.num &&
                    firstNumPlace.dataset.num &&
                    firstNumPlace.dataset.num !== "" &&
                    secondNumPlace.dataset.num !== "")
            ) {
                if (operationPlace.innerHTML === "/") {
                    digitsPlace.dataset.result = (
                        parseFloat(<string>firstNumPlace.dataset.num) /
                        parseFloat(<string>secondNumPlace.dataset.num)
                    ).toString();
                } else if (operationPlace.innerHTML === "*") {
                    digitsPlace.dataset.result = (
                        parseFloat(<string>firstNumPlace.dataset.num) *
                        parseFloat(<string>secondNumPlace.dataset.num)
                    ).toString();
                } else if (operationPlace.innerHTML === "+") {
                    digitsPlace.dataset.result = (
                        parseFloat(<string>firstNumPlace.dataset.num) +
                        parseFloat(<string>secondNumPlace.dataset.num)
                    ).toString();
                } else if (operationPlace.innerHTML === "-") {
                    digitsPlace.dataset.result = (
                        parseFloat(<string>firstNumPlace.dataset.num) -
                        parseFloat(<string>secondNumPlace.dataset.num)
                    ).toString();
                } else if (operationPlace.innerHTML === "%") {
                    digitsPlace.dataset.result = (
                        parseFloat(<string>firstNumPlace.dataset.num) /
                        parseFloat(<string>secondNumPlace.dataset.percent)
                    ).toString();
                }
                if (el.innerHTML === "=" && digitsPlace.dataset.result) {
                    showResult(
                        firstNumPlace,
                        secondNumPlace,
                        operationPlace,
                        digitsPlace,
                        parseFloat(digitsPlace.dataset.result)
                    );
                }
            } else {
                allButtons.forEach((btn: HTMLAnchorElement) => {
                    if (btn.innerText !== el.innerText) {
                        btn.classList.remove("clicked");
                        btn.classList.add("unclicked");
                    }
                });
                el.classList.remove("unclicked");
                el.classList.add("clicked");
                if (
                    digitsPlace.innerHTML.length <= 43 &&
                    (parseFloat(el.innerText) || el.innerText === "0")
                ) {
                    if (
                        (parseFloat(el.innerText) || el.innerText === "0") &&
                        digitsPlace.innerHTML !== "0"
                    ) {
                        digitsPlace.innerHTML = digitsPlace.innerHTML + el.innerText;
                    } else if (digitsPlace.innerHTML === "0") {
                        digitsPlace.innerHTML = "";
                        digitsPlace.innerHTML += el.innerText;
                    }
                } else if (digitsPlace.innerHTML.length > 43 && parseFloat(el.innerText)) {
                    alert("YOU CAN ENTER ONLY 43 DIGITS!");
                }
                if (el.innerHTML.includes("img")) {
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
                } else if (el.innerText === "C") {
                    digitsPlace.innerHTML = "0";
                    firstNumPlace.dataset.num = "";
                    firstNumPlace.innerHTML = "";
                    secondNumPlace.dataset.num = "";
                    secondNumPlace.innerHTML = "";
                    operationPlace.innerHTML = "";
                    operationPlace.classList.remove("active");
                    operationPlace.classList.add("inactive");
                } else if (el.innerText === "/") {
                    setOperation(firstNumPlace, secondNumPlace, digitsPlace, operationPlace, "/");
                } else if (el.innerText === "*") {
                    setOperation(firstNumPlace, secondNumPlace, digitsPlace, operationPlace, "*");
                } else if (el.innerText === "+") {
                    setOperation(firstNumPlace, secondNumPlace, digitsPlace, operationPlace, "+");
                } else if (el.innerText === "-") {
                    setOperation(firstNumPlace, secondNumPlace, digitsPlace, operationPlace, "-");
                } else if (el.innerText === "%") {
                    setOperation(firstNumPlace, secondNumPlace, digitsPlace, operationPlace, "%");
                } else if (el.innerText === ".") {
                    if (digitsPlace.innerHTML.indexOf(".") === -1) {
                        digitsPlace.innerHTML += ".";
                    }
                } else if (el.innerText === "=") {
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
                }
            }
        });
    });
}

document.addEventListener("keydown", (el: KeyboardEvent) => {
    console.log(el.key);
    for (let i = 0; i < allButtons.length; i++) {
        if (allButtons[i].innerText.toLowerCase() === el.key.toLowerCase()) {
            allButtons[i].dispatchEvent(new Event("click"));
        } else if (el.key === "Enter") {
            allButtons.forEach((btn: HTMLAnchorElement) => {
                if (btn.innerText === "=") {
                    btn.dispatchEvent(new Event("click"));
                }
            });
            break;
        } else if (el.key === "Backspace") {
            if (!allButtons[i].innerText.length) {
                allButtons[i].dispatchEvent(new Event("click"));
            }
        }
    }
});

if (clearButtonContainer && clearButton) {
    clearButtonContainer.addEventListener("mouseover", () => {
        clearButton.src = "img/clear-btn-colored.svg";
    });
    clearButtonContainer.addEventListener("mouseout", () => {
        clearButton.src = "img/clear-btn.svg";
    });
}
