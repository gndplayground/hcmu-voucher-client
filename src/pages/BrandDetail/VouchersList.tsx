import { Box, Button } from "@chakra-ui/react";
import { CouponItem } from "@components";
import { config } from "@configs";
import { useGetVouchersInfinite } from "@hooks/voucher";
import { CampaignProgressEnum } from "@types";
import React from "react";

export interface VouchersListProps {
  companyId?: number;
}

export function VouchersList(props: VouchersListProps) {
  const { companyId } = props;

  const vouchers = useGetVouchersInfinite({
    companyId,
    enabled: !!companyId,
    filterByProgress: CampaignProgressEnum.ONGOING,
  });

  return (
    <Box>
      {vouchers.data?.pages?.[0].data.length === 0 && (
        <Box textAlign="center">
          Please check back later as new vouchers may become available
        </Box>
      )}
      {vouchers.data?.pages.map((page) => {
        return page.data.map((voucher) => {
          return (
            <div key={voucher.id}>
              <Box mt="16px">
                <CouponItem
                  progress={CampaignProgressEnum.ONGOING}
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
              </Box>
            </div>
          );
        });
      })}

      <Box mt={2} textAlign="center">
        {vouchers.hasNextPage && (
          <Button
            onClick={() => vouchers.fetchNextPage()}
            isLoading={vouchers.isFetchingNextPage}
          >
            {vouchers.isFetchingNextPage ? "Loading more..." : "Load more"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
