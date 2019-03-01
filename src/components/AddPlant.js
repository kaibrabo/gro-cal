import React, {Component} from 'react';
import './AddPlant.css';
import './AddButton.css';
import AddButton from './AddButton';

class AddPlant extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.addPlant(this.state);
    }

    render() {
        return (
            <div>
                <h2>Add New Plant</h2>
                <form onSubmit={this.onSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td className="input-title">Name:</td>
                                <td className="input-field">
                                    <input type="text"
                                           name="name"
                                           onChange={this.handleInputChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Type:</td>
                                <td className="input-field">
                                    <input list="strain-type" 
                                           name="type"
                                           onChange={this.handleInputChange} required/>
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
                                    <input type="date" 
                                           name="startVeg"
                                           onChange={this.handleInputChange} required/>
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">Start Flower:</td>
                                <td className="input-field">
                                    <input type="date" 
                                           name="startFlower"
                                           required pattern="[0-9]{2}/[0-9]{}/[0-9]{}"
                                           onChange={this.handleInputChange} />
                                </td>
                            </tr>
                            <tr>
                                <td className="input-title">
                                    <label>
                                    Flower Time:
                                    </label>
                                </td>
                                <td className="input-field">
                                    <input type="number" 
                                           placeholder="~ 60 days +-" 
                                           name="flowerTime"
                                           onChange={this.handleInputChange} required/>
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
