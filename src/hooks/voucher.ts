import { config } from "@configs";
import { useAuthStore } from "@stores/auth";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  APIResponse,
  CampaignProgressEnum,
  VoucherClaim,
  VoucherDiscountWithCampaign,
  VoucherTicket,
} from "@types";
import { axiosInstance } from "@utils/fetch";
import queryString from "query-string";
import { AxiosResponse } from "axios";
import { useToast } from "./useToast";

export function useGetVouchers(options: {
  search?: string;
  filterByProgress?: CampaignProgressEnum;
  page?: number;
}) {
  const { search, filterByProgress, page } = options;
  const { toast } = useToast();
  return useQuery(
    ["vouchers", search, filterByProgress, page],
    async () => {
      const query = queryString.stringify({
        search,
        filterByProgress,
        page,
      });
      const result = await axiosInstance.get<
        APIResponse<VoucherDiscountWithCampaign[]>
      >(`${config.API_ENDPOINT}/vouchers?${query}`);
      return result;
    },
    {
      onError(error) {
        toast({
          error,
        });
      },
    }
  );
}

export function useCheckCanClaim(options: { voucherId?: number }) {
  const { voucherId } = options;
  const user = useAuthStore((state) => state.user);
  return useQuery(
    ["can-claim", voucherId],
    async () => {
      const result = await axiosInstance.get<
        APIResponse<{ canClaim: boolean }>
      >(`${config.API_ENDPOINT}/user-claim/can-claim?id=${voucherId}`);
      return result.data.data;
    },
    {
      enabled: !!voucherId && !!user?.id,
    }
  );
}

export function useClaimVoucher() {
  const { toast } = useToast();
  return useMutation(
    async (data: VoucherClaim) => {
      const result = await axiosInstance.post<AxiosResponse<VoucherTicket>>(
        `${config.API_ENDPOINT}/user-claim/claim`,
        data
      );
      return result.data.data;
    },
    {
      onSuccess() {
        toast({
          status: "success",
          title: "Claim voucher successfully",
        });
      },
      onError(error) {
        toast({
          error,
        });
      },
    }
  );
}

export function useGetMyVouchers() {
  const user = useAuthStore((state) => state.user);
  return useInfiniteQuery({
    queryKey: ["my-vouchers", user?.id],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await axiosInstance.get<APIResponse<VoucherTicket[]>>(
        `${config.API_ENDPOINT}/user-claim?page=${pageParam}`
      );
      return result.data;
    },
    getNextPageParam: (lastPage, x) => {
      if (lastPage.meta?.hasNextPage) {
        return x.length + 1;
      }
    },
    enabled: !!user?.id,
  });
}

export function useGetVouchersInfinite(options: {
  search?: string;
  filterByProgress?: CampaignProgressEnum;
  companyId?: number;
  enabled?: boolean;
}) {
  const { search, filterByProgress, companyId, enabled = true } = options;
  const { toast } = useToast();
  return useInfiniteQuery({
    queryKey: ["vouchers-inf", search, filterByProgress, companyId],
    queryFn: async ({ pageParam = 1 }) => {
      const query = queryString.stringify({
        search,
        filterByProgress,
        page: pageParam,
        companyId,
      });
      const result = await axiosInstance.get<
        APIResponse<VoucherDiscountWithCampaign[]>
      >(`${config.API_ENDPOINT}/vouchers?${query}`);
      return result.data;
    },
    onError(error) {
      toast({
        error,
      });
    },
    getNextPageParam: (lastPage, x) => {
      if (lastPage.meta?.hasNextPage) {
        return x.length + 1;
      }
    },
    enabled,
  });
}
