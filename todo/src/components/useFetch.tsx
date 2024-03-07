import { todoType } from "../App"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"

function useFetch(url: string) {
    const [data, setData] = useState<todoType[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const getDataFunc = useCallback( async() =>{
        await axios.get(url).then(res => {
            setLoading(false)
            setData(res.data)
        }).catch(err => {
            setLoading(false)
            setError(err)
        })
    },[url])

    useEffect( () => {
        setLoading(true)
        getDataFunc()
    }, [getDataFunc])
    return {data, loading, error}
}
export default useFetch        
