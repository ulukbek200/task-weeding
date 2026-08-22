export function PhonePreview({
  src,
  alt,
  className = "",
  iframeSrc,
  priority = false,
}) {
  return (
    <div className={`phone-preview ${className}`}>
      <div className="phone-speaker" />
      {iframeSrc ? (
        <iframe title={alt} src={iframeSrc} loading="lazy" />
      ) : (
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      )}
    </div>
  );
}
