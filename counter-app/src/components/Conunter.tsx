import { useAppSelector } from "../redux/hooks";

function Counter() {
    const count = useAppSelector(state => state)
    return (
        <h1 >{count}</h1>
    );
}
export default Counter
