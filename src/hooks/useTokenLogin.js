import { useQuery } from "react-query";
import { apiTokenLogin } from "../api";

export default function useTokenLogin() {
  const { isLoading, data } = useQuery("tokenLogin", apiTokenLogin);
  return {
    data,
    isLoading,
  };
}
