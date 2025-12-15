type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 20,
        boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
      }}
    >
      <p style={{ fontSize: 14, color: "#666" }}>{title}</p>
      <h2 style={{ fontSize: 26, marginTop: 8 }}>{value}</h2>
    </div>
  );
}
