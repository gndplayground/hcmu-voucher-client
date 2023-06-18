import { Box, Button, Divider, Spinner, VStack } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { config } from "@configs";
import { useGetCampaign } from "@hooks/campaign";
import { CampaignProgressEnum } from "@types";
import React from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Countdown, CouponItem, LogoNotFoundItem } from "@components";
import { useAppContext } from "@contexts/AppContext";
import queryString from "query-string";
import { useIntersection } from "@hooks/useIntersection";
import { FiExternalLink, FiMapPin, FiPhone } from "react-icons/fi";
import { ModalSelectVoucher } from "./ModalSelectVoucher";
import { StoreLocation } from "./StoreLocation";

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
        return CampaignProgressEnum.FINISHED;
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
            color="brand.500"
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
          {progress === CampaignProgressEnum.FINISHED && (
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
          {progress !== CampaignProgressEnum.FINISHED && (
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
                  refetch={camp.refetch}
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
              <Tabs colorScheme="brand" variant="enclosed" mt={4} isLazy>
                <TabList>
                  <Tab>Vouchers</Tab>
                  <Tab>Descripton</Tab>
                  <Tab>Where to use</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel px={0}>
                    <VStack spacing="16px">
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
                            total={voucher.total}
                            claimed={voucher.claimed}
                          />
                        );
                      })}
                    </VStack>
                  </TabPanel>
                  <TabPanel px={0}>
                    <Box as="p">{campaign.description}</Box>
                  </TabPanel>
                  <TabPanel px={0}>
                    <>
                      <Box mt={4}>
                        {campaign.company.logo && (
                          <Box display="flex" justifyContent="center">
                            <Box
                              px={4}
                              w="120px"
                              h="120px"
                              display="inline-flex"
                              justifyContent="center"
                              borderRadius="50%"
                              border="1px solid"
                              borderColor="gray.200"
                            >
                              <Box
                                w="100%"
                                objectFit="contain"
                                as="img"
                                src={
                                  campaign.company?.logo
                                    ? `${config.APP_IMAGE_END_POINT}/companies/${campaign.company.logo}`
                                    : undefined
                                }
                              />
                            </Box>
                          </Box>
                        )}
                        <Box
                          mt={2}
                          mb={8}
                          fontWeight={700}
                          fontSize="1.5rem"
                          textAlign="center"
                        >
                          {campaign.company.name}
                        </Box>
                        {campaign.company.address && (
                          <Box mt={2} display="flex" as="p">
                            <Box as="span" fontSize="1.5rem">
                              <FiMapPin />
                            </Box>
                            <Box as="span" ml={2}>
                              {campaign.company.address}
                            </Box>
                          </Box>
                        )}
                        {campaign.company.phone && (
                          <Box mt={2} display="flex" as="p">
                            <Box as="span" fontSize="1.5rem">
                              <FiPhone />
                            </Box>
                            <Box as="span" ml={2}>
                              {campaign.company.phone}
                            </Box>
                          </Box>
                        )}
                        <Box display="flex" mt={4} justifyContent="center">
                          <Button
                            as={Link}
                            to={`/brands/${campaign.company.id}`}
                            colorScheme="brand"
                            variant="outline"
                          >
                            View brand deals
                          </Button>
                          {campaign.company.website && (
                            <Button
                              as="a"
                              href={campaign.company.website}
                              target="__blank"
                              variant="outline"
                              colorScheme="brand"
                              ml={2}
                              leftIcon={<FiExternalLink />}
                            >
                              Visit website
                            </Button>
                          )}
                        </Box>
                      </Box>
                      <Divider mt={4} />
                      <Box mt={4}>
                        <StoreLocation company={campaign.company} />
                      </Box>
                    </>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
