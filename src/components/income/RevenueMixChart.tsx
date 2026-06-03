"use client";

// Pure SVG donut chart — no external chart library needed
const segments = [
  { pct: 50, color: "#1d6efa" }, // Sales
  { pct: 35, color: "#22c55e" }, // Services
  { pct: 15, color: "#f97316" }, // Investments
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function donutPath(cx: number, cy: number, r: number, innerR: number, startAngle: number, endAngle: number) {
  const s = polarToCartesian(cx, cy, r, startAngle);
  const e = polarToCartesian(cx, cy, r, endAngle);
  const si = polarToCartesian(cx, cy, innerR, startAngle);
  const ei = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${si.x} ${si.y}`,
    "Z",
  ].join(" ");
}

export default function RevenueMixChart() {
  const cx = 70, cy = 70, r = 60, innerR = 38;
  let cursor = 0;

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const start = cursor;
        const end = cursor + seg.pct * 3.6;
        cursor = end;
        return (
          <path
            key={i}
            d={donutPath(cx, cy, r, innerR, start, end - 0.5)}
            fill={seg.color}
          />
        );
      })}
    </svg>
  );
}
