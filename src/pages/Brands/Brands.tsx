import {
  Box,
  Button,
  Center,
  Checkbox,
  IconButton,
  Input,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Brand } from "@components";
import { useAppContext } from "@contexts/AppContext";
import { useGetCompanies } from "@hooks/company";
import React from "react";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export function Brands() {
  const [search, setSearch] = React.useState("");
  const [isHaveActiveCampaigns, setIsHaveActiveCampaigns] =
    React.useState<boolean>(false);

  const companies = useGetCompanies({
    isHaveActiveCampaigns,
    search,
  });

  const app = useAppContext();

  React.useEffect(() => {
    app?.setTitle?.("Brands");
    return () => {
      app?.setTitle?.("");
    };
  }, [app]);

  const handleOnChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <Box>
      <IconButton as={Link} to="/" aria-label="Back" variant="outline">
        <FiArrowLeft />
      </IconButton>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
        color="brand.500"
      >
        Amazing Brands
      </Box>
      <Box mt={2}>
        <Box width="100%" display="flex">
          <Input placeholder="Search brand" onChange={handleOnChange} />
        </Box>
        <Box mt={2}>
          <Checkbox
            colorScheme="brand"
            isChecked={isHaveActiveCampaigns}
            onChange={(e) => {
              setIsHaveActiveCampaigns(e.target.checked);
            }}
          >
            Only brand have active vouchers
          </Checkbox>
        </Box>
      </Box>
      <Wrap mt={4} spacing={4} justify="center">
        {companies.data?.pages.map((page) => {
          return page.data.map((company) => {
            return (
              <WrapItem w="calc(50% - 32px)" key={company.id}>
                <Center flexDir="column" w="100%">
                  <Brand company={company} />
                </Center>
              </WrapItem>
            );
          });
        })}
      </Wrap>
      {companies.hasNextPage && (
        <Box textAlign="center" mt={4}>
          <Button
            colorScheme="brand"
            onClick={() => {
              companies.fetchNextPage();
            }}
          >
            Load more
          </Button>
        </Box>
      )}
    </Box>
  );
}
