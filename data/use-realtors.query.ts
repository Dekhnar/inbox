import { Realtor, RealtorsService } from "@api";
import { useQuery } from "react-query";

export const fetchRealtors = async () => {
  const reponse = await RealtorsService.getRealtors();
  return reponse as Realtor[];
};

const useRealtorsQuery = () => {
  return useQuery<Realtor[], Error>(
    `RealtorsService.getRealtors`,
    fetchRealtors
  );
};

export default useRealtorsQuery;
