import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Box,
} from "@chakra-ui/react";
import { Store, StoreNearbyResult } from "@types";
import React from "react";

export interface StoreLocationListProps {
  stores?: Store[];
  isOpen?: boolean;
  onClose?: () => void;
  onChoseStore?: (store: Store) => void;
  nearbyStore?: StoreNearbyResult[];
}

export function StoreLocationList(props: StoreLocationListProps) {
  const {
    isOpen = false,
    onClose = () => {},
    stores,
    onChoseStore,
    nearbyStore,
  } = props;

  const storesWithNearby = React.useMemo(() => {
    if (!stores) return [];
    return (
      stores?.map((store) => {
        const nearby = nearbyStore?.find(
          (nearby) => nearby.location.id === store.id
        );
        return {
          ...store,
          distance: nearby?.distance,
        };
      }) || []
    );
  }, [nearbyStore, stores]);

  const storesWithoutNearby = React.useMemo(() => {
    if (!stores) return [];
    return stores?.filter((store) => {
      return !nearbyStore?.find((nearby) => nearby.location.id === store.id);
    });
  }, [nearbyStore, stores]);

  function formatDistance(distance: number) {
    if (distance < 1000) {
      return `${distance}m`;
    } else {
      return `${(distance / 1000).toFixed(1)}km`;
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody pt={5}>
          <>
            {nearbyStore && nearbyStore.length > 0 && (
              <Box mb={10}>
                <Box fontWeight={700} fontSize="xl">
                  Nearby store
                </Box>
                {storesWithNearby?.map((store) => (
                  <Box
                    as="button"
                    textAlign="left"
                    borderBottom="1px solid"
                    borderColor="border"
                    py={4}
                    key={store.id}
                    onClick={() => {
                      onChoseStore?.(store);
                    }}
                  >
                    <Box as="p" fontWeight="bold">
                      {store.name}
                    </Box>
                    <Box as="p" mt={2}>
                      Distance from me{" "}
                      <strong>{formatDistance(store.distance || 0)}</strong>
                    </Box>
                    <Box as="p">{store.address}</Box>
                  </Box>
                ))}
              </Box>
            )}

            {storesWithoutNearby && storesWithoutNearby.length > 0 && (
              <Box>
                <Box fontWeight={700} fontSize="xl">
                  List store
                </Box>
                {storesWithoutNearby.map((store) => (
                  <Box
                    as="button"
                    textAlign="left"
                    borderBottom="1px solid"
                    borderColor="border"
                    py={4}
                    key={store.id}
                    onClick={() => {
                      onChoseStore?.(store);
                    }}
                  >
                    <Box fontWeight="bold">{store.name}</Box>
                    <Box>{store.address}</Box>
                  </Box>
                ))}
              </Box>
            )}
          </>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
