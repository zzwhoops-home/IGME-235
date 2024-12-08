// current swap selects
let swapSelect1, swapSelect2;

export const createSwapContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // first row selection
    swapSelect1 = document.createElement("select");
    // assign id
    swapSelect1.id = "dropdown-swap-left";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        swapSelect1.appendChild(option);
    }
    container.appendChild(swapSelect1);

    // creating <-> symbol
    const swapSymbol = document.createElement("label");
    swapSymbol.textContent = " ↔ ";
    container.appendChild(swapSymbol);

    // second row selection
    swapSelect2 = document.createElement("select");
    // assign id
    swapSelect2.id = "dropdown-swap-right";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        swapSelect2.appendChild(option);
    }
    container.appendChild(swapSelect2);

    // start with row 1 and row 2 swap, disable others
    swapSelect1.value = swapSelect1[0].textContent;
    swapSelect2.value = swapSelect1[1].textContent;
    swapSelect1.childNodes[1].disabled = true;
    swapSelect2.childNodes[0].disabled = true;

    // add event listener for left swap
    swapSelect1.addEventListener('change', (e) => {
        return changeLeft(e, swapSelect1, swapSelect2);
    });
    swapSelect2.addEventListener('change', (e) => {
        return changeRight(e, swapSelect1, swapSelect2);
    });

    const submitButton = document.createElement("button");
    container.appendChild(submitButton);

    return container;
}

export const createScaleContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // first row selection
    const scaleSelect = document.createElement("select");
    // assign id
    scaleSelect.id = "dropdown-scale-row";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        scaleSelect.appendChild(option);
    }
    container.appendChild(scaleSelect);

    // creating <-> symbol
    const scaleSymbol = document.createElement("label");
    scaleSymbol.textContent = " × ";
    container.appendChild(scaleSymbol);

    // second row selection
    const scaleEntry = document.createElement("input");
    // assign id
    scaleEntry.id = "dropdown-scale-entry";
    // required and placeholder
    scaleEntry.required = true;
    scaleEntry.placeholder = "Enter math (e.g. (1 / 4))";
    // add options based on # of rows
    container.appendChild(scaleEntry);

    // force default value
    scaleSelect.value = scaleSelect[0].textContent;

    // create submit button
    const submitButton = document.createElement("button");
    container.appendChild(submitButton);

    return container;
}

export const createPivotContent = () => {

}

const changeLeft = (e, left, right) => {
    const options = Array.from(e.target.childNodes);
    const selected = options.filter(element => element.selected == true);

    // get index by splitting
    const index = selected[0].textContent.split(" ")[1] - 1;

    // prevent the same row from being swapped
    for (let i = 0; i < options.length; i++) {
        if (i != index) {
            swapSelect2[i].disabled = false;
        }
        else {
            swapSelect2[i].disabled = true;
        }
    }
}

const changeRight = (e, left, right) => {
    const options = Array.from(e.target.childNodes);
    const selected = options.filter(element => element.selected == true);

    // get index by splitting
    const index = selected[0].textContent.split(" ")[1] - 1;

    // prevent the same row from being swapped
    for (let i = 0; i < options.length; i++) {
        if (i != index) {
            swapSelect1[i].disabled = false;
        }
        else {
            swapSelect1[i].disabled = true;
        }
    }
}