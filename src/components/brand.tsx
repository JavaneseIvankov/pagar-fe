export function BrandLogo({ variant }: { variant: "icon" | "icon-wordmark" }) {
  switch (variant) {
    case "icon":
      return <div>Icon</div>;
    case "icon-wordmark":
      return <div>Icon Wordmark</div>;
  }
}
