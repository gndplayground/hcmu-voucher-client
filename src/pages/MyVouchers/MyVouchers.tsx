import { Box, Button, VStack } from "@chakra-ui/react";
import { useGetMyVouchers } from "@hooks/voucher";
import React from "react";
import { VoucherTicketItem } from "./VoucherTicket";

export function MyVouchers() {
  const myVouchers = useGetMyVouchers();

  return (
    <Box>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
      >
        My Vouchers
      </Box>
      <VStack spacing={4} mt={4}>
        {myVouchers.data?.pages.map((page) => {
          return page.data.map((voucher) => {
            return <VoucherTicketItem key={voucher.id} voucher={voucher} />;
          });
        })}
      </VStack>
      {myVouchers.hasNextPage && (
        <Box textAlign="center" mt={4}>
          <Button
            colorScheme="brand"
            onClick={() => {
              myVouchers.fetchNextPage();
            }}
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
