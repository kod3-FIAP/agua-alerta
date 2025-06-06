/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import z from "zod";
import { GET, POST } from "./route";
import { NotFoundErr } from "~/server/lib/errors/NotFound";

vi.mock("~/app/api/_utils/withAuth");
vi.mock("~/server/services/emissorService", () => ({
  emissorService: {
    getAllEmissores: vi.fn(),
    createEmissor: vi.fn(),
  },
}));

import { emissorService } from "~/server/services/emissorService";

const mockEmissorService = vi.mocked(emissorService);

describe("/api/v1/emissores", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET", () => {
    it("deve retornar todos os emissores com sucesso", async () => {
      const mockEmissores = [
        {
          id: 1,
          descricao: "Emissor Teste 1",
          latitude: -23.5505,
          longitude: -46.6333,
          valorAlerta: 50,
          valorEmergencia: 100,
          idZonaEmissao: 1,
        },
        {
          id: 2,
          descricao: "Emissor Teste 2",
          latitude: -23.5506,
          longitude: -46.6334,
          valorAlerta: 60,
          valorEmergencia: 120,
          idZonaEmissao: 2,
        },
      ];

      mockEmissorService.getAllEmissores.mockResolvedValue(
        mockEmissores as any,
      );

      const request = new NextRequest("http://localhost:3000/api/v1/emissores");
      const response = await GET(request);

      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result).toEqual(mockEmissores);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorService.getAllEmissores).toHaveBeenCalled();
    });

    it("deve lidar com erros do serviço", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      mockEmissorService.getAllEmissores.mockRejectedValue(
        new Error("Falha na conexão com o banco de dados"),
      );

      const request = new NextRequest("http://localhost:3000/api/v1/emissores");
      const response = await GET(request);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result).toEqual({ message: "Erro interno ao buscar emissores." });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Failed to fetch emissores:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("POST", () => {
    it("deve criar um novo emissor com sucesso", async () => {
      const mockInput = {
        descricao: "Novo Emissor",
        latitude: -23.5505,
        longitude: -46.6333,
        valorAlerta: 50,
        valorEmergencia: 100,
        idZonaEmissao: 1,
      };

      const now = new Date();
      const mockCreatedEmissor = {
        id: 3,
        ...mockInput,
        createdAt: now,
        updatedAt: now,
      };

      const expectedResponse = {
        id: 3,
        ...mockInput,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      mockEmissorService.createEmissor.mockResolvedValue(
        mockCreatedEmissor as any,
      );

      const request = new NextRequest(
        "http://localhost:3000/api/v1/emissores",
        {
          method: "POST",
          body: JSON.stringify(mockInput),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(201);
      expect(result).toEqual(expectedResponse);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorService.createEmissor).toHaveBeenCalledWith(mockInput);
    });

    it("deve lidar com erros de validação do Zod", async () => {
      const zodError = new z.ZodError([
        {
          code: "too_small",
          minimum: 1,
          type: "string",
          inclusive: true,
          exact: false,
          message: "Descrição é obrigatória",
          path: ["descricao"],
        },
      ]);

      mockEmissorService.createEmissor.mockRejectedValue(zodError);

      const request = new NextRequest(
        "http://localhost:3000/api/v1/emissores",
        {
          method: "POST",
          body: JSON.stringify({ descricao: "", idZonaEmissao: 1 }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result).toEqual({
        message: "Dados inválidos.",
        errors: zodError.errors,
      });
    });

    it("deve lidar com NotFoundErr quando zona não é encontrada", async () => {
      const notFoundError = new NotFoundErr("Zona de emissão não encontrada");

      mockEmissorService.createEmissor.mockRejectedValue(notFoundError);

      const request = new NextRequest(
        "http://localhost:3000/api/v1/emissores",
        {
          method: "POST",
          body: JSON.stringify({
            descricao: "Emissor Teste",
            idZonaEmissao: 999,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(404);
      expect(result).toEqual({
        message: "Zona de emissão não encontrada",
      });
    });

    it("deve lidar com erros de entrada duplicada do Prisma", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        "Restrição única falhou",
        {
          code: "P2002",
          clientVersion: "5.0.0",
        },
      );

      mockEmissorService.createEmissor.mockRejectedValue(prismaError);

      const request = new NextRequest(
        "http://localhost:3000/api/v1/emissores",
        {
          method: "POST",
          body: JSON.stringify({
            descricao: "Emissor Duplicado",
            idZonaEmissao: 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(409);
      expect(result).toEqual({
        message: "Já existe um emissor relacionado a essa zona de emissão.",
      });
    });

    it("deve lidar com erros gerais do serviço", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);

      mockEmissorService.createEmissor.mockRejectedValue(
        new Error("Serviço indisponível"),
      );

      const request = new NextRequest(
        "http://localhost:3000/api/v1/emissores",
        {
          method: "POST",
          body: JSON.stringify({
            descricao: "Emissor Teste",
            idZonaEmissao: 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const response = await POST(request);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result).toEqual({
        message: "Erro interno no servidor ao criar emissor.",
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao criar emissor:",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
