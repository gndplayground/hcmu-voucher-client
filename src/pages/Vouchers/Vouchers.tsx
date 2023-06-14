import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useGetVouchers } from "@hooks/voucher";
import { Box, Select, VStack } from "@chakra-ui/react";
import { CouponItem, HasNextPagination } from "@components";
import { CampaignProgressEnum } from "@types";
import { config } from "@configs";
import { useAppContext } from "@contexts/AppContext";

export function Vouchers() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = React.useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  const vouchers = useGetVouchers({
    filterByProgress:
      (queryParams.progress as any) || CampaignProgressEnum.ONGOING,
    page: queryParams.page ? Number(queryParams.page) : 1,
  });

  const app = useAppContext();

  const title = React.useMemo(() => {
    if (queryParams.progress === CampaignProgressEnum.UPCOMING) {
      return "Upcoming Vouchers";
    }
    return "Ongoing Vouchers";
  }, [queryParams.progress]);

  React.useEffect(() => {
    app?.setTitle?.(title);
    return () => {
      app?.setTitle?.("");
    };
  }, [app, title]);

  return (
    <>
      <Box
        as="h1"
        fontWeight={700}
        fontSize="1.8rem"
        lineHeight="130%"
        textAlign="center"
        color="brand.500"
      >
        Vouchers
      </Box>
      <Box mt={4}>
        <Select
          value={(queryParams.progress as any) || CampaignProgressEnum.ONGOING}
          onChange={(e) => {
            navigate(`/vouchers?progress=${e.target.value}&page=${1}`);
          }}
        >
          <option value={CampaignProgressEnum.ONGOING}>Ongoing</option>
          <option value={CampaignProgressEnum.UPCOMING}>Upcoming</option>
        </Select>
      </Box>
      <VStack mt={4} spacing={4}>
        {vouchers.data?.data.data.map((voucher) => {
          return (
            <CouponItem
              progress={
                (queryParams.progress as any) || CampaignProgressEnum.ONGOING
              }
              url={`/campaigns/${voucher.campaignId}?selected=${voucher.id}`}
              brand={voucher.campaign.company.name}
              key={voucher.id}
              title={voucher.description}
              off={voucher.discount}
              offType={voucher.type}
              image={
                voucher.campaign.company.logo
                  ? `${config.APP_IMAGE_END_POINT}/companies/${voucher.campaign.company.logo}`
                  : undefined
              }
              expiryDate={voucher.campaign.endDate}
              startDate={voucher.campaign.startDate}
              claimed={voucher.claimed}
              total={voucher.total}
            />
          );
        })}
      </VStack>
      <HasNextPagination
        currentPage={queryParams.page ? Number(queryParams.page) : 1}
        hasNextPage={vouchers.data?.data.meta?.hasNextPage || false}
        onPageChange={(page) => {
          navigate(`/vouchers?progress=${queryParams.progress}&page=${page}`);
        }}
      />
    </>
  );
}
