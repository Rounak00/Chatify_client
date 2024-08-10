import axios from "axios"
import { HOST } from "@/utils/constant"

const apiClient=axios.create({
    baseURL:HOST,
})    
