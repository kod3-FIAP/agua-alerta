import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Limpar dados existentes
  await prisma.receptor.deleteMany({});
  await prisma.emissor.deleteMany({});
  await prisma.abrigo.deleteMany({});
  await prisma.zonaEmissao.deleteMany({});

  // Criar Zonas de Emissão
  const zonasEmissao = await prisma.zonaEmissao.createMany({
    data: [
      {
        nome: "Centro",
        descricao: "Zona central da cidade com alta densidade populacional",
      },
      {
        nome: "Zona Industrial",
        descricao: "Área industrial com fábricas e depósitos",
      },
      {
        nome: "Zona Residencial Norte",
        descricao: "Bairros residenciais na região norte",
      },
      {
        nome: "Porto",
        descricao: "Região portuária com movimentação de cargas",
      },
      {
        nome: "Zona Comercial Sul",
        descricao: "Área comercial com shopping centers e escritórios",
      },
    ],
  });

  // Fetch created zones to get their IDs
  const zonasEmissaoData = await prisma.zonaEmissao.findMany();
  console.log(`Created ${zonasEmissao.count} zonas de emissão`);

  // Criar Emissores (1 por zona devido à constraint unique)
  const emissores = await prisma.emissor.createMany({
    data: [
      {
        descricao: "Emissor Central - Estação de Monitoramento Principal",
        latitude: -23.5505,
        longitude: -46.6333,
        valorAlerta: 50.0,
        valorEmergencia: 100.0,
        idZonaEmissao: zonasEmissaoData[0]!.idZonaEmissao,
      },
      {
        descricao: "Emissor Industrial - Complexo Petroquímico",
        latitude: -23.52,
        longitude: -46.68,
        valorAlerta: 75.0,
        valorEmergencia: 150.0,
        idZonaEmissao: zonasEmissaoData[1]!.idZonaEmissao,
      },
      {
        descricao: "Emissor Residencial Norte - Torre de Comunicação",
        latitude: -23.48,
        longitude: -46.62,
        valorAlerta: 40.0,
        valorEmergencia: 80.0,
        idZonaEmissao: zonasEmissaoData[2]!.idZonaEmissao,
      },
      {
        descricao: "Emissor Porto - Terminal de Containers",
        latitude: -23.96,
        longitude: -46.33,
        valorAlerta: 60.0,
        valorEmergencia: 120.0,
        idZonaEmissao: zonasEmissaoData[3]!.idZonaEmissao,
      },
      {
        descricao: "Emissor Comercial Sul - Centro Empresarial",
        latitude: -23.62,
        longitude: -46.65,
        valorAlerta: 45.0,
        valorEmergencia: 90.0,
        idZonaEmissao: zonasEmissaoData[4]!.idZonaEmissao,
      },
    ],
  });

  console.log(`Created ${emissores.count} emissores`);

  // Criar múltiplos Receptores distribuídos pelas zonas
  const receptores = await prisma.receptor.createMany({
    data: [
      // Receptores da Zona Central
      {
        descricao: "Receptor Centro 1 - Praça da Sé",
        latitude: -23.5489,
        longitude: -46.6388,
        idZonaEmissao: zonasEmissaoData[0]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Centro 2 - Estação da Luz",
        latitude: -23.5342,
        longitude: -46.6375,
        idZonaEmissao: zonasEmissaoData[0]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Centro 3 - Vale do Anhangabaú",
        latitude: -23.5465,
        longitude: -46.6407,
        idZonaEmissao: zonasEmissaoData[0]!.idZonaEmissao,
      },

      // Receptores da Zona Industrial
      {
        descricao: "Receptor Industrial 1 - Distrito ABC",
        latitude: -23.515,
        longitude: -46.675,
        idZonaEmissao: zonasEmissaoData[1]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Industrial 2 - Polo Petroquímico",
        latitude: -23.528,
        longitude: -46.692,
        idZonaEmissao: zonasEmissaoData[1]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Industrial 3 - Zona Franca",
        latitude: -23.505,
        longitude: -46.665,
        idZonaEmissao: zonasEmissaoData[1]!.idZonaEmissao,
      },

      // Receptores da Zona Norte
      {
        descricao: "Receptor Norte 1 - Santana",
        latitude: -23.475,
        longitude: -46.618,
        idZonaEmissao: zonasEmissaoData[2]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Norte 2 - Tucuruvi",
        latitude: -23.46,
        longitude: -46.605,
        idZonaEmissao: zonasEmissaoData[2]!.idZonaEmissao,
      },

      // Receptores do Porto
      {
        descricao: "Receptor Porto 1 - Terminal Marítimo",
        latitude: -23.965,
        longitude: -46.325,
        idZonaEmissao: zonasEmissaoData[3]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Porto 2 - Alfândega",
        latitude: -23.958,
        longitude: -46.338,
        idZonaEmissao: zonasEmissaoData[3]!.idZonaEmissao,
      },

      // Receptores da Zona Sul
      {
        descricao: "Receptor Sul 1 - Brooklin",
        latitude: -23.618,
        longitude: -46.648,
        idZonaEmissao: zonasEmissaoData[4]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Sul 2 - Vila Olímpia",
        latitude: -23.605,
        longitude: -46.66,
        idZonaEmissao: zonasEmissaoData[4]!.idZonaEmissao,
      },
      {
        descricao: "Receptor Sul 3 - Morumbi",
        latitude: -23.63,
        longitude: -46.68,
        idZonaEmissao: zonasEmissaoData[4]!.idZonaEmissao,
      },
    ],
  });

  console.log(`Created ${receptores.count} receptores`);

  // Criar Abrigos
  const abrigos = await prisma.abrigo.createMany({
    data: [
      {
        latitude: -23.552,
        longitude: -46.635,
        nome: "Abrigo Municipal Centro",
        descricao: "Abrigo de emergência no centro da cidade",
        idZonaEmissao: zonasEmissaoData[0]!.idZonaEmissao,
      },
      {
        latitude: -23.51,
        longitude: -46.67,
        nome: "Abrigo Industrial ABC",
        descricao: "Abrigo para emergências industriais",
        idZonaEmissao: zonasEmissaoData[1]!.idZonaEmissao,
      },
      {
        latitude: -23.47,
        longitude: -46.61,
        nome: "Abrigo Norte - Santana",
        descricao: "Centro de acolhimento zona norte",
        idZonaEmissao: zonasEmissaoData[2]!.idZonaEmissao,
      },
      {
        latitude: -23.955,
        longitude: -46.335,
        nome: "Abrigo Porto de Santos",
        descricao: "Abrigo emergencial área portuária",
        idZonaEmissao: zonasEmissaoData[3]!.idZonaEmissao,
      },
      {
        latitude: -23.61,
        longitude: -46.655,
        nome: "Abrigo Sul - Brooklin",
        descricao: "Centro de apoio zona sul",
        idZonaEmissao: zonasEmissaoData[4]!.idZonaEmissao,
      },
    ],
  });

  console.log(`Created ${abrigos.count} abrigos`);

  console.log("Database seed completed successfully!");
  console.log("Summary:");
  console.log(`- ${zonasEmissao.count} Zonas de Emissão`);
  console.log(`- ${emissores.count} Emissores`);
  console.log(`- ${receptores.count} Receptores`);
  console.log(`- ${abrigos.count} Abrigos`);
}

void (async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
