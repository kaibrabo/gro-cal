import React from "react";
import AddPlant from "./AddPlant";
import SaveButton from "./SaveButton";

class EditPlant extends AddPlant {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {
            plantId,
            name,
            type,
            startVeg,
            startFlower,
            flowerTime,
        } = this.props;
        this.setState({
            plantId,
            name,
            type,
            startVeg,
            startFlower,
            flowerTime,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.savePlant(this.state);
        this.props.onClose();
    };

    handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value,
        });
    };

    render() {
        const { onClose } = this.props;
        const { name, type, startVeg, startFlower, flowerTime } = this.state;
        return (
            <div>
                <h2>Edit Plant</h2>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="input-title">Name:</td>
                                <td className="input-field">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name || ""} // (undefined || '') = '' uncontrolled comp. to controlled
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Type:</td>
                                <td className="input-field">
                                    <input
                                        list="strain-type"
                                        name="type"
                                        value={type || ""}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                    <datalist id="strain-type">
                                        <option value="Hybrid"></option>
                                        <option value="Indica"></option>
                                        <option value="Sativa"></option>
                                    </datalist>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Start Veg:</td>
                                <td className="input-field">
                                    <input
                                        type="date"
                                        name="startVeg"
                                        value={startVeg || ""}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Start Flower:</td>
                                <td className="input-field">
                                    <input
                                        type="date"
                                        name="startFlower"
                                        value={startFlower || ""}
                                        required
                                        pattern="[0-9]{2}/[0-9]{}/[0-9]{}"
                                        onChange={this.handleInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">
                                    <label>Flower Time:</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="number"
                                        placeholder="~ 60 days +-"
                                        name="flowerTime"
                                        value={flowerTime || ""}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="add-cancel-btns">
                        <SaveButton />
                        <button onClick={onClose}>cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPlant;
