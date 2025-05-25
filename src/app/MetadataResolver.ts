// metadata.resolver.ts
import {Inject, Injectable, makeStateKey, PLATFORM_ID, Renderer2, RendererFactory2, TransferState} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {ChallengeService} from "./challenge.service";
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {DOCUMENT, isPlatformBrowser, Location} from "@angular/common";
import {slugify} from './util';
const META_KEY = makeStateKey<MetaData>('meta-data');

@Injectable({ providedIn: 'root' })
export class MetadataResolver implements Resolve<any> {
  private renderer: Renderer2;

  constructor(@Inject(PLATFORM_ID) private platformId: any,private challengeService: ChallengeService,
              private meta:Meta,private title:Title,
              private transferState: TransferState,
              private location:Location,
              @Inject(DOCUMENT) private doc: Document,
              private rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let $id = route.params['id']
    let page:Page=route.data['page']
    return this.getMeta(page,$id).pipe(map(value => {
      console.log("Applying meta ",value)
      this.applyMetaData(value)
      return value;
    }));

  }

  getMeta(page:Page,$id:string):Observable<MetaData>{
    switch (page) {
      case Page.Challenge:{
       return  this.challengeService.getChallenge($id).pipe(map(value => {
          let metaData:MetaData={title:value.title,description:value.description,image:value.media.imageUrl || '',url:buildUrl("challenges",value.title)}
          return metaData}))
      }
      case Page.ChallengePack:
        return  this.challengeService.getChallengePack($id).pipe(map(value => {
          let metaData:MetaData={title:value.title,description:value.description,image:value.media.imageUrl || '',keyword:value.tags,url:buildUrl("challenges",value.title)}
          return metaData}))
      case Page.Explorer:
        return this.challengeService.getCategoryChallengePack($id).pipe((map(value => {
          let metaData:MetaData={title:value.category.name,description:value.category.description,image:value.category.media.imageUrl || '',keyword:[value.category.name],url:buildUrl("explore", value.category.name)}
          return metaData
        })))
    }

  }
  applyMetaData(metadata:MetaData){
    this.title.setTitle(metadata.title);
    this.setMetaTag({ name: 'canonical', content: metadata.url });
    this.setMetaTag({ name: 'title', content: metadata.title });
    if (metadata.keyword&&metadata.keyword.length>0)
    this.setMetaTag({name:'keywords' ,content:(metadata.keyword ||[]).join(',')})
    this.setMetaTag({ name: 'description', content: metadata.description });
    this.setMetaTag({ property: 'og:title', content: metadata.title });
    this.setMetaTag({ property: 'og:description', content: metadata.description });
    this.setMetaTag({ property: 'og:image', content: metadata.image });
    this.setMetaTag({ property: 'og:image:width', content: "1200" });
    this.setMetaTag({ property: 'og:image:height', content: "630"});
    this.setMetaTag({ property: 'og:type', content: 'website' });
    this.setMetaTag({ property: 'og:url', content: metadata.url });

    // Twitter tags
    this.setMetaTag({ property: 'twitter:card', content: metadata.image });
    this.setMetaTag({ property: 'twitter:title', content: metadata.title });
    this.setMetaTag({ property: 'twitter:description', content: metadata.description });
    this.setMetaTag({ property: 'twitter:image', content: metadata.image });
    this.updateFavicon(metadata.image);

    this.transferState.set(META_KEY, metadata);
    this.setCanonicalURL(metadata.url)


  }
  updateFavicon(iconUrl: string): void {
    const head = this.doc.head;

    const link = this.doc.querySelector("link[rel~='icon']") || document.createElement('link');
    this.renderer.setAttribute(link, 'href', iconUrl);
    this.renderer.setAttribute(link, 'rel', 'icon');
    this.renderer.setAttribute(link, 'type', 'image/png');

  }
  setCanonicalURL(url?: string) {
    const head = this.doc.head;
    const existingTag = this.doc.querySelector(`link[rel='canonical']`);

    const canonicalUrl = url || this.doc.URL;

    if (existingTag) {
      this.renderer.setAttribute(existingTag, 'href', canonicalUrl);
    } else {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'canonical');
      this.renderer.setAttribute(link, 'href', canonicalUrl);
      this.renderer.appendChild(head, link);
    }
  }
  private setMetaTag(tag: MetaDefinition): void {
    if (tag.name) this.meta.updateTag({ name: tag.name, content: tag.content! });
    else if (tag.property) this.meta.updateTag({ property: tag.property, content: tag.content! });
  }
}
export enum Page{
  Challenge,
  ChallengePack,
  Explorer
}
export function buildUrl(path:string, title:string,slugifyTitle:boolean=true):string{
  return `https://www.getthrival.app/${path}/${slugifyTitle?slugify(title):title}`
}
export interface MetaData{
  title:string,
  description:string;
  image:string,
  keyword?:string[],
  url:string
}
export function defaultMetaData():MetaData{
  return {
    title:"Thrival",
    description:"Challenging app ",
    image:"",
    url:buildUrl('','',false)

  }
}
