import {useEffect, useState} from 'react'

import './App.css'

function App() {
    let [selected, setSelected] = useState("0");
    let [valueSelected, setValueSelected] = useState("");
    const choise = e => {
        setSelected(e.target.value);
    }
        useEffect(() => {
            switch (selected) {
                case "0":
                    setValueSelected("java");
                    break;
                case "1":
                    setValueSelected("Angular");
                    break;
                case "2":
                    setValueSelected("javascript");
                    break;
                case "3":
                    setValueSelected("Php");
                    break;
                default:
            }
        }, [selected]);

    return (
        <>
            khóa học:
            <select onChange={e => {
                choise(e);
            }}>
                <option value="0">java</option>
                <option value="1">Angular</option>
                <option value="2">javascript</option>
                <option value="3">Php</option>
            </select>
            <h2>your selected:{valueSelected}</h2>
        </>
    )
}

export default App
