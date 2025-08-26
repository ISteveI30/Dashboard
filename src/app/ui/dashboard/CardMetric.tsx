export default function CardMetric({
  title,
  value,
  icon,
  isError,
}: {
  title: string;
  value: number;
  icon: string;
  isError?: boolean;
}) {
  const iconClass = `fas ${icon} text-red-600 text-2xl`;
  const valueClass = `text-2xl font-bold ${isError ? "text-red-600" : "text-gray-900"}`;

  return (
    <div className="bg-white rounded-md shadow-sm border-l-4 border-red-600 p-4 flex justify-between items-center">
      <div>
        <h6 className="text-sm text-gray-500">{title}</h6>
        <h4 className={valueClass}>{value}</h4>
      </div>
      <div className="metric-icon">
        <i className={iconClass}></i>
      </div>
    </div>
  );
}
