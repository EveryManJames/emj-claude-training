export default function EMJLogo({ className = "", light = false, size = "md" }) {
  const textColor = light ? "#f2e8da" : "#253746";
  const sizes = {
    sm: { fontSize: 22, letterSpacing: '-0.5px' },
    md: { fontSize: 32, letterSpacing: '-1px' },
    lg: { fontSize: 44, letterSpacing: '-1.5px' },
    xl: { fontSize: 56, letterSpacing: '-2px' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`inline-flex flex-col leading-none select-none ${className}`}
      style={{
        fontFamily: "'Barlow Condensed', 'Arial Black', Impact, sans-serif",
        fontWeight: 900,
        textTransform: 'uppercase',
        color: textColor,
        lineHeight: 0.9,
        fontSize: s.fontSize,
        letterSpacing: s.letterSpacing,
      }}
    >
      <span>EVERY</span>
      <span>MAN</span>
      <span>
        JACK
        <sup style={{ fontSize: '0.38em', verticalAlign: 'top', fontWeight: 900, letterSpacing: 0 }}>®</sup>
      </span>
    </div>
  );
}
