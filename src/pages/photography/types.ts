export interface Photo {
  id: string;
  display: string; // R2 key of the ~2000px version
  thumb: string; // R2 key of the ~400px version
  w: number; // display-version dimensions, for layout placeholders
  h: number;
  taken?: string;
  caption?: string;
}

export interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  emoji?: string;
  description?: string;
  /** Photo id shown on the map pin; defaults to the first photo */
  cover?: string;
  photos: Photo[];
}

export interface Manifest {
  version: number;
  updatedAt: string;
  pins: Pin[];
}
