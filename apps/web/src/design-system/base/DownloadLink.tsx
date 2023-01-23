export const DownloadLink = ({
  href,
  title,
  size,
  type,
}: {
  href: string;
  size: string;
  title: string;
  type: string;
}) => (
  <div className="fr-download">
    <p>
      <a href={href} download className="fr-download__link">
        {title}
        <span className="fr-download__detail">
          {type} – {size}
        </span>
      </a>
    </p>
  </div>
);
