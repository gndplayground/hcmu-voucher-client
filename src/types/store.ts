export interface StoreNearby {
  id: number;
  position: google.maps.LatLng;
}

export interface StoreNearbyResult {
  location: StoreNearby;
  distance: number;
}
