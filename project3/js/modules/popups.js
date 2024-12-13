export const createSwapContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // first row selection
    const swapSelect1 = document.createElement("select");
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
    const swapSelect2 = document.createElement("select");
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
    swapSelect2.value = swapSelect2[1].textContent;
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

    // add event listener for continuous validation
    scaleEntry.addEventListener("input", () => {
        const expr = scaleEntry.value;

        if (parseInt(expr) === 0) {
            invalid();
            return;
        }

        // try parsing expression, disable submit on fail
        try {
            math.parse(expr);
            scaleEntry.style.border = "1px solid black";
            scaleEntry.style.color = "black";
            scaleEntry.style.fontStyle = "normal";
            submitButton.disabled = false;
        }
        catch (ex) {
            invalid();
        }
    });

    const invalid = () => {
        scaleEntry.style.border = "1px solid red";
        scaleEntry.style.color = "#ff0000";
        scaleEntry.style.fontStyle = "italic";
        submitButton.disabled = true;
    }

    return container;
}

export const createPivotContent = (rows) => {
    // popup content div
    const container = document.createElement("div");
    container.id = "popup-content";

    // create + or - selection
    const operation = document.createElement("select");
    operation.id = "dropdown-pivot-op";

    // create options and append
    const addOption = document.createElement("option");
    const subOption = document.createElement("option");

    addOption.textContent = "+";
    subOption.textContent = "-";

    operation.appendChild(addOption);
    operation.appendChild(subOption);
    // append to div
    container.appendChild(operation);

    // first row selection
    const pivotSelect1 = document.createElement("select");
    // assign id
    pivotSelect1.id = "dropdown-pivot-left";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        pivotSelect1.appendChild(option);
    }
    container.appendChild(pivotSelect1);

    // creating -> symbol
    const pivotSymbol = document.createElement("label");
    pivotSymbol.textContent = " → ";
    container.appendChild(pivotSymbol);

    // second row selection
    const pivotSelect2 = document.createElement("select");
    // assign id
    pivotSelect2.id = "dropdown-pivot-right";
    // add options based on # of rows
    for (let i = 1; i <= rows; i++) {
        const option = document.createElement("option");
        option.textContent = `Row ${i}`;
        option.dataset.row = i;
        pivotSelect2.appendChild(option);
    }
    container.appendChild(pivotSelect2);

    // start with row 1 and row 2 swap, disable others
    pivotSelect1.value = pivotSelect1[0].textContent;
    pivotSelect2.value = pivotSelect2[1].textContent;
    pivotSelect1.childNodes[1].disabled = true;
    pivotSelect2.childNodes[0].disabled = true;

    // add event listener for left swap
    pivotSelect1.addEventListener('change', (e) => {
        return changeLeft(e, pivotSelect1, pivotSelect2);
    });
    pivotSelect2.addEventListener('change', (e) => {
        return changeRight(e, pivotSelect1, pivotSelect2);
    });

    const submitButton = document.createElement("button");
    container.appendChild(submitButton);

    return container;
}

const changeLeft = (e, left, right) => {
    const options = Array.from(e.target.childNodes);
    const selected = options.filter(element => element.selected == true);

    // get index by splitting
    const index = selected[0].textContent.split(" ")[1] - 1;

    // prevent the same row from being swapped
    for (let i = 0; i < options.length; i++) {
        if (i != index) {
            right[i].disabled = false;
        }
        else {
            right[i].disabled = true;
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
            left[i].disabled = false;
        }
        else {
            left[i].disabled = true;
        }
    }
}