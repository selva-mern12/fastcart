import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { LoadingView, FailureView } from '../UnsuccessPages';

import './index.css';

const pageStatus = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
};

const AddOrEditCategory = ({ onClose, category }) => {
    const jwt_token = Cookies.get("jwt_token");
    const [categoryDetails, setCategoryDetails] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [addPageStatus, setAddPageStatus] = useState(pageStatus.initial);

    useEffect(() => {
        if (category) {
            setCategoryDetails(category);
            setPreviewImage(category.image_url);
        } else {
            setCategoryDetails({});
            setPreviewImage(null);
        }
    }, [category]);

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("Loading...");
        if (!categoryDetails.category_name || !categoryDetails.item_count) {
            setErrorMsg("Please fill in all fields.");
            return;
        }
        if (!categoryDetails.image_url) {
            setErrorMsg("Please provide an image.");
            return;
        }

        const formData = new FormData();
        formData.append("category_name", categoryDetails.category_name);
        formData.append("item_count", Number(categoryDetails.item_count));
        formData.append("user_id", "67fa1a136d67d8b41923919b");

        if (categoryDetails.image_url && categoryDetails.image_url instanceof File) {
            formData.append("image", categoryDetails.image_url);
        } else if (categoryDetails.image_url) {
            formData.append("image_url", categoryDetails.image_url);
        }

        try {
            let response;
            if (categoryDetails._id) {
                // Updating an existing category
                response = await fetch(`https://fastcart-0i7b.onrender.com/api/categories/${categoryDetails._id}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${jwt_token}` },
                    body: formData,
                });
            } else {
                // Creating a new category
                response = await fetch(`https://fastcart-0i7b.onrender.com/api/categories`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${jwt_token}` },
                    body: formData,
                });
            }

            if (response.ok) {
                const data = await response.json();
                setErrorMsg(data.message);
                setCategoryDetails({});
                setPreviewImage(null);
                setAddPageStatus(pageStatus.loading); 
                window.location.reload();
                onClose();
            } else {
                setErrorMsg("Something went wrong, try again.");
                setAddPageStatus(pageStatus.failure);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMsg(error.message);
            setAddPageStatus(pageStatus.failure); 
            window.location.reload();
        }
    };

    const renderAddEditCategory = () => {
        switch (addPageStatus) {
            case pageStatus.loading:
                return <LoadingView />;
            case pageStatus.failure:
                return <FailureView onRetry={() => onClose()} />;
            default:
                return null;
    }
}

    if (addPageStatus === pageStatus.loading || addPageStatus === pageStatus.failure) {
        return renderAddEditCategory();
    }

    return (
        <div className="add-category-container">
            <h2>Add or Edit Category</h2>
            <div className='form-preview-container'>
                <button type="button" className="close-button" onClick={onClose}><IoMdCloseCircleOutline /></button>
                <form className="add-category-form" onSubmit={handleCategorySubmit}>
                    <label htmlFor="category-name" className='add-category-label'>Category Name:</label>
                    <input
                        type="text"
                        id="category-name"
                        name="category-name"
                        className='add-category-input'
                        value={categoryDetails.category_name || ''}
                        onChange={(e) => setCategoryDetails({ ...categoryDetails, category_name: e.target.value })}
                        required
                    />
                    <label htmlFor="order-count" className='add-category-label'>Order Count:</label>
                    <input
                        type="number"
                        id="order-count"
                        name="order-count"
                        className='add-category-input'
                        value={categoryDetails.item_count || ''}
                        onChange={(e) => setCategoryDetails({ ...categoryDetails, item_count: e.target.value })}
                        required
                    />
                    <label htmlFor="category-image" className='add-category-label'>Category Image URL:</label>
                    <input
                        type="file"
                        id="category-image"
                        name="category-image"
                        className='add-category-input'
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.value.length === 0) {
                                setCategoryDetails(prev => ({ ...prev, image_url: '' }));
                                setPreviewImage('');
                                return;
                            }
                            setCategoryDetails({ ...categoryDetails, image_url: e.target.files[0] });
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                        }}
                        required
                        disabled={categoryDetails.image_url && typeof categoryDetails.image_url === 'string'}
                    />
                    <p className='image-or'>OR</p>
                    <input
                        type="text"
                        id="category-image"
                        name="category-image"
                        placeholder='Category Image URL'
                        className='add-category-input'
                        value={previewImage || ''}
                        onChange={(e) => {
                            if (e.target.value.length === 0) {
                                setCategoryDetails(prev => ({ ...prev, image_url: '' }));
                                setPreviewImage('');
                                return;
                            }
                            setCategoryDetails({ ...categoryDetails, image_url: e.target.value });
                            setPreviewImage(e.target.value);
                        }}
                        required
                        disabled={categoryDetails.image_url && typeof categoryDetails.image_url === 'object'}
                    />
                    <button type="submit" className="submit-button">Submit</button>
                    {errorMsg && <p className="error-message">{errorMsg}</p>}
                </form>
                <div className="image-preview-container">
                    {categoryDetails.image_url && <img src={previewImage} alt="Category" className="image-preview" />}
                </div>
            </div>
        </div>
    );
};

const Categories = ({searchValue}) => {
    const jwt_token = Cookies.get("jwt_token");
    const [categories, setCategories] = useState([]);
    const [showAddOrEditCategory, setShowAddOrEditCategory] = useState(false);
    const [showAction, setShowAction] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [categoryPageStatus, setCategoryPageStatus] = useState(pageStatus.initial);

    const getCategory = useCallback(async () => {
        setCategoryPageStatus(pageStatus.loading); // Set loading state
        try {
            const response = await fetch('https://fastcart-0i7b.onrender.com/api/categories', {
                headers: { 'Authorization': `Bearer ${jwt_token}` },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCategories(data);
            setCategoryPageStatus(pageStatus.success); // Set success state
        } catch (error) {
            console.error('Error:', error);
            setErrorMsg(error.message);
            setCategoryPageStatus(pageStatus.failure); // Set failure state
        }
    },[jwt_token]);
    
    useEffect(() => {
        getCategory();
    }, [getCategory]);

    const handleRetry = () => {
        setCategoryPageStatus(pageStatus.loading);
        setErrorMsg('');
        getCategory();
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`https://fastcart-0i7b.onrender.com/api/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();

            if (response.ok) {
                const updatedCategories = categories.filter(category => category._id !== id);
                setCategories(updatedCategories);
                console.log(result.message);
            } else {
                console.error(result.message);
                setErrorMsg(result.message);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            setErrorMsg(error.message);
        }
    };

    const filteredCategories = categories.filter(category => {
        return category.category_name.toLowerCase().includes(searchValue.toLowerCase()) || 
                category.item_count.toString().includes(searchValue.toLowerCase());
    });

    const renderCategory = () => {
        switch (categoryPageStatus) {
            case pageStatus.loading:
                return <LoadingView />;
            case pageStatus.failure:
                return <FailureView onRetry={handleRetry} />;
            case pageStatus.success:
                return(
                    <div className="categories-container">
                        <div className="categories-header">
                            <h2>Categories</h2>
                            <button type='button' className="add-category-button"
                                onClick={() => setShowAddOrEditCategory(true)}
                            > + Add Category</button>
                        </div>
                        <p>{errorMsg}</p>
                        <ul className="categories-list">
                            {filteredCategories.map(category => (
                                <li key={category._id} className="category-item">
                                    {showAction === category._id ?
                                        <div
                                            onMouseLeave={() => setShowAction('')}
                                            className="category-image"
                                            style={{
                                                backgroundImage: `url(${category.image_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                borderRadius: '12px'
                                            }}>
                                            <div className='action-button-container'>
                                                <button
                                                    type='button'
                                                    className="edit-category-button"
                                                    onClick={() => {
                                                        setShowAddOrEditCategory(true);
                                                        setSelectedCategory(category);
                                                    }}>
                                                    Edit<AiOutlineEdit />
                                                </button>
                                                <button
                                                    type='button'
                                                    className="delete-category-button"
                                                    onClick={() => handleDeleteCategory(category._id)}>
                                                    Delete<MdDeleteOutline />
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <img
                                            src={category.image_url}
                                            alt={category.category_name}
                                            onMouseEnter={() => setShowAction(category._id)}
                                            className="category-image"
                                        />
                                    }
                                    <div className="category-info">
                                        <h3>{category.category_name}</h3>
                                        <p>{category.item_count} items</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {showAddOrEditCategory && <AddOrEditCategory onClose={() => {
                            setShowAddOrEditCategory(false);
                            setSelectedCategory(null);
                            setShowAction('');
                        }} category={selectedCategory} />}
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <>
            {renderCategory()}
        </>        
    );
};

export default Categories;
