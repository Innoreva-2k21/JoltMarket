const Product = require('../model/product');
const mongoose = require('mongoose');

// Get all journal entries
exports.getAllEntries = async (req, res) => {
    try {
        const products = await Product.find({ userId: req.user.id }); 
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error retrieving product entries.");
    }
};

// Create a new journal entry with an image upload
exports.createEntry = async (req, res) => {
    try {
        const { productName, price } = req.body;

        if (!(productName && price)) {
            return res.status(400).send("Product Name and price are required.");
        }

        
    let image = req.file ? req.file.path : null;


        const product = await Product.create({
            productName,
            price,
            image,  // Save the image path to the journal entry
            userId: req.user.id
        });

        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error creating journal entry.");
    }
};

// Update a journal entry
exports.updateEntry = async (req, res) => {
    try {
        const { productName, price } = req.body;
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID format');
        }
        

        const product = await Product.findById(id);
        console.log('Received ID:', id);

        if (!product) {
            return res.status(404).send("product entry not found.");
        }

        // Check if the logged-in user owns the product entry
        if (product.userId.toString() !== req.user.id) {
            return res.status(403).send("You are not authorized to update this entry.");
        }

        // Update title and content if provided
        product.productName = productName || product.productName;
        product.price = price || product.price;

        if (req.file) {
            // Delete the old image if it exists (consider storing URLs rather than local paths)
            if (product.image) {
             
                const publicId = path.basename(product.image, path.extname(product.image)); // Extract public ID from URL
                await cloudinary.uploader.destroy(publicId); // Remove the old image from Cloudinary
            }
            // Upload new image to Cloudinary
            const uploadResponse = await uploadOnCloudinary(req.file.path); 
            if (uploadResponse) {
                product.image = uploadResponse.secure_url; // Set the new image URL
            }
        }

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error updating product entry.");
    }
};

// Delete a product entry
exports.deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("Product entry not found.");
        }

        // Check if the logged-in user owns the product entry
        if (product.userId.toString() !== req.user.id) {
            return res.status(403).send("You are not authorized to delete this entry.");
        }

        // Delete the image from Cloudinary if it exists
        if (product.image) {
            const publicId = path.basename(product.image, path.extname(product.image)); // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId); // Remove the image from Cloudinary
        }

        await product.remove();

        return res.status(200).send("Product entry deleted.");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting Product entry.");
    }
};


