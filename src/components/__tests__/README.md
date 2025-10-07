# Component Tests

This directory contains tests for the React components in this project.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Test Structure

### FlightRequestForm.test.tsx

Comprehensive test suite for the `FlightRequestForm` component covering:

- **Component Rendering**: Verifies the component renders correctly with all options
- **Flight Option Switching**: Tests switching between One-way, Round-trip, and Multi-destination
- **OneWayFormRequest**: Tests for one-way flight form functionality
- **RoundTripFormRequest**: Tests for round-trip flight form with return date
- **MultiLegFormRequest**: Tests for multi-destination flights with dynamic segments
- **Form Validation Messages**: Tests validation error display
- **Component Structure**: Tests for proper DOM structure and IDs
- **Passenger Number Input**: Tests passenger number handling
- **Book Button Interaction**: Tests booking button functionality across all flight types

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions

## Mock Strategy

Complex child components (DialogAirport, DialogPassengers, DialogDate, FlyOptions) are mocked to isolate the FlightRequestForm component logic and ensure fast, reliable tests.
