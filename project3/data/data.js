/**
 * An object containing messages that correspond with move IDs to display in the information panel
 */
export const InfoMessages = {
    "swap": "Swap two rows to rearrange the matrix structure.",
    "scale": "Multiply a row by a non-zero scalar to adjust the magnitude of its elements.",
    "pivot": "Perform a row operation to add or subtract one row to/from another.",
    "reset": "Reset the matrix to its original state, undoing all previous operations.",
    "auto": "Automatically compute the reduced row echelon form (RREF).",
    "random": "Generates a random matrix that contains between 2-4 rows and 2-4 columns.",
    "prev-level": "Go to the previous level.",
    "next-level": "Go to the next level.",
    "default": "Welcome! Your goal is to find RREF (reduced row echelon form)."
}

/**
 * Formats incoming data from flat 1D array
 * 
 * @param {*} data 1D data to become matrix
 * @param {*} rows Rows in matrix
 * @param {*} cols Columns in matrix
 * @returns {Object} 2D array
 */
export const formatData = (rows, cols, data) => {
    let matrix = [];

    let count = 0;
    for (let row = 0; row < rows; row++) {
        let row = [];
        for (let col = 0; col < cols; col++) {
            row.push(data[count]);
            count++;
        }

        matrix.push(row);
    }

    return matrix;
}