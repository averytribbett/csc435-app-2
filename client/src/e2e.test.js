import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { Home } from './pages/Home';
import userEvent from '@testing-library/user-event';

/**
 * e2e tests (note we have multiple in one)
 * 
 * Login
 * Check Home page for user name
 * Navigate to account
 * Logout
 */

// Make sure local server is also running
test("Login, View Home, Navigate to Account, Logout", async () => {
  render(<App />);

  // We should see the form elements of the Login Screen
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Or Create Account")).toBeInTheDocument();

  // Default user login
  const userInfo = {
    email: "apa@t.com",
    password: "123",
  }

  const loginBtn = screen.getByTestId("submit-login");
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");

  // Fill out the email and password inputs
  userEvent.type(emailInput, userInfo.email);
  userEvent.type(passwordInput, userInfo.password);

  // Click the login button
  fireEvent.click(loginBtn);

  // Make sure Home page loads
  await waitFor(() => {
    expect(screen.getByText("Avery Tribbett")).toBeInTheDocument();
  });

  // Make some checks on elements
  expect(screen.getByText("CSC435 - Adv Web App Dev")).toBeInTheDocument();
  expect(screen.getByTestId("account-button")).toBeInTheDocument();

  // Navigate to account page
  const accountBtn = screen.getByTestId("account-button");
  fireEvent.click(accountBtn);

  // Make sure Account page loads
  await waitFor(() => {
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });

  // Logout
  const logoutBtn = screen.getByTestId("logout-button");
  fireEvent.click(logoutBtn);

  // Now make sure we are back to the login page
  await waitFor(() => {
    expect(screen.getByTestId("submit-login")).toBeInTheDocument();
  });

  // We should see the form elements of the Login Screen
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByText("Or Create Account")).toBeInTheDocument();
});