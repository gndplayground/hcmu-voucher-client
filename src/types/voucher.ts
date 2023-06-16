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

export enum VoucherQuestionTypeEnum {
  FREE = "FREE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}

export interface VoucherQuestionChoice {
  id: number;
  questionId: number;
  choice: string;
  isCorrect: boolean | null;
  isDeleted: boolean | null;
  createdAt: Date;
}

export interface VoucherQuestion {
  id: number;
  question: string;
  type: VoucherQuestionTypeEnum;
  createdAt: string;
  campaignId?: number;
  discountId?: number;
  isDeleted?: boolean;
  voucherQuestionChoices?: VoucherQuestionChoice[];
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
  voucherQuestions?: VoucherQuestion[];
}

export interface VoucherDiscountWithCampaign extends VoucherDiscount {
  campaign: Campaign;
}

export interface VoucherClaim {
  voucherDiscountId: number;
  quenstionAnswers?: {
    questionId: number;
    choices?: number[];
    answer?: string;
  }[];
}

export interface VoucherTicket {
  id: number;
  discountId: number;
  code: string;
  isUsed: false;
  claimBy: number;
  claimAt: string;
  ownedBy?: number;
  voucherDiscount: VoucherDiscountWithCampaign;
}
