import { api } from "@/modules/infra/services/apiClient";

type ParamType = {
  email:string;
  password: string;
}

export const signInRequest = async (params: ParamType) => {
  return api.post('users/login', {
    user: params
  });
}
