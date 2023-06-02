import { Box, Button, Divider, Spinner, VStack } from "@chakra-ui/react";
import { config } from "@configs";
import { useGetCampaign } from "@hooks/campaign";
import { CampaignProgressEnum } from "@types";
import React from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Countdown, CouponItem, LogoNotFoundItem } from "@components";
import { useAppContext } from "@contexts/AppContext";
import queryString from "query-string";
import { useIntersection } from "@hooks/useIntersection";
import { ModalSelectVoucher } from "./ModalSelectVoucher";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1685462576399-d3a3c11e3f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

export function CampaignDetail() {
  const params = useParams();
  const location = useLocation();
  const camp = useGetCampaign(params.id ? Number(params.id) : undefined);
  const navigate = useNavigate();

  const { isVisible, ref } = useIntersection();

  const campaign = camp.data?.data.data;

  const { setTitle } = useAppContext();

  React.useEffect(() => {
    setTitle?.(campaign ? campaign.company.name.toUpperCase() : "");
  }, [setTitle, campaign]);

  const selectedVoucher = React.useMemo(() => {
    const query = queryString.parse(location.search);
    if (query.selected && campaign) {
      return campaign.voucherDiscounts.find(
        (v) => v.id === Number(query.selected)
      );
    }
  }, [campaign, location.search]);

  const progress = React.useMemo(() => {
    if (campaign) {
      const startDate = new Date(campaign.startDate);
      const endDate = new Date(campaign.endDate);
      const now = new Date();
      if (now > endDate) {
        return CampaignProgressEnum.ENDED;
      } else if (now < startDate) {
        return CampaignProgressEnum.UPCOMING;
      } else {
        return CampaignProgressEnum.ONGOING;
      }
    }
  }, [campaign]);

  return (
    <Box>
      {!campaign && (
        <Box
          minH="150px"
          maxW="lg"
          mx="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Box>
      )}
      {campaign && progress && (
        <>
          <Box
            as="h1"
            fontWeight={700}
            fontSize="1.8rem"
            lineHeight="130%"
            textAlign="center"
          >
            {campaign.name}
          </Box>
          <Box mt={4} width="100%" height="300px">
            <Box
              as="img"
              width="100%"
              height="100%"
              objectFit="cover"
              src={
                campaign.logo
                  ? `${config.APP_IMAGE_END_POINT}/campaigns/${campaign.logo}`
                  : DEFAULT_IMAGE
              }
            />
          </Box>
          {progress === CampaignProgressEnum.ENDED && (
            <Box>
              <Box mt={16}>
                <Box display="flex" justifyContent="center">
                  <LogoNotFoundItem width={128} height={128} />
                </Box>
                <Box
                  mt={4}
                  textAlign="center"
                  as="p"
                  fontWeight={700}
                  fontSize="2rem"
                >
                  Expired campaign
                </Box>
                <Box
                  mt={4}
                  textAlign="center"
                  as="p"
                  fontWeight={700}
                  fontSize="2rem"
                >
                  <Button as={Link} to="/" variant="primary">
                    Go home
                  </Button>
                </Box>
              </Box>
              <Divider mt={4} />
              <Box mt={10}>{campaign.description}</Box>
            </Box>
          )}
          {progress !== CampaignProgressEnum.ENDED && (
            <Box pos="relative">
              {!!selectedVoucher && (
                <ModalSelectVoucher
                  key={selectedVoucher.id}
                  campaign={campaign}
                  selectedVoucher={selectedVoucher}
                  progress={progress}
                  isOpen={!!selectedVoucher}
                  onClose={() => {
                    navigate(`/campaigns/${campaign.id}`);
                  }}
                />
              )}

              <>
                <Box
                  ref={ref}
                  mt={2}
                  as="p"
                  textAlign="center"
                  color="primary"
                  fontWeight="bold"
                  fontSize="1.5rem"
                >
                  {CampaignProgressEnum.ONGOING ? "Expire at" : "Begin when"}
                </Box>
                <Box mt={2}>
                  <Countdown
                    pause={!isVisible}
                    onEnd={() => {
                      camp.refetch();
                    }}
                    targetDate={campaign.endDate}
                  />
                </Box>
              </>
              <VStack spacing="16px" mt={8}>
                {campaign.voucherDiscounts.map((voucher) => {
                  return (
                    <CouponItem
                      progress={progress}
                      url={`/campaigns/${voucher.campaignId}?selected=${voucher.id}`}
                      brand={campaign.company.name}
                      key={voucher.id}
                      title={voucher.description}
                      off={voucher.discount}
                      offType={voucher.type}
                      image={
                        campaign.company.logo
                          ? `${config.APP_IMAGE_END_POINT}/companies/${campaign.company.logo}`
                          : undefined
                      }
                    />
                  );
                })}
              </VStack>

              <Box as="p" mt={6}>
                {campaign.description}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
