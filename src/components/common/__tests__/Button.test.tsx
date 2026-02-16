import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';
import React from 'react';

describe('Button Component', () => {
    it('renders children correctly', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loader when isLoading is true', () => {
        render(<Button isLoading>Click Me</Button>);
        expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
        expect(document.querySelector('.btn-loader')).toBeInTheDocument();
    });

    it('is disabled when isLoading is true', () => {
        render(<Button isLoading>Click Me</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
