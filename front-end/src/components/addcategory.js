import React, { Component } from 'react';
import axios from 'axios';
import '../styles/add.css';

export default class AddCategoryForm extends Component {
  state = {
    name: '',
    numberOfProduct: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, numberOfProduct } = this.state;

    try {
      const response = await axios.post('http://localhost:3000/addcategory', { name, numberOfProduct });
      console.log(response.data.message);
      alert('Kategori başarıyla eklendi!');
      this.setState({ name: '', numeberOfProduct: '' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  render() {
    const { name, numberOfProduct } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name" className="label">Kategori Adı:</label>
          <input type="text" id="name" name="name" value={name} onChange={this.handleChange} className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfProduct" className="label">Ürün Sayısı:</label>
          <input 
            type="text" 
            id="numberOfProduct" 
            name="numberOfProduct" 
            value={numberOfProduct} 
            onChange={this.handleChange} className="input" />
        </div>
        <button type="submit" className="button">Kategori Ekle</button>
      </form>
    );
  }
}
