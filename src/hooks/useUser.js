import { useQuery } from "react-query";
import { apiTokenLogin } from "../api";

export default function useUser() {
  const { isLoading, data, refetch } = useQuery("tokenLogin", apiTokenLogin);
  return {
    refetch,
    user: data,
    userLoading: isLoading,
  };
}
