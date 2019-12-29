import { Router } from 'express';
import Controller from '../controllers/cache';

const cache: Router = Router();
const controller = new Controller();

// Retrieve all Cache Keys
cache.get('/', controller.findAll);

// Retrieve a Specific Cache Key
cache.get('/:key', controller.findOne);

// Remove a specific Cache with Id
cache.delete('/:id', controller.remove);

// Update a Cache with Id
cache.put('/:id', controller.update);

// Create a Cache Key
cache.post('/', controller.save);

// Remove All Cache Keys
cache.delete('/remove/all', controller.removeAll);

export default cache;