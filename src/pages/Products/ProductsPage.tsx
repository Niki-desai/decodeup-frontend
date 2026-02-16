import React from 'react';
import { useGetProductsQuery } from '../../store/slices/productsApi';
import { useGetCartQuery } from '../../store/slices/cartApi';
import ProductCard from '../../components/features/ProductCard/ProductCard';
import Button from '../../components/common/Button/Button';
import LoadingSpinner from '../../components/features/LoadingSpinner/LoadingSpinner';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    const { data: cart } = useGetCartQuery();

    const totalItems = cart?.items.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

    if (isLoading) return <LoadingSpinner />;
    if (error) {
        return (
            <div className="error-container">
                <h2>Oops! Something went wrong</h2>
                <p>We couldn't load the products. Please try again later.</p>
                <Button onClick={() => window.location.reload()} variant="primary">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="products-page">
            <header className="header">
                <h1>Our Products</h1>
                <div className="cart-badge">
                    Cart ({totalItems})
                </div>
            </header>

            <div className="products-grid">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
