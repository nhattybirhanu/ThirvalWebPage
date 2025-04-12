import {Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {FinalColor} from 'extract-colors/lib/types/Color';
import { isPlatformBrowser} from '@angular/common';
import { extractColors } from "extract-colors/lib/worker-wrapper"

@Injectable({
  providedIn: 'root'
})
export class ColorService {
   schemaMap:Map<string,ColorSchema>=new Map()
  isBrowser:boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId)

  }

  async extractColorSchemeFromImageUrl(url:string,defaultColorSchema:ColorSchema){
   const  schema= this.schemaMap.has(url)?this.schemaMap.get(url): (isPlatformBrowser(this.platformId)?await getColorSchemaFromImage(url):defaultColorSchema)

    return schema || defaultColorSchema
  }


}
export function buildCssProperty(key: string, value: string): string {
  return `${key}: ${value};`;
}

export function buildStyle(properties: string[]): string {
  return properties.filter(Boolean).join(' ');
}

export interface ColorSchema {
  background: string;
  primaryText: string;
  secondaryText: string;
  accent?: string;
  contrastText?: string;
  raw?: string[];
}


export async function getColorSchemaFromImage(
  // image: HTMLImageElement,
  url:string
): Promise<ColorSchema | null> {
  try {
    const colors: FinalColor[] = await extractColors(url, {
      pixels: 64000,
      distance: 0.22,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333

    });
    if (colors.length < 3) return null;

    return {
      background: colors[0].hex,
      primaryText: colors[1].hex,
      secondaryText: colors[2].hex,
      accent: colors[3]?.hex,
      contrastText: getContrastTextFromRgb({
        red: colors[0].red,
        green: colors[0].green,
        blue: colors[0].blue,
      }),
      raw: colors.map((c) => c.hex),
    };
  } catch (err) {
    console.error('Error extracting color schema:', err);
    return null;
  }
}

function getContrastTextFromRgb(rgb: { red: number; green: number; blue: number }): string {
  const { red, green, blue } = rgb;
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 125 ? '#000000' : '#ffffff';
}
