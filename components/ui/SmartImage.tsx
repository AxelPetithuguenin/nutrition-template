import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/types/site";

/**
 * Image du site, alimentee par un objet `SiteImage` de `data/site.ts`.
 *
 * Avantages par rapport a `next/image` utilise directement :
 *  - le `alt` et le cadrage viennent de la configuration ;
 *  - les fichiers SVG (logos, visuels de substitution) sont servis tels quels,
 *    l'optimiseur d'images Next.js ne les traitant pas ;
 *  - une image absente de la configuration ne casse pas le rendu.
 */
export function SmartImage({
  image,
  className,
  fill,
  sizes,
  priority,
  width,
  height,
}: {
  image?: SiteImage;
  className?: string;
  /** L'image remplit son conteneur (qui doit etre en `position: relative`). */
  fill?: boolean;
  /** Indication de taille pour le navigateur (responsive). */
  sizes?: string;
  /** A activer uniquement pour le visuel visible au chargement (hero). */
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  if (!image?.src) return null;

  const isSvg = image.src.toLowerCase().endsWith(".svg");
  const style = image.position ? { objectPosition: image.position } : undefined;

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        unoptimized={isSvg}
        className={cn("object-cover", className)}
        style={style}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={width ?? image.width ?? 1200}
      height={height ?? image.height ?? 800}
      sizes={sizes}
      priority={priority}
      unoptimized={isSvg}
      className={className}
      style={style}
    />
  );
}

export default SmartImage;
