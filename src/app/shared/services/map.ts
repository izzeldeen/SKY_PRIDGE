export interface IGeometry {
  type: 'Point';
  coordinates: number[];
}

export interface IGeoJson {
  type: 'Feature';
  geometry: IGeometry;
  properties?: { [name: string]: any };
}

export class GeoJson implements IGeoJson {
  type: 'Feature' = 'Feature';
  geometry: IGeometry;

  constructor(coordinates: number[], public properties?: { [name: string]: any }) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    };
  }
}

export interface IFeatureCollection {
  type: 'FeatureCollection';
  features: IGeoJson[];
}

export class FeatureCollection implements IFeatureCollection {
  type: 'FeatureCollection' = 'FeatureCollection';
  features: IGeoJson[];

  constructor(features: IGeoJson[]) {
    this.features = features;
  }
}
