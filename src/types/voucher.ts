import { Campaign } from "./campaign";

export enum VoucherDiscountTypeEnum {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}

export enum VoucherClaimTypeEnum {
  FASTEST = "FASTEST",
  QUESTIONS = "QUESTIONS",
}

export enum VoucherCodeTypeEnum {
  CLAIM = "CLAIM",
  MANUAL = "MANUAL",
}

export interface VoucherDiscount {
  id: number;
  campaignId: number;
  description: string;
  type: VoucherDiscountTypeEnum;
  claimType?: VoucherClaimTypeEnum;
  claimMode: number | null;
  code: null | string;
  codeType?: VoucherCodeTypeEnum;
  discount: number;
  total: number;
  claimed: number;
  createdAt: string;
  isDeleted: boolean;
}

export interface VoucherDiscountWithCampaign extends VoucherDiscount {
  campaign: Campaign;
}
