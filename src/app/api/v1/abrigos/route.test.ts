import { describe, it, expect, vi, beforeEach } from "vitest";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import z from "zod";
import { GET, POST } from "./route";

vi.mock("~/app/api/_utils/withAuth");

vi.mock("~/server/services/abrigoService", () => ({
  abrigoService: {
    getAllAbrigos: vi.fn(),
    createAbrigo: vi.fn(),
  },
}));

import { abrigoService } from "~/server/services/abrigoService";
import type { AbrigoSelect } from "~/server/lib/types/types";

const mockAbrigoService = vi.mocked(abrigoService);

// Type definition that matches the actual Abrigo model
interface TestAbrigo {
  idAbrigo: number;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  idZonaEmissao: number;
}

describe("/api/v1/abrigos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET", () => {
    it("should return all abrigos successfully", async () => {
      const mockAbrigos: TestAbrigo[] = [
        {
          idAbrigo: 1,
          nome: "Abrigo Test 1",
          descricao: "Test description",
          latitude: -23.5505,
          longitude: -46.6333,
          idZonaEmissao: 1,
        },
        {
          idAbrigo: 2,
          nome: "Abrigo Test 2",
          descricao: "Test description 2",
          latitude: -23.5506,
          longitude: -46.6334,
          idZonaEmissao: 1,
        },
      ];

      mockAbrigoService.getAllAbrigos.mockResolvedValue(
        mockAbrigos as unknown as AbrigoSelect[],
      );

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos");
      const response = await GET(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(200);
      expect(result).toEqual(mockAbrigos);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockAbrigoService.getAllAbrigos).toHaveBeenCalled();
    });

    it("should handle service errors", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      mockAbrigoService.getAllAbrigos.mockRejectedValue(
        new Error("Database connection failed"),
      );

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos");
      const response = await GET(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(500);
      expect(result).toEqual({ message: "Erro interno ao buscar abrigos." });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch abrigos:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("POST", () => {
    it("should create a new abrigo successfully", async () => {
      const mockInput = {
        nome: "New Abrigo",
        descricao: "New description",
        latitude: -23.5505,
        longitude: -46.6333,
        idZonaEmissao: 1,
      };

      const mockCreatedAbrigo: TestAbrigo = {
        idAbrigo: 3,
        ...mockInput,
      };

      mockAbrigoService.createAbrigo.mockResolvedValue(
        mockCreatedAbrigo as unknown as AbrigoSelect,
      );

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: JSON.stringify(mockInput),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(201);
      expect(result).toEqual(mockCreatedAbrigo);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockAbrigoService.createAbrigo).toHaveBeenCalled();
    });

    it("should handle Zod validation errors", async () => {
      const zodError = new z.ZodError([
        {
          code: "too_small",
          minimum: 1,
          type: "string",
          inclusive: true,
          exact: false,
          message: "Nome is required",
          path: ["nome"],
        },
      ]);

      mockAbrigoService.createAbrigo.mockRejectedValue(zodError);

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: JSON.stringify({ nome: "", idZonaEmissao: 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(400);
      expect(result).toEqual({
        message: "Dados inválidos.",
        errors: zodError.errors,
      });
    });

    it("should handle Prisma duplicate entry errors", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Unique constraint failed",
        {
          code: "P2002",
          clientVersion: "5.0.0",
        },
      );

      mockAbrigoService.createAbrigo.mockRejectedValue(prismaError);

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: JSON.stringify({
          nome: "Duplicate Abrigo",
          idZonaEmissao: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(409);
      expect(result).toEqual({
        message: "Já existe uma abrigo com este nome.",
      });
    });

    it("should handle general service errors", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      mockAbrigoService.createAbrigo.mockRejectedValue(
        new Error("Service unavailable"),
      );

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: JSON.stringify({
          nome: "Test Abrigo",
          idZonaEmissao: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(500);
      expect(result).toEqual({
        message: "Erro interno no servidor ao criar abrigo.",
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao criar abrigo:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });

    it("should handle malformed JSON in request body", async () => {
      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: "invalid json",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(500);
    });

    it("should handle Prisma errors other than P2002", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Foreign key constraint failed",
        {
          code: "P2003",
          clientVersion: "5.0.0",
        },
      );

      mockAbrigoService.createAbrigo.mockRejectedValue(prismaError);

      const request = new NextRequest("http://localhost:3000/api/v1/abrigos", {
        method: "POST",
        body: JSON.stringify({
          nome: "Test Abrigo",
          idZonaEmissao: 999,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await POST(request);
      const result = (await response.json()) as unknown;

      expect(response.status).toBe(500);
      expect(result).toEqual({
        message: "Erro interno no servidor ao criar abrigo.",
      });

      consoleErrorSpy.mockRestore();
    });
  });
});
