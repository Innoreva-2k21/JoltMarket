const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');
const auth = require("../middleware/auth");

const upload = require('../middleware/multer'); // Adjust the path as needed



// Get all journal entries
router.get('/entries',productController.getAllEntries);
router.post('/getEmail',productController.getEntriesByEmail);

// Create a new journal entry (with image upload) initially entries
router.post('/create', upload.single('image'), productController.createEntry); 
router.post('/createBuyed', productController.createBuyedEntry); 

router.post('/Update',upload.single('image'),productController.updateEntry);

// // Update a journal entry (with image upload)
// router.put('/entries/:id', auth, upload.single('image'), productController.updateEntry);

// // Delete a journal entry
router.delete('/delete/:id', productController.deleteProduct);
router.post('/getId', productController.getEntryById);

module.exports = router;