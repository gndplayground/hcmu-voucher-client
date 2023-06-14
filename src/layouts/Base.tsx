import { Box, useDisclosure } from "@chakra-ui/react";
import { ModalLogin, SiteHeader } from "@components";
import React from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "@contexts/AppContext";
import { useAuthStore } from "@stores/auth";
import { useAuthSignOut } from "@hooks";

export function BaseLayout() {
  const [headerTitle, setHeaderTitle] = React.useState("");

  const user = useAuthStore((state) => state.user);

  const signout = useAuthSignOut();

  const modalDisclo = useDisclosure({
    defaultIsOpen: false,
  });

  React.useEffect(() => {
    if (user) {
      modalDisclo.onClose();
    }
  }, [user, modalDisclo]);

  React.useEffect(() => {
    if (headerTitle) {
      document.title = `${headerTitle} - Samoyed Vouchers`;
      return;
    }
    document.title = "Samoyed Vouchers";
  }, [headerTitle]);

  return (
    <AppContext.Provider
      value={{
        setTitle: setHeaderTitle,
        requestLogin: () => {
          modalDisclo.onOpen();
        },
      }}
    >
      <SiteHeader
        user={user}
        title={headerTitle}
        onRequestLogin={() => {
          modalDisclo.onOpen();
        }}
        onRequestLogout={() => {
          signout.mutate();
        }}
      />
      <Box maxW="600px" mx="auto" px={4} pb="120px">
        <Box as="main" pt="96px" pb={8}>
          <Outlet />
        </Box>
      </Box>
      <ModalLogin isOpen={modalDisclo.isOpen} onClose={modalDisclo.onClose} />
    </AppContext.Provider>
  );
}
