import {
  useState,
} from "react";

function ImageFallback({
  src,
  alt,
  className = "",
  ...props
}) {
  const [
    failed,
    setFailed,
  ] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-fallback ${className}`}
        role="img"
        aria-label={alt}
      >
        <span>♡</span>
        <small>
          Memory
        </small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() =>
        setFailed(true)
      }
      {...props}
    />
  );
}

export default ImageFallback;