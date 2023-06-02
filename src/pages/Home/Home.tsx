import { Box } from "@chakra-ui/react";
import { CampaignProgressEnum } from "@types";
import { useAppContext } from "@contexts/AppContext";
import React from "react";
import { LatestVouchers } from "./LatestVouchers";

export function Home() {
  const { setTitle } = useAppContext();

  React.useEffect(() => {
    setTitle?.("");
  }, [setTitle]);

  return (
    <Box>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
      >
        Discover amazing vouchers
      </Box>
      <Box mt={8}>
        <LatestVouchers />
      </Box>
      <Box mt={8}>
        <LatestVouchers progress={CampaignProgressEnum.UPCOMING} />
      </Box>
      <Box as="section">
        <Box mt="2rem">
          <Box as="h2" fontWeight={700} fontSize="1.5rem" m={0}>
            Latest brand vouchers
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
