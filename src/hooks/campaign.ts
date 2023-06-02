import { config } from "@configs";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, Campaign, CampaignProgressEnum } from "@types";
import { axiosInstance } from "@utils/fetch";
import queryString from "query-string";

export function useGetCampaigns(options: {
  search?: string;
  filterByProgress?: CampaignProgressEnum;
  page?: number;
  companyId?: number;
}) {
  const { search, filterByProgress, page, companyId } = options;
  return useQuery(
    ["campaigns", search, filterByProgress, page, companyId],
    async () => {
      const query = queryString.stringify({
        search,
        filterByProgress,
        page,
        companyId,
      });
      const result = await axiosInstance.get<APIResponse<Campaign[]>>(
        `${config.API_ENDPOINT}/campaigns?${query}`
      );
      return result;
    }
  );
}

export function useGetCampaign(id?: number) {
  return useQuery(
    ["campaign", id],
    async () => {
      const result = await axiosInstance.get<APIResponse<Campaign>>(
        `${config.API_ENDPOINT}/campaigns/${id}`
      );
      return result;
    },
    {
      enabled: !!id,
    }
  );
}
