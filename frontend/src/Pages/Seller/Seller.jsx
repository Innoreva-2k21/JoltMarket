import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Seller() {
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate(); // Create a navigate function for navigation

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const userEmail = user ? user.email : null;

      if (userEmail) {
        try {
          const response = await fetch('http://localhost:5000/product/getEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userEmail }),
          });

          if (response.ok) {
            const data = await response.json();
            setProducts(data); // Set the fetched products in state
          } else {
            console.error('Error fetching products:', response.statusText);
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    // Validate fields
    if (!productName || !price || !productCategory || !productDetails || !phoneNumber || !productImage) {
      setErrorMessage('Please fill in all fields and upload an image.');
      return; // Stop form submission
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('productCategory', productCategory);
    formData.append('productDetails', productDetails);
    formData.append('phoneNumber', phoneNumber);

    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user ? user.email : null;
    formData.append('userEmail', userEmail);
    formData.append('image', productImage);

    try {
      const response = await fetch('http://localhost:5000/product/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh the page or redirect
        window.location.reload();
        alert("Uploaded");
      } else {
        const errorText = await response.text();
        console.error('Error creating product:', errorText);
        setErrorMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== id));
        alert("Product deleted successfully");
      } else {
        const errorText = await response.text();
        console.error('Error deleting product:', errorText);
        setErrorMessage('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error during delete:', error);
      setErrorMessage('An error occurred while deleting the product.');
    }
  };

  // Function to handle updating a product
  const handleUpdate = (id) => {
    navigate(`/Update/${id}`); // Navigate to the update page
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5em',
        color: '#FF5733',
        marginBottom: '20px',
        animation: 'glow 1.5s ease-in-out infinite alternate',
      }}>
        List Your Product for Sale
      </h1>

      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Form Fields */}
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
          }}
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setProductPrice(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
          }}
        />

        <input
          type="text"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
          }}
        />

        <input
          type="file"
          onChange={(e) => setProductImage(e.target.files[0])}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
          }}
        />

        <textarea
          placeholder="Product Details"
          rows="4"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
            resize: 'vertical',
          }}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1em',
            borderRadius: '8px',
            border: '1px solid #ddd',
            transition: 'transform 0.2s',
          }}
        />

        <button type="submit" style={{
          padding: '15px',
          fontSize: '1em',
          color: 'white',
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s, transform 0.3s',
        }}>
          Submit
        </button>
      </form>

      <button onClick={handleLogout} style={{
        padding: '15px',
        fontSize: '1em',
        color: 'white',
        backgroundColor: '#f44336',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s, transform 0.3s',
      }}>
        Logout
      </button>

      <h2 style={{ marginTop: '40px' }}>Your Products</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {products.map((product) => (
          <div key={product._id} style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            <h3>{product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.productCategory}</p>
            <p>{product.productDetails}</p>
            <p>Contact: {product.phoneNumber}</p>
            <button onClick={() => handleUpdate(product._id)} style={{
              padding: '10px',
              fontSize: '0.9em',
              color: 'white',
              backgroundColor: '#2196F3',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}>
              Update
            </button>
            <button onClick={() => handleDelete(product._id)} style={{
              padding: '10px',
              fontSize: '0.9em',
              color: 'white',
              backgroundColor: '#f44336',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Seller;
