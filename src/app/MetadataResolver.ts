// metadata.resolver.ts
import {Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {ChallengeService} from "./challenge.service";
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {isPlatformBrowser,Location} from "@angular/common";
const META_KEY = makeStateKey<MetaData>('meta-data');

@Injectable({ providedIn: 'root' })
export class MetadataResolver implements Resolve<any> {

  constructor(@Inject(PLATFORM_ID) private platformId: any,private challengeService: ChallengeService, private meta:Meta,private title:Title
      ,
              private transferState: TransferState,
              private location:Location

  ) {
    // console.log("Platform ",this.platformId)
    // if (isPlatformBrowser(this.platformId)) {
    //   (global as any).Node = (window as any).Node;
    // }

  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let $id = route.params['$id']
    let page:Page=route.data['page']
    return this.getMeta(page,$id).pipe(map(value => {

      this.applyMetaData(value)
      return value;
    }));

  }

  getMeta(page:Page,$id:string):Observable<MetaData>{
    switch (page) {
      case Page.Challenge:{
       return  this.challengeService.getChallenge($id).pipe(map(value => {
          let metaData:MetaData={title:value.title,description:value.description,image:value.media.imageUrl}
          return metaData}))
      }
      case Page.ChallengePack:
        return  this.challengeService.getChallengePack($id).pipe(map(value => {
          let metaData:MetaData={title:value.title,description:value.description,image:value.media.imageUrl}
          return metaData}))
    }

  }
  applyMetaData(metadata:MetaData){
    console.log('Applying metadata:', metadata); // Add this to check the metadata before applying it

    this.title.setTitle(metadata.title);

    this.setMetaTag({ name: 'description', content: metadata.description });
    this.setMetaTag({ property: 'og:title', content: metadata.title });
    this.setMetaTag({ property: 'og:description', content: metadata.description });
    this.setMetaTag({ property: 'og:image', content: metadata.image });
    this.setMetaTag({ property: 'og:type', content: 'website' });
    this.setMetaTag({ property: 'og:url', content: this.location.path() });

    // Twitter tags
    this.setMetaTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.setMetaTag({ name: 'twitter:title', content: metadata.title });
    this.setMetaTag({ name: 'twitter:description', content: metadata.description });
    this.setMetaTag({ name: 'twitter:image', content: metadata.image });

    // Transfer metadata to client
    console.log("Image ",isPlatformBrowser(this.platformId))
    if (isPlatformBrowser(this.platformId)) {
      this.updateFavicon(metadata.image);

    }
    this.transferState.set(META_KEY, metadata);


  }
  updateFavicon(iconUrl: string): void {
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = iconUrl;
    link.type = 'image/png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  private setMetaTag(tag: MetaDefinition): void {
    if (tag.name) this.meta.updateTag({ name: tag.name, content: tag.content! });
    else if (tag.property) this.meta.updateTag({ property: tag.property, content: tag.content! });
  }
}
export enum Page{
  Challenge,
  ChallengePack
}

export interface MetaData{
  title:string,
  description:string;
  image:string
}
export function defaultMetaData():MetaData{
  return {
    title:"Thrival",
    description:"Challenging app ",
    image:""
  }
}
