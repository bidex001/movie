"use client";

export const BentoGrid = ({ className = "", children }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 md:auto-rows-[19rem] md:grid-cols-3 ${className}`}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className = "",
  eyebrow,
  title,
  description,
  header,
  children,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090b]/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%)] opacity-90 transition duration-500 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        {header ? <div className="mb-5">{header}</div> : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/80">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            {description}
          </p>
        ) : null}
        <div className="mt-5 flex-1">{children}</div>
      </div>
    </div>
  );
};
