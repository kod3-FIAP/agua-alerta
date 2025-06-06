/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";
import { emissorService } from "./emissorService";
import { NotFoundErr } from "../lib/errors/NotFound";

vi.mock("~/server/repositories/emissorRepository", () => ({
  default: {
    findById: vi.fn(),
    findAll: vi.fn(),
    findByZonaEmissaoId: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("~/server/repositories/zonaEmissaoRepository", () => ({
  default: {
    findById: vi.fn(),
  },
}));

vi.mock("~/server/lib/zod-schemas/emissor/createEmissor", () => ({
  CreateEmissorSchema: {
    parse: vi.fn(),
  },
}));

vi.mock("~/server/lib/zod-schemas/emissor/updateEmissor", () => ({
  UpdateEmissorSchema: {
    parse: vi.fn(),
  },
}));

import emissorRepository from "~/server/repositories/emissorRepository";
import zonaEmissaoRepository from "~/server/repositories/zonaEmissaoRepository";
import { CreateEmissorSchema } from "~/server/lib/zod-schemas/emissor/createEmissor";
import { UpdateEmissorSchema } from "~/server/lib/zod-schemas/emissor/updateEmissor";

const mockEmissorRepository = vi.mocked(emissorRepository);
const mockZonaEmissaoRepository = vi.mocked(zonaEmissaoRepository);
const mockCreateSchema = vi.mocked(CreateEmissorSchema);
const mockUpdateSchema = vi.mocked(UpdateEmissorSchema);

describe("emissorService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getEmissorById", () => {
    it("deve retornar o emissor quando encontrado", async () => {
      const mockEmissor = { id: 1, descricao: "Emissor teste" };
      mockEmissorRepository.findById.mockResolvedValue(mockEmissor as any);

      const result = await emissorService.getEmissorById(1);

      expect(result).toEqual(mockEmissor);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findById).toHaveBeenCalledWith(1);
    });

    it("deve lançar NotFoundErr quando o emissor não for encontrado", async () => {
      mockEmissorRepository.findById.mockResolvedValue(null);

      await expect(emissorService.getEmissorById(999)).rejects.toThrow(
        new NotFoundErr("Emissor não foi encontrado"),
      );
    });
  });

  describe("getAllEmissores", () => {
    it("deve retornar todos os emissores", async () => {
      const mockEmissores = [
        { id: 1, descricao: "Emissor 1" },
        { id: 2, descricao: "Emissor 2" },
      ];

      mockEmissorRepository.findAll.mockResolvedValue(mockEmissores as any);

      const result = await emissorService.getAllEmissores();

      expect(result).toEqual(mockEmissores);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findAll).toHaveBeenCalledWith(undefined);
    });

    it("deve passar argumentos para o repositório quando fornecidos", async () => {
      const args = { where: { idZonaEmissao: 1 } };
      mockEmissorRepository.findAll.mockResolvedValue([]);

      await emissorService.getAllEmissores(args);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findAll).toHaveBeenCalledWith(args);
    });
  });

  describe("getEmissoresByZonaEmissaoId", () => {
    it("deve retornar emissores para uma zona específica", async () => {
      const mockEmissores = [
        { id: 1, descricao: "Emissor 1", idZonaEmissao: 1 },
      ];
      mockEmissorRepository.findByZonaEmissaoId.mockResolvedValue(
        mockEmissores as any,
      );

      const result = await emissorService.getEmissoresByZonaEmissaoId(1);

      expect(result).toEqual(mockEmissores);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findByZonaEmissaoId).toHaveBeenCalledWith(1);
    });
  });

  describe("createEmissor", () => {
    const mockInputData = {
      descricao: "Novo Emissor",
      latitude: -23.5505,
      longitude: -46.6333,
      valorAlerta: 50,
      valorEmergencia: 100,
      idZonaEmissao: 1,
    };

    it("deve criar o emissor com sucesso", async () => {
      const mockValidatedData = { ...mockInputData };
      const mockZona = { id: 1, nome: "Zona Teste" };
      const mockCreatedEmissor = { id: 1, ...mockInputData };

      mockCreateSchema.parse.mockReturnValue(mockValidatedData);
      mockZonaEmissaoRepository.findById.mockResolvedValue(mockZona as any);
      mockEmissorRepository.create.mockResolvedValue(mockCreatedEmissor as any);

      const result = await emissorService.createEmissor(mockInputData as any);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockCreateSchema.parse).toHaveBeenCalledWith(mockInputData);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockZonaEmissaoRepository.findById).toHaveBeenCalledWith(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.create).toHaveBeenCalledWith(
        mockValidatedData,
      );
      expect(result).toEqual(mockCreatedEmissor);
    });

    it("deve lançar erro quando a zona não for encontrada", async () => {
      const mockValidatedData = { ...mockInputData };
      mockCreateSchema.parse.mockReturnValue(mockValidatedData);
      mockZonaEmissaoRepository.findById.mockResolvedValue(null);

      await expect(
        emissorService.createEmissor(mockInputData as any),
      ).rejects.toThrow(
        new NotFoundErr("Zona de Emissão não foi encontrada para o emissor."),
      );
    });

    it("deve propagar erros de validação", async () => {
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

      mockCreateSchema.parse.mockImplementation(() => {
        throw zodError;
      });

      await expect(
        emissorService.createEmissor(mockInputData as any),
      ).rejects.toThrow(zodError);
    });
  });

  describe("updateEmissor", () => {
    const mockUpdateData = { descricao: "Emissor Atualizado" };

    it("deve atualizar o emissor com sucesso", async () => {
      const mockValidatedData = { ...mockUpdateData };
      const mockExistingEmissor = { id: 1, descricao: "Emissor Antigo" };
      const mockUpdatedEmissor = { id: 1, descricao: "Emissor Atualizado" };

      mockUpdateSchema.parse.mockReturnValue(mockValidatedData);
      mockEmissorRepository.findById.mockResolvedValue(
        mockExistingEmissor as any,
      );
      mockEmissorRepository.update.mockResolvedValue(mockUpdatedEmissor as any);

      const result = await emissorService.updateEmissor(
        1,
        mockUpdateData as any,
      );

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockUpdateSchema.parse).toHaveBeenCalledWith(mockUpdateData);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findById).toHaveBeenCalledWith(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.update).toHaveBeenCalledWith(
        1,
        mockValidatedData,
      );
      expect(result).toEqual(mockUpdatedEmissor);
    });

    it("deve lançar erro quando o emissor não for encontrado", async () => {
      const mockValidatedData = { ...mockUpdateData };
      mockUpdateSchema.parse.mockReturnValue(mockValidatedData);
      mockEmissorRepository.findById.mockResolvedValue(null);

      await expect(
        emissorService.updateEmissor(999, mockUpdateData as any),
      ).rejects.toThrow("Emissor não foi encontrada");
    });
  });

  describe("deleteEmissor", () => {
    it("should delete emissor successfully", async () => {
      const mockEmissor = { id: 1, descricao: "Emissor to delete" };
      mockEmissorRepository.findById.mockResolvedValue(mockEmissor as any);
      mockEmissorRepository.delete.mockResolvedValue(mockEmissor as any);

      const result = await emissorService.deleteEmissor(1);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.findById).toHaveBeenCalledWith(1);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockEmissorRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockEmissor);
    });

    it("should throw NotFoundErr when emissor not found", async () => {
      mockEmissorRepository.findById.mockResolvedValue(null);

      await expect(emissorService.deleteEmissor(999)).rejects.toThrow(
        new NotFoundErr("Emissor não foi encontrado"),
      );
    });
  });
});
