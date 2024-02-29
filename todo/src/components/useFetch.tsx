import { todoType } from "../App"
import { useEffect, useState } from "react"
import axios from "axios"

function useFetch(url: string) {
    const [data, setData] = useState<todoType[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect( () => {
        setLoading(true)
        axios.get(url).then(res => {
            setLoading(false)
            console.log(res)
            setData(res.data)
        }).catch(err => {
            setLoading(false)
            setError(err)
        })
    }, [url])
    return {data, loading, error}
}
export default useFetch        
