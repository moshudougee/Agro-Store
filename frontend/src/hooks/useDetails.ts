import axios from "axios"
import { useCallback, useEffect, useState } from "react"


const useDetails = () => {
    const [details, setDetails] = useState<FarmerDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api/details/getDetails")
            setDetails(res.data)
        } catch (error) {
            console.log(error)
            setError('An error occurred while fetching farmer details')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    const mutate = useCallback( async () => {
        await fetchDetails()
    }, [])

    return { details, loading, error, mutate }
}

export default useDetails