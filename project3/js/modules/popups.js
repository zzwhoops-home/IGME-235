export const createSwapContent = () => {
    const container = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = "Swap:";
    container.appendChild(label);

    const select1 = document.createElement("select");
    ["Row 1", "Row 2", "Row 3"].forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        select1.appendChild(option);
    });
    container.appendChild(select1);

    const swapSymbol = document.createElement("label");
    swapSymbol.textContent = " ↔ ";
    container.appendChild(swapSymbol);

    const select2 = document.createElement("select");
    ["Row 1", "Row 2", "Row 3"].forEach(optionText => {
        const option = document.createElement("option");
        option.textContent = optionText;
        select2.appendChild(option);
    });
    container.appendChild(select2);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", submitSwap);
    container.appendChild(submitButton);

    return container;
}

export const createScaleContent = () => {
    
}

export const createPivotContent = () => {
    
}

const submitSwap = () => {
    console.log("submitted");
}