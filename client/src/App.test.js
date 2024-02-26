import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/**
 * Main Front End Tests
 * 
 * Tests Include
 * Rendering App and expecting Login to show up
 * Rendering App and then toggle to sign up
 * 
 */

test('Renders Login Screen', () => {
  render(<App />);

  // We should see the form elements of the Login Screen
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Or Create Account")).toBeInTheDocument();
});

test("Render Login Screen - then toggle to Sign Up", () => {
  render(<App />);

  // Extract the toggle to create account button
  const toggleButton = screen.getByText("Or Create Account"); 

  // Click the button
  fireEvent.click(toggleButton);

  // Now the form elements should change
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByText("Or Log In")).toBeInTheDocument();
});

// Note we cant test any further pages unless we are using an e2e test (front end and api need to be running)
