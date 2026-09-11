import { site } from "@/lib/site";

/** Public business contacts only; no residential address or personal number. */
export function BusinessContact() {
  return (
    <address className="mt-4 space-y-2 text-sm not-italic text-warm-mist">
      <p>
        <a href={`mailto:${site.founderEmail}`} className="break-all text-cyan-soft underline underline-offset-4 hover:text-cyan-core">
          {site.founderEmail}
        </a>
      </p>
      <p>
        <a href={site.phoneHref} className="text-cyan-soft underline underline-offset-4 hover:text-cyan-core" aria-label={`Call BSTS at ${site.phone}`}>
          {site.phone}
        </a>
      </p>
    </address>
  );
}
