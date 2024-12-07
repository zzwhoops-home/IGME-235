// current swap selects
let scaleSelect, swapSelect2;

export const createSwapContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // first row selection
    scaleSelect = document.createElement("select");
    // assign id
    scaleSelect.id = "dropdown-swap-left";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        scaleSelect.appendChild(option);
    }
    container.appendChild(scaleSelect);

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
    scaleSelect.value = scaleSelect[0].textContent;
    swapSelect2.value = scaleSelect[1].textContent;
    scaleSelect.childNodes[1].disabled = true;
    swapSelect2.childNodes[0].disabled = true;

    // add event listener for left swap
    scaleSelect.addEventListener('change', swapChangeLeft);
    swapSelect2.addEventListener('change', swapChangeRight);

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

const swapChangeLeft = (e) => {
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

const swapChangeRight = (e) => {
    const options = Array.from(e.target.childNodes);
    const selected = options.filter(element => element.selected == true);

    // get index by splitting
    const index = selected[0].textContent.split(" ")[1] - 1;

    // prevent the same row from being swapped
    for (let i = 0; i < options.length; i++) {
        if (i != index) {
            scaleSelect[i].disabled = false;
        }
        else {
            scaleSelect[i].disabled = true;
        }
    }
}