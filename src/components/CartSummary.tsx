import React from 'react';
import Button from './common/Button';
import './CartSummary.css';

// Cart Summary Component //
interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice, onCheckout, isLoading }) => {
  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Total Items:</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary-row total">
        <span>Total Price:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <Button 
        variant="primary" 
        fullWidth 
        className="checkout-btn"
        onClick={onCheckout}
        isLoading={isLoading}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
