import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@utils/fetch";
import { APIResponse } from "@types";
import { Store } from "@types";
import { config } from "@configs";
import { useToast } from "./useToast";

export function useGetStores(options: {
  companyId?: number;
  enabled?: boolean;
}) {
  const { toast } = useToast();
  return useQuery(
    ["stores", options.companyId],
    async () => {
      const result = await axiosInstance.get<APIResponse<Store[]>>(
        `${config.API_ENDPOINT}/stores?${
          options.companyId ? `companyId=${options.companyId}` : ""
        }`
      );
      return result.data.data;
    },
    {
      enabled: options.enabled && !!options.companyId,
      onError(err) {
        toast({
          error: err,
        });
      },
    }
  );
}
