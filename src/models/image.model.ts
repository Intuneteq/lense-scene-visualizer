export type ImageTyPe = {
  id: string;
  responsiveImage: {
    srcSet: string;
    webpSrcSet: string;
    sizes: string;
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    alt: null | string;
    title: null | string;
    bgColor: string;
    base64: string;
  };
  focalPoint: {
    x: number;
    y: number;
  };
};
