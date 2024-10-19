const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = cartTotal + newItemPrice;
  res.send(totalCartPrice.toString());
  console.log(totalCartPrice);
});

const discountPercentage = 10;
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let finalPrice = cartTotal;
  if (isMember) {
    finalPrice = cartTotal - cartTotal * (discountPercentage / 100);
  }
  res.send(finalPrice.toString());
  console.log('Final Price:', finalPrice);
});

const taxRate = 0.05;
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxAmount = cartTotal * taxRate;
  res.send(taxAmount.toString());
  console.log('Tax Amount:', taxAmount);
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  let deliveryDays;
  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50); // 1 day per 50 km
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100); // 1 day per 100 km
  } else {
    return res.status(400).send('Invalid shipping method');
  }
  res.send(deliveryDays.toString());
  console.log('Estimated Delivery Days:', deliveryDays);
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
  console.log('Shipping Cost:', shippingCost);
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;

  res.send(loyaltyPoints.toString());

  console.log('Loyalty Points:', loyaltyPoints);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
