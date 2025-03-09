import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { setupMockOrderStore } from "../__mocks__/useOrderStoreMock";
import MyOrdersNav from "../../components/MyOrdersNav";
import { MemoryRouter } from "react-router";

describe("MyOrdersNav Component", () => {
    beforeEach(() => {
        setupMockOrderStore(); 
    });

    it("renders correctly", () => {
        render(
            <MemoryRouter>
                <MyOrdersNav />
            </MemoryRouter>
        );

        expect(screen.getByText(/Order History/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Place Order/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /My cart 0/i })).toBeInTheDocument();
    });

});
