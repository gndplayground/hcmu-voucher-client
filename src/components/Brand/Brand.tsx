import { Box } from "@chakra-ui/react";
import { config } from "@configs";
import { Company } from "@types";
import React from "react";
import { FiTrendingDown } from "react-icons/fi";
import { Link } from "react-router-dom";

export interface BrandProps {
  company: Company;
}

export function Brand(props: BrandProps) {
  const { company } = props;
  return (
    <Link to={`/brands/${company.id}`}>
      <Box width="120px" height="120px" borderRadius={10} overflow="hidden">
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
  );
}
