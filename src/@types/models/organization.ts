export interface IOrganization {
  id: string;
  name: string;
  slug: string;
  logo_media_id: string;
  created_at: string;
  updated_at: string;
  membership_level: number;
  plugins_access_level: number;
  // TODO: Check response to this
  projects: any[];
  // TODO: Check response to this
  available_product_features: any[];
  is_member_join_email_enabled: boolean;
  metadata: string;
  customer_id: string;
  enforce_2fa: boolean;
  member_count: string;
  is_ai_data_processing_approved: boolean;
}
