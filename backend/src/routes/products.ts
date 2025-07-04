import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 10.99, description: 'This is product 1.' },
    { id: 2, name: 'Product 2', price: 20.49, description: 'This is product 2.' },
  ]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id: parseInt(id), name: `Product ${id}`, price: 15.00, description: `This is product ${id}.` });
});

export default router;
