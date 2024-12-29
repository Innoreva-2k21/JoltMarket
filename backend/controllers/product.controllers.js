const Product = require('../model/product');
const BuyedProduct = require('../model/BuyedProduct');
const mongoose = require('mongoose');

// Get all journal entries
exports.getAllEntries = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products without user association
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error retrieving product entries.");
    }
};

exports.getEntriesByEmail = async (req, res) => {
    const { userEmail } = req.body; // Get userEmail from query parameters

    // Check if userEmail is provided
    if (!userEmail) {
        return res.status(400).json({ error: "User email is required" });
    }

    try {
        // Find products with matching userEmail
        const products = await Product.find({ userEmail: userEmail });
        
        // If no products are found for the userEmail, return a 404 status
        if (!products.length) {
            return res.status(404).json({ message: "No products found for this user" });
        }

        // Return the filtered products
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving product entries by email:", error);
        return res.status(500).send("Error retrieving product entries by email.");
    }
};

exports.getEntryById = async (req, res) => {
    const { id } = req.body; // Get product ID from the request parameters

    // Check if id is provided
    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    try {
        // Find product with matching _id
        const product = await Product.findById(id);
        
        // If no product is found for the given _id, return a 404 status
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return the found product
        return res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product entry by ID:", error);
        return res.status(500).send("Error retrieving product entry by ID.");
    }
};


// Create a new journal entry with an image upload
exports.createBuyedEntry = async (req, res) => {
    try {
        // Log the incoming request body and file
        const { productName, price,image, phoneNumber, productCategory, productDetails, userEmail } = req.body;

        // Validate required fields
        if (!(productName && price && phoneNumber && productCategory && productDetails)) {
            return res.status(400).send("All fields (Product Name, Price, Phone Number, Product Category, and Product Details) are required.");
        }
        

        // Create the product entry
        const product = await BuyedProduct.create({
            productName,
            price,
            image,  // Save the image path to the product entry
            userEmail, // Store user email
            phoneNumber, // Add phone number to the product entry
            productCategory, // Add product category
            productDetails // Add product details
        });
        
        if(product){
            return res.status(201).json(product);
        }else{
            console.log("not success");
        }


    } catch (error) {
        console.error('Error creating product entry:', error.message); // Log the error message
        console.log("not success");
        return res.status(500).send("Error creating product entry.");
        
    }
};


exports.createEntry = async (req, res) => {
    try {
        // Log the incoming request body and file
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { productName, price, phoneNumber, productCategory, productDetails, userEmail } = req.body;

        // Validate required fields
        if (!(productName && price && phoneNumber && productCategory && productDetails)) {
            return res.status(400).send("All fields (Product Name, Price, Phone Number, Product Category, and Product Details) are required.");
        }
        
        let image = req.file ? req.file.path : null;

        // Create the product entry
        const product = await Product.create({
            productName,
            price,
            image,  // Save the image path to the product entry
            userEmail, // Store user email
            phoneNumber, // Add phone number to the product entry
            productCategory, // Add product category
            productDetails // Add product details
        });
        
        return res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product entry:', error.message); // Log the error message
        return res.status(500).send("Error creating product entry.");
    }
};


// exports.updateEntry = async (req, res) => {
//     try {
//         const { productName, price } = req.body;
//         const { id } = req.params;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).send('Invalid ID format');
//         }
        

//         const product = await Product.findById(id);
//         console.log('Received ID:', id);

//         if (!product) {
//             return res.status(404).send("product entry not found.");
//         }

//         // Check if the logged-in user owns the product entry
//         if (product.userId.toString() !== req.user.id) {
//             return res.status(403).send("You are not authorized to update this entry.");
//         }

//         // Update title and content if provided
//         product.productName = productName || product.productName;
//         product.price = price || product.price;

//         if (req.file) {
//             // Delete the old image if it exists (consider storing URLs rather than local paths)
//             if (product.image) {
             
//                 const publicId = path.basename(product.image, path.extname(product.image)); // Extract public ID from URL
//                 await cloudinary.uploader.destroy(publicId); // Remove the old image from Cloudinary
//             }
//             // Upload new image to Cloudinary
//             const uploadResponse = await uploadOnCloudinary(req.file.path); 
//             if (uploadResponse) {
//                 product.image = uploadResponse.secure_url; // Set the new image URL
//             }
//         }

//         await product.save();

//         return res.status(200).json(product);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send("Error updating product entry.");
//     }
// };

exports.updateEntry = async (req, res) => {
    try {
        // Log the incoming request body and file
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { productName, price, phoneNumber, productCategory, productDetails, userEmail } = req.body;
        const { id } = req.body; // Extract the ID from request parameters
        const product = await Product.findById(id);

        // Validate required fields
        if (!(productName && price && phoneNumber && productCategory && productDetails)) {
            return res.status(400).send("All fields (Product Name, Price, Phone Number, Product Category, and Product Details) are required.");
        }
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the product
        let image = req.file ? req.file.path : null;
        await Product.findByIdAndDelete(id);

        // Prepare the update data
        
        const Nproduct = await Product.create({
            productName,
            price,
            image,  // Save the image path to the product entry
            userEmail, // Store user email
            phoneNumber, // Add phone number to the product entry
            productCategory, // Add product category
            productDetails // Add product details
        });

        // Respond with the updated product data
        return res.status(200).json(Nproduct);
    } catch (error) {
        console.error('Error updating product entry:', error.message); // Log the error message
        return res.status(500).send("Error updating product entry.");
    }
};




// Controller for deleting a product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Extract the product ID from the request parameters

    try {
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the product
        await Product.findByIdAndDelete(id);
        
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
};



