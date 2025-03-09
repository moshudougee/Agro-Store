import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setupMockAuthStore } from "../__mocks__/useAuthStoreMock";
import EditDetails from "../../components/EditDetails";
import { MemoryRouter } from "react-router";

const mockDetails: FarmerDetails = {
    id: "123",
    farmerID: "farm123",
    name: "John Doe",
    phone: "1234567890",
    address: "123 Farm Lane",
    city: "Agro City"
};

describe("EditDetails Component", () => {
    beforeEach(() => {
        setupMockAuthStore({
            user: { id: "user123", email: 'test@email.com', role: 'FARMER' }
        });
    });

    it("renders the form correctly", () => {
        render(
            <MemoryRouter>
                <EditDetails details={mockDetails} />
            </MemoryRouter>
        );

        expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    });

    it("shows an error message if form submission fails", async () => {
        vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Submission failed"));
        render(
            <MemoryRouter>
                <EditDetails details={mockDetails} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /Save/i }));

        await waitFor(() => {
            expect(screen.getByText(/An error occurred while submitting the form/i)).toBeInTheDocument();
        });
    });
});
