# Trim Size Validator Configuration Guide

This guide explains how to update the trim size validator for new paper weights, binding types, and size combinations.

## File Structure

The main configuration is stored in `js/config.js`. This is the primary file you'll need to modify for most updates.

## Adding New Paper Weights

To add a new paper weight:

1. Open `js/config.js`
2. Locate the `PAPER_WEIGHTS` object
3. Add a new entry following this format:

```javascript
'paper-weight-name': {
    dimensions: new Set([
        'widthxheight',
        // Add all valid dimensions
    ]),
    colors: new Set(['color-codes']),
    bindings: new Set(['binding-types'])
}
```

Example:
```javascript
'100gsm': {
    dimensions: new Set([
        '156x234', '174x246', '178x254'
    ]),
    colors: new Set(['1']),
    bindings: new Set(['Cased', 'Limp'])
}
```

## Adding New Dimensions

To add new dimensions for an existing paper weight:

1. Open `js/config.js`
2. Find the relevant paper weight in the `PAPER_WEIGHTS` object
3. Add new dimensions to the `dimensions` Set:

```javascript
dimensions: new Set([
    // Existing dimensions
    '156x234',
    '174x246',
    // Add new dimensions here
    '180x250'
])
```

## Adding New Binding Types

To add new binding types:

1. Update the `BINDING_MAP` in `config.js`:
```javascript
BINDING_MAP: {
    'NewBinding': 'NewBindingAlias',
    'NewBindingAlias': 'NewBinding'
}
```

2. Add the binding type to the relevant paper weights:
```javascript
bindings: new Set(['Cased', 'Limp', 'NewBindingAlias'])
```

3. Update the HTML options in `index.html`:
```html
<select class="form-select" id="binding" required>
    <option value="Limp" selected>Limp</option>
    <option value="Cased">Cased</option>
    <option value="NewBindingAlias">New Binding</option>
</select>
```

## Adding New Color Codes

To add new color options:

1. Open `js/config.js`
2. Locate the relevant paper weight
3. Add new colors to the `colors` Set:
```javascript
colors: new Set(['1', '4', 'NewColor'])
```

## Example: Complete Addition

Here's an example of adding a new paper weight with specific combinations:

```javascript
const CONFIG = {
    BINDING_MAP: {
        'Hardback': 'Cased',
        'Paperback': 'Limp',
        'Cased': 'Hardback',
        'Limp': 'Paperback',
        'Special': 'SpecialBinding',  // New binding type
        'SpecialBinding': 'Special'
    },
    PAPER_WEIGHTS: {
        // Existing paper weights...
        
        // New paper weight
        '120gsm': {
            dimensions: new Set([
                '156x234',
                '174x246',
                '178x254'
            ]),
            colors: new Set(['1', '4', 'Special']),
            bindings: new Set(['Cased', 'Limp', 'SpecialBinding'])
        }
    }
};
```

## UI Updates

After updating `config.js`, you may need to update the UI selections in `index.html`:

1. Add new paper weight options:
```html
<select class="form-select" id="paperWeight" required>
    <option value="80gsm" selected>80gsm</option>
    <option value="90gsm">90gsm</option>
    <option value="120gsm">120gsm</option>  <!-- New option -->
</select>
```

## Best Practices

1. Always maintain alphabetical order for dimensions for better readability
2. Keep consistent naming conventions for binding types and paper weights
3. Test new combinations thoroughly after adding them
4. Back up the config file before making major changes
5. Comment any special cases or considerations in the config file

## Testing Changes

After making any updates:
1. Test the validator with the new combinations
2. Verify that existing combinations still work
3. Check that validation messages display correctly
4. Ensure the available sizes list updates properly