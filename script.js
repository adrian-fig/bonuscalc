document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const results = document.getElementById('results');

    calculateBtn.addEventListener('click', function() {
        this.textContent = 'Calculating...';
        this.disabled = true;

        setTimeout(function() {
            // Retrieve input values from the form
            const baseHourlyRate = parseFloat(document.getElementById('baseHourlyRate').value) || 0;
            const totalHours = parseFloat(document.getElementById('totalHours').value) || 0;
            const otHours = parseFloat(document.getElementById('otHours').value) || 0;
            const restHours = parseFloat(document.getElementById('restHours').value) || 0;
            const flagRate = parseFloat(document.getElementById('flagRate').value) || 0;
            const trainingHours = parseFloat(document.getElementById('trainingHours').value) || 0;
            const flagHours = parseFloat(document.getElementById('flagHours').value) || 0;

            // Existing calculations
            const denominator = totalHours + otHours - restHours;
            const restAndRecoveryRate = denominator > 0 ? flagHours / denominator : 0;
            const effectiveRestAndRecoveryRate = restAndRecoveryRate * flagRate;
            const restAndRecoveryTotal = effectiveRestAndRecoveryRate * restHours;
            const totalTrainingCompensation = trainingHours * flagRate;
            const baseHourlyRateTotal = (totalHours + otHours - restHours) * baseHourlyRate;
            const otAverage = (baseHourlyRateTotal + restAndRecoveryTotal + totalTrainingCompensation) / (totalHours + otHours);
            const otTotal = (((effectiveRestAndRecoveryRate - baseHourlyRate) / 2) * otHours) + (otHours * (otAverage / 2));

            // New calculations for Production Bonus Total and Total Compensation
            const productionBonusTotal = (effectiveRestAndRecoveryRate - baseHourlyRate) * (totalHours + otHours - restHours);
            const totalCompensation = otTotal + totalTrainingCompensation + restAndRecoveryTotal + productionBonusTotal + baseHourlyRateTotal;

            // Display the results accurately
            results.innerHTML = `
                <strong>Total Training Compensation:</strong> $${totalTrainingCompensation.toFixed(2)}<br>
                <strong>Rest and Recovery Total:</strong> $${restAndRecoveryTotal.toFixed(2)}<br>
                <strong>Base Hourly Rate Total:</strong> $${baseHourlyRateTotal.toFixed(2)}<br>
                <strong>OT Total:</strong> $${otTotal.toFixed(2)}<br>
                <strong>Production Bonus Total:</strong> $${productionBonusTotal.toFixed(2)}<br>
                <strong>Total Compensation:</strong> $${totalCompensation.toFixed(2)}
            `;

            // Reset button text and re-enable it
            calculateBtn.textContent = 'Calculate';
            calculateBtn.disabled = false;
        }, 1000);
    });
});
