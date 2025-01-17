document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sizeForm');
    const resultsDiv = document.getElementById('results');
    const validationStatus = document.getElementById('validationStatus');
    const dimensionsList = document.querySelector('.dimensions-list');
    const clearButton = document.getElementById('clearForm');

    function validateSize(width, height, paperWeight, binding) {
        const dimension = `${width}x${height}`;
        
        if (!CONFIG.PAPER_WEIGHTS[paperWeight]) {
            return {
                isValid: false,
                message: `Invalid paper weight: ${paperWeight}`
            };
        }

        const validCombos = CONFIG.PAPER_WEIGHTS[paperWeight].dimensions;
        return {
            isValid: validCombos.has(dimension),
            message: validCombos.has(dimension) 
                ? `Size ${width}mm × ${height}mm is valid for ${binding} binding with ${paperWeight}`
                : `Size ${width}mm × ${height}mm is not valid for ${binding} binding with ${paperWeight}`
        };
    }

    function showAvailableSizes(paperWeight, binding) {
        if (!CONFIG.PAPER_WEIGHTS[paperWeight]) {
            dimensionsList.innerHTML = '<p class="text-muted">No dimensions available for this configuration</p>';
            return;
        }

        const sizes = Array.from(CONFIG.PAPER_WEIGHTS[paperWeight].dimensions)
            .sort((a, b) => {
                const [aWidth] = a.split('x').map(Number);
                const [bWidth] = b.split('x').map(Number);
                return aWidth - bWidth;
            });

        dimensionsList.innerHTML = sizes.map(size => {
            const [width, height] = size.split('x');
            return `<div class="mb-1">
                <span class="badge bg-light text-dark border">${width} × ${height}mm</span>
            </div>`;
        }).join('');
    }

    function updateValidationStatus(result) {
        validationStatus.className = 'validation-status ' + (result.isValid ? 'valid' : 'invalid');
        validationStatus.textContent = result.message;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const width = document.getElementById('width').value;
        const height = document.getElementById('height').value;
        const paperWeight = document.getElementById('paperWeight').value;
        const binding = document.getElementById('binding').value;

        const result = validateSize(width, height, paperWeight, binding);
        
        resultsDiv.style.display = 'block';
        updateValidationStatus(result);
        showAvailableSizes(paperWeight, binding);
    });

    // Clear form and results
    clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        form.reset();
        resultsDiv.style.display = 'none';
        document.getElementById('width').value = '';
        document.getElementById('height').value = '';
    });

    // Show available sizes when paper weight or binding changes
    ['paperWeight', 'binding'].forEach(id => {
        document.getElementById(id).addEventListener('change', function() {
            const paperWeight = document.getElementById('paperWeight').value;
            const binding = document.getElementById('binding').value;
            if (paperWeight && binding) {
                resultsDiv.style.display = 'block';
                showAvailableSizes(paperWeight, binding);
            }
        });
    });

    // Show initial available sizes for default values
    showAvailableSizes('80gsm', 'Limp');
});