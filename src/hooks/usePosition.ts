import { useState, useEffect } from "react";

export function useUserPosition() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          position;
          setPosition(position);
        },
        (error) => {
          setError(error);
        }
      );
    } else {
      setError(new Error("Geolocation is not supported by this browser"));
    }
  }, []);

  return { position, error };
}
