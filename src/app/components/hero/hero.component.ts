import {Component, Inject, Input, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser, NgIf} from "@angular/common";
import {buildCssProperty, buildStyle, ColorSchema, ColorService} from '../../color.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone:true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './hero.component.html',

})
export class HeroComponent implements OnInit{
  @Input() title:string | undefined = '';
  @Input() subtitle:string | undefined  = '';
  @Input() showCta = false;

  @Input() image:undefined |string
  detailCardColorSchema:ColorSchema ={
    accent:'#6366F1',
    background:'#4F46E5',
    primaryText:'#ffffff',
    secondaryText:'#ABABABFF'

  }
    constructor(private renderer:Renderer2,
                @Inject(PLATFORM_ID) private platformId: Object,
                private colorService:ColorService

    ) {
    }


  ngOnInit(): void {
    if (this.image){
      if (isPlatformBrowser(this.platformId))
      this.injectDynamicStyle(this.image)
      this.colorService.extractColorSchemeFromImageUrl(this.image,this.detailCardColorSchema).then(value => {
        this.detailCardColorSchema =value;
      })

    }

  }
  injectDynamicStyle(url: string) {
    const style = this.renderer.createElement('style');
    style.innerHTML = `
      .hero::before {
        background: url('${url}');
        background-position: center;
      background-repeat: no-repeat;
      }
    `;
    this.renderer.appendChild(document.head, style);
  }

  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}
