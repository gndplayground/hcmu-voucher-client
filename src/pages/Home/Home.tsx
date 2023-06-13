import { Box } from "@chakra-ui/react";
import { CampaignProgressEnum } from "@types";
import { useAppContext } from "@contexts/AppContext";
import React from "react";
import { Link } from "react-router-dom";
import { LatestVouchers } from "./LatestVouchers";
import { Brands } from "./Brands";

export function Home() {
  const { setTitle } = useAppContext();

  React.useEffect(() => {
    setTitle?.("");
  }, [setTitle]);

  return (
    <Box>
      <Box>
        <Box as="img" src="/banner.jpg" />
      </Box>
      <Box
        hidden
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
          <Box display="flex" alignItems="center">
            <Box as="h2" fontWeight={700} fontSize="1.5rem" m={0}>
              🔥 Latest brands
            </Box>
            <Box as={Link} ml="auto" to="/brands">
              View all
            </Box>
          </Box>

          <Box mt={4}>
            <Brands />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
