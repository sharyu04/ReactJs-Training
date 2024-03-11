import { useQuery } from "@tanstack/react-query"
import { todoType } from "../App"
import { url } from "../constants/task"

const useFetch = (sortBy: string) => {

    const initialData: todoType[] = []

    const { data, isFetching, error } = useQuery({
        initialData: initialData,
        queryKey: ["todoList", sortBy],
        queryFn: () => {
            let urlValue = url.baseUrl
            switch (sortBy) {
                case "Date":
                    urlValue = url.sortByDate
                    break
                case "Name":
                    urlValue = url.sortByName
                    break
            }
            return fetch(urlValue).then(res => res.json())
        },
    })

    if (error!=null){
        alert(error)
    }

    return { data, isFetching}
}
export default useFetch        
