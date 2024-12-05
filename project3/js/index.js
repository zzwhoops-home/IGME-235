
/**
 * Handles the window onload event and initializes the page contents.
 *
 * @param {Event} e - The event object triggered when the window loads.
 */
window.onload = (e) => {
    loadContents();
}

/**
 * Loads the contents of the page on page load
 */
const loadContents = () => {
    const expression = '2 + 3 * sqrt(4)';
    const result = math.evaluate(expression);
    console.log(`The result of "${expression}" is ${result}`);
};