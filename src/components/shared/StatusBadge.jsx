import { BADGE_COLORS } from "@/constants";

export default function StatusBadge({ status, children, size = "medium" }) {
  const sizes = {
    small: "px-2 py-0.5 text-xs",
    medium: "px-2.5 py-1 text-sm",
    large: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${
        BADGE_COLORS[status] || BADGE_COLORS.neutral
      } ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
