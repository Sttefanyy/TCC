export type RiskLevel = "baixo" | "medio" | "alto" | "muito-alto";

export interface RouteOption {
  id: string;
  name: string;
  time: string;
  distance: string;
  score: number;
  tone: "safe" | "warn";
}

export const routeOptions: RouteOption[] = [
  { id: "segura", name: "Rota mais segura", time: "25 min", distance: "6,2 km", score: 82, tone: "safe" },
  { id: "alt1", name: "Rota alternativa 1", time: "28 min", distance: "6,8 km", score: 63, tone: "warn" },
  { id: "alt2", name: "Rota alternativa 2", time: "24 min", distance: "5,7 km", score: 48, tone: "warn" },
];

export interface SafetyFactor {
  label: string;
  value: number;
}

export const safetyFactors: SafetyFactor[] = [
  { label: "Iluminação pública", value: 0.85 },
  { label: "Movimentação de pessoas", value: 0.78 },
  { label: "Relatos negativos", value: 0.15 },
  { label: "Confiança dos relatos", value: 0.8 },
  { label: "Ocorrências históricas", value: 0.2 },
];

export type ReportSeverity = "perigoso" | "atencao";

export interface CommunityReport {
  id: string;
  address: string;
  type: string;
  date: string;
  description: string;
  severity: ReportSeverity;
}

export const communityReports: CommunityReport[] = [
  {
    id: "r1",
    address: "Rua das Acácias, 123",
    type: "Assédio",
    date: "12/05/2025 19:30",
    description: "Perseguição por homem em moto.",
    severity: "perigoso",
  },
  {
    id: "r2",
    address: "Av. Central, 450",
    type: "Roubo",
    date: "11/05/2025 22:10",
    description: "Roubo de celular no semáforo.",
    severity: "perigoso",
  },
  {
    id: "r3",
    address: "Rua das Flores, 78",
    type: "Assédio",
    date: "10/05/2025 20:45",
    description: "Comentários insistentes.",
    severity: "atencao",
  },
];

export interface EmergencyContact {
  name: string;
  number: string;
}

export const emergencyContacts: EmergencyContact[] = [
  { name: "Polícia Militar", number: "190" },
  { name: "Guarda Municipal", number: "153" },
  { name: "Central de Atendimento à Mulher", number: "180" },
];

export const reportTypes = [
  "Assédio",
  "Roubo",
  "Furto",
  "Iluminação precária",
  "Local deserto",
  "Perseguição",
  "Outro",
];
