export interface ICompany {
  name: string | undefined;
  description: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phone_number: string | undefined;
  active: boolean;
  social_media: string | undefined;
  created_at?: Date;
  id?: number;
  lat?: number;
  long?: number;
  updated_at?: Date;
  points? : number;
  section_id? : number;
}
