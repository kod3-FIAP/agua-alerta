"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const emissorSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  valorAlerta: z.number().positive("Valor de alerta deve ser positivo"),
  valorEmergencia: z.number().positive("Valor de emergência deve ser positivo"),
  idZonaEmissao: z.number().positive("Zona de emissão é obrigatória"),
});

const receptorSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  idZonaEmissao: z.number().positive("Zona de emissão é obrigatória"),
});

type EmissorFormData = z.infer<typeof emissorSchema>;
type ReceptorFormData = z.infer<typeof receptorSchema>;

export function AddEntryDialog() {
  const [open, setOpen] = useState(false);
  const [entryType, setEntryType] = useState<"emissor" | "receptor" | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const { data: zones = [], isLoading: zonesLoading } = useZones();

  const emissorForm = useForm<EmissorFormData>({
    resolver: zodResolver(emissorSchema),
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

  const onSubmitEmissor = async (data: EmissorFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/emissores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setOpen(false);
        setEntryType(null);
        emissorForm.reset();
        window.location.reload();
      } else {
        const error = await response.json();
        console.error("Failed to create emissor:", error);
      }
    } catch (error) {
      console.error("Error creating emissor:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitReceptor = async (data: ReceptorFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/receptores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setOpen(false);
        setEntryType(null);
        receptorForm.reset();
        window.location.reload();
      } else {
        const error = (await response.json()) as { message: string };
        console.error("Failed to create receptor:", error);
      }
    } catch (error) {
      console.error("Error creating receptor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEntryType(null);
    emissorForm.reset();
    receptorForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              onSubmit={emissorForm.handleSubmit(onSubmitEmissor)}
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
                          <SelectTrigger>
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
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando..." : "Criar Emissor"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...receptorForm}>
            <form
              onSubmit={receptorForm.handleSubmit(onSubmitReceptor)}
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
                          <SelectTrigger>
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
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando..." : "Criar Receptor"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
