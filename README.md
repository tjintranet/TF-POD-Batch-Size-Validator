# T&F Product Specification Validator

Web-based tool for validating XML product specifications according to T&F standards.

## Features

- Drag-and-drop file upload
- Real-time validation feedback
- Progress indicators
- Error handling
- File size limit (5MB)
- Supports XML validation for:
  - Paper weight compatibility
  - Binding types
  - Dimensions
  - Color specifications

## Project Structure

```
├── app.js          # Main application logic
├── config.js       # Validation rules configuration
├── index.html      # Main interface
├── styles.css      # Styling
└── validator.js    # Core validation logic
```

## Modifying Validation Rules

### Paper Weight Rules
Edit `config.js` - `PAPER_WEIGHTS` object:
```javascript
'80gsm/50lb': {
    dimensions: new Set(['123x186', '127x203'...]),
    colors: new Set(['1']),
    bindings: new Set(['Cased', 'Limp'])
}
```

### Binding Type Mappings
Edit `config.js` - `BINDING_MAP` object:
```javascript
BINDING_MAP: {
    'Hardback': 'Cased',
    'Paperback': 'Limp'
}
```

### Adding New Validation Rules

1. Add new validation function in `validator.js`:
```javascript
validateNewRule(context) {
    return this.addResult(
        context.results,
        'Rule Name',
        condition,
        message
    );
}
```

2. Register in `validationSteps` array:
```javascript
constructor() {
    this.validationSteps = [
        this.validateRequiredFields,
        this.validateNewRule  // Add new validation
    ];
}
```

### XML Structure Requirements

Required XML fields:
```xml
<version_type>binding_type</version_type>
<format>
    <width>dimension</width>
    <height>dimension</height>
</format>
<parts>
    <text>
        <grammage>paper_weight</grammage>
        <colour>color_spec</colour>
    </text>
</parts>
```

## Error Handling

Error types handled:
- Invalid XML format
- Missing required fields
- File size exceeds limit
- Invalid file type
- File reading errors
- Validation rule failures

## Browser Support

Requires modern browsers with support for:
- FileReader API
- DOMParser
- ES6+ JavaScript features