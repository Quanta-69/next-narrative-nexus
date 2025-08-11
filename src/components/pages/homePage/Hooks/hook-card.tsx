interface HookCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export function HookCard({
  label,
  value,
  className = "",
}: HookCardProps) {
  return (
    <div className={`card hook-card ${className}`}>
      <p>{label}</p>
      <h1>{value}</h1>
    </div>
  );
}
