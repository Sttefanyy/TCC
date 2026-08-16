import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export type ReportCategory =
  | "assedio"
  | "roubo"
  | "violencia"
  | "local_escuro"
  | "pouco_movimento"
  | "iluminacao_boa"
  | "local_seguro"
  | "outro";

export interface ApiReport {
  _id: string;
  title: string;
  description?: string;
  category: ReportCategory;
  severity: number;
  address?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  confirmations?: Array<unknown>;
  denials?: Array<unknown>;
  createdAt: string;
}

export const categoryLabels: Record<ReportCategory, string> = {
  assedio: "Assédio / Importunação",
  roubo: "Roubo / Furto",
  violencia: "Violência",
  local_escuro: "Local escuro",
  pouco_movimento: "Pouco movimento",
  iluminacao_boa: "Boa iluminação",
  local_seguro: "Local seguro",
  outro: "Outro",
};

const STORAGE_REPORTS = "@tcc_mock_reports";
const STORAGE_USER = "@tcc_user";
const STORAGE_TOKEN = "@tcc_token";

const initialReports: ApiReport[] = [
  {
    _id: "mock-1",
    title: "Rua com pouca iluminação",
    description: "Trecho com iluminação fraca próximo ao ponto de ônibus.",
    category: "local_escuro",
    severity: 4,
    address: "Fonseca, Niterói - RJ",
    location: { type: "Point", coordinates: [-43.0928, -22.8837] },
    confirmations: [{ user: "1" }, { user: "2" }],
    denials: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    _id: "mock-2",
    title: "Local seguro e movimentado",
    description: "Região bem iluminada, com comércio aberto e movimento.",
    category: "local_seguro",
    severity: 1,
    address: "Icaraí, Niterói - RJ",
    location: { type: "Point", coordinates: [-43.1089, -22.9041] },
    confirmations: [{ user: "1" }],
    denials: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    _id: "mock-3",
    title: "Relato de assédio",
    description: "Usuária relatou abordagem insistente no período da noite.",
    category: "assedio",
    severity: 5,
    address: "Centro, Niterói - RJ",
    location: { type: "Point", coordinates: [-43.1245, -22.8910] },
    confirmations: [{ user: "1" }, { user: "2" }, { user: "3" }],
    denials: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    _id: "mock-4",
    title: "Boa iluminação",
    description: "Rua com iluminação adequada e presença constante de pessoas.",
    category: "iluminacao_boa",
    severity: 1,
    address: "São Domingos, Niterói - RJ",
    location: { type: "Point", coordinates: [-43.1296, -22.9027] },
    confirmations: [],
    denials: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    _id: "mock-5",
    title: "Área com pouco movimento",
    description: "Trecho fica muito vazio após 20h.",
    category: "pouco_movimento",
    severity: 3,
    address: "Santa Rosa, Niterói - RJ",
    location: { type: "Point", coordinates: [-43.1015, -22.8982] },
    confirmations: [{ user: "1" }],
    denials: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

function readReports(): ApiReport[] {
  if (typeof window === "undefined") return initialReports;
  const raw = localStorage.getItem(STORAGE_REPORTS);
  if (!raw) {
    localStorage.setItem(STORAGE_REPORTS, JSON.stringify(initialReports));
    return initialReports;
  }
  return JSON.parse(raw);
}

function writeReports(reports: ApiReport[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_REPORTS, JSON.stringify(reports));
  }
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_USER);
  return raw ? JSON.parse(raw) : null;
}

export function saveAuth(data: { token: string; user: any }) {
  localStorage.setItem(STORAGE_TOKEN, data.token);
  localStorage.setItem(STORAGE_USER, JSON.stringify(data.user));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
}

export async function register(data: { name: string; email: string; phone?: string; password: string }) {
  const user = {
    id: "mock-user",
    name: data.name || "Usuária Teste",
    email: data.email,
    phone: data.phone,
    role: "user",
    trustScore: 80,
  };
  const response = { token: "mock-token-sem-banco", user };
  saveAuth(response);
  return response;
}

export async function login(email: string, password: string) {
  const user = {
    id: "mock-user",
    name: "Usuária Teste",
    email,
    role: "user",
    trustScore: 80,
  };
  const response = { token: "mock-token-sem-banco", user };
  saveAuth(response);
  return response;
}

export async function listReports(category = "") {
  const reports = readReports();
  return category ? reports.filter((report) => report.category === category) : reports;
}

export async function createReport(data: {
  title: string;
  description?: string;
  category: ReportCategory;
  severity: number;
  address?: string;
  latitude: number;
  longitude: number;
  isAnonymous?: boolean;
}) {
  const report: ApiReport = {
    _id: `mock-${Date.now()}`,
    title: data.title,
    description: data.description,
    category: data.category,
    severity: Number(data.severity),
    address: data.address,
    location: { type: "Point", coordinates: [Number(data.longitude), Number(data.latitude)] },
    confirmations: [],
    denials: [],
    createdAt: new Date().toISOString(),
  };
  const reports = [report, ...readReports()];
  writeReports(reports);
  return report;
}

export async function confirmReport(id: string) {
  const reports = readReports().map((report) => {
    if (report._id !== id) return report;
    return { ...report, confirmations: [...(report.confirmations || []), { user: "mock-user" }] };
  });
  writeReports(reports);
  return reports.find((report) => report._id === id);
}

export async function denyReport(id: string) {
  const reports = readReports().map((report) => {
    if (report._id !== id) return report;
    return { ...report, denials: [...(report.denials || []), { user: "mock-user" }] };
  });
  writeReports(reports);
  return reports.find((report) => report._id === id);
}

export async function searchAddress(query: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "5");
  url.searchParams.set("countrycodes", "br");

  const response = await fetch(url.toString(), { headers: { "Accept-Language": "pt-BR" } });
  if (!response.ok) throw new Error("Erro ao buscar endereço");
  return response.json();
}

export async function getWalkingRoute(origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) {
  const coordinates = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  const url = `https://router.project-osrm.org/route/v1/foot/${coordinates}?overview=full&geometries=geojson&alternatives=true&steps=true`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Erro ao calcular rota");
  return response.json();
}

function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export async function scoreSafeRoutes(routes: Array<{ name?: string; distance?: number; duration?: number; points: Array<{ lat: number; lng: number }> }>) {
  const reports = readReports();
  const negative = ["assedio", "roubo", "violencia", "local_escuro", "pouco_movimento", "outro"];

  const alternatives = routes.map((route, index) => {
    let risk = 0;
    for (const report of reports) {
      const [lng, lat] = report.location.coordinates;
      const near = route.points.some((point) => distanceMeters(point, { lat, lng }) < 300);
      if (near && negative.includes(report.category)) risk += report.severity * 10;
      if (near && !negative.includes(report.category)) risk -= 8;
    }
    const safetyScore = Math.max(0, Math.min(100, 100 - risk));
    return {
      ...route,
      name: route.name || `Rota ${index + 1}`,
      safetyScore,
      riskScore: Math.max(0, risk),
      consideredReports: [],
    };
  }).sort((a, b) => b.safetyScore - a.safetyScore);

  return { recommended: alternatives[0], alternatives };
}

export async function createEmergencyContact(data: any) {
  return { _id: `contact-${Date.now()}`, ...data };
}

export async function listEmergencyContacts() {
  return [
    { _id: "contact-1", name: "Contato de confiança", phone: "(21) 99999-9999", relationship: "Família" },
  ];
}
