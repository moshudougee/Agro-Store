import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { setupMockAuthStore, mockUseAuthStore } from "../__mocks__/useAuthStoreMock"
import LoginForm from "../../components/LoginForm"
import { MemoryRouter } from "react-router"

describe("LoginForm Component", () => {
    // Reset store to default state before each test
    beforeEach(() => {
        setupMockAuthStore()
    })

    it("renders the form correctly", () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        )

        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument()
    })

    it("submits the form correctly and calls login", async () => {
        setupMockAuthStore({
            login: vi.fn().mockResolvedValueOnce(undefined),
        })

        render(
            <MemoryRouter>
                <LoginForm />
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

        fireEvent.click(screen.getByRole("button", { name: /Login/i }))

        await waitFor(() => {
            expect(mockUseAuthStore().login).toHaveBeenCalledWith("test@example.com", "password123")
        })
    })

    it("shows an error message if login fails", async () => {
        setupMockAuthStore({
            login: vi.fn().mockImplementation(async () => {
                mockUseAuthStore().error = "Login failed"
                throw new Error("Login failed")
            }),
        })

        render(
            <MemoryRouter>
                <LoginForm />
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

        fireEvent.click(screen.getByRole("button", { name: /Login/i }))

        await waitFor(() => {
            expect(screen.getByText(/Login failed/i)).toBeInTheDocument()
        })
    })
})
