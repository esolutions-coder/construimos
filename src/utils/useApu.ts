import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_FULL_APU_BY_ID } from "../assets/apus_queries/allApus";

export default function useApu(apuId: string) {
    const [loadedApu, setLoadedApu] = useState();
    const { data, error, loading } = useQuery(GET_FULL_APU_BY_ID, {
        variables: {
            apuId
        }
    });

    useEffect(() => {
        if (data) {
            setLoadedApu(data.apu)
        }
    }, [data])

    return { loadedApu }
}