export default function Card({
  children,
  title,
  subtitle,
  footer,
  className = "",
  hover = false,
  padding = true,
  border = true,
}) {
  const baseClasses = "bg-white rounded-lg shadow-sm";
  const borderClasses = border ? "border border-gray-100" : "";
  const hoverClasses = hover
    ? "hover:shadow-lg transition-shadow duration-200"
    : "";
  const paddingClasses = padding ? "p-6" : "";

  return (
    <div
      className={`${baseClasses} ${borderClasses} ${hoverClasses} ${className}`}
    >
      {(title || subtitle) && (
        <div className={`${padding ? "px-6 pt-6 pb-4" : "pb-4"}`}>
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className={paddingClasses}>{children}</div>

      {footer && (
        <div
          className={`${
            padding ? "px-6 pb-6 pt-0" : "pt-4"
          } border-t border-gray-100`}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
