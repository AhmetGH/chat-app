import React, { Component } from 'react';
import axios from 'axios';
import '../styles/delete.css';

export default class DeleteProductForm extends Component {
  state = {
    id: ''
  };

  handleChange = (e) => {
    this.setState({ id: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.state;

    try {
      const response = await axios.delete(`http://localhost:3000/deleteproduct/${id}`);
      console.log(response.data.message);
      alert('Ürün başarıyla silindi!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  render() {
    const { id } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className='form-container'>
        <div className='form-group'>
          <label htmlFor="id" className='label'>Product ID:</label>
          <input type="text" id="id" name="id" value={id} onChange={this.handleChange} className='input'/>
        </div>
        <button type="submit" className='button'>Delete Product</button>
      </form>
    );
  }
}
