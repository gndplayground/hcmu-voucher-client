import { Box } from "@chakra-ui/react";
import { CouponItem } from "@components";
import { config } from "@configs";
import { useGetVouchers } from "@hooks/voucher";
import { CampaignProgressEnum } from "@types";

import React from "react";
import { Link } from "react-router-dom";

export interface LatestVouchersProps {
  progress?: CampaignProgressEnum;
}

export function LatestVouchers(props: LatestVouchersProps) {
  const { progress = CampaignProgressEnum.ONGOING } = props;

  const { data } = useGetVouchers({
    filterByProgress: progress,
  });

  return (
    <Box as="section">
      <Box display="flex" alignItems="center">
        <Box as="h2" fontWeight={700} fontSize="1.4rem" m={0}>
          {progress === CampaignProgressEnum.ONGOING && "🔥 Ongoing vouchers"}
          {progress === CampaignProgressEnum.UPCOMING &&
            "🔥 Upcomming vouchers"}
        </Box>
        <Box as={Link} ml="auto" to="/vouchers">
          View all
        </Box>
      </Box>
      <Box mt={2}>
        {data?.data.data.map((voucher) => {
          return (
            <div key={voucher.id}>
              <Box mt="16px">
                <CouponItem
                  progress={progress}
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
        })}
      </Box>
    </Box>
  );
}
