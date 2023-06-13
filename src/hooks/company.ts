import { config } from "@configs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { APIResponse, Company } from "@types";
import { axiosInstance } from "@utils/fetch";

export function useGetCompanies(options: {
  page?: number;
  isHaveActiveCampaigns?: boolean;
}) {
  const { page = 1, isHaveActiveCampaigns = false } = options;

  return useInfiniteQuery({
    queryKey: ["my-vouchers", page, isHaveActiveCampaigns],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await axiosInstance.get<APIResponse<Company[]>>(
        `${config.API_ENDPOINT}/companies?page=${pageParam}&isHaveActiveCampaigns=${isHaveActiveCampaigns}`
      );
      return result.data;
    },
    getNextPageParam: (lastPage, x) => {
      if (lastPage.meta?.hasNextPage) {
        return x.length + 1;
      }
    },
  });
}
