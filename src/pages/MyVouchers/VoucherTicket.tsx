import { Box, Button, Divider } from "@chakra-ui/react";
import { ClickToCopy } from "@components";
import { config } from "@configs";
import { VoucherDiscountTypeEnum, VoucherTicket } from "@types";
import format from "date-fns/format";
import React from "react";
import { FiTrendingDown } from "react-icons/fi";

export interface VoucherTicketItemProps {
  voucher: VoucherTicket;
}

export function VoucherTicketItem(props: VoucherTicketItemProps) {
  const { voucher } = props;
  const company = voucher.voucherDiscount.campaign.company;
  const [isCodeVisible, setIsCodeVisible] = React.useState(false);
  const code = voucher.code || voucher.voucherDiscount.code;

  return (
    <Box
      borderRadius={10}
      border="1px dashed"
      borderColor="brand.500"
      position="relative"
      w="100%"
      p={2}
      display="flex"
    >
      <Box
        m={2}
        color="primary"
        borderRight="1px dashed"
        borderColor="primary"
        pr={2}
      >
        <Box width="80px" height="80px" borderRadius={10} overflow="hidden">
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
      </Box>
      <Box pl={2}>
        <Box fontWeight={700} fontSize="1.2rem" color="brand.500">
          {company.name}
        </Box>
        <Box fontWeight={700}>{voucher.voucherDiscount.campaign.name}</Box>
        <Box>
          Claim at: {format(new Date(voucher.claimAt), "dd/MM/yyyy hh:mm")}
        </Box>
        <Box>
          End at:{" "}
          {format(
            new Date(voucher.voucherDiscount.campaign.endDate),
            "dd/MM/yyyy hh:mm"
          )}
        </Box>
        <Box
          mt={2}
          textAlign="center"
          fontWeight={700}
          bg="primary"
          color="textOnPrimary"
          borderRadius={10}
        >
          <Box
            as="strong"
            justifyContent="center"
            fontWeight={700}
            fontSize="1.2rem"
          >
            - {voucher.voucherDiscount.discount}
            {voucher.voucherDiscount.type === VoucherDiscountTypeEnum.PERCENTAGE
              ? "%"
              : "$"}
          </Box>
        </Box>
        <Divider my={2} />
        {isCodeVisible ? (
          <Box
            mt={2}
            fontSize="1.25rem"
            fontWeight={700}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="brand.500"
          >
            {code}
            <Box ml={2}>
              <ClickToCopy text={code || ""} />
            </Box>
          </Box>
        ) : (
          <Button
            mt={2}
            colorScheme="brand"
            variant="outline"
            onClick={() => {
              setIsCodeVisible(true);
            }}
          >
            Click to reveal voucher code
          </Button>
        )}
      </Box>
    </Box>
  );
}
