import { Realtor, RealtorsService } from "@api";
import { useQuery } from "react-query";

const useRealtorsQuery = () => {
    return useQuery<Realtor[], Error>(`RealtorsService.getRealtors`, async () => {
        const reponse = await RealtorsService.getRealtors();
        if (!Array.isArray(reponse)) {
            // TODO MANAGE ERROR
        }
        return reponse as Realtor[];
    });
};

export default useRealtorsQuery;