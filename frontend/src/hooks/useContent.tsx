import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/config";


export const useContent = () => {
    const [contents, setContents] = useState([]);
    const fetchData = async () => {
        const response = await axios.get(BACKEND_URL + "/api/v1/content", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        setContents(response?.data?.content)

    }
    useEffect(() => {
        fetchData();
    }, [])

    return {contents,fetchData};
}
