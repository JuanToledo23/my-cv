"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Copy, Check, ChevronRight, Layers, Zap, Shield, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type CodeExample = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ElementType;
  iconColor: string;
  language: string;
  project: string;
  code: string;
  highlights: string[];
  highlightsEn: string[];
};

const codeExamples: CodeExample[] = [
  {
    id: "batch-processing",
    title: "Batch Processing Optimizado",
    titleEn: "Optimized Batch Processing",
    description: "Procesamiento de 10,000+ QRs sin agotar memoria Lambda (4GB límite)",
    descriptionEn: "Processing 10,000+ QRs without exhausting Lambda memory (4GB limit)",
    icon: Layers,
    iconColor: "text-blue-400",
    language: "TypeScript",
    project: "QR ZIP Lambda Service",
    code: `// zipProcessor.ts - Código real del proyecto
const BATCH_SIZE = 50;
const PROGRESS_UPDATE_INTERVAL = 2;
let cachedLogoBuffer: { [key: string]: Buffer } = {};

for (let i = 0; i < passengers.length; i += BATCH_SIZE) {
  const batch = passengers.slice(i, i + BATCH_SIZE);
  console.log(\`🔄 Procesando lote \${i / BATCH_SIZE + 1} de \${Math.ceil(passengers.length / BATCH_SIZE)}\`);

  const batchPromises = batch.map(async (passenger) => {
    const encryptedData = await encryptPassengerData(passengerData);
    
    const qrBuffer = await QRCode.toBuffer(encryptedData, {
      width: contentWidth,
      margin: 1,
      color: { dark: "#000000", light: "#FFFFFF" },
      errorCorrectionLevel: "L",
    });
    
    // Caché de logos para evitar reprocesamiento
    const logoKey = \`\${width}_\${logoWidth}_\${logoHeight}\`;
    if (!cachedLogoBuffer[logoKey]) {
      cachedLogoBuffer[logoKey] = await sharp(logoPath)
        .resize({ width: logoWidth, height: logoHeight, fit: "inside" })
        .png({ compressionLevel: 6 })
        .toBuffer();
    }
    
    const finalImage = await sharp({
      create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } }
    })
      .composite([
        { input: cachedLogoBuffer[logoKey], top: marginY, left: logoLeft },
        { input: scaledQrBuffer, top: qrTop, left: marginX },
        { input: Buffer.from(svgText), top: textTop, left: marginX },
      ])
      .png({ compressionLevel: 6 })
      .toBuffer();
    
    return { fileName, buffer: finalImage };
  });
  
  const batchResults = await Promise.all(batchPromises);
  processedImages.push(...batchResults.filter(Boolean));
  
  // Garbage collection forzado entre batches
  if (global.gc) global.gc();
}`,
    highlights: [
      "40% reducción de uso de memoria",
      "10,000+ QRs por ejecución",
      "Progreso en tiempo real",
    ],
    highlightsEn: [
      "40% memory usage reduction",
      "10,000+ QRs per execution",
      "Real-time progress tracking",
    ],
  },
  {
    id: "distributed-transactions",
    title: "Transacciones Distribuidas",
    titleEn: "Distributed Transactions",
    description: "Actualización atómica de 5 bases de datos PostgreSQL con rollback automático",
    descriptionEn: "Atomic update of 5 PostgreSQL databases with automatic rollback",
    icon: Shield,
    iconColor: "text-green-400",
    language: "TypeScript",
    project: "Mass Update Trips",
    code: `// handler.ts - mass_update_trips_processor (Código real)
// Pool de conexiones a 5 bases de datos PostgreSQL
const pgClients = {
  trips: await getPGClient(config.tripsDBName),      // db_trips
  carriers: await getPGClient(config.carrierDBName), // db_carriers
  drivers: await getPGClient(config.driverDBName),   // db_drivers
  fleet: await getPGClient(config.fleetDBName),      // db_fleet
  stations: await getPGClient(config.stationsDBName),// db_stations
};

try {
  // BEGIN en todas las DBs para transacción distribuida
  for (const client of Object.values(pgClients)) {
    await client.query("BEGIN");
  }
  
  // Procesar con Set para evitar duplicados por setId
  const processedSetIds = new Set<string>();
  
  for (const row of excelRows) {
    const { setId, tagDescription } = row;
    
    // Solo procesar tags únicos por setId
    if (setId && !processedSetIds.has(setId)) {
      processedSetIds.add(setId);
      await updateTagDescription(setId, tagDescription, pgClients.trips);
    }
    
    // Actualizar estado en MongoDB (CQRS pattern)
    await updateMassUpdateStatus(fileId, totalRows, processedRows, errorMessages, mongoClient);
  }
  
  // COMMIT todas las transacciones
  for (const client of Object.values(pgClients)) {
    await client.query("COMMIT");
  }
  
} catch (error) {
  // ROLLBACK automático en TODAS las DBs
  for (const client of Object.values(pgClients)) {
    await client.query("ROLLBACK");
  }
  throw error;
}`,
    highlights: [
      "0% pérdida de datos",
      "50,000+ filas procesadas",
      "30min → 8min tiempo",
    ],
    highlightsEn: [
      "0% data loss",
      "50,000+ rows processed",
      "30min → 8min processing",
    ],
  },
  {
    id: "cascade-validation",
    title: "Validación en Cascada Inteligente",
    titleEn: "Intelligent Cascade Validation",
    description: "Flujo conversacional con búsqueda fuzzy y manejo de estados",
    descriptionEn: "Conversational flow with fuzzy search and state management",
    icon: MessageSquare,
    iconColor: "text-purple-400",
    language: "TypeScript",
    project: "TraxiBot WhatsApp",
    code: `// mainFlow.ts - TraxiBot (Código real del proyecto)
const input = ctx.body.trim();

// STEP 1: Intentar validar como ID numérico de empresa
const isNumeric = /^\\d+$/.test(input);
if (isNumeric && input.length <= 10) {
  const { valid, name } = await validateCompanyId(input);
  if (valid) {
    await state.update({ companyId: input, attemptCount: 0 });
    await state.update({ waitingForEmployeeId: true });
    await flowDynamic(messages.companyFound(name));
    return;
  }
}

// STEP 2: Buscar por nombre de empresa (ILIKE en PostgreSQL)
const { valid, companies, single } = await searchCompaniesByName(input);

if (valid) {
  if (single && companies && companies.length === 1) {
    // Match único - pedir confirmación al usuario
    await state.update({
      pendingCompany: companies[0],
      waitingForConfirmation: true,
      attemptCount: 0,
    });
    await flowDynamic(messages.companyConfirmationQuestion(companies[0].name));
    return;
  } else if (companies && companies.length > 1) {
    // Múltiples matches - mostrar lista de selección numerada
    const companyList = companies
      .map((company, index) => \`\${index + 1}. \${company.name}\`)
      .join("\\n");
    await state.update({
      companyOptions: companies,
      waitingForSelection: true,
      companySelectionAttemptCount: 0,
      attemptCount: 0,
    });
    await flowDynamic(messages.companyListSelection(companyList));
    return;
  }
}

// STEP 3: Manejo de intentos fallidos con mensajes progresivos
// ... lógica de reintentos con mensajes contextuales`,
    highlights: [
      "60-70% menos intentos fallidos",
      "40% menos tickets de soporte",
      "Desarrollo acelerado 60% con IA",
    ],
    highlightsEn: [
      "60-70% fewer failed attempts",
      "40% fewer support tickets",
      "60% faster dev with AI",
    ],
  },
  {
    id: "circuit-breaker",
    title: "Circuit Breaker Pattern",
    titleEn: "Circuit Breaker Pattern",
    description: "Resiliencia en llamadas a APIs externas con recuperación automática",
    descriptionEn: "Resilience in external API calls with automatic recovery",
    icon: Zap,
    iconColor: "text-orange-400",
    language: "TypeScript",
    project: "Bustrax Integration",
    code: `// tripUpdate.service.ts - Bustrax Integration (Código real)
export class TripUpdateService {
  private updateTripServerUrl: string;
  private consecutiveFailures: number = 0;
  private readonly MAX_CONSECUTIVE_FAILURES = 5;

  async updateTrips(trips: SimplifiedTrip[]): Promise<UpdateTripResponse> {
    // Circuit breaker check - fail-fast si API está caída
    if (this.consecutiveFailures >= this.MAX_CONSECUTIVE_FAILURES) {
      const error = 'Circuit breaker OPEN: External API appears to be down';
      logger.error(error, undefined, {
        consecutiveFailures: this.consecutiveFailures,
      });
      return {
        success: false,
        message: error,
      };
    }

    try {
      const response = await fetch(this.updateTripServerUrl, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.createUpdatePayload(trips)),
      });

      if (!response.ok) {
        this.consecutiveFailures++;
        // Generar sugerencias contextuales para debugging
        const suggestions = generateSuggestions('api_error', {
          statusCode: response.status,
          tripCount: trips.length,
        });
        return { success: false, ...suggestions };
      }

      // Success - reset circuit breaker counter
      this.consecutiveFailures = 0;
      return {
        success: true,
        updatedCount: trips.length,
      };
      
    } catch (error: any) {
      this.consecutiveFailures++;
      logger.error('External API call failed', error);
      return { success: false, message: error.message };
    }
  }
}`,
    highlights: [
      "98% tasa de éxito",
      "Fail-fast automático",
      "Recuperación sin intervención",
    ],
    highlightsEn: [
      "98% success rate",
      "Automatic fail-fast",
      "Self-healing recovery",
    ],
  },
];

function CodeCard({ example, index }: { example: CodeExample; index: number }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { language: currentLang } = useLanguage();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const title = currentLang === "es" ? example.title : example.titleEn;
  const description = currentLang === "es" ? example.description : example.descriptionEn;
  const highlights = currentLang === "es" ? example.highlights : example.highlightsEn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          isExpanded
            ? "bg-[#18181b] border-blue-500/30"
            : "bg-[#18181b]/50 border-[#27272a] hover:border-[#3f3f46]"
        }`}
      >
        {/* Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-5 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl bg-[#27272a]/50`}>
              <example.icon className={`w-5 h-5 ${example.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-[#fafafa]">{title}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-[#27272a] text-[#71717a]">
                  {example.language}
                </span>
              </div>
              <p className="text-sm text-[#a1a1aa] mb-2">{description}</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="p-1"
            >
              <ChevronRight className="w-5 h-5 text-[#71717a]" />
            </motion.div>
          </div>
        </div>

        {/* Code Block */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Project badge */}
              <div className="px-5 pb-2">
                <span className="text-xs text-[#71717a]">
                  {currentLang === "es" ? "Proyecto" : "Project"}: {example.project}
                </span>
              </div>
              
              {/* Copy button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}
                className="absolute top-2 right-5 p-2 rounded-lg bg-[#27272a] hover:bg-[#3f3f46] transition-colors z-10"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#71717a]" />
                )}
              </button>

              {/* Code */}
              <div className="overflow-x-auto">
                <pre className="px-5 pb-5 text-sm leading-relaxed">
                  <code className="text-[#a1a1aa] font-mono whitespace-pre">
                    {example.code}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function CodeShowcase() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const { t } = useLanguage();

  return (
    <section id="code" className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <div className="badge">
              <Code2 className="w-3.5 h-3.5 text-orange-400" />
              <span>{t("code.badge")}</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-[#fafafa] mb-6"
          >
            {t("code.title1")}
            <span className="gradient-text ml-3">{t("code.title2")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#a1a1aa] max-w-2xl mx-auto"
          >
            {t("code.description")}
          </motion.p>
        </div>

        {/* Code examples */}
        <div className="space-y-4">
          {codeExamples.map((example, index) => (
            <CodeCard key={example.id} example={example} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

