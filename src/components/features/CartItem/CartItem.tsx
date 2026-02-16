import React from 'react';
import { toast } from 'react-toastify';
import { useRemoveFromCartMutation } from '../../../../store/slices/cartApi';
import Button from '../../common/Button/Button';
import './CartItem.css';

interface CartItemProps {
    item: {
        id: string;
        product: {
            id: string;
            name: string;
            price: number;
            image: string;
        };
        quantity: number;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    const handleRemove = async () => {
        try {
            await removeFromCart(item.id).unwrap();
            toast.info(`${item.product.name} removed from cart`);
        } catch (err: any) {
            toast.error('Failed to remove item from cart');
        }
    };

    return (
        <div className="cart-item">
            <img src={item.product.image} alt={item.product.name} />
            <div className="cart-item-details">
                <h4>{item.product.name}</h4>
                <div className="cart-item-meta">
                    <span className="quantity">Qty: {item.quantity}</span>
                    <span className="price">${item.product.price.toFixed(2)}</span>
                </div>
            </div>
            <Button
                variant="danger"
                onClick={handleRemove}
                isLoading={isLoading}
            >
                Remove
            </Button>
        </div>
    );
};

export default CartItem;
