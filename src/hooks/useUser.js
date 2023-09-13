import { useQuery } from "react-query";
import { tokenLogin } from "../api";

export default function useUser() {
  const { isLoading, data, refetch } = useQuery("tokenLogin", tokenLogin);
  return {
    refetch,
    user: data,
    userLoading: isLoading,
  };
}
