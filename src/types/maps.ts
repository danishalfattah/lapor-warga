// Google Maps related types

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MarkerData {
  id: string;
  position: Coordinates;
  category: string;
  title: string;
}
