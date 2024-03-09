import { todoType } from "../App"
import { useEffect, useState } from "react"
import axios from "axios"

function useFetch(url: string) {
    const [data, setData] = useState<todoType[]>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const getDataFunc = async() =>{
        await axios.get(url).then(res => {
            setLoading(false)
            console.log(res)
            setData(res.data)
        }).catch(err => {
            setLoading(false)
            setError(err)
        })
    }

    useEffect( () => {
        setLoading(true)
        getDataFunc()
    }, [url])
    return {data, loading, error}
}
export default useFetch        
