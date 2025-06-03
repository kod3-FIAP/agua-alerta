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
  const zonasEmissao = await Promise.all([
    prisma.zonaEmissao.create({
      data: {
        nome: "Centro",
        descricao: "Zona central da cidade com alta densidade populacional",
      },
    }),
    prisma.zonaEmissao.create({
      data: {
        nome: "Zona Industrial",
        descricao: "Área industrial com fábricas e depósitos",
      },
    }),
    prisma.zonaEmissao.create({
      data: {
        nome: "Zona Residencial Norte",
        descricao: "Bairros residenciais na região norte",
      },
    }),
    prisma.zonaEmissao.create({
      data: {
        nome: "Porto",
        descricao: "Região portuária com movimentação de cargas",
      },
    }),
    prisma.zonaEmissao.create({
      data: {
        nome: "Zona Comercial Sul",
        descricao: "Área comercial com shopping centers e escritórios",
      },
    }),
  ]);

  console.log(`Created ${zonasEmissao.length} zonas de emissão`);

  // Criar Emissores (1 por zona devido à constraint unique)
  const emissores = await Promise.all([
    prisma.emissor.create({
      data: {
        descricao: "Emissor Central - Estação de Monitoramento Principal",
        latitude: -23.5505,
        longitude: -46.6333,
        valorAlerta: 50.0,
        valorEmergencia: 100.0,
        idZonaEmissao: zonasEmissao[0].idZonaEmissao,
      },
    }),
    prisma.emissor.create({
      data: {
        descricao: "Emissor Industrial - Complexo Petroquímico",
        latitude: -23.52,
        longitude: -46.68,
        valorAlerta: 75.0,
        valorEmergencia: 150.0,
        idZonaEmissao: zonasEmissao[1].idZonaEmissao,
      },
    }),
    prisma.emissor.create({
      data: {
        descricao: "Emissor Residencial Norte - Torre de Comunicação",
        latitude: -23.48,
        longitude: -46.62,
        valorAlerta: 40.0,
        valorEmergencia: 80.0,
        idZonaEmissao: zonasEmissao[2].idZonaEmissao,
      },
    }),
    prisma.emissor.create({
      data: {
        descricao: "Emissor Porto - Terminal de Containers",
        latitude: -23.96,
        longitude: -46.33,
        valorAlerta: 60.0,
        valorEmergencia: 120.0,
        idZonaEmissao: zonasEmissao[3].idZonaEmissao,
      },
    }),
    prisma.emissor.create({
      data: {
        descricao: "Emissor Comercial Sul - Centro Empresarial",
        latitude: -23.62,
        longitude: -46.65,
        valorAlerta: 45.0,
        valorEmergencia: 90.0,
        idZonaEmissao: zonasEmissao[4].idZonaEmissao,
      },
    }),
  ]);

  console.log(`Created ${emissores.length} emissores`);

  // Criar múltiplos Receptores distribuídos pelas zonas
  const receptores = await Promise.all([
    // Receptores da Zona Central
    prisma.receptor.create({
      data: {
        descricao: "Receptor Centro 1 - Praça da Sé",
        latitude: -23.5489,
        longitude: -46.6388,
        idZonaEmissao: zonasEmissao[0].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Centro 2 - Estação da Luz",
        latitude: -23.5342,
        longitude: -46.6375,
        idZonaEmissao: zonasEmissao[0].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Centro 3 - Vale do Anhangabaú",
        latitude: -23.5465,
        longitude: -46.6407,
        idZonaEmissao: zonasEmissao[0].idZonaEmissao,
      },
    }),

    // Receptores da Zona Industrial
    prisma.receptor.create({
      data: {
        descricao: "Receptor Industrial 1 - Distrito ABC",
        latitude: -23.515,
        longitude: -46.675,
        idZonaEmissao: zonasEmissao[1].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Industrial 2 - Polo Petroquímico",
        latitude: -23.528,
        longitude: -46.692,
        idZonaEmissao: zonasEmissao[1].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Industrial 3 - Zona Franca",
        latitude: -23.505,
        longitude: -46.665,
        idZonaEmissao: zonasEmissao[1].idZonaEmissao,
      },
    }),

    // Receptores da Zona Norte
    prisma.receptor.create({
      data: {
        descricao: "Receptor Norte 1 - Santana",
        latitude: -23.475,
        longitude: -46.618,
        idZonaEmissao: zonasEmissao[2].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Norte 2 - Tucuruvi",
        latitude: -23.46,
        longitude: -46.605,
        idZonaEmissao: zonasEmissao[2].idZonaEmissao,
      },
    }),

    // Receptores do Porto
    prisma.receptor.create({
      data: {
        descricao: "Receptor Porto 1 - Terminal Marítimo",
        latitude: -23.965,
        longitude: -46.325,
        idZonaEmissao: zonasEmissao[3].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Porto 2 - Alfândega",
        latitude: -23.958,
        longitude: -46.338,
        idZonaEmissao: zonasEmissao[3].idZonaEmissao,
      },
    }),

    // Receptores da Zona Sul
    prisma.receptor.create({
      data: {
        descricao: "Receptor Sul 1 - Brooklin",
        latitude: -23.618,
        longitude: -46.648,
        idZonaEmissao: zonasEmissao[4].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Sul 2 - Vila Olímpia",
        latitude: -23.605,
        longitude: -46.66,
        idZonaEmissao: zonasEmissao[4].idZonaEmissao,
      },
    }),
    prisma.receptor.create({
      data: {
        descricao: "Receptor Sul 3 - Morumbi",
        latitude: -23.63,
        longitude: -46.68,
        idZonaEmissao: zonasEmissao[4].idZonaEmissao,
      },
    }),
  ]);

  console.log(`Created ${receptores.length} receptores`);

  // Criar Abrigos
  const abrigos = await Promise.all([
    prisma.abrigo.create({
      data: {
        latitude: -23.552,
        longitude: -46.635,
        nome: "Abrigo Municipal Centro",
        descricao: "Abrigo de emergência no centro da cidade",
        idZonaEmissao: zonasEmissao[0].idZonaEmissao,
      },
    }),
    prisma.abrigo.create({
      data: {
        latitude: -23.51,
        longitude: -46.67,
        nome: "Abrigo Industrial ABC",
        descricao: "Abrigo para emergências industriais",
        idZonaEmissao: zonasEmissao[1].idZonaEmissao,
      },
    }),
    prisma.abrigo.create({
      data: {
        latitude: -23.47,
        longitude: -46.61,
        nome: "Abrigo Norte - Santana",
        descricao: "Centro de acolhimento zona norte",
        idZonaEmissao: zonasEmissao[2].idZonaEmissao,
      },
    }),
    prisma.abrigo.create({
      data: {
        latitude: -23.955,
        longitude: -46.335,
        nome: "Abrigo Porto de Santos",
        descricao: "Abrigo emergencial área portuária",
        idZonaEmissao: zonasEmissao[3].idZonaEmissao,
      },
    }),
    prisma.abrigo.create({
      data: {
        latitude: -23.61,
        longitude: -46.655,
        nome: "Abrigo Sul - Brooklin",
        descricao: "Centro de apoio zona sul",
        idZonaEmissao: zonasEmissao[4].idZonaEmissao,
      },
    }),
  ]);

  console.log(`Created ${abrigos.length} abrigos`);

  console.log("Database seed completed successfully!");
  console.log("Summary:");
  console.log(`- ${zonasEmissao.length} Zonas de Emissão`);
  console.log(`- ${emissores.length} Emissores`);
  console.log(`- ${receptores.length} Receptores`);
  console.log(`- ${abrigos.length} Abrigos`);
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
