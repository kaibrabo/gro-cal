import React, {Component} from 'react';
import AddButton from './AddButton';
import './AddPlant.css';

class AddPlant extends Component {
    render() {
        return (
            <div>
                <h2>Add New Plant</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td className="input-title">Name:</td>
                                <td className="input-field">
                                    <input type="text" name="name"></input>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Type:</td>
                                <td className="input-field">
                                    <input list="strain-type" name="type"></input>
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
                                    <input type="date" name="startVeg"></input>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Start Flower:</td>
                                <td className="input-field">
                                    <input type="date" name="startFlower"></input>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">
                                    <label>
                                    Flower Time:
                                    </label>
                                </td>
                                <td className="input-field">
                                    <input type="number" placeholder="~ 60 days +-" name="flower-time"></input>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">
                                    <label>
                                        est. harvest:
                                    </label>
                                </td>
                                <td className="input-field">
                                    {/* Harvest = StartFlowering date + FlowerTime days */}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <AddButton />
                </form>
            </div>
        );
    }
}

export default AddPlant;
