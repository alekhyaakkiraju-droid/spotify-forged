import { Link } from "react-router-dom";
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
      <div className="group/card relative aspect-square overflow-hidden rounded-xl bg-spotify-highlight shadow-card">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-spotify-highlight to-spotify-card text-4xl text-white/20">
            ♪
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition group-hover/card:bg-black/30" />
        <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-spotify-green text-lg text-black opacity-0 shadow-lg transition group-hover/card:translate-y-0 group-hover/card:opacity-100">
          ▶
        </div>
      </div>
      <div className="mt-4 px-1">
        <p className="truncate font-semibold text-white">{title}</p>
        {subtitle ? (
          <p className="mt-1 line-clamp-2 text-sm text-white/55">{subtitle}</p>
        ) : null}
      </div>
    </>
  );

  const className = clsx("group block text-left transition outline-none");

  if (href) {
    return (
      <Link to={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
