import React from "react";
import { FaShoppingCart, FaTimesCircle } from "react-icons/fa";
import './index.css';

export const LoadingView = () => {
    return (
        <div className="loading-container">
        <div className="cart-icon">
            <FaShoppingCart />
        </div>
        <p className="loading-text">
            FastCart is loading
            <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
            </span>
        </p>
        </div>
    );
};
  
export const FailureView = ({ errorMessage, onRetry }) => {
    return (
        <div className="failure-container">
        <div className="failure-icon">
            <FaTimesCircle />
        </div>
        <p className="failure-message">{errorMessage || "Something went wrong. Please try again."}</p>
        <button className="retry-button" onClick={onRetry}>Retry</button>
        </div>
    );
}; 