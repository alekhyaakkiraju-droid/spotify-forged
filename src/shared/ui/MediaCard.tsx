import clsx from "clsx";

interface MediaCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  href?: string;
  onClick?: () => void;
}

export function MediaCard({
  title,
  subtitle,
  imageUrl,
  href,
  onClick,
}: MediaCardProps) {
  const content = (
    <>
      <div className="aspect-square overflow-hidden rounded-md bg-spotify-highlight shadow-lg">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30">♪</div>
        )}
      </div>
      <div className="mt-3">
        <p className="truncate font-medium text-white">{title}</p>
        {subtitle ? <p className="truncate text-sm text-white/60">{subtitle}</p> : null}
      </div>
    </>
  );

  const className = clsx("group block text-left transition hover:opacity-80");

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
