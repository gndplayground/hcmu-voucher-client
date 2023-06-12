import React, { useRef } from "react";
import GoogleMap from "google-maps-react-markers";
import { useGetStores } from "@hooks/store";
import { Box, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { config } from "@configs";
import { FiMapPin, FiUser, FiXCircle } from "react-icons/fi";
import { Company, Store, StoreNearby, StoreNearbyResult } from "@types";
import { useUserPosition } from "@hooks/usePosition";
import { motion } from "framer-motion";
import { StoreLocationList } from "./StoreLocationList";

export interface StoreLocationProps {
  company?: Company;
}

const defaultProps = {
  center: {
    lat: 10.81725513824529,
    lng: 106.62871446607583,
  },
  zoom: 11,
};

const mapOptions: google.maps.MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ],
};

async function getNearestStores(options: {
  userLocation: google.maps.LatLng;
  storeLocations: StoreNearby[];
  maxDistance: number;
  maps: typeof google.maps;
}) {
  const { userLocation, storeLocations, maxDistance, maps } = options;
  const service = new maps.DistanceMatrixService();
  const origins = [userLocation];
  const destinations = storeLocations.map((store) => store.position);
  const nearestStores: StoreNearbyResult[] = [];

  try {
    const response =
      await new Promise<google.maps.DistanceMatrixResponse | null>(
        (resolve, reject) => {
          service.getDistanceMatrix(
            {
              origins: origins,
              destinations: destinations,
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
            },
            (response, status) => {
              if (status !== "OK") {
                reject(`Error: ${status}`);
              } else {
                resolve(response);
              }
            }
          );
        }
      );

    const distances = response
      ? response.rows[0].elements.map((element) => element.distance.value)
      : [];
    const storesWithDistances = storeLocations.map((location, index) => {
      return {
        location: location,
        distance: distances[index],
      };
    });

    storesWithDistances.sort((a, b) => a.distance - b.distance);

    storesWithDistances.forEach((store) => {
      if (store.distance <= maxDistance) {
        nearestStores.push(store);
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return nearestStores;
}

const Point = ({
  text,
  img,
  onClick,
  isSelected,
}: {
  lat: number;
  lng: number;
  text: string;
  img?: string;
  onClick?: () => void;
  isSelected?: boolean;
}) => {
  if (img) {
    return (
      <motion.div
        animate={isSelected ? { y: 10 } : undefined}
        transition={
          isSelected
            ? {
                repeat: Infinity,
                duration: 1,
                repeatType: "mirror",
                ease: "easeIn",
              }
            : undefined
        }
      >
        <Box
          as="button"
          w="50px"
          height="50px"
          bg="white"
          borderRadius="50%"
          px={1}
          border="1px solid"
          borderColor="brand.500"
          onClick={onClick}
        >
          <Box
            as="img"
            w="100%"
            h="100%"
            objectFit="contain"
            objectPosition="center"
            src={img}
            alt={text}
          />
        </Box>
      </motion.div>
    );
  }

  return (
    <Box
      bg="white"
      p={2}
      border="1px solid"
      borderColor="brand.500"
      borderRadius="50%"
      fontSize="1.5rem"
      color="blue.500"
    >
      <FiMapPin />
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PointUser = ({ lat, lng }: { lat: number; lng: number }) => {
  return (
    <Box
      bg="white"
      p={2}
      border="1px solid"
      borderColor="brand.500"
      borderRadius="50%"
      fontSize="1.5rem"
      color="brand.500"
    >
      <FiUser />
    </Box>
  );
};

function openGoogleMaps(latitude: number, longitude: number) {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  window.open(url, "_blank");
}

export function StoreLocation(props: StoreLocationProps) {
  const { company } = props;
  const stores = useGetStores({
    companyId: company?.id,
    enabled: !!company,
  });

  const { position } = useUserPosition();
  const discListStores = useDisclosure();
  const [isMapReady, setIsMapReady] = React.useState(false);
  const mapRef = useRef<null | google.maps.Map>(null);
  const mapsRef = useRef<null | typeof google.maps>(null);
  const [nearbyStore, setNearbyStore] = React.useState<StoreNearbyResult[]>([]);
  const [selectedStore, setSelectedStore] = React.useState<Store | undefined>();
  const [softSelectedStore, setSoftSelectedStore] = React.useState<
    Store | undefined
  >();

  const onGoogleApiLoaded = ({ map, maps }: any) => {
    mapRef.current = map;
    mapsRef.current = maps;
    setIsMapReady(true);
  };

  React.useEffect(() => {});

  // React.useEffect(() => {
  //   if (position && mapRef.current && isMapReady) {
  //     mapRef.current?.setCenter({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //     mapRef.current?.setZoom(13);
  //   }
  // }, [isMapReady, position]);

  React.useEffect(() => {
    let isCancelled = false;
    if (
      position &&
      mapRef.current &&
      mapsRef.current &&
      isMapReady &&
      stores.data
    ) {
      const maps = mapsRef.current;
      setNearbyStore([]);
      getNearestStores({
        userLocation: new mapsRef.current.LatLng(
          position.coords.latitude,
          position.coords.longitude
        ),
        storeLocations: stores.data
          ?.filter((s) => {
            return !!(s.latitude && s.longitude);
          })
          .map((s) => {
            return {
              id: s.id,
              position: new maps.LatLng(s.latitude || 0, s.longitude || 0),
            };
          }),
        maxDistance: 10000,
        maps: mapsRef.current,
      })
        .then((nearestStores) => {
          if (isCancelled) return;
          if (nearestStores.length > 0) {
            const bounds = new maps.LatLngBounds();
            nearestStores.forEach((store) => {
              bounds.extend(store.location.position);
            });
            mapRef.current?.fitBounds(bounds);
          }
          setNearbyStore(nearestStores);
        })
        .catch(() => {
          if (isCancelled) return;
          setNearbyStore([]);
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [isMapReady, position, stores.data]);

  function handleChooseStore(store: Store) {
    discListStores.onClose();
    setSoftSelectedStore(store);
    mapRef.current?.setCenter({
      lat: store.latitude || 0,
      lng: store.longitude || 0,
    });
    mapRef.current?.setZoom(18);
  }

  if (!stores.data || stores.data.length === 0) return null;

  return (
    <>
      <Button mb={1} onClick={discListStores.onOpen}>
        View list store
      </Button>
      <Box as="p" fontSize="xs" mb={2}>
        Click on the store icon to view more information
      </Box>
      <Box h={500} pos="relative">
        <StoreLocationList
          isOpen={discListStores.isOpen}
          stores={stores.data}
          onChoseStore={handleChooseStore}
          onClose={discListStores.onClose}
          nearbyStore={nearbyStore}
        />
        {selectedStore && (
          <Box
            pt={8}
            py={8}
            px={4}
            maxW={500}
            pos="absolute"
            bg="bg"
            zIndex={1}
            w="90%"
            h="300px"
            shadow="md"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <IconButton
              aria-label={""}
              variant="outline"
              pos="absolute"
              top="8px"
              right="8px"
              onClick={() => {
                setSelectedStore(undefined);
              }}
            >
              <FiXCircle />
            </IconButton>
            <Box fontSize="1.2rem" fontWeight="bold">
              {selectedStore.name}
            </Box>
            <Box>{selectedStore.address}</Box>

            {selectedStore.phone && (
              <Box mt={2}>
                <Box as="span" fontWeight="bold" mr={2}>
                  Phone:
                </Box>
                {selectedStore.phone}
              </Box>
            )}
            {(selectedStore.closeAt || selectedStore.openAt) && (
              <Box>
                {selectedStore.openAt && (
                  <>
                    <Box as="span" fontWeight="bold" mr={2}>
                      Open:
                    </Box>
                    : {selectedStore.openAt}
                  </>
                )}
                <br />
                {selectedStore.closeAt && (
                  <>
                    <Box as="span" fontWeight="bold" mr={2}>
                      Close:
                    </Box>
                    : {selectedStore.closeAt}
                  </>
                )}
              </Box>
            )}
            {selectedStore.latitude && selectedStore.longitude && (
              <Box mt={6} textAlign="center">
                <Button
                  colorScheme="brand"
                  onClick={() => {
                    openGoogleMaps(
                      selectedStore.latitude || 0,
                      selectedStore.longitude || 0
                    );
                  }}
                >
                  View direction on Google Maps
                </Button>
              </Box>
            )}
          </Box>
        )}
        <GoogleMap
          apiKey={config.APP_GOOGLE_MAP_API_KEY}
          defaultCenter={{
            lat: defaultProps.center.lat,
            lng: defaultProps.center.lng,
          }}
          defaultZoom={8}
          onGoogleApiLoaded={onGoogleApiLoaded}
          options={mapOptions}
        >
          {stores.data
            ?.filter((s) => {
              return !!(s.latitude && s.longitude);
            })
            .map((store) => {
              return (
                <Point
                  isSelected={softSelectedStore?.id === store.id}
                  key={store.id}
                  onClick={() => {
                    setSelectedStore(store);
                    setSoftSelectedStore(undefined);
                  }}
                  lat={store.latitude || 0}
                  lng={store.longitude || 0}
                  text={store.name}
                  img={
                    company?.logo
                      ? `${config.APP_IMAGE_END_POINT}/companies/${company.logo}`
                      : undefined
                  }
                />
              );
            })}
          {position && (
            <PointUser
              lat={position.coords.latitude}
              lng={position.coords.longitude}
            />
          )}
        </GoogleMap>
      </Box>
    </>
  );
}
