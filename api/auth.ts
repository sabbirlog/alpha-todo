import api from "@/lib/axios";

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const userLogin = async (formData: FormData): Promise<LoginResponse> => {
  const res = await api.post("/api/auth/login/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const payload = res?.data;

  if (!payload?.access || !payload.refresh) {
    throw new Error("Invalid response from server");
  }

  return payload;
};

export const userRegister = async (formData: FormData): Promise<LoginResponse> => {
  const res = await api.post("/api/users/signup/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const payload = res?.data;

  if (!payload?.access || !payload.refresh) {
    throw new Error("Invalid response from server");
  }

  return payload;
};
