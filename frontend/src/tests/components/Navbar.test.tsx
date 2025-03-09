import { render, screen } from "@testing-library/react"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { setupMockAuthStore } from "../__mocks__/useAuthStoreMock"
import { setupMockOrderStore} from "../__mocks__/useOrderStoreMock"
import Navbar from "../../components/Navbar"
import { MemoryRouter } from "react-router"
import { useNavigate } from "react-router"

vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});


describe("Navbar Component", () => {
    const mockNavigate = vi.fn()
    
    beforeEach(() => {
        setupMockAuthStore()
        setupMockOrderStore()
        vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    })

    it("renders correctly for unauthenticated users", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        expect(screen.getByText(/Agro Store/i)).toBeInTheDocument()
        expect(screen.queryByText(/Welcome/i)).toBeInTheDocument()
        expect(screen.queryByRole("button", { name: /Logout/i })).not.toBeInTheDocument()
    })

    it("renders correctly for authenticated users", () => {
        setupMockAuthStore({
            user: { id: '1', email: "test@example.com", role: 'FARMER' },
            isAuthenticated: true,
        })

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        expect(screen.getByText(/Welcome test@example.com/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument()
    })

   
})
