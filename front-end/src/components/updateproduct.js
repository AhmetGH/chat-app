import React, { Component } from 'react';
import axios from 'axios';
import '../styles/update.css';

export default class UpdateProductForm extends Component {
  state = {
    id: '',
    name: '',
    dpi: '',
    scanner: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, dpi, scanner } = this.state;

    try {
      const response = await axios.put(`http://localhost:3000/updateproduct/${id}`, { name, dpi, scanner });
      console.log(response.data.message);
      alert('Ürün başarıyla güncellendi!');
      this.setState({ name: '', dpi: '', scanner: '' });
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  render() {
    const { id, name, dpi, scanner } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="id" className="label">Product ID:</label>
          <input type="text" id="id" name="id" value={id} onChange={this.handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={this.handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label htmlFor="dpi" className="label">DPI:</label>
          <input type="text" id="dpi" name="dpi" value={dpi} onChange={this.handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label htmlFor="scanner" className="label">Scanner:</label>
          <input type="text" id="scanner" name="scanner" value={scanner} onChange={this.handleChange} className="input"/>
        </div>
        <button type="submit" className="button">Update Product</button>
      </form>
    );
  }
}
