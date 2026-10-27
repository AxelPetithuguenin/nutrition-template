import Link from "next/link";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import type { JournalArticle } from "@/types/site";

/**
 * Carte d'article du journal.
 *
 * Toute la carte est cliquable via un lien etendu (`after:absolute inset-0`)
 * pose sur le titre : la zone de clic couvre la carte entiere, mais un seul
 * lien est annonce aux technologies d'assistance, sans lien vide a cote.
 *
 * Donnees : `sections.journal.articles` dans `data/site.ts`.
 */
export function ArticleCard({
  article,
  className,
}: {
  article: JournalArticle;
  className?: string;
}) {
  const isExternal = /^https?:\/\//.test(article.href);
  // La rubrique figure deja dans l'etiquette posee sur l'image.
  const meta = [article.date, article.readingTime].filter(Boolean);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-theme bg-background",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-theme">
        <SmartImage
          image={article.image}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="image-zoom group-hover:scale-[1.04]"
        />

        {article.category && (
          <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3.5 py-1.5 text-[0.6875rem] tracking-[0.14em] text-ink uppercase backdrop-blur-sm">
            {article.category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-6">
        {meta.length > 0 && (
          <p className="text-xs text-muted tabular">{meta.join(" · ")}</p>
        )}

        <h3 className="mt-3 text-title text-ink transition-colors duration-500 group-hover:text-primary">
          <Link
            href={article.href}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
          {labels.readArticle}
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}

export default ArticleCard;
