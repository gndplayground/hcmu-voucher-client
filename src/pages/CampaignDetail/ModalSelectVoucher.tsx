import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Countdown } from "@components";
import {
  VoucherDiscountTypeEnum,
  CampaignProgressEnum,
  Campaign,
  VoucherDiscount,
} from "@types";
import { FiXCircle } from "react-icons/fi";
import { config } from "@configs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: Campaign;
  progress?: CampaignProgressEnum;
  selectedVoucher?: VoucherDiscount;
  refetch?: () => void;
}

export const ModalSelectVoucher: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  campaign,
  progress,
  selectedVoucher,
  refetch,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {campaign && selectedVoucher && (
          <Box px={4} py={8}>
            <IconButton
              aria-label={""}
              variant="outline"
              pos="absolute"
              top="16px"
              right="16px"
              onClick={onClose}
            >
              <FiXCircle />
            </IconButton>
            <Box display="flex" justifyContent="center">
              {campaign.company.logo && (
                <Box
                  w="100px"
                  h="100px"
                  as="img"
                  src={`${config.APP_IMAGE_END_POINT}/companies/${campaign.company.logo}`}
                />
              )}
            </Box>
            <Box
              as="strong"
              mt={4}
              color="primary"
              fontSize="2.5rem"
              fontWeight={700}
              textAlign="center"
              display="flex"
              justifyContent="center"
            >
              {selectedVoucher.discount}
              {selectedVoucher.type === VoucherDiscountTypeEnum.PERCENTAGE
                ? "%"
                : "$"}
              <Box ml="0.25em" as="span" fontWeight={400}>
                off
              </Box>
            </Box>
            {progress === CampaignProgressEnum.ONGOING && (
              <>
                <Box
                  mt={2}
                  as="p"
                  textAlign="center"
                  textDecoration="underline"
                >
                  Valid up to
                </Box>
                <Box mt={4}>
                  <Countdown
                    onEnd={() => {
                      refetch?.();
                    }}
                    targetDate={campaign.endDate}
                  />
                </Box>
                <Box mt={6} textAlign="center">
                  <Button minW="200px" variant="primary">
                    Claim
                  </Button>
                </Box>
              </>
            )}
            {progress === CampaignProgressEnum.UPCOMING && (
              <>
                <Box
                  mt={2}
                  as="p"
                  textAlign="center"
                  textDecoration="underline"
                >
                  Begin when
                </Box>
                <Box mt={4}>
                  <Countdown
                    onEnd={() => {
                      refetch?.();
                    }}
                    targetDate={campaign.startDate}
                  />
                </Box>
              </>
            )}
            <Box pt={6}>{selectedVoucher.description}</Box>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};
