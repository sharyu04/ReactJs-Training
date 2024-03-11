import { useQuery } from "@tanstack/react-query"
import { todoType } from "../App"

const useFetch = (url: string) => {

    const initialData: todoType[] = []

    const {data,isFetching, error } = useQuery({
            initialData: initialData,
            queryKey : ["todoList"],
            queryFn: () => 
                fetch(url).then(res => res.json()),
        })
    return {data, isFetching, error}
}
export default useFetch        
