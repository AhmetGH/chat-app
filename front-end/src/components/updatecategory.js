import React, { Component } from 'react';
import axios from 'axios';
import '../styles/update.css';

export default class UpdateProductForm extends Component {
  state = {
    id: '',
    name: '',
    numberOfProduct:''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, numberOfProduct } = this.state;

    try {
      const response = await axios.put(`http://localhost:3000/updatecategory/${id}`, { name, numberOfProduct });
      console.log(response.data.message);
      alert('Kategori başarıyla güncellendi!');
      this.setState({ name: '', numberOfProduct:'' });
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  render() {
    const { id, name, numberOfProduct } = this.state;

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
          <label htmlFor="numberOfProduct" className="label">Ürün Sayısı:</label>
          <input type="text" id="numberOfProduct" name="numberOfProduct" value={numberOfProduct} onChange={this.handleChange} className="input"/>
        </div>
        <button type="submit" className="button">Kategoriyi Güncelle</button>
      </form>
    );
  }
}
