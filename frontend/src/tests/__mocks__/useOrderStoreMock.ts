import { vi } from "vitest";
import { OrderState } from "../../store/orderCart";

let mockState: OrderState = {
    orderUnits: [],
    totalAmt: 0,
    count: 0,
    addOrderUnit: vi.fn(),
    removeOrderUnit: vi.fn(),
    clearOrder: vi.fn(),
};

export const mockUseOrderStore = vi.fn(() => mockState);

vi.mock("../../store/orderCart", () => ({
    useOrderStore: mockUseOrderStore,
}));

export const setupMockOrderStore = (overrides?: Partial<OrderState>) => {
    mockState = { ...mockState, ...overrides }; // Merge new state
    mockUseOrderStore.mockReturnValue(mockState);
};
