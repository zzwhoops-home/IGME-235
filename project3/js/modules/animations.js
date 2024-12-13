export function elementCounter(current, target, element) {
    // time in milliseconds
    const duration = 250;
    // get current timestamp
    const startTime = performance.now();

    // callback function, passes in timestamp
    function animate(time) {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // calculate current value
        const toAdd = (target - current) * progress;
        let nextValue = current + toAdd;

        if (target % 1 === 0) {
            nextValue = Math.round(nextValue);
        }

        // two decimal places for displayed elements
        element.textContent = `${nextValue % 1 === 0 ? nextValue : nextValue.toFixed(2)}`;

        if (progress < 1) {
            // continue animation
            requestAnimationFrame(animate);
        }
        else {
            // set target exactly
            element.textContent = `${target % 1 === 0 ? target : target.toFixed(2)}`;
        }
    }

    // start animation
    requestAnimationFrame(animate);
}