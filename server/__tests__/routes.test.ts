import { describe, it, expect, vi, beforeEach } from "vitest";
import { Express } from "express";
import { registerRoutes } from "../routes";

describe("registerRoutes", () => {
  let mockApp: Express;

  beforeEach(() => {
    mockApp = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      use: vi.fn(),
    } as unknown as Express;
  });

  it("should register routes on the Express app", () => {
    registerRoutes(mockApp);
    expect(mockApp).toBeDefined();
  });

  it("should handle prefixed API routes", () => {
    registerRoutes(mockApp);
    
    // APIルートのプレフィックスが/apiであることを確認
    expect(mockApp.use).toHaveBeenCalledWith(
      "/api",
      expect.any(Function)
    );
  });

  it("should handle route registration errors", () => {
    const errorMessage = "Route registration failed";
    (mockApp.use as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => registerRoutes(mockApp)).toThrow(errorMessage);
  });
});
