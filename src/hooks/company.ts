import { config } from "@configs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { APIResponse, Company } from "@types";
import { axiosInstance } from "@utils/fetch";
import queryString from "query-string";

export function useGetCompanies(options: {
  page?: number;
  search?: string;
  isHaveActiveCampaigns?: boolean;
}) {
  const { page = 1, isHaveActiveCampaigns = false, search } = options;

  const query = useInfiniteQuery({
    queryKey: ["my-vouchers", page, isHaveActiveCampaigns, search],
    queryFn: async ({ pageParam = 1 }) => {
      const query = queryString.stringify({
        page: pageParam,
        search,
        isHaveActiveCampaigns,
      });
      const result = await axiosInstance.get<APIResponse<Company[]>>(
        `${config.API_ENDPOINT}/companies?${query}`
      );
      return result.data;
    },
    getNextPageParam: (lastPage, x) => {
      if (lastPage.meta?.hasNextPage) {
        return x.length + 1;
      }
    },
  });

  return query;
}

export function useGetCompany(options: { id?: number }) {
  const { id } = options;
  const query = useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const result = await axiosInstance.get<APIResponse<Company>>(
        `${config.API_ENDPOINT}/companies/${id}`
      );
      return result.data;
    },
    enabled: !!id,
  });

  return query;
}
