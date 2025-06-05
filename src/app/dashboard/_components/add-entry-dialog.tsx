"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useZones } from "~/hooks/use-zones";
import { CreateEmissorSchema } from "~/server/lib/zod-schemas/emissor/createEmissor";

const receptorSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  idZonaEmissao: z.number().positive("Zona de emissão é obrigatória"),
});

type EmissorFormData = z.infer<typeof CreateEmissorSchema>;
type ReceptorFormData = z.infer<typeof receptorSchema>;

interface EmissorResponse {
  id: number;
  descricao: string;
  latitude: number;
  longitude: number;
  valorAlerta: number;
  valorEmergencia: number;
  idZonaEmissao: number;
}

interface ReceptorResponse {
  id: number;
  descricao: string;
  latitude: number;
  longitude: number;
  idZonaEmissao: number;
}

export function AddEntryDialog() {
  const [open, setOpen] = useState(false);
  const [entryType, setEntryType] = useState<"emissor" | "receptor" | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { data: zones = [], isLoading: zonesLoading } = useZones();

  const emissorForm = useForm<z.infer<typeof CreateEmissorSchema>>({
    resolver: zodResolver(CreateEmissorSchema),
    defaultValues: {
      descricao: "",
      latitude: 0,
      longitude: 0,
      valorAlerta: 0,
      valorEmergencia: 0,
      idZonaEmissao: 0,
    },
  });

  const receptorForm = useForm<ReceptorFormData>({
    resolver: zodResolver(receptorSchema),
    defaultValues: {
      descricao: "",
      latitude: 0,
      longitude: 0,
      idZonaEmissao: 0,
    },
  });

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        emissorForm.setValue("latitude", latitude);
        emissorForm.setValue("longitude", longitude);
        receptorForm.setValue("latitude", latitude);
        receptorForm.setValue("longitude", longitude);
      },
      (error) => {
        toast.error("Unable to retrieve your location");
        console.error(error);
      },
    );
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      getCurrentLocation();
    }
  };

  const createEmissor = useMutation({
    mutationFn: async (data: EmissorFormData): Promise<EmissorResponse> => {
      const response = await fetch("/api/v1/emissores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        throw new Error(error.message);
      }

      const result = (await response.json()) as EmissorResponse;
      return result;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Emissor criado com sucesso");
      void queryClient.invalidateQueries({ queryKey: ["emissores"] });
      setOpen(false);
      setEntryType(null);
      emissorForm.reset();
    },
  });

  const createReceptor = useMutation({
    mutationFn: async (data: ReceptorFormData): Promise<ReceptorResponse> => {
      const response = await fetch("/api/v1/receptores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = (await response.json()) as { message: string };
        throw new Error(error.message);
      }

      const result = (await response.json()) as ReceptorResponse;
      return result;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Receptor criado com sucesso");
      void queryClient.invalidateQueries({ queryKey: ["receptores"] });
      setOpen(false);
      setEntryType(null);
      receptorForm.reset();
    },
  });

  const handleClose = () => {
    setOpen(false);
    setEntryType(null);
    emissorForm.reset();
    receptorForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Entrada
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Entrada</DialogTitle>
          <DialogDescription>
            Escolha o tipo de entrada e preencha os dados necessários.
          </DialogDescription>
        </DialogHeader>

        {!entryType ? (
          <div className="space-y-4">
            <Label>Tipo de Entrada</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex h-20 flex-col gap-2"
                onClick={() => setEntryType("emissor")}
              >
                <div className="font-medium">Emissor</div>
                <div className="text-muted-foreground text-sm">
                  Adicionar novo emissor
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex h-20 flex-col gap-2"
                onClick={() => setEntryType("receptor")}
              >
                <div className="font-medium">Receptor</div>
                <div className="text-muted-foreground text-sm">
                  Adicionar novo receptor
                </div>
              </Button>
            </div>
          </div>
        ) : entryType === "emissor" ? (
          <Form {...emissorForm}>
            <form
              onSubmit={emissorForm.handleSubmit((data) =>
                createEmissor.mutate(data),
              )}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={emissorForm.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição do emissor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emissorForm.control}
                  name="idZonaEmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zona de Emissão</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                zonesLoading
                                  ? "Carregando..."
                                  : "Selecione a zona"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {zones.map((zone) => (
                            <SelectItem
                              key={zone.idZonaEmissao}
                              value={zone.idZonaEmissao.toString()}
                            >
                              {zone.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={emissorForm.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-23.5505"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emissorForm.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-46.6333"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={emissorForm.control}
                  name="valorAlerta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Alerta</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emissorForm.control}
                  name="valorEmergencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor Emergência</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createEmissor.isPending}>
                  {createEmissor.isPending ? "Criando..." : "Criar Emissor"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...receptorForm}>
            <form
              onSubmit={receptorForm.handleSubmit((data) =>
                createReceptor.mutate(data),
              )}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={receptorForm.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição do receptor" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={receptorForm.control}
                  name="idZonaEmissao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zona de Emissão</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                zonesLoading
                                  ? "Carregando..."
                                  : "Selecione a zona"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {zones.map((zone) => (
                            <SelectItem
                              key={zone.idZonaEmissao}
                              value={zone.idZonaEmissao.toString()}
                            >
                              {zone.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={receptorForm.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-23.5505"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={receptorForm.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-46.6333"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={createReceptor.isPending}>
                  {createReceptor.isPending ? "Criando..." : "Criar Receptor"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
