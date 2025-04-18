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
  @ViewChild("lottieComponent",{ static:false}) lottiComponent:LottieComponent| undefined
  constructor(@Inject(PLATFORM_ID) private platformId:any) {
    this.isBrowser = isPlatformBrowser(this.platformId)

  }

  ngOnInit(): void {
    if (this.animationUrl){

      if (isPlatformBrowser(this.platformId))
      {
        // this.loadAnimation();
        // this.lottiComponent.options={}

        if (this.lottiComponent){
          this.lottiComponent.complete.subscribe(value => {
            console.log("On animation created com")

          })
        }
        this.options={
          path:this.animationUrl,
          loop:true
        }
       // this.lottiComponent.options=this.options
      }
      }
    }


  ngAfterViewInit() {



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
  // options():Signal<AnimationOptions> {
  //   return {
  //     path: '/assets/your-animation.json', // Path to your Lottie file
  //     loop: true,
  //     autoplay: true,
  //   };
  // }

  protected readonly buildStyle = buildStyle;
  protected readonly buildCssProperty = buildCssProperty;
}

