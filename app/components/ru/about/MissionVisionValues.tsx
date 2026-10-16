// app/components/ru/about/MissionVisionValues.tsx
import type { ReactNode } from "react";
import MvvMedals from "@/app/components/azure/about/MvvMedals";

type MVVProps = {
  kicker?: string;
  title?: ReactNode;
  missionTitle?: string;
  missionText?: string;
  visionTitle?: string;
  visionText?: string;
  valuesTitle?: string;
  values?: string[];
  /** 28px framed image in the bottom row */
};

// Azure: three boxes (mission, vision, values) + framed image and CTA panel underneath.
export default function MissionVisionValues({
  kicker = "DND Cyprus",
  title = <>Миссия, видение <b>и ценности</b></>,
  missionTitle = "Наша миссия",
  missionText = "Создавать проекты, которые повышают качество жизни на Северном Кипре, соединяя эстетичную архитектуру, инженерную дисциплину и устойчивые решения, и приумножать ценность благодаря принципам прозрачности, безопасности и своевременной сдачи.",
  visionTitle = "Наше видение",
  visionText = "Стать эталонным брендом инновационного девелопмента на Северном Кипре и лидировать в отрасли по качеству, удовлетворённости клиентов и экологической ответственности.",
  valuesTitle = "Наши ценности",
  values = [
    "Честность и прозрачность",
    "Ориентация на качество",
    "Культура безопасности (ОТ, ПБ и ООС)",
    "Устойчивое развитие",
    "Удовлетворённость клиентов",
    "Своевременная сдача",
    "Сотрудничество и надёжные поставки",
  ],
}: MVVProps) {
  return (
    <section id="mission-vision" className="az-section" aria-label="Миссия, видение и ценности">
      <div className="az-wrap">
        <div className="az-head">
          <span className="az-kicker rv">{kicker}</span>
          <h2 className="az-h2 sm rv d1">{title}</h2>
          <p className="az-lead rv d2">
            Наш подход, ориентированный на ценности, опирается на прозрачные, измеримые и устойчивые принципы.
          </p>
        </div>

        {/* misyon, vizyon ve değerler + projelere soru/düğme (ortak bileşen, metinler bu dilin) */}
        <MvvMedals mission={{ title: missionTitle, text: missionText }} vision={{ title: visionTitle, text: visionText }} valuesTitle={valuesTitle} values={values}
          cta={{ text: "Хотите увидеть, как наши ценности воплощаются в проектах?", label: "Смотреть проекты", href: "/ru/projects" }} />
      </div>
    </section>
  );
}
