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
 */
function hexToRgba(hex: string): [number,number,number,number] {
  const h = hex.replace('#','');
  if (h.length !== 6) throw new Error(`Invalid hex "${hex}"`);
  const r = parseInt(h.slice(0,2), 16) / 255;
  const g = parseInt(h.slice(2,4), 16) / 255;
  const b = parseInt(h.slice(4,6), 16) / 255;
  return [r, g, b, 1];
}

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
export function recolorLottie(
  animationData: any,
  palette: string[]
): any {
  // precompute RGBA tuples for the palette
  const colors = palette.map(hexToRgba);
  let cursor = 0;

  // pick the next color, cycling
  function nextColor(): [number,number,number,number] {
    const col = colors[cursor % colors.length];
    cursor++;
    return col;
  }

  // traverse shape array
  function traverseShapes(shapes: any[]) {
    for (const shape of shapes) {
      // Solid Fill
      if (shape.ty === 'fl' && shape.c && Array.isArray(shape.c.k)) {
        shape.c.k = nextColor();
      }
      // Solid Stroke
      if (shape.ty === 'st' && shape.c && Array.isArray(shape.c.k)) {
        shape.c.k = nextColor();
      }
      // Gradient Fill or Stroke
      if ((shape.ty === 'gf' || shape.ty === 'gs') && shape.g && Array.isArray(shape.g.k)) {
        const stops = shape.g.k as number[];
        // format: [pos0, r0,g0,b0,a0, pos1, r1,g1,b1,a1, ...]
        for (let i = 1; i < stops.length; i += 5) {
          const [r,g,b,a] = nextColor();
          stops[i]   = r;
          stops[i+1] = g;
          stops[i+2] = b;
          stops[i+3] = a;
        }
      }
      // Recurse into nested items (compound shapes)
      if (Array.isArray(shape.it)) {
        traverseShapes(shape.it);
      }
    }
  }

  // Walk every layer’s shapes
  if (Array.isArray(animationData.layers)) {
    for (const layer of animationData.layers) {
      if (Array.isArray(layer.shapes)) {
        traverseShapes(layer.shapes);
      }
    }
  }

  return animationData;
}
