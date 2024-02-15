import React, { Component } from 'react';
import axios from 'axios';
import '../styles/add.css';

export default class AddCategoryForm extends Component {
  state = {
    name: '',
    dpi: '',
    scanner: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dpi, scanner } = this.state;
  
    try {
      const response = await axios.post('http://localhost:3000/addproduct', { name, dpi, scanner });
      console.log(response.data.message);
      alert('Ürün başarıyla eklendi!');
      this.setState({ name: '', dpi: '', scanner: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  render() {
    const { name, dpi, scanner } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name" className="label">Mouse modeli:</label>
          <input type="text" id="name" name="name" value={name} onChange={this.handleChange} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="dpi" className="label">DPI:</label>
          <input type="text" id="dpi" name="dpi" value={dpi} onChange={this.handleChange} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="scanner" className="label">Tarayıcı:</label>
          <input type="text" id="scanner" name="scanner" value={scanner} onChange={this.handleChange} className="input" />
        </div>
        <button type="submit" className="button">Mouse ekle</button>
      </form>
    );
  }
}
