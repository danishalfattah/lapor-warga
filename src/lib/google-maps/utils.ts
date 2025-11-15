// Google Maps utility functions

export function geocodeAddress(address: string) {
  // TODO: Implement geocoding
  // Convert address to coordinates
  return null;
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  // Convert coordinates to human-readable address using Google Geocoding API
  if (typeof google === "undefined" || !google.maps) {
    console.error("Google Maps not loaded");
    return null;
  }

  try {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({
      location: { lat, lng },
    });

    if (response.results && response.results.length > 0) {
      // Return the formatted address from the first result
      return response.results[0].formatted_address;
    }

    return null;
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return null;
  }
}

export function calculateBounds(points: { lat: number; lng: number }[]) {
  // Calculate map bounds from multiple points
  if (points.length === 0) return null;

  const latitudes = points.map((p) => p.lat);
  const longitudes = points.map((p) => p.lng);

  return {
    north: Math.max(...latitudes),
    south: Math.min(...latitudes),
    east: Math.max(...longitudes),
    west: Math.min(...longitudes),
  };
}
