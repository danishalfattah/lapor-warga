// Google Maps client setup
// This will be used with @vis.gl/react-google-maps

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export const defaultMapCenter = {
  lat: -2.548926, // Indonesia center
  lng: 118.0148634,
};

export const defaultMapZoom = 5;
