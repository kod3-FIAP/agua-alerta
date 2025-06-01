import { vi } from "vitest";

export const withAuth = vi.fn((handler: unknown) => handler);
