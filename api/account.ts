import api from "@/lib/axios";

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  profile_image: string;
  bio: string;
}


export const getProfileData = async (): Promise<UserProfile> => {
  const res = await api.get("/api/users/me/");
  return res.data || [];
};