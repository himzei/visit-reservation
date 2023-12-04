import { useQuery } from "react-query";
import useVisitSite from "./useVisitSite";
import { apiGetPurposeOfVisit } from "../api";

export default function useGetVisitPurpose() {
  const { data: visitSite } = useVisitSite();
  const visitSiteIndex = visitSite?.visitSite?.visitSiteIndex;

  const { data } = useQuery(
    ["getPurposeOfVisit", visitSiteIndex],
    apiGetPurposeOfVisit
  );
  return data;
}
