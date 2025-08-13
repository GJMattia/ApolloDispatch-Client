export default function PieChart({
  data,
  size = 80,
  thickness = 160,
  green = "#22c55e",
  red = "#ef4444",
  centerText = true,
}) {
  const good = Number(data?.true || 0);
  const bad = Number(data?.false || 0);
  const total = good + bad;

  // Handle empty case
  const greenDeg = total > 0 ? (good / total) * 360 : 0;

  const gradient =
    total === 0
      ? `#e5e7eb 0deg 360deg`
      : `${green} 0deg ${greenDeg}deg, ${red} ${greenDeg}deg 360deg`;

  const pieStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: `conic-gradient(${gradient})`,
    position: "relative",
    display: "inline-block",
  };

  // Donut hole
  const inner = Math.max(0, size - thickness);
  const holeInset = (size - inner) / 2;
  const hole =
    thickness < size ? (
      <div
        style={{
          position: "absolute",
          inset: holeInset,
          borderRadius: "50%",
          background: "white",
          display: "grid",
          placeItems: "center",
          textAlign: "center",
          padding: 8,
        }}
      >
        {centerText && (
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 14, opacity: 0.7 }}>{data?.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              {total ? Math.round((good / total) * 100) : 0}%
            </div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              {good}/{total}
            </div>
          </div>
        )}
      </div>
    ) : null;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
      <div style={pieStyle}>{hole}</div>

      {/* Legend */}
      <div style={{ fontSize: 14 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{data?.label}</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: green,
              display: "inline-block",
            }}
          />
          <span>Adequate: {good}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: red,
              display: "inline-block",
            }}
          />
          <span>Needs attention: {bad}</span>
        </div>
      </div>
    </div>
  );
}
