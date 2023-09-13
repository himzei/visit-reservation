import { useQuery } from "react-query";
import { apiVisitSiteIndex } from "../api";

export default function useVisitSite() {
  const { data } = useQuery("visitSiteIndex", apiVisitSiteIndex);
  return {
    data,
  };
}
