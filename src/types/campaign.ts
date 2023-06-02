import { VoucherClaimTypeEnum, VoucherDiscount } from "./voucher";

export interface Campaign {
  id: number;
  name: string;
  description: string;
  logo: null | string;
  claimType?: VoucherClaimTypeEnum;
  claimMode: null;
  isDeleted: boolean;
  startDate: string;
  endDate: string;
  createdAt: string;
  createdBy: number;
  companyId: number;
  company: Company;
  voucherDiscounts: VoucherDiscount[];
}

export interface Company {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo: string;
  createdAt: string;
  isDisabled: boolean;
  isDeleted: boolean;
}

export enum CampaignProgressEnum {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  FINISHED = "finished",
  ENDED = "ENDED",
}
