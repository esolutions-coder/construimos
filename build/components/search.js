import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_APU_BY_USERINPUT } from "../assets/apus_queries/allApus";
export default function SearchBox({ setSearchedApus }) {
    const [userInput, setUserInput] = useState("");
    const [getApuByUser, { loading, error, data }] = useLazyQuery(GET_APU_BY_USERINPUT);
    useEffect(() => {
        if (data) {
            console.log(data);
            setSearchedApus(data.apuByString);
        }
    }, [data]);
    return (_jsxs("div", Object.assign({ className: "search_box my_sm_16" }, { children: [_jsx("input", { type: "text", placeholder: "Buscar APU", value: userInput, onChange: (evt) => setUserInput(evt.target.value) }), _jsx("button", Object.assign({ className: "btn primary_theme", type: "submit", onClick: () => getApuByUser({ variables: { userInput } }) }, { children: "Buscar" }))] })));
}
