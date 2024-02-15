import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import AddProduct from './components/addproduct.js';
import AddCategory from './components/addcategory.js';
import List from './components/list.js';
import Delete from './components/delete.js';
import UpdateProduct from './components/updateproduct.js';
import UpdateCategory from './components/updatecategory.js';
import Chat from './components/chat.js';
import './styles/menu.css';

export default class MenuExampleContentProp extends Component {
  state = {
    activeItem: ''
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderContent() {
    const { activeItem } = this.state;

    switch (activeItem) {
      case 'addProduct':
        return <AddProduct />;
      case 'addCategory':
        return <AddCategory />;
      case 'list':
        return <List />;
      case 'updateProduct':
        return <UpdateProduct />;
      case 'updateCategory':
        return <UpdateCategory />;
      case 'delete':
        return <Delete />;
      case 'chat':
        return <Chat />;
      default:
        return null;
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu className="menu">
          <Menu.Item
            name='addProduct'
            active={activeItem === 'addProduct'}
            content='Ürün Ekle'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='addCategory'
            active={activeItem === 'addCategory'}
            content='Kategori Ekle'
            onClick={this.handleItemClick}
          />

          <Menu.Item
            name='list'
            active={activeItem === 'list'}
            content='Listele'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='updateProduct'
            active={activeItem === 'updateProduct'}
            content='Ürün Güncelle'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='updateCategory'
            active={activeItem === 'updateCategory'}
            content='Kategori Güncelle'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='delete'
            active={activeItem === 'delete'}
            content='Sil'
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='chat'
            active={activeItem === 'chat'}
            content='Sohbet'
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderContent()}
      </div>
    );
  }
}