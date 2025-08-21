import {useState} from "react";

function UseIncrement() {

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const Increase1 = (number) => {
        setCount1(count1 + number);
    }
        const Increase2 = (number) => {
            setCount2(count2 + number);

        }
        return (
            <>
                <div>
                    <h2> Count:{count1}</h2>
                    <button onClick={() => Increase1(1)}>Add1</button>
                </div>
                <div>
                    <h2> Count:{count2}</h2>
                    <button onClick={() => Increase2(2)}>Add2</button>
                </div>

            </>
        )

    }
    export default UseIncrement