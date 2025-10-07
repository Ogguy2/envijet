import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlightRequestForm from '../FlightRequestForm';

// Mock the child components that have complex dependencies
jest.mock('../dialogs/DialogAirport', () => {
  return function MockDialogAirport({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-dialog-airport">{children}</div>;
  };
});

jest.mock('../dialogs/DialogPassengers', () => {
  return function MockDialogPassenger({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-dialog-passenger">{children}</div>;
  };
});

jest.mock('../dialogs/DialogDate', () => {
  return function MockDialogDate({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-dialog-date">{children}</div>;
  };
});

jest.mock('../FlyOptions', () => {
  return function MockFlightOptions({
    options,
    handleActivateOption,
    optionSelected,
  }: {
    options: any[];
    handleActivateOption: (option: any) => void;
    optionSelected: any;
  }) {
    return (
      <div data-testid="flight-options">
        {options.map((option) => (
          <button
            key={option.value}
            data-testid={`option-${option.value}`}
            onClick={() => handleActivateOption(option)}
            className={optionSelected.value === option.value ? 'active' : ''}
          >
            {option.name}
          </button>
        ))}
      </div>
    );
  };
});

describe('FlightRequestForm', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render the component successfully', () => {
      render(<FlightRequestForm />);
      
      // Check if the form container is rendered
      const formContainer = screen.getByTestId('flight-options');
      expect(formContainer).toBeInTheDocument();
    });

    it('should render flight options with three choices', () => {
      render(<FlightRequestForm />);
      
      // Check for all three flight option buttons
      expect(screen.getByTestId('option-One-way')).toBeInTheDocument();
      expect(screen.getByTestId('option-Round-trip')).toBeInTheDocument();
      expect(screen.getByTestId('option-Multi-destination')).toBeInTheDocument();
    });

    it('should have "One-way" selected by default', () => {
      render(<FlightRequestForm />);
      
      const oneWayButton = screen.getByTestId('option-One-way');
      expect(oneWayButton).toHaveClass('active');
    });
  });

  describe('Flight Option Switching', () => {
    it('should switch to Round-trip when the option is clicked', () => {
      render(<FlightRequestForm />);
      
      const roundTripButton = screen.getByTestId('option-Round-trip');
      fireEvent.click(roundTripButton);
      
      // Check if Round-trip form is displayed
      expect(screen.getByText('Return date')).toBeInTheDocument();
    });

    it('should switch to Multi-destination when the option is clicked', () => {
      render(<FlightRequestForm />);
      
      const multiDestButton = screen.getByTestId('option-Multi-destination');
      fireEvent.click(multiDestButton);
      
      // Check if Multi-destination form is displayed
      expect(screen.getByText('Add a flight')).toBeInTheDocument();
    });

    it('should switch back to One-way from another option', () => {
      render(<FlightRequestForm />);
      
      // Switch to Round-trip
      const roundTripButton = screen.getByTestId('option-Round-trip');
      fireEvent.click(roundTripButton);
      
      // Switch back to One-way
      const oneWayButton = screen.getByTestId('option-One-way');
      fireEvent.click(oneWayButton);
      
      // Check that Return date is no longer present (specific to Round-trip)
      expect(screen.queryByText('Return date')).not.toBeInTheDocument();
      // But Book button should still be present
      expect(screen.getByText('Book')).toBeInTheDocument();
    });
  });

  describe('OneWayFormRequest', () => {
    it('should render all required fields for one-way flight', () => {
      render(<FlightRequestForm />);
      
      // Check for required labels
      expect(screen.getByText('Departure airport')).toBeInTheDocument();
      expect(screen.getByText('Arrival airport')).toBeInTheDocument();
      expect(screen.getByText('Departure date')).toBeInTheDocument();
      expect(screen.getByText('Number of passengers')).toBeInTheDocument();
    });

    it('should render the Book button', () => {
      render(<FlightRequestForm />);
      
      const bookButton = screen.getByText('Book');
      expect(bookButton).toBeInTheDocument();
    });

    it('should have input fields with correct placeholders', () => {
      render(<FlightRequestForm />);
      
      expect(screen.getByPlaceholderText('Rechercher un aéroport...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search for an airport...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Departure date...')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Passenger...')).toBeInTheDocument();
    });
  });

  describe('RoundTripFormRequest', () => {
    beforeEach(() => {
      render(<FlightRequestForm />);
      const roundTripButton = screen.getByTestId('option-Round-trip');
      fireEvent.click(roundTripButton);
    });

    it('should render all required fields for round-trip flight', () => {
      expect(screen.getByText('Departure airport')).toBeInTheDocument();
      expect(screen.getByText('Arrival airport')).toBeInTheDocument();
      expect(screen.getByText('Departure date')).toBeInTheDocument();
      expect(screen.getByText('Return date')).toBeInTheDocument();
      expect(screen.getByText('Number of passengers')).toBeInTheDocument();
    });

    it('should render the Book button', () => {
      const bookButton = screen.getByText('Book');
      expect(bookButton).toBeInTheDocument();
    });

    it('should have return date field', () => {
      expect(screen.getByPlaceholderText('Return date...')).toBeInTheDocument();
    });
  });

  describe('MultiLegFormRequest', () => {
    beforeEach(() => {
      render(<FlightRequestForm />);
      const multiDestButton = screen.getByTestId('option-Multi-destination');
      fireEvent.click(multiDestButton);
    });

    it('should render initial flight segment', () => {
      expect(screen.getByText('Departure airport')).toBeInTheDocument();
      expect(screen.getByText('Arrival airport')).toBeInTheDocument();
      expect(screen.getByText('Departure date')).toBeInTheDocument();
    });

    it('should render "Add a flight" button', () => {
      const addFlightButton = screen.getByText('Add a flight');
      expect(addFlightButton).toBeInTheDocument();
    });

    it('should render number of passengers field', () => {
      expect(screen.getByText('Number of passengers')).toBeInTheDocument();
    });

    it('should render the Book button', () => {
      const bookButton = screen.getByText('Book');
      expect(bookButton).toBeInTheDocument();
    });

    it('should add a new flight segment when "Add a flight" is clicked', () => {
      const addFlightButton = screen.getByText('Add a flight');
      
      // Get initial count of departure airport labels
      const initialDepartureLabels = screen.getAllByText('Departure airport');
      const initialCount = initialDepartureLabels.length;
      
      // Click add flight button
      fireEvent.click(addFlightButton);
      
      // Check that a new segment was added
      const updatedDepartureLabels = screen.getAllByText('Departure airport');
      expect(updatedDepartureLabels.length).toBe(initialCount + 1);
    });
  });

  describe('Form Validation Messages', () => {
    it('should not show validation errors initially', () => {
      render(<FlightRequestForm />);
      
      expect(screen.queryByText(/The start and finish cannot be the same airport/)).not.toBeInTheDocument();
      expect(screen.queryByText(/The departure date cannot be before/)).not.toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should have the correct id for anchor navigation', () => {
      const { container } = render(<FlightRequestForm />);
      
      const formElement = container.querySelector('#request-form');
      expect(formElement).toBeInTheDocument();
    });

    it('should render within a bordered container', () => {
      const { container } = render(<FlightRequestForm />);
      
      const borderedContainer = container.querySelector('.border.border-black\\/15');
      expect(borderedContainer).toBeInTheDocument();
    });
  });

  describe('Passenger Number Input', () => {
    it('should display default passenger number as 1', () => {
      render(<FlightRequestForm />);
      
      const passengerInput = screen.getByPlaceholderText('Passenger...') as HTMLInputElement;
      expect(passengerInput.value).toBe('1');
    });
  });

  describe('Book Button Interaction', () => {
    it('should be clickable in One-way form', () => {
      render(<FlightRequestForm />);
      
      const bookButton = screen.getByText('Book');
      fireEvent.click(bookButton);
      
      // Button should still be present after click
      expect(bookButton).toBeInTheDocument();
    });

    it('should be clickable in Round-trip form', () => {
      render(<FlightRequestForm />);
      
      const roundTripButton = screen.getByTestId('option-Round-trip');
      fireEvent.click(roundTripButton);
      
      const bookButton = screen.getByText('Book');
      fireEvent.click(bookButton);
      
      expect(bookButton).toBeInTheDocument();
    });

    it('should be clickable in Multi-destination form', () => {
      render(<FlightRequestForm />);
      
      const multiDestButton = screen.getByTestId('option-Multi-destination');
      fireEvent.click(multiDestButton);
      
      const bookButton = screen.getByText('Book');
      fireEvent.click(bookButton);
      
      expect(bookButton).toBeInTheDocument();
    });
  });
});
