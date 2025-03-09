import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { setupMockAuthStore, mockUseAuthStore } from "../__mocks__/useAuthStoreMock"
import RegisterForm from "../../components/RegisterForm"
import { MemoryRouter } from "react-router"


describe("RegisterForm Component", () => {
    // Reset store to default state before each test
    beforeEach(() => {
        setupMockAuthStore()
    })

  it("renders the form correctly", () => {
    render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
    )

    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument()
  })

  it("submits the form correctly and calls registerUser", async () => {
    setupMockAuthStore({
      registerUser: vi.fn().mockResolvedValueOnce(undefined), // Mock success response
    })

    render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /Register/i }))

    await waitFor(() => {
      expect(mockUseAuthStore().registerUser).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        "FARMER"
      )
    })
  })

  it("shows an error message if registration fails", async () => {
    setupMockAuthStore({
        registerUser: vi.fn().mockImplementation(async () => {
          mockUseAuthStore().error = "Registration failed"
          throw new Error("Registration failed")
        }),
      });
      

    render(
        <MemoryRouter>
            <RegisterForm />
        </MemoryRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    })
    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /Register/i }))

    await waitFor(() => {
      expect(screen.getByText(/Registration failed/i)).toBeInTheDocument()
    })
  })
})
