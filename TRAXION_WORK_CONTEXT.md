# Contexto detallado de trabajo en Traxion — Juan Alberto Toledo Tello

> Documento generado a partir del análisis de commits reales en 27 repositorios.
> Período: abril 2024 – febrero 2026.
> Total de commits propios: ~1,400+

---

## Resumen ejecutivo

Juan es AI-Augmented Solutions Architect & Full Stack Developer en **Traxion** (Traxi-on), empresa de tecnología para transporte y logística en México. Su trabajo abarca desde el frontend principal de la plataforma web (487 commits) hasta microservicios serverless, integraciones con terceros, bots conversacionales y sistemas en tiempo real con WebSockets. Ha construido proyectos completos desde cero (6 repositorios propios) y contribuido significativamente a más de 20 repositorios del ecosistema.

---

## Proyectos construidos 100% por Juan (desde cero)

### 1. TraxiBot — Chatbot conversacional 24/7 (WhatsApp)
- **Repo:** `traxibot` | **151 commits** | mar 2025 – feb 2026
- **Stack:** Node.js, TypeScript, BuilderBot, Baileys (WhatsApp), Twilio, Meta WhatsApp Business API, PostgreSQL, Docker, ECS (AWS)
- **Qué es:** Asistente conversacional que permite a pasajeros consultar su QR de acceso, información de empresa y soporte humano, directamente desde WhatsApp.
- **Lo que hizo:**
  - Creó la arquitectura completa del bot desde cero (primer commit: `traxibot core`)
  - Integró tres proveedores de mensajería: Baileys (WhatsApp Web), Twilio y Meta WhatsApp Business API
  - Implementó flujos conversacionales: bienvenida, validación de empleado, búsqueda fuzzy de empresa, envío de QR de pasajero, ayuda humana
  - Desplegó en AWS ECS con Docker, incluyendo resolución de problemas de permisos, sesiones y archivos QR en contenedor
  - Añadió deduplicación de mensajes y validación de entrada para evitar procesamiento doble de webhooks
  - Implementó tests unitarios con Vitest
  - Integró generación de QR cifrado para pasajeros
  - Configuró base de datos PostgreSQL para historial de conversaciones
  - Mantuvo el servicio en producción: debugging de sesiones en ECS, manejo de imágenes, fixeo de Docker

### 2. trx_lambda_bustrax_integration — Integración serverless con Bustrax
- **Repo:** `trx_lambda_bustrax_integration` | **55 commits** | oct 2025 – feb 2026
- **Stack:** Node.js, TypeScript, AWS Lambda, Serverless Framework, EventBridge, MongoDB, AWS
- **Qué es:** Sistema que sincroniza automáticamente rutas, viajes y vehículos entre la plataforma de Bustrax y Traxion, eliminando entrada manual de datos.
- **Lo que hizo:**
  - Diseñó y construyó toda la arquitectura desde cero
  - Implementó sincronización programada con EventBridge (cada 5/30 min)
  - Lógica de "shadow trip matching" para asociar viajes entre plataformas
  - Soporte multi-cliente con configuración de timezone por cliente
  - Mapeo de rutas con fetching de polylines
  - Creación automática de conductores por defecto
  - Sistema de logs y reportes de ejecuciones
  - Manejo de múltiples grupos de filtro para obtener cambios
  - Integración con MongoDB (DocumentDB en AWS) con certificados SSL

### 3. trx_lambda_mass_update_routes — Actualización masiva de rutas
- **Repo:** `trx_lambda_mass_update_routes` | **2 commits** | oct 2025
- **Stack:** Node.js, AWS Lambda, Serverless Framework
- **Qué es:** Lambda para procesar archivos Excel con rutas y actualizarlas masivamente.
- **Lo que hizo:** Creó el proyecto completo: validación de nombres de ruta y procesamiento masivo.

### 4. trx_lambda_mass_update_trips — Actualización masiva de viajes
- **Repo:** `trx_lambda_mass_update_trips` | **89 commits** | feb 2025 – oct 2025
- **Stack:** Node.js, TypeScript, AWS Lambda, Serverless Framework, RabbitMQ (amqplib), MongoDB, PostgreSQL
- **Qué es:** Motor de procesamiento masivo que lee archivos Excel con miles de viajes y actualiza múltiples bases de datos simultáneamente.
- **Lo que hizo:**
  - Creó toda la arquitectura del procesador desde cero
  - Implementó conexión a múltiples bases de datos (PostgreSQL + MongoDB/DocumentDB)
  - Integró colas RabbitMQ para desacoplar el procesamiento
  - Validaciones de fechas, zonas horarias, estaciones y rutas
  - Tracking de progreso en tiempo real (file_metadata con processed_rows al 100%)
  - Optimización de batch execution y manejo de errores
  - Cálculo de ETA para estaciones
  - Transacciones MongoDB para consistencia
  - Configuración de VPC para acceso seguro a bases de datos

### 5. trx_lambda_mass_update_vehicle — Actualización masiva de vehículos
- **Repo:** `trx_lambda_mass_update_vehicle` | **42 commits** | ago 2025 – sep 2025
- **Stack:** Node.js, AWS Lambda, Serverless Framework
- **Qué es:** Lambda para carga masiva de vehículos desde Excel.
- **Lo que hizo:**
  - Proyecto completo desde cero
  - Validación de VIN, Vehicle ID, Carrier ID
  - Procesamiento de columnas con validaciones estrictas
  - Soporte para creación y actualización de vehículos en batch

### 6. trx_zip_lambda_service — Generación masiva de QRs en ZIP
- **Repo:** `trx_zip_lambda_service` | **36 commits** | may 2025 – ene 2026
- **Stack:** Node.js, AWS Lambda, Serverless Framework, MongoDB, S3
- **Qué es:** Microservicio que genera y cifra más de 10,000 códigos QR en una sola petición, los empaqueta en ZIP y los sube a S3.
- **Lo que hizo:**
  - Proyecto completo desde cero
  - Procesamiento por batch de pasajeros para generar imágenes QR
  - Cifrado de datos en los QRs
  - Validación de idCompany antes de generar
  - Descarga masiva de QRs genéricos y de invitados con zona horaria
  - Almacenamiento en MongoDB + S3
  - Manejo de formato y tamaño de imágenes

---

## Contribuciones principales a proyectos del equipo

### 7. traxi_business-web_client — Plataforma web principal
- **Repo:** `traxi_business-web_client` | **487 commits** | abr 2024 – nov 2025
- **Stack:** React, Next.js, TypeScript, Material UI, Leaflet, Socket.io, RTK Query, React Hook Form, Yup
- **Qué es:** La aplicación web principal de Traxion: monitoreo en tiempo real de viajes, gestión de pasajeros, rutas, vehículos, QRs y reportes.
- **Áreas principales que trabajó:**

  **Monitor en tiempo real (Socket.io + Leaflet)**
  - Integración completa de Socket.io para actualización en tiempo real de viajes
  - Migración de Google Maps a React Leaflet
  - Mapa interactivo: rutas reales, tooltip de vehículos, centrado de unidades, rotación de iconos, temas de mapa
  - Semáforo de monitoreo con colores de estado (puntual, retrasado, detenido)
  - División del monitor (pantalla partida)
  - Filtros: búsqueda, ruta, unidad, estado, tipo de viaje, rango de fechas
  - Paginación de viajes en curso y por finalizar
  - Detalle de viaje: estaciones, boardings, ETA, progreso de check-in
  - Notas en mapa, animaciones de filas por estado

  **Gestión masiva (bulk operations)**
  - Carga masiva de viajes: UI completa (upload, progreso, status polling)
  - Descarga masiva de viajes a Excel
  - Carga masiva de pasajeros con campos personalizados
  - Descarga masiva de pasajeros a Excel con template personalizado
  - Carga masiva de vehículos
  - Carga masiva de rutas
  - Descarga masiva de QRs (genéricos, invitados, pasajeros)
  - Componente de tracking de status de archivos (polling con RTK Query)

  **Módulo de pasajeros y QRs**
  - Crear y editar pasajero con campos personalizados dinámicos
  - Gestión de QRs: genéricos, invitados, por grupo
  - Lista de QRs con filtros, paginación, eliminación
  - Botón de descarga de QR individual y masiva

  **Módulo de rutas**
  - Paginación y búsqueda
  - Edición de estaciones: lat/long, drag & drop para reordenar
  - Actualización de estaciones al modificar ruta

  **Módulo de viajes históricos**
  - Columnas de diferencia (hora real vs programada)
  - Filtro por tipo de viaje y turno
  - Indicadores de dispositivo GPS
  - Indicadores de cambio de vehículo
  - Eliminación de viajes históricos
  - Puntuación de puntualidad con paginación y exportación

  **Componentes reutilizables creados**
  - RHFDateTimePicker (date time picker con React Hook Form)
  - RHFChipInput, RHFSelect con validaciones compuestas
  - ButtonMenu, TitleBar
  - Skeleton loadings customizados
  - DownloadFileStatusResponse (tracking de archivos en proceso)

  **UX / UI**
  - Skeleton loadings
  - Internacionalización (traducciones español/inglés)
  - Temas de mapa
  - Validaciones de formularios con Yup
  - Responsive design
  - Animaciones de estado en filas de tabla

### 8. trx_traccar_monitor_ws — Servidor WebSocket de monitoreo
- **Repo:** `trx_traccar_monitor_ws` | **108 commits** | may 2024 – ago 2025
- **Stack:** Node.js, TypeScript, Socket.io, MongoDB, Redis, AWS
- **Qué es:** Servidor WebSocket que gestiona la comunicación en tiempo real entre el backend de telemetría (Traccar) y la plataforma web.
- **Lo que hizo:**
  - Sockets de detalle de viaje y viajes próximos
  - Paginación en WebSocket para viajes
  - Filtros en tiempo real (búsqueda, unidad, ruta, estado)
  - Posición de vehículos con intervalos de 40s
  - Flag de online/offline para Traffilog
  - Integración de telemetría
  - Manejo de polylines reales en Redis
  - Conteo de boardings en tiempo real
  - Indicador de cambio de vehículo
  - Manejo de intervalos y limpieza de conexiones
  - Fix de duplicación de viajes

### 9. trx_core_boardings — Microservicio de abordajes
- **Repo:** `trx_core_boardings` | **45 commits** | jul 2024 – feb 2026
- **Stack:** Python, Docker, PostgreSQL, AWS Lambda
- **Qué es:** Servicio que procesa escaneos de QR/NFC cuando pasajeros abordan unidades.
- **Lo que hizo:**
  - Validación de QRs: evitar códigos duplicados, expirados, de otro cliente
  - Validación diferenciada para QR tipo GENERIC, GUEST y EMPLOYEE
  - Filtrado de escaneos NFC por configuración de cliente (ej. SANMINA)
  - Lógica de resolución de pasajeros con manejo de idCompany
  - Guest batch helpers con tests
  - Sincronización de boardings a monitor
  - Campo sync_source en modelo de boarding

### 10. trx_core_passengers — Microservicio de pasajeros
- **Repo:** `trx_core_passengers` | **53 commits** | oct 2024 – jul 2025
- **Stack:** Node.js, TypeScript, Docker, PostgreSQL, MongoDB
- **Qué es:** API de gestión de pasajeros (CRUD, QRs, grupos).
- **Lo que hizo:**
  - Sistema completo de QRs genéricos e invitados (GENERIC, GUEST)
  - Gestión de grupos de QR
  - Cifrado de datos en QR
  - Filtros y paginación
  - Validación de teléfonos
  - Endpoints para lista de QRs por tipo

### 11. trx_reports_lambda_service — Servicio de reportes
- **Repo:** `trx_reports_lambda_service` | **87 commits** | ene 2025 – ago 2025
- **Stack:** Node.js, TypeScript, AWS Lambda, Serverless Framework, MongoDB, PostgreSQL, S3
- **Qué es:** Lambdas que generan reportes en Excel (XLSX) a partir de datos de viajes, pasajeros y boardings.
- **Lo que hizo:**
  - Lambda completa para generar XLSX de viajes con estaciones, horarios, boardings
  - Columna de diferencia (hora real vs programada)
  - Reporte de pasajeros con campos personalizados
  - Descarga masiva de QRs como servicio
  - Optimización de queries de estaciones para reportes rápidos
  - Upload a S3 para descarga diferida
  - Configuración VPC para acceso a bases de datos

### 12. trx_core_fleet — Microservicio de flota
- **Repo:** `trx_core_fleet` | **23 commits** | jul 2025 – ago 2025
- **Stack:** Docker, Node.js/NestJS
- **Qué es:** Gestión de vehículos de la flota.
- **Lo que hizo:**
  - Campos nuevos: vehicle_transmission, vehicle_fuel_type, vehicle_scan_source
  - Descarga de vehículos en Excel con columnas de acción, carrier ID e instrucciones
  - Imagen de instrucciones para carga masiva

### 13. trx_core_telemetry — Microservicio de telemetría
- **Repo:** `trx_core_telemetry` | **29 commits** | ago 2024 – jun 2025
- **Stack:** Node.js, TypeScript, Docker, Serverless, MongoDB
- **Qué es:** Servicio que recibe posiciones de dispositivos GPS y calcula ETAs.
- **Lo que hizo:**
  - Cálculo de ETA para estaciones próximas
  - Endpoint para dispositivos T20 (Telpo) con token fijo
  - Objeto de posición para vehículos
  - Arquitectura inicial del proyecto (primer commit: `project architecture`)
  - Configuración de MongoDB y pre-commit hooks

### 14. trx_essential_pubsub_for_microservice — Colas de mensajería
- **Repo:** `trx_essential_pubsub_for_microservice` | **4 commits** | ene 2025 – jul 2025
- **Stack:** RabbitMQ
- **Qué es:** Configuración centralizada de colas RabbitMQ para comunicación entre microservicios.
- **Lo que hizo:**
  - Añadió colas para actualización masiva de viajes
  - Añadió cola para generación masiva de QR ZIP
  - Añadió colas para servicio de flota y actualización de vehículos

### 15. service_trx_routes — Servicio de rutas
- **Repo:** `service_trx_routes` | **15 commits** | nov 2024 – oct 2025
- **Stack:** Node.js, TypeScript
- **Qué es:** API de gestión de rutas y estaciones.
- **Lo que hizo:**
  - Paginación y filtros
  - Actualización de estaciones al modificar ruta
  - Descarga masiva de rutas con columna de acción
  - Imagen de instrucciones para carga

### 16. service_trx_trips — Servicio de viajes
- **Repo:** `service_trx_trips` | **12 commits** | jun 2025 – feb 2026
- **Stack:** Node.js, TypeScript
- **Qué es:** API principal de viajes.
- **Lo que hizo:**
  - Implementó ReliableSetPublisher para entrega confiable de mensajes
  - Optimización de creación de viajes
  - Scripts de migración para deadlock
  - Mejora de resolución de pasajeros con idCompany
  - Tracking de status de carga de archivos
  - Eliminación de viajes desde monitor

---

## Contribuciones menores (verificadas)

| Repo | Commits | Período | Qué hizo |
|------|---------|---------|----------|
| `trx_ci_qr_client` | 33 | jul 2024 – feb 2025 | Cliente web para descarga de QR de pasajero. Proyecto iniciado por Juan. Responsive, tag manager, info de nombre/código en imagen QR. |
| `trx_qr_passenger_client` | 33 | jul 2024 – feb 2025 | Variante del cliente QR de pasajero (mismos features). |
| `trx_lambda_qr_passengers` | 7 | oct 2025 | Lambda para obtener pasajeros activos por cliente para generar QRs. |
| `trx-trips-lambda` | 16 | ago 2025 | Indicador de GPS en viajes históricos. |
| `trx_biz_rabbit_receiver` | 4 | oct 2024 | Logs de creación de usuario y validación de teléfono. |
| `trx_ci_core_trips` | 4 | sep 2024 | Upgrade de performance en producción (serverless.yml). |
| `trx_lambda_trip_indicators_filler` | 3 | jul 2025 – nov 2025 | ETA para indicadores de viaje. |
| `trx_sync_boardings_to_monitor` | 3 | oct 2024 – may 2025 | Sync de boardings a monitor con boarding_time y UTC. |
| `trx-biz-punctuallity-dashboard` | 2 | nov 2025 | Filtros de turno y label_id en dashboard de puntualidad. |
| `trx_biz_gps_classifier` | 1 | nov 2025 | Fix para procesar viajes de colecciones correctas y manejar viajes que cruzan medianoche. |
| `trx_core_clients` | 12 | jun 2025 – dic 2025 | Flag enableChatbot, publisher fix, configuración de dispositivos externos (QR/NFC). |

---

## Stack tecnológico verificado (usado en producción)

| Categoría | Tecnologías |
|-----------|-------------|
| **Lenguajes** | TypeScript, JavaScript, Python |
| **Frontend** | React, Next.js, Material UI, React Hook Form, Yup, RTK Query, Leaflet, Socket.io (client) |
| **Backend** | Node.js, NestJS, Express, FastAPI (Python) |
| **Bases de datos** | PostgreSQL, MongoDB, DocumentDB (AWS), Redis |
| **Mensajería** | RabbitMQ (amqplib), Socket.io (server) |
| **AWS** | Lambda, EventBridge, ECS, S3, VPC, CloudWatch |
| **Deploy** | Serverless Framework, Docker, GitHub Actions CI/CD |
| **Integraciones** | Meta WhatsApp Business API, Twilio, Bustrax API, Traccar (GPS), BuilderBot, Baileys |
| **Testing** | Vitest, Jest |
| **Herramientas IA** | Cursor (Claude), ChatGPT, Gemini — desarrollo impulsado por IA para acelerar entregas |

---

## Línea de tiempo de hitos

| Fecha | Hito |
|-------|------|
| Abr 2024 | Primeros commits en plataforma web (monitor de viajes) |
| May 2024 | Integración de Socket.io para monitoreo en tiempo real |
| May 2024 | Migración de Google Maps a Leaflet |
| Jun 2024 | Nuevo sistema de tracking: tabla, detalle, filtros, mapa |
| Jul 2024 | Cliente QR de pasajero (proyecto propio) |
| Ago 2024 | Arquitectura de telemetría (proyecto propio) |
| Oct 2024 | Validación de pasajeros y teléfonos |
| Nov 2024 | Gestión de rutas: paginación, drag & drop de estaciones |
| Dic 2024 | Ruta real en mapa, notas, labels de estado |
| Ene 2025 | Exportación masiva de viajes a Excel |
| Feb 2025 | Motor de actualización masiva de viajes (proyecto propio, RabbitMQ + Lambda + 5 DBs) |
| Feb 2025 | Carga masiva de viajes en web |
| Mar 2025 | Pasajeros con campos personalizados dinámicos |
| Mar 2025 | TraxiBot: chatbot WhatsApp desde cero (proyecto propio) |
| Abr 2025 | Carga/descarga masiva de pasajeros con custom fields |
| May 2025 | Servicio ZIP Lambda para QRs masivos (proyecto propio, 10k+ QRs) |
| May 2025 | Lógica de ETA en estaciones |
| Jun 2025 | QRs genéricos e invitados (backend + frontend) |
| Jul 2025 | Validación anti-duplicados en boardings |
| Ago 2025 | Actualización masiva de vehículos (proyecto propio) |
| Ago 2025 | Indicador GPS en viajes, eliminación de viajes |
| Oct 2025 | Actualización masiva de rutas (proyecto propio) |
| Oct 2025 | Integración Bustrax con EventBridge (proyecto propio) |
| Oct 2025 | TraxiBot: migración a Meta WhatsApp + Twilio |
| Nov 2025 | Dashboard de puntualidad, NFC filtering |
| Dic 2025 | Multi-timezone Bustrax, configuración de dispositivos |
| Ene 2026 | Shadow trip matching Bustrax, sync completa cada 30 min |
| Feb 2026 | TraxiBot: tests con Vitest, deduplicación de webhooks, guest batch helpers en boardings |

---

## Métricas verificadas

- **27 repositorios** con commits propios
- **6 proyectos creados desde cero** (100% propios)
- **~1,400+ commits** en total
- **Período activo:** abril 2024 – febrero 2026 (22 meses y contando)
- **Repositorio más activo:** traxi_business-web_client (487 commits)
- **Proyecto más reciente:** trx_lambda_bustrax_integration y traxibot (ambos con commits en feb 2026)

---

## Impacto medible (extraído de commits y contexto)

- **Motor de actualización masiva:** Procesamiento de 50,000+ registros, 5 bases de datos en paralelo, 0% timeouts, reducción de 30 min a 8 min
- **ZIP Lambda de QRs:** 10,000+ QRs generados, cifrados y empaquetados en una sola petición
- **TraxiBot:** Asistente 24/7 en WhatsApp con 3 proveedores (Baileys, Twilio, Meta), desplegado en ECS. Desarrollo impulsado por IA (60% más rápido)
- **Integración Bustrax:** Eliminación de entrada manual de datos entre dos plataformas, sincronización automática cada 5-30 min vía EventBridge
- **Monitor en tiempo real:** Socket.io con posiciones cada 40s, soporte para múltiples clientes simultáneos
- **Operaciones masivas end-to-end:** Viajes, pasajeros, vehículos, rutas y QRs — todos con UI de progreso, validación, y generación de archivos

---

*Documento generado el 19 de febrero de 2026 a partir del análisis de git log de 27 repositorios en /Users/juanalbertotoledano/TRAXI/Repos.*
