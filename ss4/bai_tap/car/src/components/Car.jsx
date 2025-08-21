import {useState} from "react";

function SelectdCar() {
    const carList = ["mercedes S600", "mercedes S700", "mercedes S800", "mercedes S900"];
    const colorList = ["red", "yellow", "white", "blue"];
    let [selectedCar, setSelectedCar] = useState("");
    let [selectedColor, setSelectedColor] = useState("");
    return (<>
        <div>
            <h2>Select your car</h2>
            <div>
                Select your car:
                <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
                    <option value="">--choose a car---</option>
                    {carList.map((car, index) => (
                        <option key={index} value={car}>{car}</option>
                    ))}
                </select>
            </div>
            <div>
                Select a color:
                <select value={selectedColor} onChange={event => setSelectedColor(event.target.value)}>
                    <option value="">--choose a color--</option>
                    {colorList.map((color, index) => (
                        <option key={index} value={color}>{color}</option>
                    ))}
                </select>
            </div>
            <h2> you selected a {selectedCar}-{selectedColor}</h2>
        </div>
    </>)
}

export default SelectdCar