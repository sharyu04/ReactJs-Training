import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { todoType } from "../App"
import { todoListType, url } from "../constants/task"

const useFetch = (sortBy: string, page: number, type: string) => {

    const initialData: todoType[] = []

    const { data, isFetching, error } = useQuery({
        initialData: initialData,
        queryKey: ["todoList", sortBy, page, type],
        queryFn: () => {
            let urlValue = url.baseUrlWithLimit
            switch (sortBy) {
                case "Date":
                    urlValue = url.sortByDate
                    break
                case "Name":
                    urlValue = url.sortByName
                    break
            }
                    type === todoListType.completed ? urlValue = `${urlValue}&_page=${page}&iscompleted=true` : (type===todoListType.scheduled ? urlValue = `${urlValue}&_page=${page}&iscompleted=false`: urlValue = `${urlValue}&_page=${page}`)
            return fetch(urlValue).then(res => res.json())
        },
    })

    if (error != null) {
        toast(error.message)
    }

    return { data, isFetching }
}
export default useFetch        
