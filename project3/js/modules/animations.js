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


        // scientific numbers
        if (target.toString().length > 5 && Math.abs(target) > 100) {
            const str = Number(nextValue).toExponential(3).toString();
            const split = str.split("e");
            const formatted = `${split[0]}<br>e${split[1]}`;
            element.innerHTML = formatted;
        }
        // two decimal places for displayed elements
        else {
            element.textContent = `${nextValue % 1 === 0 ? nextValue : nextValue.toFixed(3)}`;
        }

        if (progress < 1) {
            // continue animation
            requestAnimationFrame(animate);
        }
        else {
            if (target.toString().length > 5 && Math.abs(target) > 100) {
                const str = Number(target).toExponential(3).toString();
                const split = str.split("e");
                const formatted = `${split[0]}<br>e${split[1]}`;
                element.innerHTML = formatted;
            }
            else {
                // set target exactly
                element.textContent = `${target % 1 === 0 ? target : target.toFixed(3)}`;
            }
        }
    }

    // start animation
    requestAnimationFrame(animate);
}