export default function PieChart2({
  data, // { label: 'Drive Status', 0: 2, 1: 534, 2: 234 }
  size = 100,
  thickness = 160,
  centerText = true,
  colors = ["#22c55e", "#facc15", "#ef4444"], // green, yellow, red
}) {
  const categories = ["0", "1", "2"];
  const total = categories.reduce(
    (sum, key) => sum + Number(data[key] || 0),
    0
  );

  let acc = 0;
  const gradient = categories
    .map((key, idx) => {
      const value = Number(data[key] || 0);
      const start = (acc / total) * 360;
      acc += value;
      const end = (acc / total) * 360;
      return `${colors[idx]} ${start}deg ${end}deg`;
    })
    .join(", ");

  const pieStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    background: total > 0 ? `conic-gradient(${gradient})` : "#e5e7eb",
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
            <div style={{ fontSize: 14, opacity: 0.7 }}>{data.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              {total ? `${total} total` : "0"}
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
        <div style={{ fontWeight: 600, marginBottom: 8 }}>{data.label}</div>
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
              background: colors[0],
              display: "inline-block",
            }}
          />
          <span>Adequate: {data[0] || 0}</span>
        </div>
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
              background: colors[1],
              display: "inline-block",
            }}
          />
          <span>Driveable with issue: {data[1] || 0}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: colors[2],
              display: "inline-block",
            }}
          />
          <span>Grounded: {data[2] || 0}</span>
        </div>
      </div>
    </div>
  );
}
