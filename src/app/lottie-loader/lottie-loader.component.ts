import {
  AfterViewInit,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject,
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


@Component({
  selector: 'app-lottie-loader',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lottie-loader.component.html',
  styleUrl: './lottie-loader.component.scss',
  standalone:true,
  imports: [NgIf,
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
  constructor(@Inject(PLATFORM_ID) private platformId: any) {

  }

  ngOnInit(): void {
    if (this.animationUrl){
      }
    }

  ngAfterViewInit() {
    this.isBrowser = isPlatformBrowser(this.platformId)

    if (this.containerRef&&isPlatformBrowser(this.platformId)){
      this.loadAnimation();
    }

  }
 async loadAnimation(){
    const lottie = await import('lottie-web');
    let lottieAnimation= lottie.default.loadAnimation({
      container: this.containerRef!.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.animationUrl || 'assets/animations/welcome.json',

    });
  }


  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}

