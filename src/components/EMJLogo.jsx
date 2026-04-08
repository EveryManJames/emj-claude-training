export default function EMJLogo({ className = "", light = false }) {
  const textColor = light ? "#f2e8da" : "#253746";
  return (
    <div className={`inline-flex flex-col leading-none font-black uppercase tracking-tight select-none ${className}`}
      style={{ fontFamily: "'Arial Black', 'Impact', system-ui, sans-serif", color: textColor, lineHeight: 1.0 }}>
      <span>EVERY</span>
      <span>MAN</span>
      <span>JACK<sup style={{ fontSize: '0.4em', verticalAlign: 'super', fontWeight: 900 }}>®</sup></span>
    </div>
  );
}
