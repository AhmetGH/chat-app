var express = require('express');
const { Client } = require('pg');
const socket = require('socket.io')
const app = express()
const cors = require('cors');
const PORT =3000;

const dbConfig = {
    user: 'postgres',
    password: '889501',
    host: 'localhost',
    port: '5432',
    database: 'venhancer',
  };

const client = new Client(dbConfig);

app.use(cors());
app.use( express.json() );
app.use(express.static('public'));

const server = app.listen(
  PORT,
  () => console.log(`calisti http://localhost:${PORT}`)
)

const io = socket(server)

io.on('connection', (socket) => {
  console.log(`Baglanan kullanici ID: ${socket.id}`)

  socket.on('chat', data =>{
      io.sockets.emit('chat', data)
  })

  socket.on('typing', data => {
      socket.broadcast.emit('typing', data)
  })
})

const productList = [
    { id: 1, name: 'a', dpi: 16000, scanner: 'lazer' },
    { id: 2, name: 'b', dpi: 16000, scanner: 'optic' },
    { id: 3, name: 'c', dpi: 16000, scanner: 'lazer' },
    { id: 4, name: 'd', dpi: 16000, scanner: 'lazer' },
];
const categoryList=[
    {id:1,name:'mouse',numeberOfProduct:20},
    {id:2,name:'leptop',numeberOfProduct:5},
    {id:3,name:'keyboard',numeberOfProduct:10},
    {id:4,name:'headphone',numeberOfProduct:30},
];

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

  

//GetAll
app.get('/product', (req, res) => {
    client.query('SELECT * FROM product', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Query result:', result.rows);
          res.status(200).json(result.rows);
        }
    });
});

app.get('/category', (req, res) => {
    client.query('SELECT * FROM category', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Query result:', result.rows);
          res.status(200).json(result.rows);
        }
    });
});

//GetById
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const product = productList.find(product => product.id == id);
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

app.get('/category/:id', (req, res) => {
    const { id } = req.params;
    const category = categoryList.find(category => category.id == id);
    if (category) {
        res.status(200).send(category);
    } else {
        res.status(404).send({ message: 'Category not found' });
    }
});

//AddPost
app.post('/addcategory', (req, res) => {
    const { name, numberOfProduct } = req.body;
  
    client.query('INSERT INTO category (name, number_of_product) VALUES ($1, $2) RETURNING *', [name, numberOfProduct], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json({ message: 'Category added successfully', newCategory: result.rows[0] });
      }
    });
  });

app.post('/addproduct', (req, res) => {
    const { name, dpi,scanner } = req.body;
  
    client.query('INSERT INTO product (name, dpi, scanner) VALUES ($1, $2,$3) RETURNING *', [name, dpi,scanner], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(200).json({ message: 'Product added successfully', newProduct: result.rows[0] });
      }
    });
});


//Delete

app.delete('/deleteproduct/:id', (req, res) => {
    const { id } = req.params;

    client.query('DELETE FROM product WHERE id = $1 RETURNING *', [id], (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.rows.length > 0) {
          res.status(200).json({ message: 'Product deleted successfully', deletedProduct: result.rows[0] });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
});


app.delete('/deletecategory/:id', (req, res) => {
    const { id } = req.params;

    const index = categoryList.findIndex(category => category.id == id);
    if (index !== -1) {
        const deletedCategory = categoryList.splice(index, 1);
        res.status(200).send({ message: 'Product deleted successfully', deletedCategory });
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

app.post('/product/:id', (req, res) => {
    const { id } = req.params;
    const { price } = req.body;

    if (!price) {
        res.status(404).send({ message: 'price required' });
    } else {
        const product = productList.find(product => product.id == id);
        if (product) {
            res.send({
                mouse: `new mouse and ${price} and ID of ${id}`
            });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    }
});



//Update 
app.put('/updateproduct/:id', (req, res) => {
    const { id } = req.params;
    const { name, dpi, scanner } = req.body;
  
    client.query(
      'UPDATE product SET name = COALESCE($1, name), dpi = COALESCE($2, dpi), scanner = COALESCE($3, scanner) WHERE id = $4 RETURNING *',
      [name, dpi, scanner, id],
      (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Internal Server Error');
        } else {
          if (result.rows.length > 0) {
            res.status(200).json({ message: 'Product updated successfully', updatedProduct: result.rows[0] });
          } else {
            res.status(404).json({ message: 'Product not found' });
          }
        }
      }
    );w
  });
  


app.put('/updatecategory/:id', (req, res) => {
    const { id } = req.params;
    const { name, numberOfProduct } = req.body;

    client.query(
      'UPDATE category SET name = COALESCE($1, name), number_of_product = COALESCE($2, number_of_product) WHERE id = $3 RETURNING *',
      [name, numberOfProduct, id],
      (err, result) => {
        if (err) {
          console.error('Error executing query', err);
          res.status(500).send('Internal Server Error');
        } else {
          if (result.rows.length > 0) {
            res.status(200).json({ message: 'Category updated successfully', updatedCategory: result.rows[0] });
          } else {
            res.status(404).json({ message: 'Category not found' });
          }
        }
      }
    );
});



process.on('exit', () => {
    console.log('Exiting... Closing PostgreSQL connection.');
    client.end()
      .then(() => {
        console.log('PostgreSQL connection closed.');
      })
      .catch((err) => {
        console.error('Error closing PostgreSQL connection', err);
      });
  });
  
  process.on('SIGINT', () => {
    console.log('SIGINT received. Exiting...');
    server.close(() => {
      console.log('Express server closed.');
      process.exit(0);
    });
  });