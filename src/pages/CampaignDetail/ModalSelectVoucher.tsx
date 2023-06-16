import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ClickToCopy, Countdown } from "@components";
import {
  VoucherDiscountTypeEnum,
  CampaignProgressEnum,
  Campaign,
  VoucherDiscount,
  VoucherClaimTypeEnum,
} from "@types";
import { FiXCircle } from "react-icons/fi";
import { config } from "@configs";
import { useCheckCanClaim, useClaimVoucher } from "@hooks/voucher";
import React from "react";
import { useAuthStore } from "@stores/auth";
import { useAppContext } from "@contexts/AppContext";

import { FormQuestionValues, FormQuestions } from "./FormQuestion";

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
  const app = useAppContext();

  const [isUseQuestionForm, setIsUseQuestionForm] =
    React.useState<boolean>(false);

  const checkClaimAble = useCheckCanClaim({
    voucherId: selectedVoucher?.id,
  });

  const user = useAuthStore((state) => state.user);

  const claimVoucher = useClaimVoucher();

  const claimType = React.useMemo(() => {
    if (!campaign || !selectedVoucher) return;

    if (campaign.claimType) {
      return campaign.claimType;
    }
    return selectedVoucher.claimType;
  }, [campaign, selectedVoucher]);

  function handleClaim() {
    if (!selectedVoucher) return;
    if (!user) {
      app.requestLogin?.();
      return;
    }
    if (claimType === VoucherClaimTypeEnum.FASTEST) {
      claimVoucher.mutate({
        voucherDiscountId: selectedVoucher.id,
      });
      return;
    }
    if (claimType === VoucherClaimTypeEnum.QUESTIONS) {
      setIsUseQuestionForm(true);
      return;
    }
  }

  const questions = React.useMemo(() => {
    if (campaign && selectedVoucher) {
      if (claimType === VoucherClaimTypeEnum.QUESTIONS) {
        if (campaign.voucherQuestions && campaign.claimType) {
          return campaign.voucherQuestions;
        }
        return selectedVoucher.voucherQuestions;
      }
    }
  }, [campaign, claimType, selectedVoucher]);

  async function handleClaimQuestions(
    values: FormQuestionValues
  ): Promise<void> {
    if (!selectedVoucher) return;
    const answers = values.questions.map((q) => ({
      questionId: Number(q.questionId),
      answer: q.answer,
      choices: q.choices?.length ? q.choices : undefined,
    }));
    await claimVoucher.mutateAsync({
      voucherDiscountId: selectedVoucher.id,
      quenstionAnswers: answers,
    });
    setIsUseQuestionForm(false);
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={claimVoucher.isLoading ? () => {} : onClose}
    >
      <ModalOverlay />
      <ModalContent>
        {campaign && selectedVoucher && (
          <Box px={4} py={8}>
            <IconButton
              disabled={claimVoucher.isLoading}
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
                  h="auto"
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
                  {questions && isUseQuestionForm && (
                    <FormQuestions
                      questions={questions}
                      onSave={handleClaimQuestions}
                    />
                  )}
                  {claimVoucher.data && !isUseQuestionForm && (
                    <>
                      <Box as="p">Your voucher code</Box>
                      <Box
                        mt={4}
                        fontSize="1.25rem"
                        fontWeight={700}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {claimVoucher.data.code || selectedVoucher.code}
                        <Box ml={2}>
                          <ClickToCopy
                            text={
                              claimVoucher.data.code ||
                              selectedVoucher.code ||
                              ""
                            }
                          />
                        </Box>
                      </Box>
                      <Box textAlign="left">
                        <Box mt={4}>
                          You must use the voucher code with the same email
                          address in your brand checkout page.
                        </Box>
                        <Box mt={2}>
                          You can see the voucher code again in menu{" "}
                          <Box as="b" display="inline-block">
                            My Voucher
                          </Box>{" "}
                          in your account page.
                        </Box>
                      </Box>
                    </>
                  )}

                  {!claimVoucher.data && !isUseQuestionForm && (
                    <>
                      {!user && (
                        <Button
                          minW="200px"
                          variant="primary"
                          onClick={handleClaim}
                        >
                          Claim
                        </Button>
                      )}
                      {checkClaimAble.isFetched && !checkClaimAble.data && (
                        <Box
                          p={4}
                          border="1px dashed"
                          borderColor="border"
                          borderRadius={10}
                          display="flex"
                          justifyContent="center"
                        >
                          Already claimed
                        </Box>
                      )}
                      {checkClaimAble.isFetched && checkClaimAble.data && (
                        <>
                          {selectedVoucher.total > selectedVoucher.claimed && (
                            <Button
                              minW="200px"
                              variant="primary"
                              isLoading={
                                !checkClaimAble.isFetched ||
                                claimVoucher.isLoading
                              }
                              isDisabled={
                                !checkClaimAble.isFetched ||
                                claimVoucher.isLoading
                              }
                              onClick={handleClaim}
                            >
                              Claim
                            </Button>
                          )}
                          {selectedVoucher.total <= selectedVoucher.claimed && (
                            <Button
                              minW="200px"
                              isDisabled
                              isLoading={!checkClaimAble.isFetched}
                            >
                              All vouchers claimed
                            </Button>
                          )}
                        </>
                      )}
                    </>
                  )}
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
            {!isUseQuestionForm && (
              <Box pt={6}>{selectedVoucher.description}</Box>
            )}
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};
