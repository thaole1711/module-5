import {Component} from "react";

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            item: ""
        };
    }

    handleChange = (event) => {
        this.setState ({item: event.target.value});
    }
    AddTodo = () => {
        if (this.state.item.trim() === "") return;
        this.props.onAdd(this.state.item);
        this.setState({
             item: ""
        })
    }


render() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="h-80 px-7 w-[700px] rounded-[12px] bg-white p-4 shadow-md border">
                <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
                    To do list
                </p>
                <textarea
                    value={this.state.item}
                    onChange={this.handleChange}
                    className="h-40 px-3 text-sm py-1 mt-5 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm"
                    placeholder="Add your todo here"></textarea>

                <div className="flex justify-between mt-2">

                    <button
                        className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600"
                        onClick={this.AddTodo}>Add

                    </button>
                </div>
            </div>
        </div>
    )

}
}


export default Add