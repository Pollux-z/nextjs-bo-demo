import axios from 'axios'
import useSWR from 'swr'

export const axiosInstance = axios.create({
    // baseURL: `${process.env.DATABASE_URL}`
    baseURL: `${process.env.NEXT_PUBLIC_URL}`
})
    const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

    export default fetcher;
