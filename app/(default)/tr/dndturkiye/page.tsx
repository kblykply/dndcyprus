// Example usage (optional)
// app/(site)/tr/ofis/turkiye/page.tsx
import TurkiyeOfficeHeroSpotlight from "@/app/components/office/TurkiyeOfficeHeroSpotlight";
import TurkiyeOfficeLocationTimes from "@/app/components/office/TurkiyeOfficeLocationTimes";
import ContactForm from "@/app/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  locale: "tr",
  path: "/dndturkiye",
  title: "Türkiye Ofisi İstanbul | Yatırım Danışmanlığı – DND Cyprus",
  description:
    "Başakşehir, İstanbul'daki DND Türkiye ofisi, Kıbrıs projelerimiz için yatırımcılara uçtan uca danışmanlık sunar. Online görüşme veya ofis randevusu planlayın.",
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
