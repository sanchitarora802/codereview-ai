import FeatureIcon from "./FeatureIcon";

export default function Loading({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}) {
  const sizes = {
    small: 16,
    medium: 32,
    large: 48,
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <FeatureIcon
        icon="spinner"
        size={sizes[size]}
        className="text-blue-600"
      />
      {text && <p className={`text-gray-600 ${textSizes[size]}`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
