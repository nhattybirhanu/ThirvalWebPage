import {
  AfterViewInit,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, Inject,
  input,
  Input,
  InputSignal,
  OnInit, PLATFORM_ID,
  Signal,
  signal, ViewChild,
  WritableSignal
} from '@angular/core';
import player from 'lottie-web';

import {isPlatformBrowser, NgIf} from '@angular/common';
import {buildCssProperty, buildStyle} from '../color.service';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import {HttpClient} from '@angular/common/http';
import {colorify} from 'lottie-colorify';
import {LottieRecolorService} from '../lottie-recolor.service';
// import {colorify} from 'lottie-colorify';

const lightPalette = ['#2065D1','#74C0FC','#A5D8FF','#E0F7FF'];
const darkPalette  = ['#74C0FC','#4DABF7','#2A2A2A','#121212'];
@Component({
  selector: 'app-lottie-loader',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lottie-loader.component.html',
  styleUrl: './lottie-loader.component.scss',
  standalone:true,
  imports: [NgIf, LottieComponent,
  ],
})
export class LottieLoaderComponent implements OnInit, AfterViewInit{
  @Input()
  animationUrl:string | undefined
  @Input()
  image:string | undefined
  @ViewChild('lottieContainer') containerRef: ElementRef | undefined;
  @Input() width:string="300px"
  @Input() height:string="300px"
  isBrowser:boolean=false;
  @Input() options:AnimationOptions|undefined
  @Input() alt:string=""
  @ViewChild("lottieComponent",{ static:false}) lottiComponent:LottieComponent| undefined

  constructor(@Inject(PLATFORM_ID) private platformId:any, private lottieRecolorService:LottieRecolorService) {
    this.isBrowser = isPlatformBrowser(this.platformId)

  }

  ngOnInit(): void {
    if (this.animationUrl&&isPlatformBrowser(this.platformId)){
      const styles = getComputedStyle(document.documentElement);
      const palette = [
        styles.getPropertyValue('--primary').trim(),
        styles.getPropertyValue('--btn-hover')?.trim()   || '#74C0FC',
        styles.getPropertyValue('--gradient-blue-start').trim(),
        styles.getPropertyValue('--gradient-light-start').trim()
      ];
    this.lottieRecolorService.fetchAndRecolor(this.animationUrl,lightPalette).then(animationData => {

      this.options={
        animationData:animationData,
        loop:true
      }
    })

      }
    }


  ngAfterViewInit() {



  }


  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}

/**
 * Convert a hex string `#RRGGBB` to an [r,g,b,a] tuple
 * with values in [0,1], matching Lottie’s gradient format.
 */
/**
 * Convert a hex string `#RRGGBB` to an [r,g,b,a] tuple (0–1 floats).

/**
 * Recolors a Lottie animation JSON by cycling through a palette.
 * It replaces:
 *  - solid fills (ty:'fl') and strokes (ty:'st')
 *  - gradient fills (ty:'gf') and gradient strokes (ty:'gs')
 *
 * @param animationData  The parsed Lottie JSON
 * @param palette        Array of HEX strings (e.g. ['#2065D1','#74C0FC',...])
 * @returns               The same animationData mutated with new colors
 */

