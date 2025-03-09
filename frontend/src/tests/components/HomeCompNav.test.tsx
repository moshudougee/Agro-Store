import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { setupMockOrderStore } from "../__mocks__/useOrderStoreMock";
import HomeCompNav from "../../components/HomeCompNav";
import { MemoryRouter } from "react-router";

describe("HomeCompNav Component", () => {
    beforeEach(() => {
        setupMockOrderStore(); 
    });

    it("renders correctly", () => {
        render(
            <MemoryRouter>
                <HomeCompNav />
            </MemoryRouter>
        );

        expect(screen.getByText(/Place Order/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Add/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /My cart 0/i })).toBeInTheDocument();
    });
});
