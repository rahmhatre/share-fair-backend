export interface IMember {
  name: string;
  email?: string;
  mobileNumber?: string;
  userId?: string; // Map this to the userId if this same user logs in from email
}
