import { useEffect, useRef } from "react";
import type { ApiReport } from "@/lib/api";
import { categoryLabels } from "@/lib/api";

export function RealMap({
  reports,
  className,
  routePoints,
  onPickLocation,
}: {
  reports: ApiReport[];
  className?: string;
  routePoints?: Array<{ lat: number; lng: number }>;
  onPickLocation?: (point: { lat: number; lng: number }) => void;
}) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!elRef.current || mapRef.current) return;
      const L = await import("leaflet");
      if (cancelled || !elRef.current) return;

      const map = L.map(elRef.current).setView([-22.8832, -43.1034], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      map.on("click", (event: any) => {
        onPickLocation?.({ lat: event.latlng.lat, lng: event.latlng.lng });
      });

      mapRef.current = map;
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    async function draw() {
      if (!mapRef.current) return;
      const L = await import("leaflet");

      layersRef.current.forEach((layer) => layer.remove());
      layersRef.current = [];

      reports.forEach((report) => {
        const [lng, lat] = report.location.coordinates;
        const positive = ["iluminacao_boa", "local_seguro"].includes(report.category);
        const marker = L.circleMarker([lat, lng], {
          radius: 9,
          color: positive ? "#16a34a" : "#dc2626",
          fillColor: positive ? "#22c55e" : "#ef4444",
          fillOpacity: 0.85,
          weight: 2,
        }).addTo(mapRef.current);

        marker.bindPopup(`
          <strong>${report.title}</strong><br />
          ${categoryLabels[report.category]}<br />
          Gravidade: ${report.severity}<br />
          ${report.address || ""}
        `);
        layersRef.current.push(marker);
      });

      if (routePoints && routePoints.length > 1) {
        const polyline = L.polyline(routePoints.map((p) => [p.lat, p.lng]), {
          color: "#7c3aed",
          weight: 6,
        }).addTo(mapRef.current);
        layersRef.current.push(polyline);
        mapRef.current.fitBounds(polyline.getBounds(), { padding: [30, 30] });
      }
    }

    const timer = setTimeout(draw, 200);
    return () => clearTimeout(timer);
  }, [reports, routePoints]);

  return <div ref={elRef} className={className ?? "h-[520px] w-full"} />;
}
