// Example usage (optional)
// app/(site)/tr/ofis/turkiye/page.tsx
import TurkiyeOfficeHeroSpotlight from "@/app/components/en/office/TurkiyeOfficeHeroSpotlight";
import TurkiyeOfficeLocationTimes from "@/app/components/en/office/TurkiyeOfficeLocationTimes";
import ContactForm from "@/app/components/en/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "en",
  path: "/dndturkiye",
  title: "Türkiye Office in Istanbul – Investor Advice | DND Cyprus",
  description:
    "Our Istanbul office in Başakşehir offers investors transparent, end-to-end advice on DND Cyprus projects. Book an online meeting or an office appointment today.",
});
export default function Page() {
  return (
    <main>
      <TurkiyeOfficeHeroSpotlight

      />
        <TurkiyeOfficeLocationTimes />
              <ContactForm />

    </main>
  );
}
