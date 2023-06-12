export interface Store {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  address?: string;
  createdAt: Date;
  openAt?: string;
  closeAt?: string;
  companyId?: number;
  isDeleted?: boolean;
}
