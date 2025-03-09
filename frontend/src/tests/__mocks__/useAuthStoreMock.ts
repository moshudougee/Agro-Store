import { vi } from "vitest";
import { AuthState } from "../../store/auth";

// Create a mock function for useAuthStore
export const mockUseAuthStore = vi.fn();

vi.mock("../../store/auth", () => ({
  useAuthStore: mockUseAuthStore,
}));

// Setup function to configure the mock store for tests
export const setupMockAuthStore = (overrides?: Partial<AuthState>) => {
  // Default mock state
  const defaultState: AuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    registerUser: vi.fn(),
    clearError: vi.fn(),
    logout: vi.fn(),
    login: vi.fn(),
    ...overrides, // Allows overriding specific values per test
  };

  // Mock Zustand's useAuthStore to return the default state
  mockUseAuthStore.mockReturnValue(defaultState);
};
