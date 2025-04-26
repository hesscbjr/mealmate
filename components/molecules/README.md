# Molecules

This directory contains molecule components, which are combinations of atom components forming more complex UI elements.

## Components

- **Greeting**: Displays a personalized greeting message.
  - _Props_: `name` (string, optional), `style` (TextStyle, optional)
  - _Usage_: `<Greeting name="CJ" />`

## Development Guidelines

- Molecules should combine atoms to create meaningful UI units.
- They should remain relatively simple and focused on presentation.
- Avoid embedding complex logic or data fetching here.
- Import only from the `atoms` directory or other utility/type locations.
