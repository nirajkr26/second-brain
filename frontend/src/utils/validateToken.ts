import axios from "axios"
import { BACKEND_URL } from "./config"

export const validate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {

        const response = await axios.get(BACKEND_URL + "/api/v1/validate", {
            headers: {
                Authorization: token
            }
        });
        console.log(response.data)
        return response.data?.valid
    } catch (err) {
        localStorage.removeItem("token");
        return false;
    }
}