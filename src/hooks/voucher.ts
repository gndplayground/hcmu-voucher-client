import { config } from "@configs";
import { useQuery } from "@tanstack/react-query";
import {
  APIResponse,
  CampaignProgressEnum,
  VoucherDiscountWithCampaign,
} from "@types";
import { axiosInstance } from "@utils/fetch";
import queryString from "query-string";

export function useGetVouchers(options: {
  search?: string;
  filterByProgress?: CampaignProgressEnum;
  page?: number;
}) {
  const { search, filterByProgress, page } = options;
  return useQuery(["campaigns", search, filterByProgress, page], async () => {
    const query = queryString.stringify({
      search,
      filterByProgress,
      page,
    });
    const result = await axiosInstance.get<
      APIResponse<VoucherDiscountWithCampaign[]>
    >(`${config.API_ENDPOINT}/vouchers?${query}`);
    return result;
  });
}
