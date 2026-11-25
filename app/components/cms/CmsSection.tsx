// app/components/cms/CmsSection.tsx
// Panelden düzenlenebilir bölüm: kapsamın (lib/content/scopes) o dildeki bölüm içeriğini veritabanındaki değişikliklerle
// birleştirip verilen bileşene prop olarak verir. Koddaki yerleşim propları (size, id, mode…) aynen geçer.
import type { ComponentType } from "react";
import { getScopeContent } from "@/lib/content/store";
import type { ContentLocale } from "@/lib/content/core";
import type { ScopeKey } from "@/lib/content/scopes";

type Props = {
  scope: ScopeKey;
  section: string;
  /** içerik dili (bileşene geçmez; bileşen dil isterse ayrıca locale="…" verilir) */
  lang: ContentLocale;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: ComponentType<any>;
  [prop: string]: unknown;
};

export default async function CmsSection({ scope, section, lang, as: Component, ...rest }: Props) {
  const content = (await getScopeContent(scope, lang)) as Record<string, unknown>;
  const props = (content[section] ?? {}) as Record<string, unknown>;
  return <Component {...rest} {...props} />;
}
