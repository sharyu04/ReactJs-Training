import { decrement, increment } from "../redux/store"
import { useAppDispatch } from "../redux/hooks"

function Buttons() {
const dispatch = useAppDispatch()
    return (
        <>
            <button onClick={() =>dispatch(increment())}>Increment</button>
            <button onClick={() =>dispatch(decrement())}>Decrement</button>
        </>
    )
}
export default Buttons
