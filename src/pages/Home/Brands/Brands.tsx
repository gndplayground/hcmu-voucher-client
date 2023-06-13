import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { Brand } from "@components";
import { useGetCompanies } from "@hooks/company";

export function Brands() {
  const companies = useGetCompanies({
    isHaveActiveCampaigns: true,
  });

  return (
    <div>
      <Wrap spacing={4}>
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
    </div>
  );
}
