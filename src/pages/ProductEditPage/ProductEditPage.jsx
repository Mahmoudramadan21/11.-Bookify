import React, { useEffect, useState } from 'react';
import "./ProductEditPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { listProductDetails, updateProduct } from '../../store/actions/productActions';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

function ProductEditPage() {

    const { userInfo } = useSelector(state => state.userLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, product } = useSelector(state => state.productDetails);

    const [formData, setFormData] = useState({
        id: id,
        name: "",
        author: "",
        price: "",
        image: null,
        "count-in-stock": "",
        categories: "",
        description: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputRefs = {}; // Object to hold refs for each input field

    const validate = () => {
        let errors = {};

        // Name validation
        if (!formData.name) {
            errors.name = 'Name is required';
        } else if (formData.name.length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }

        // Author validation
        if (!formData.author) {
            errors.author = 'Author is required';
        } else if (formData.author.length < 3) {
            errors.author = 'Author must be at least 3 characters long';
        }

        // Price validation
        if (!formData.price) {
            errors.price = 'Price is required';
        } else if (isNaN(formData.price) || formData.price <= 0) {
            errors.price = 'Price must be a positive number';
        }

        // Stock validation
        if (!formData['count-in-stock']) {
            errors['count-in-stock'] = 'Stock is required';
        } else if (isNaN(formData['count-in-stock']) || formData['count-in-stock'] < 0) {
            errors['count-in-stock'] = 'Stock must be a non-negative number';
        }

        // Categories validation
        if (!formData.categories) {
            errors.categories = 'Categories are required';
        } else if (formData.categories.length < 3) {
            errors.categories = 'Categories must be at least 3 characters long';
        }

        // Description validation
        if (!formData.description) {
            errors.description = 'Description is required';
        } else if (formData.description.length < 3) {
            errors.description = 'Description must be at least 3 characters long';
        }

        // Image validation
        if (formData.image && typeof formData.image !== 'string') { // Only validate if a new image is uploaded
            if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(formData.image.type)) {
                errors.image = 'Image must be a valid file type (jpeg, png, gif)';
            } else if (formData.image.size > 5000000) { // 5MB limit
                errors.image = 'Image size should be less than 5MB';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleEnterPress = (e, fieldName) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const fieldNames = Object.keys(inputRefs);
            const currentIndex = fieldNames.indexOf(fieldName);

            if (currentIndex === fieldNames.length - 1) {
                submitHandler(e); // Submit the form if it's the last field
            } else {
                inputRefs[fieldNames[currentIndex + 1]].focus(); // Move to the next field
            }
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);
            dispatch(updateProduct(formData));
            navigate("/dashboard/")
        }
    };

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        dispatch(listProductDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (product?.name) {
            setFormData({
                id: id,
                name: product.name,
                author: product.author,
                price: product.price,
                image: product.image,
                "count-in-stock": product.countInStock,
                categories: product.category,
                description: product.description
            });
        }
    }, [product]);

    return (
        <div className="product-edit">
            <div className="form-container">
                <div className="container">
                    <h2 className="form-title mb-heading">Edit Product</h2>

                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Error message={error} />
                    ) : (
                        <form className="form" onSubmit={submitHandler}>
                            <div className="form-field">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'name')}
                                    ref={ref => inputRefs['name'] = ref}
                                    className="form-input"
                                />
                                {formErrors.name && <div className="error">{formErrors.name}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'author')}
                                    ref={ref => inputRefs['author'] = ref}
                                    className="form-input"
                                />
                                {formErrors.author && <div className="error">{formErrors.author}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'price')}
                                    ref={ref => inputRefs['price'] = ref}
                                    className="form-input"
                                />
                                {formErrors.price && <div className="error">{formErrors.price}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="image" className="custom-file-label">
                                    <FontAwesomeIcon icon={faImage} style={{ marginRight: "7px" }} />
                                    {typeof formData.image === 'string' ? formData.image.split("/").pop() : "Choose a Photo"}
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                                    onKeyDown={(e) => handleEnterPress(e, 'image')}
                                    ref={ref => inputRefs['image'] = ref}
                                    className="form-input"
                                />
                                {formErrors.image && <div className="error">{formErrors.image}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    value={formData["count-in-stock"]}
                                    onChange={e => setFormData({ ...formData, "count-in-stock": e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'stock')}
                                    ref={ref => inputRefs['stock'] = ref}
                                    className="form-input"
                                />
                                {formErrors['count-in-stock'] && <div className="error">{formErrors['count-in-stock']}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="categories" className="form-label">Categories</label>
                                <input
                                    type="text"
                                    id="categories"
                                    value={formData.categories}
                                    onChange={e => setFormData({ ...formData, categories: e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'categories')}
                                    ref={ref => inputRefs['categories'] = ref}
                                    className="form-input"
                                />
                                {formErrors.categories && <div className="error">{formErrors.categories}</div>}
                            </div>
                            <div className="form-field">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value.trim() })}
                                    onKeyDown={(e) => handleEnterPress(e, 'description')}
                                    ref={ref => inputRefs['description'] = ref}
                                    className="form-input"
                                />
                                {formErrors.description && <div className="error">{formErrors.description}</div>}
                            </div>
                            <div className="form-field">
                                <input type="submit" id="submit" value="Update Product" className="form-submit" disabled={isSubmitting} />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );



}

export default ProductEditPage;
