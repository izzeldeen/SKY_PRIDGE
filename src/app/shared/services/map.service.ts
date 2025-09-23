import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { GeoJson } from './map';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
@Injectable
(
  {
    providedIn: 'root'
  }
)
export class MapService 
{
  private marker: mapboxgl.Marker;
  constructor () 
  {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }
  getMarkers(): GeoJson[] 
  {
    return 
    [
      new GeoJson([125.6, 10.1])
    ];
  }
  createMap (container: string, center: [number, number], zoom: number): mapboxgl.Map 
  {
    const map = new mapboxgl.Map
    (
      {
        container: container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom
      }
    );
    const geocoder = new MapboxGeocoder
    (
      {
        accessToken: environment.mapbox.accessToken,
        mapboxgl: mapboxgl
      }
    );
    map.addControl(geocoder);
    geocoder.on
    ('result', (event) => 
      {
        const { geometry } = event.result;
        this.setMarker(map, geometry.coordinates[0], geometry.coordinates[1]);
      }
    );
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');
    return map 
  }
  addMapClickListener (map: mapboxgl.Map, callback: (lng: number, lat: number, city: string, country: string) => void): void 
  {
    map.on
    ( 'click', (event) => 
      {
        const coordinates = event.lngLat;
        this.reverseGeocode(coordinates.lng, coordinates.lat, callback);
      }
    );
  }
  reverseGeocode (lng: number, lat: number, callback: (lng: number, lat: number, city: string, country: string) => void) 
  {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${environment.mapbox.accessToken}`;
    fetch(url).then(response => response.json()).then
    ( data => 
      {
        const features = data.features;
        if (features && features.length > 0) 
        {
          const address = features[0];
          const city = this.extractCity(address);
          const country = this.extractCountry(address);
          callback(lng, lat, city, country);
        }
      }
    )
    .catch(error => console.error('Error:', error));
  }
  private extractCity (address: any): string 
  {
    const placeName = address.place_name || '';
    const parts = placeName.split(',');
    return parts.length > 1 ? parts[0].trim() : '';
  }
  private extractCountry (address: any): string 
  {
    const placeName = address.place_name || '';
    const parts = placeName.split(',');
    return parts.length > 1 ? parts[parts.length - 1].trim() : '';
  }
  setMarker (map: mapboxgl.Map, lng: number, lat: number): void 
  {
    if (this.marker) 
      this.marker.setLngLat([lng, lat]).addTo(map);
    else 
      this.marker = new mapboxgl.Marker({ color: 'red' }).setLngLat([lng, lat]).addTo(map);
  }
  setRTLTextPlugin () 
  {
    mapboxgl.setRTLTextPlugin
    (
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      null,
      true // Lazy load the plugin
    );
  }
}