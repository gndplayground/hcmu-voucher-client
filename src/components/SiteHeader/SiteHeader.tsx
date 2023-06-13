import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { MainLogo } from "@components/Logo";
import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { User } from "@types";

export interface SiteHeaderProps {
  title?: string;
  onRequestLogin?: () => void;
  onRequestLogout?: () => void;
  user?: User;
}

export function SiteHeader(props: SiteHeaderProps) {
  const { title, onRequestLogin, user, onRequestLogout } = props;
  return (
    <header>
      <Box
        px={4}
        pos="fixed"
        zIndex={1000}
        top={0}
        left={0}
        w="100%"
        boxShadow="md"
        bg="bg"
      >
        <Box
          maxW="600px"
          mx="auto"
          display="flex"
          height="64px"
          alignItems="center"
        >
          <Link to="/">
            <MainLogo width="42px" height="42px" />
          </Link>
          {title && (
            <Box
              pl={4}
              as="h1"
              width="100%"
              textAlign="left"
              fontWeight={700}
              fontSize="1.2rem"
            >
              {title}
            </Box>
          )}
          {user ? (
            <Box ml="auto">
              <Menu>
                <MenuButton>
                  <Box
                    fontSize="1.5rem"
                    borderRadius="50%"
                    border="1px dashed"
                    borderColor="primary"
                    p={2}
                  >
                    <FiUser />
                  </Box>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem as={Link} to="/my-vouchers">
                    My vouchers
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={onRequestLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <Box
              onClick={onRequestLogin}
              as="button"
              fontSize="1.5rem"
              ml="auto"
              borderRadius="50%"
              border="1px dashed"
              borderColor="primary"
              p={2}
            >
              <FiUser />
            </Box>
          )}
        </Box>
      </Box>
    </header>
  );
}
