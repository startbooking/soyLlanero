import * as XLSX from 'xlsx';
import { z } from 'zod';

// Schemas de validación
const hotelSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tipo: z.enum(["Hotel", "Glamping", "Cabaña", "Finca", "Hostal"], {
    errorMap: () => ({ message: "Tipo inválido (Hotel, Glamping, Cabaña, Finca o Hostal)" })
  }),
  categoria: z.number().min(1).max(5, "La categoría debe ser entre 1 y 5"),
  direccion: z.string().min(1, "La dirección es requerida"),
  latitud: z.number().min(-90).max(90, "Latitud inválida"),
  longitud: z.number().min(-180).max(180, "Longitud inválida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  whatsapp: z.string().optional(),
  email: z.string().email("Email inválido"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  check_in: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  check_out: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  politica_cancelacion: z.string().min(1, "La política de cancelación es requerida"),
  servicios: z.string().optional(),
  sitio_web: z.string().url("URL inválida").optional().or(z.literal("")),
  precio_desde: z.number().positive("El precio debe ser positivo").optional(),
});

const restaurantSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tipo: z.enum(["Típico", "Pescadería", "Asadero", "Cafetería", "Internacional", "Mariscos", "Comida Rápida", "Gourmet"], {
    errorMap: () => ({ message: "Tipo inválido" })
  }),
  tipo_cocina: z.string().min(1, "El tipo de cocina es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  latitud: z.number().min(-90).max(90, "Latitud inválida"),
  longitud: z.number().min(-180).max(180, "Longitud inválida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  whatsapp: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  horario_apertura: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  horario_cierre: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  dias_atencion: z.string().min(1, "Los días de atención son requeridos"),
  rango_precio: z.enum(["$", "$$", "$$$", "$$$$"], {
    errorMap: () => ({ message: "Rango de precio inválido (usar $, $$, $$$ o $$$$)" })
  }),
  capacidad: z.number().positive("La capacidad debe ser positiva").optional(),
  servicios: z.string().optional(),
  especialidades: z.string().optional(),
});

const serviceSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  categoria: z.string().min(1, "La categoría es requerida"),
  proveedor: z.string().min(1, "El proveedor es requerido"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  whatsapp: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  precio: z.number().positive("El precio debe ser positivo"),
  unidad_precio: z.string().min(1, "La unidad de precio es requerida"),
  condiciones: z.string().min(1, "Las condiciones son requeridas"),
  disponibilidad: z.string().min(1, "La disponibilidad es requerida"),
  ubicacion: z.string().optional(),
  sitio_web: z.string().url("URL inválida").optional().or(z.literal("")),
});

const agencySchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  rnt: z.string().min(1, "El RNT es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  whatsapp: z.string().min(1, "El WhatsApp es requerido"),
  email: z.string().email("Email inválido"),
  sitio_web: z.string().url("URL inválida").optional().or(z.literal("")),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  servicios: z.string().min(1, "Los servicios son requeridos"),
  especialidad: z.string().min(1, "La especialidad es requerida"),
  cobertura: z.string().min(1, "La cobertura es requerida"),
  certificaciones: z.string().optional(),
  licencia_operacion: z.string().min(1, "La licencia de operación es requerida"),
});

const activitySchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tipo: z.enum(["Aventura", "Naturaleza", "Cultural", "Deportivo", "Recreativo", "Gastronómico", "Acuático"], {
    errorMap: () => ({ message: "Tipo inválido" })
  }),
  categoria: z.string().min(1, "La categoría es requerida"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  duracion: z.string().min(1, "La duración es requerida"),
  nivel_dificultad: z.enum(["Fácil", "Medio", "Difícil"], {
    errorMap: () => ({ message: "Nivel de dificultad inválido (Fácil, Medio o Difícil)" })
  }),
  edad_minima: z.number().min(0, "La edad mínima debe ser positiva"),
  precio_persona: z.number().positive("El precio debe ser positivo"),
  punto_encuentro: z.string().min(1, "El punto de encuentro es requerido"),
  latitud: z.number().min(-90).max(90, "Latitud inválida"),
  longitud: z.number().min(-180).max(180, "Longitud inválida"),
  incluye: z.string().min(1, "Debe especificar qué incluye"),
  no_incluye: z.string().min(1, "Debe especificar qué no incluye"),
  recomendaciones: z.string().min(1, "Las recomendaciones son requeridas"),
  dias_disponibles: z.string().min(1, "Los días disponibles son requeridos"),
  horario_inicio: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  cupo_maximo: z.number().positive("El cupo máximo debe ser positivo").optional(),
});

const pointOfInterestSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  categoria: z.string().min(1, "La categoría es requerida"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  direccion: z.string().min(1, "La dirección es requerida"),
  latitud: z.number().min(-90).max(90, "Latitud inválida"),
  longitud: z.number().min(-180).max(180, "Longitud inválida"),
  horario_apertura: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)").optional().or(z.literal("")),
  horario_cierre: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)").optional().or(z.literal("")),
  dias_atencion: z.string().optional(),
  tarifa_entrada: z.string().optional(),
  servicios: z.string().optional(),
  como_llegar: z.string().min(1, "Debe especificar cómo llegar"),
  tiempo_visita_sugerido: z.string().optional(),
  restricciones: z.string().optional(),
});

const eventSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  tipo: z.enum(["Cultural", "Musical", "Deportivo", "Gastronómico", "Artístico", "Festivo", "Educativo"], {
    errorMap: () => ({ message: "Tipo inválido" })
  }),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  fecha_inicio: z.string().min(1, "La fecha de inicio es requerida"),
  fecha_fin: z.string().optional(),
  hora_inicio: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  direccion: z.string().min(1, "La dirección es requerida"),
  latitud: z.number().min(-90).max(90, "Latitud inválida").optional(),
  longitud: z.number().min(-180).max(180, "Longitud inválida").optional(),
  precio: z.string().min(1, "El precio es requerido"),
  organizador: z.string().min(1, "El organizador es requerido"),
  contacto_telefono: z.string().optional(),
  contacto_email: z.string().email("Email inválido").optional().or(z.literal("")),
  cupo_maximo: z.number().positive("El cupo máximo debe ser positivo").optional(),
  requiere_registro: z.boolean().optional(),
});

export type ImportResult = {
  success: boolean;
  message: string;
  validRecords: any[];
  errors: Array<{
    row: number;
    errors: string[];
  }>;
};

export const excelService = {
  // Importar y validar archivo Excel
  async importExcel(file: File, type: string): Promise<ImportResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          const validRecords: any[] = [];
          const errors: Array<{ row: number; errors: string[] }> = [];

          // Seleccionar schema según el tipo
          let schema;
          switch (type) {
            case 'hoteles':
              schema = hotelSchema;
              break;
            case 'restaurantes':
              schema = restaurantSchema;
              break;
            case 'servicios':
              schema = serviceSchema;
              break;
            case 'agencias':
              schema = agencySchema;
              break;
            case 'actividades':
              schema = activitySchema;
              break;
            case 'puntos_interes':
              schema = pointOfInterestSchema;
              break;
            case 'eventos':
              schema = eventSchema;
              break;
            default:
              resolve({
                success: false,
                message: 'Tipo de plantilla no reconocido',
                validRecords: [],
                errors: []
              });
              return;
          }

          // Validar cada registro
          jsonData.forEach((record: any, index) => {
            try {
              const validated = schema.parse(record);
              validRecords.push(validated);
            } catch (error) {
              if (error instanceof z.ZodError) {
                errors.push({
                  row: index + 2, // +2 porque Excel empieza en 1 y tiene header
                  errors: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
                });
              }
            }
          });

          resolve({
            success: errors.length === 0,
            message: errors.length === 0 
              ? `Se importaron ${validRecords.length} registros exitosamente`
              : `Se encontraron ${errors.length} errores en ${jsonData.length} registros`,
            validRecords,
            errors
          });
        } catch (error) {
          resolve({
            success: false,
            message: 'Error al procesar el archivo Excel',
            validRecords: [],
            errors: []
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  },

  // Exportar datos a Excel
  exportToExcel(data: any[], filename: string, sheetName: string = 'Datos') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  },

  // Crear plantilla vacía
  createTemplate(type: string) {
    let headers: string[] = [];
    let exampleData: any = {};

    switch (type) {
      case 'hoteles':
        headers = ['nombre*', 'tipo*', 'categoria*', 'direccion*', 'latitud*', 'longitud*', 'telefono*', 'whatsapp*', 'email*', 'descripcion*', 'check_in*', 'check_out*', 'politica_cancelacion*', 'servicios', 'sitio_web', 'precio_desde'];
        exampleData = {
          'nombre*': 'Hotel Ejemplo',
          'tipo*': 'Hotel',
          'categoria*': 5,
          'direccion*': 'Calle 10 #5-20 Centro',
          'latitud*': -4.1533,
          'longitud*': -73.6346,
          'telefono*': '+57 8 1234567',
          'whatsapp*': '+57 300 1234567',
          'email*': 'contacto@hotel.com',
          'descripcion*': 'Hotel 5 estrellas en el corazón de Villavicencio',
          'check_in*': '15:00',
          'check_out*': '12:00',
          'politica_cancelacion*': 'Cancelación gratuita hasta 48 horas antes',
          'servicios': 'WiFi,Piscina,Restaurante,Gimnasio',
          'sitio_web': 'https://www.hotel.com',
          'precio_desde': 250000
        };
        break;
      case 'restaurantes':
        headers = ['nombre*', 'tipo*', 'tipo_cocina*', 'direccion*', 'latitud*', 'longitud*', 'telefono*', 'whatsapp', 'email', 'descripcion*', 'horario_apertura*', 'horario_cierre*', 'dias_atencion*', 'rango_precio*', 'capacidad', 'servicios', 'especialidades'];
        exampleData = {
          'nombre*': 'Restaurante Ejemplo',
          'tipo*': 'Típico',
          'tipo_cocina*': 'Tradicional Llanera',
          'direccion*': 'Carrera 30 #15-45',
          'latitud*': -4.1520,
          'longitud*': -73.6350,
          'telefono*': '+57 8 2345678',
          'whatsapp': '+57 310 2345678',
          'email': 'info@restaurante.com',
          'descripcion*': 'Restaurante de comida típica llanera',
          'horario_apertura*': '11:00',
          'horario_cierre*': '22:00',
          'dias_atencion*': 'Lunes a Domingo',
          'rango_precio*': '$$',
          'capacidad': 120,
          'servicios': 'Delivery,Reservas,Parqueadero',
          'especialidades': 'Mamona,Palo a Pique,Cachama'
        };
        break;
      case 'servicios':
        headers = ['nombre*', 'categoria*', 'proveedor*', 'descripcion*', 'telefono*', 'whatsapp', 'email', 'precio*', 'unidad_precio*', 'condiciones*', 'disponibilidad*', 'ubicacion', 'sitio_web'];
        exampleData = {
          'nombre*': 'Transporte Turístico VIP',
          'categoria*': 'Transporte',
          'proveedor*': 'Transportes del Llano SAS',
          'descripcion*': 'Servicio de transporte turístico en vehículos 4x4',
          'telefono*': '+57 8 4567890',
          'whatsapp': '+57 315 4567890',
          'email': 'transportes@llano.com',
          'precio*': 450000,
          'unidad_precio*': 'Por día',
          'condiciones*': 'Incluye conductor-guía, Seguro, Combustible',
          'disponibilidad*': 'Todos los días, Reserva con 24h',
          'ubicacion': 'Villavicencio y alrededores',
          'sitio_web': 'https://www.transportesllano.com'
        };
        break;
      case 'agencias':
        headers = ['nombre*', 'rnt*', 'direccion*', 'telefono*', 'whatsapp*', 'email*', 'sitio_web', 'descripcion*', 'servicios*', 'especialidad*', 'cobertura*', 'certificaciones', 'licencia_operacion*'];
        exampleData = {
          'nombre*': 'Agencia Turística Llanos Tour',
          'rnt*': '12345',
          'direccion*': 'Carrera 33 #38-45 Oficina 201',
          'telefono*': '+57 8 3456789',
          'whatsapp*': '+57 320 3456789',
          'email*': 'info@llanostour.com',
          'sitio_web': 'https://www.llanostour.com',
          'descripcion*': 'Agencia especializada en turismo de naturaleza',
          'servicios*': 'Tours,Transporte,Guías,Paquetes',
          'especialidad*': 'Ecoturismo y Aventura',
          'cobertura*': 'Meta,Casanare,Vichada',
          'certificaciones': 'ISO 9001,Sello de Calidad',
          'licencia_operacion*': '123456789'
        };
        break;
      case 'actividades':
        headers = ['nombre*', 'tipo*', 'categoria*', 'descripcion*', 'duracion*', 'nivel_dificultad*', 'edad_minima*', 'precio_persona*', 'punto_encuentro*', 'latitud*', 'longitud*', 'incluye*', 'no_incluye*', 'recomendaciones*', 'dias_disponibles*', 'horario_inicio*', 'cupo_maximo'];
        exampleData = {
          'nombre*': 'Canopy en los Llanos',
          'tipo*': 'Aventura',
          'categoria*': 'Deporte Extremo',
          'descripcion*': 'Experiencia de canopy sobre los paisajes llaneros',
          'duracion*': '3 horas',
          'nivel_dificultad*': 'Medio',
          'edad_minima*': 12,
          'precio_persona*': 85000,
          'punto_encuentro*': 'Hacienda Las Palmas - Km 7 Vía Restrepo',
          'latitud*': -4.1800,
          'longitud*': -73.6100,
          'incluye*': 'Equipo de seguridad,Guía certificado,Refrigerio',
          'no_incluye*': 'Alimentación completa,Propinas',
          'recomendaciones*': 'Ropa cómoda,Zapatos cerrados,Protector solar',
          'dias_disponibles*': 'Viernes,Sábado,Domingo',
          'horario_inicio*': '08:00',
          'cupo_maximo': 15
        };
        break;
      case 'puntos_interes':
        headers = ['nombre*', 'categoria*', 'descripcion*', 'direccion*', 'latitud*', 'longitud*', 'horario_apertura', 'horario_cierre', 'dias_atencion', 'tarifa_entrada', 'servicios', 'como_llegar*', 'tiempo_visita_sugerido', 'restricciones'];
        exampleData = {
          'nombre*': 'Bioparque Los Ocarros',
          'categoria*': 'Parque Natural',
          'descripcion*': 'Bioparque dedicado a la conservación de fauna llanera',
          'direccion*': 'Km 5 Vía Puerto López',
          'latitud*': -4.1234,
          'longitud*': -73.5890,
          'horario_apertura': '09:00',
          'horario_cierre': '17:00',
          'dias_atencion': 'Martes a Domingo',
          'tarifa_entrada': 'Adultos: 25000, Niños: 15000',
          'servicios': 'Restaurante,Baños,Parqueadero',
          'como_llegar*': 'Por la vía Puerto López a 5 km del centro',
          'tiempo_visita_sugerido': '3 horas',
          'restricciones': 'No mascotas,No fumar'
        };
        break;
      case 'eventos':
        headers = ['nombre*', 'tipo*', 'descripcion*', 'fecha_inicio*', 'fecha_fin', 'hora_inicio*', 'ubicacion*', 'direccion*', 'latitud', 'longitud', 'precio*', 'organizador*', 'contacto_telefono', 'contacto_email', 'cupo_maximo', 'requiere_registro'];
        exampleData = {
          'nombre*': 'Festival Llanero 2024',
          'tipo*': 'Festivo',
          'descripcion*': 'El evento cultural más importante de los llanos orientales',
          'fecha_inicio*': '2024-07-15',
          'fecha_fin': '2024-07-18',
          'hora_inicio*': '09:00',
          'ubicacion*': 'Parque Los Fundadores',
          'direccion*': 'Calle 37 con Carrera 30',
          'latitud': -4.1450,
          'longitud': -73.6300,
          'precio*': 'Gratis',
          'organizador*': 'Alcaldía de Villavicencio',
          'contacto_telefono': '+57 8 6700000',
          'contacto_email': 'eventos@villavicencio.gov.co',
          'cupo_maximo': 5000,
          'requiere_registro': false
        };
        break;
    }

    const worksheet = XLSX.utils.json_to_sheet([exampleData], { header: headers });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla');
    XLSX.writeFile(workbook, `plantilla_${type}.xlsx`);
  }
};
