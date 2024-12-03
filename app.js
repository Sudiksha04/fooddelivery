const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory array to store menu items
let menu = [];

// POST endpoint to add a menu item
app.post('/menu', (req, res) => {
  console.log(req.body);  // Log the body to check if it's received correctly
  
  const { name, price, category } = req.body;

  // Validate the input
  if (!name || price <= 0 || !category) {
    return res.status(400).json({ message: 'Invalid menu item' });
  }

  // Create the new menu item
  const newItem = { id: menu.length + 1, name, price, category };
  menu.push(newItem);

  // Respond with the newly created menu item
  res.status(201).json(newItem);
});

// GET endpoint to retrieve the menu
app.get('/menu', (req, res) => {
  res.status(200).json(menu);
});

// POST endpoint to place an order
app.post('/orders', (req, res) => {
  const { items } = req.body;

  // Ensure the order contains at least one item
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must contain at least one item' });
  }

  // Check if all item IDs are valid
  for (let itemId of items) {
    const item = menu.find(m => m.id === itemId);
    if (!item) {
      return res.status(404).json({ message: `Menu item with ID ${itemId} not found` });
    }
  }

  // Simulating an order with an ID and status
  const orderId = Date.now();
  const order = {
    id: orderId,
    items,
    status: 'Preparing'
  };

  // Respond with the new order details
  res.status(201).json(order);
});

// GET endpoint to fetch a specific order by ID
app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(order => order.id === parseInt(id));

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.status(200).json(order);
});

// Simulating periodic status updates for orders
const orders = [];
setInterval(() => {
  orders.forEach(order => {
    if (order.status === 'Preparing') {
      order.status = 'Out for Delivery';
    } else if (order.status === 'Out for Delivery') {
      order.status = 'Delivered';
    }
  });
}, 5000); // Updates every 5 seconds for demonstration

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
