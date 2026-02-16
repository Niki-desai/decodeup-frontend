import React from 'react';
import { toast } from 'react-toastify';
import { useAddToCartMutation } from '../../store/slices/cartApi';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import './ProductCard.css';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [addToCart, { isLoading }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        try {
            await addToCart({ productId: product.id, quantity: 1 }).unwrap();
            toast.success(`${product.name} added to cart!`);
        } catch (err: any) {
            toast.error('Failed to add product to cart');
        }
    };

    return (
        <Card className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <div className="price">${product.price.toFixed(2)}</div>
                <Button
                    onClick={handleAddToCart}
                    isLoading={isLoading}
                    fullWidth
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
};

export default ProductCard;
