import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  private renderer: Renderer2;
  private currentLang: string = 'en';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeLanguage(newLang: string) {
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';

    this.renderer.setAttribute(document.documentElement, 'dir', newDir);
    this.renderer.setAttribute(document.documentElement, 'lang', newLang);

    this.currentLang = newLang;
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }
}