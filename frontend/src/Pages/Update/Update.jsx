import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase'; // Adjust the path as necessary

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); // Track errors for each field

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/getId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          const result = await response.json();
          setProductName(result.productName);
          setPrice(result.price);
          setPhoneNumber(result.phoneNumber);
          setProductCategory(result.productCategory);
          setProductDetails(result.productDetails);
        } else {
          setErrorMessage('Failed to fetch product details.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setErrorMessage('An error occurred while fetching product details.');
      }
    };

    fetchProductById();
  }, [id]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const errors = {};
    if (!productName) errors.productName = 'Product Name is required.';
    if (!price) errors.price = 'Price is required.';
    if (!phoneNumber) errors.phoneNumber = 'Phone Number is required.';
    if (!productCategory) errors.productCategory = 'Product Category is required.';
    if (!productDetails) errors.productDetails = 'Product Details are required.';
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('phoneNumber', phoneNumber);
    formData.append('productCategory', productCategory);
    formData.append('productDetails', productDetails);
    formData.append('image', image);
    formData.append('userEmail', userEmail);
    formData.append('id', id);

    try {
      const response = await fetch(`http://localhost:5000/product/Update`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product updated successfully:', result);
        navigate('/Seller');
      } else {
        setErrorMessage('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('An error occurred while updating the product.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: '2.5em',
        color: '#FF5733',
        marginBottom: '20px',
        animation: 'glow 1.5s ease-in-out infinite alternate',
      }}>
        Update Product
      </h1>

      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        {fieldErrors.productName && <div style={{ color: 'red' }}>{fieldErrors.productName}</div>}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        {fieldErrors.price && <div style={{ color: 'red' }}>{fieldErrors.price}</div>}

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        {fieldErrors.phoneNumber && <div style={{ color: 'red' }}>{fieldErrors.phoneNumber}</div>}

        <input
          type="text"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        {fieldErrors.productCategory && <div style={{ color: 'red' }}>{fieldErrors.productCategory}</div>}

        <textarea
          placeholder="Product Details"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          required
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />
        {fieldErrors.productDetails && <div style={{ color: 'red' }}>{fieldErrors.productDetails}</div>}

        <input
          type="file"
          onChange={handleImageChange}
          style={{ margin: '10px 0', padding: '10px', width: '80%' }}
        />

        <button type="submit" style={{
          padding: '15px',
          fontSize: '1em',
          color: 'white',
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px',
          transition: 'background-color 0.3s, transform 0.3s',
        }}>
          Update Product
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
    </div>
  );
}

export default Update;
