import React, { useState } from 'react';
import { useClearCartMutation, useGetCartQuery } from '../../../store/slices/cartApi';
import CartItem from '../../components/features/CartItem/CartItem';
import CartSummary from '../../components/features/CartSummary/CartSummary';
import LoadingSpinner from '../../components/features/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/common/Modal/Modal';
import './CartPage.css';

const CartPage: React.FC = () => {
    const { data: cart, isLoading } = useGetCartQuery();
    const [clearCart] = useClearCartMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    if (isLoading) return <LoadingSpinner />;

    const items = cart?.items || [];
    const totalItems = items.reduce((acc: number, item: any) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            await clearCart().unwrap();
            setIsModalOpen(true);
        } catch (err) {
            console.error('Failed to clear cart:', err);
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="cart-page">
            <header className="header">
                <h1>Your Shopping Cart</h1>
            </header>

            {items.length === 0 && !isModalOpen ? (
                <div className="empty-cart">
                    <p>Your cart is empty. Start shopping!</p>
                </div>
            ) : (
                <div className="cart-content">
                    {items.length > 0 && (
                        <>
                            <div className="cart-items">
                                {items.map((item: any) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                            <CartSummary
                                totalItems={totalItems}
                                totalPrice={totalPrice}
                                onCheckout={handleCheckout}
                                isLoading={isCheckingOut}
                            />
                        </>
                    )}
                    {items.length === 0 && isModalOpen && (
                        <div className="empty-cart">
                            <p>Thank you for your order!</p>
                        </div>
                    )}
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
