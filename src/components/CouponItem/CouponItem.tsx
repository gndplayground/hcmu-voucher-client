import React from "react";
import { Box, Progress, Text } from "@chakra-ui/react";
import { FiTrendingDown } from "react-icons/fi";
import { CampaignProgressEnum, VoucherDiscountTypeEnum } from "@types";
import { Link } from "react-router-dom";
import { Countdown } from "@components";
import { useIntersection } from "@hooks/useIntersection";
import { summarize } from "@utils/text";

export interface CouponItemProps {
  title: string;
  image?: string;
  brand: string;
  off: number;
  offType: VoucherDiscountTypeEnum;
  url?: string;
  expiryDate?: string;
  startDate?: string;
  progress: CampaignProgressEnum;
  total?: number;
  claimed?: number;
}

export function CouponItem(props: CouponItemProps) {
  const {
    title,
    image,
    off,
    offType,
    brand,
    url,
    expiryDate,
    progress,
    startDate,
    total = 0,
    claimed = 0,
  } = props;

  const { isVisible, ref } = useIntersection();

  return (
    <Box
      ref={ref}
      as={Link}
      to={url}
      display="flex"
      borderRadius={10}
      border="1px dashed"
      borderColor="brand.500"
      position="relative"
      w="100%"
    >
      <Box
        m={2}
        color="primary"
        borderRight="1px dashed"
        borderColor="primary"
        pr={2}
      >
        <Box width="80px" height="80px" borderRadius={10} overflow="hidden">
          {image && (
            <Box w="100%" h="100%" objectFit="contain" as="img" src={image} />
          )}
          {!image && <FiTrendingDown fontSize="80px" />}
        </Box>
      </Box>

      <Box w="100%" p={2} borderRadius={10}>
        <Box display="flex">
          <Box mr={2} w="100%">
            <Box display="flex">
              <Box color="primary" fontWeight={700} fontSize="1.2rem">
                {brand}
              </Box>
            </Box>
            {title && <Text as="p">{summarize(title, 50)}</Text>}
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
                - {off}
                {offType === VoucherDiscountTypeEnum.PERCENTAGE ? "%" : "$"}
              </Box>
            </Box>
            {expiryDate && startDate && (
              <Box mt={3}>
                {(progress === CampaignProgressEnum.ONGOING ||
                  progress === CampaignProgressEnum.UPCOMING) && (
                  <Box ml={6}>
                    <Countdown
                      pause={!isVisible}
                      variant="inline"
                      targetDate={
                        progress === CampaignProgressEnum.ONGOING
                          ? expiryDate
                          : startDate
                      }
                    />
                  </Box>
                )}
              </Box>
            )}
            {progress === CampaignProgressEnum.ONGOING && total > 0 && (
              <Box mt={3}>
                <Progress
                  w="100%"
                  value={Math.floor((claimed / total) * 100)}
                  size="xs"
                  colorScheme="brand"
                />
                <Box mt={2} fontSize="xs" textAlign="right">
                  Claimed {claimed} of {total} 🔥
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
