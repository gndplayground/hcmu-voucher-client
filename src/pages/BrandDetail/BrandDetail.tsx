import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SectionLoading } from "@components";
import { config } from "@configs";
import { useAppContext } from "@contexts/AppContext";
import { useGetCompany } from "@hooks/company";
import { StoreLocation } from "@pages/CampaignDetail/StoreLocation";
import React from "react";
import { FiExternalLink, FiMapPin, FiPhone } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { VouchersList } from "./VouchersList";

export function BrandDetail() {
  const { id } = useParams();
  const companyGet = useGetCompany({
    id: id ? Number(id) : undefined,
  });

  const company = companyGet.data?.data;

  const app = useAppContext();

  React.useEffect(() => {
    if (!company) return;
    app?.setTitle?.(company.name);
    return () => {
      app?.setTitle?.("");
    };
  }, [app, company]);

  if (!company) {
    return <SectionLoading />;
  }

  return (
    <Box>
      <Box mt={4}>
        {company.logo && (
          <Box display="flex" justifyContent="center">
            <Box
              p="18px"
              w="120px"
              h="120px"
              display="inline-flex"
              justifyContent="center"
              borderRadius="50%"
              border="1px solid"
              borderColor="brand.200"
            >
              <Box
                w="100%"
                objectFit="contain"
                as="img"
                src={
                  company?.logo
                    ? `${config.APP_IMAGE_END_POINT}/companies/${company.logo}`
                    : undefined
                }
              />
            </Box>
          </Box>
        )}
        <Box
          as="h1"
          mt={2}
          mb={2}
          fontWeight={700}
          fontSize="1.5rem"
          textAlign="center"
          color="brand.500"
        >
          {company.name}
        </Box>
        {company.address && (
          <Box mt={2} display="flex" as="p">
            <Box as="span" fontSize="1.5rem">
              <FiMapPin />
            </Box>
            <Box as="span" ml={2}>
              {company.address}
            </Box>
          </Box>
        )}
        {company.phone && (
          <Box mt={2} display="flex" as="p">
            <Box as="span" fontSize="1.5rem">
              <FiPhone />
            </Box>
            <Box as="span" ml={2}>
              {company.phone}
            </Box>
          </Box>
        )}
        <Box display="flex" mt={4} justifyContent="center">
          {company.website && (
            <Button
              as="a"
              href={company.website}
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
        <Tabs mt={6} colorScheme="brand" variant="enclosed" isLazy>
          <TabList>
            <Tab>Vouchers</Tab>
            <Tab>Stores</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <VouchersList companyId={company.id} />
            </TabPanel>
            <TabPanel px={0}>
              <StoreLocation company={company} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
