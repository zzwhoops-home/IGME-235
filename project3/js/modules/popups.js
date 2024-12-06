// current swap selects
let swapSelect1, swapSelect2;

export const createSwapContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // # of dropdown elements should be = # rows
    const rowArr = [];
    for (let i = 1; i <= rows; i++) {
        rowArr.push(`Row ${i}`);
    }

    // first row selection
    swapSelect1 = document.createElement("select");
    rowArr.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        swapSelect1.appendChild(option);
    });
    container.appendChild(swapSelect1);

    // creating <-> symbol
    const swapSymbol = document.createElement("label");
    swapSymbol.textContent = " ↔ ";
    container.appendChild(swapSymbol);

    // second row selection
    swapSelect2 = document.createElement("select");
    rowArr.forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        swapSelect2.appendChild(option);
    });
    container.appendChild(swapSelect2);

    // add event listeners
    swapSelect1.addEventListener('change', swapChangeLeft);

    const submitButton = document.createElement("button");
    submitButton.addEventListener("click", submitSwap);
    container.appendChild(submitButton);

    return container;
}

export const createScaleContent = () => {

}

export const createPivotContent = () => {

}

const swapChangeLeft = (e) => {
    const options = Array.from(e.target.childNodes);
    const selected = options.filter(element => element.selected == true);

    // get index by splitting
    const index = selected[0].textContent.split(" ")[1] - 1;

    // prevent the same row from being swapped
    for (let i = 0; i < options.length; i++) {
        if (i != index) {
            swapSelect2[index].disabled = false;
        }
        else {
            swapSelect2[index].disabled = true;
        }
    }
}

const submitSwap = () => {
    console.log("submitted");
}