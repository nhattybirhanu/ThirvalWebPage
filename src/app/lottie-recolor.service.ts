import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type RGBA = [number,number,number,number];

/** Utility: hex → rgba (0–1 floats) */
function hexToRgba(hex: string): RGBA {
  const h = hex.replace('#','');
  if (h.length !== 6) throw new Error(`Invalid hex "${hex}"`);
  const r = parseInt(h.slice(0,2), 16) / 255;
  const g = parseInt(h.slice(2,4), 16) / 255;
  const b = parseInt(h.slice(4,6), 16) / 255;
  return [r, g, b, 1];
}

/** Utility: format rgba to string key */
function rgbaKey([r,g,b,a]: RGBA): string {
  return `${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)},${a.toFixed(3)}`;
}

@Injectable({ providedIn: 'root' })
export class LottieRecolorService {
  // cache[ url + '|' + paletteKey ] = recolored JSON
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  /** Fetch & recolor (with caching) */
  async fetchAndRecolor(url: string, palette: string[]): Promise<any> {
    const paletteKey = palette.join(',');
    const cacheKey = `${url}|${paletteKey}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    const raw = await firstValueFrom(this.http.get<any>(url));
    const recolored = this.recolorAnimation(raw, palette);
    this.cache.set(cacheKey, recolored);
    return recolored;
  }

  /** Core recoloring (deterministic + preserve alpha) */
  recolorAnimation(animationData: any, palette: string[]): any {
    // Map originalColorKey → new RGBA
    const colorMap = new Map<string, RGBA>();
    const paletteRGBA = palette.map(hexToRgba);
    let nextIndex = 0;

    function getNewColor(orig: RGBA): RGBA {
      const key = rgbaKey(orig);
      if (colorMap.has(key)) return colorMap.get(key)!;
      const newCol = paletteRGBA[nextIndex % paletteRGBA.length];
      nextIndex++;
      colorMap.set(key, newCol);
      return newCol;
    }

    function traverseShapes(shapes: any[]) {
      for (const shape of shapes) {
        // Solid Fill
        if (shape.ty === 'fl' && shape.c?.k?.length === 4) {
          const [r,g,b,a] = shape.c.k as RGBA;
          const [nr,ng,nb] = getNewColor([r,g,b,a]);
          shape.c.k = [nr, ng, nb, a]; // preserve alpha
        }
        // Solid Stroke
        if (shape.ty === 'st' && shape.c?.k?.length === 4) {
          const [r,g,b,a] = shape.c.k as RGBA;
          const [nr,ng,nb] = getNewColor([r,g,b,a]);
          shape.c.k = [nr, ng, nb, a];
        }
        // Gradient Fill/Stroke
        if ((shape.ty === 'gf' || shape.ty === 'gs') && shape.g?.k) {
          const stops = shape.g.k as number[];
          // stops: [pos, r,g,b,a, pos, r,g,b,a, ...]
          for (let i = 1; i < stops.length; i += 5) {
            const aOrig = stops[i+3];
            const newCol = getNewColor([stops[i], stops[i+1], stops[i+2], aOrig]);
            stops[i]   = newCol[0];
            stops[i+1] = newCol[1];
            stops[i+2] = newCol[2];
            // keep stops[i+3] = aOrig
          }
        }
        // recurse
        if (Array.isArray(shape.it)) {
          traverseShapes(shape.it);
        }
      }
    }

    // Walk all layers
    if (Array.isArray(animationData.layers)) {
      for (const layer of animationData.layers) {
        if (Array.isArray(layer.shapes)) {
          traverseShapes(layer.shapes);
        }
      }
    }

    return animationData;
  }
}
