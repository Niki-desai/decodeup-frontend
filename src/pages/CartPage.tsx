import React, { useState } from 'react';
import { useGetCartQuery } from '../store/slices/cartApi';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/common/Modal';
import './CartPage.css';

const CartPage: React.FC = () => {
    const { data: cart, isLoading } = useGetCartQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) return <LoadingSpinner />;

    const items = cart?.items || [];
    const totalItems = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0);

    const handleCheckout = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="cart-page">
            <header className="header">
                <h1>Your Shopping Cart</h1>
            </header>

            {items.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty. Start shopping!</p>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {items.map((item: any) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <CartSummary
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        onCheckout={handleCheckout}
                    />
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Payment Status"
            >
                <div className="success-modal">
                    <div className="success-icon">✅</div>
                    <h3>Payment Successful!</h3>
                    <p>Thank you for your purchase. Your order has been placed successfully.</p>
                </div>
            </Modal>
        </div>
    );
};

export default CartPage;
