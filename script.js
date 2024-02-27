document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const results = document.getElementById('results');
    const form = document.getElementById('calculatorForm'); // Ensure your form has an ID

    function performCalculation() {
        calculateBtn.textContent = 'Calculating...';
        calculateBtn.disabled = true;

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

            // Display the results
            results.innerHTML = `
                <strong>Total Training Compensation:</strong> $${totalTrainingCompensation.toFixed(2)}<br>
                <strong>Rest and Recovery Total:</strong> $${restAndRecoveryTotal.toFixed(2)}<br>
                <strong>Base Hourly Rate Total:</strong> $${baseHourlyRateTotal.toFixed(2)}<br>
                <strong>OT Total:</strong> $${otTotal.toFixed(2)}<br>
                <strong>Production Bonus Total:</strong> $${productionBonusTotal.toFixed(2)}<br>
                <strong>Total Compensation:</strong> $${totalCompensation.toFixed(2)}
            `;

            calculateBtn.textContent = 'Calculate';
            calculateBtn.disabled = false;
        }, 1000);
    }

    calculateBtn.addEventListener('click', performCalculation);

    // Add event listener for the form to listen for Enter key press
    form.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submit behavior
            performCalculation();
        }
    });
});
