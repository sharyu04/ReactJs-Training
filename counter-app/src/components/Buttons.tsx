import { useDispatch } from "react-redux"

function Buttons() {
const dispatch = useDispatch()
    return (
        <>
            <button>Increment</button>
            <button>Decrement</button>
        </>
    )
}
export default Buttons
