// declarations.d.ts
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "*.css";

declare module "swiper/css";
declare module "swiper/css/*";
// (optionally list specifics too)
declare module "swiper/css/pagination";
declare module "swiper/css/navigation";
// page-flip (sayfa çevirme motoru, türleri pakette yok): katalogda kullanılan kısım
declare module "page-flip/dist/js/page-flip.module.js" {
  export type PageFlipSettings = {
    width: number; height: number; size?: "fixed" | "stretch"; showCover?: boolean; usePortrait?: boolean;
    mobileScrollSupport?: boolean; drawShadow?: boolean; maxShadowOpacity?: number; flippingTime?: number;
    showPageCorners?: boolean; startZIndex?: number; startPage?: number; autoSize?: boolean; swipeDistance?: number;
    minWidth?: number; maxWidth?: number; minHeight?: number; maxHeight?: number;
  };
  export class PageFlip {
    constructor(el: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(items: HTMLElement[]): void;
    on(event: "flip" | "changeState" | "changeOrientation" | "init", cb: (e: { data: unknown }) => void): PageFlip;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    turnToPage(index: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
  }
}
