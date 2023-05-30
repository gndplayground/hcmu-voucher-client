import { Box } from "@chakra-ui/react";
import { MainLogo } from "@components/Logo";
import React from "react";
import { Link } from "react-router-dom";

export function SiteHeader() {
  return (
    <header>
      <Box display="flex" height="64px" alignItems="center" px={4}>
        <Link to="/">
          <MainLogo width="42px" height="42px" />
        </Link>
      </Box>
    </header>
  );
}
