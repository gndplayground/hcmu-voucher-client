import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import { config } from "@configs";
import { useGetCompanies } from "@hooks/company";
import React from "react";
import { FiTrendingDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export function Brands() {
  const companies = useGetCompanies({
    // isHaveActiveCampaigns: true,
  });

  return (
    <Box>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
      >
        Amazing Brands
      </Box>
      <Wrap spacing={4}>
        {companies.data?.pages.map((page) => {
          return page.data.map((company) => {
            return (
              <WrapItem w="50%" key={company.id}>
                <Center flexDir="column" w="100%">
                  <Link to={`/brands/${company.id}`}>
                    <Box
                      width="80px"
                      height="80px"
                      borderRadius={10}
                      overflow="hidden"
                    >
                      {company.logo && (
                        <Box
                          w="100%"
                          h="100%"
                          objectFit="contain"
                          as="img"
                          src={`${config.APP_IMAGE_END_POINT}/companies/${company.logo}`}
                        />
                      )}
                      {!company.logo && <FiTrendingDown fontSize="80px" />}
                    </Box>
                    <Box mt={1} textAlign="center" fontWeight={700}>
                      {company.name}
                    </Box>
                  </Link>
                </Center>
              </WrapItem>
            );
          });
        })}
      </Wrap>
    </Box>
  );
}
