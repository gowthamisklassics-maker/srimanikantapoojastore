import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../services/storeContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const variants =
    product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'object'
      ? product.sizes
      : null;

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const selectedVariant = variants ? variants[selectedVariantIdx] : null;
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant
    ? selectedVariant.original_price
    : product.originalPrice || product.price;
  const currentImage =
    selectedVariant && selectedVariant.image ? selectedVariant.image : product.image;

  const discount =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const variantName = selectedVariant
      ? selectedVariant.name
      : product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'string'
      ? product.sizes[0]
      : '';

    const itemToAdd = {
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      image: currentImage
    };

    addToCart(itemToAdd, 1, variantName);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const r = rating || 5;
    for (let i = 1; i <= 5; i++) {
      if (r >= i) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (r >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const formatImg = (img) => (img ? (img.startsWith('http') || img.startsWith('/') ? img : '/' + img) : '/images/1000090825.jpg');

  return (
    <div className="product-card reveal visible">
      <Link to={`/product/${product.id}`} className="card-img-wrap" style={{ display: 'block' }}>
        <img
          src={formatImg(currentImage)}
          alt={product.name}
          loading="lazy"
          width="400"
          height="400"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/1000090825.jpg';
          }}
        />

        {/* Badges */}
        <div className="card-badges">
          {product.badge === 'sale' && discount > 0 && (
            <span className="badge badge-sale">-{discount}%</span>
          )}
          {product.badge === 'new' && <span className="badge badge-new">NEW</span>}
          {product.badge === 'popular' && (
            <span className="badge badge-popular">⭐ Popular</span>
          )}
        </div>

        {/* Action icons */}
        <div className="card-actions">
          <Link
            to={`/product/${product.id}`}
            className="card-action-btn"
            title="Quick View"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fas fa-eye"></i>
          </Link>
          <button
            type="button"
            className="card-action-btn"
            title="Wishlist"
            onClick={handleWishlistToggle}
            style={{
              background: inWishlist ? 'rgba(229,57,53,0.12)' : ''
            }}
          >
            <i
              className={inWishlist ? 'fas fa-heart' : 'far fa-heart'}
              style={{ color: inWishlist ? '#e53935' : '' }}
            ></i>
          </button>
        </div>
      </Link>

      <div className="card-body">
        <div className="card-category">{product.categoryName}</div>
        <h3 className="card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="card-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">({product.reviews || 0})</span>
        </div>

        <div className="card-bottom-wrap">
          {/* Variant selection pills */}
          {variants && variants.length > 1 && (
            <div className="card-size-picker">
              {variants.map((v, i) => (
                <button
                  key={i}
                  type="button"
                  className={`size-pill ${i === selectedVariantIdx ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariantIdx(i);
                  }}
                >
                  {v.name}
                </button>
              ))}
            </div>
          )}

          <div className="card-price">
            <span className="price-current">₹{currentPrice}</span>
            {currentOriginalPrice > currentPrice && (
              <>
                <span className="price-original">₹{currentOriginalPrice}</span>
                <span className="price-discount">{discount}% off</span>
              </>
            )}
          </div>

          <button
            type="button"
            className={`card-add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <>
                <i className="fas fa-check"></i> Added!
              </>
            ) : (
              <>
                <i className="fas fa-shopping-bag"></i> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
