export interface ICoupons {
  name?: string | undefined;
  description?: string | undefined;
  active: boolean;
  code?: string;
  value?: string;
  max_uses?: string;
  type?: string;
  starts_at?: Date;
  ends_at?: Date;
  company_id?: number;
  id?: number;
}
