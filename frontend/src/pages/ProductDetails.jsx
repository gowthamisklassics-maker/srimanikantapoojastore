import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api, FALLBACK_PRODUCTS, STORE_DATA } from '../services/api';
import { useStore } from '../services/storeContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadProduct() {
      setLoading(true);
      const res = await api.getProductById(id);
      if (res && res.product) {
        setProduct(res.product);
        setRelated(res.related || []);
        setSelectedImage(res.product.image);
        setSelectedVariantIdx(0);
        setQuantity(1);
      } else {
        const p = FALLBACK_PRODUCTS.find((item) => item.id === Number(id)) || FALLBACK_PRODUCTS[0];
        setProduct(p);
        setSelectedImage(p.image);
      }
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🕉️</div>
        <h3>Loading Product Details...</h3>
      </div>
    );
  }

  const variants =
    product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'object'
      ? product.sizes
      : null;

  const currentVariant = variants ? variants[selectedVariantIdx] : null;
  const currentPrice = currentVariant ? currentVariant.price : product.price;
  const currentOriginalPrice = currentVariant
    ? currentVariant.original_price
    : product.originalPrice || product.price;
  const discount =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : 0;

  const inWishlist = isInWishlist(product.id);

  const handleVariantSelect = (idx) => {
    setSelectedVariantIdx(idx);
    if (variants && variants[idx] && variants[idx].image) {
      setSelectedImage(variants[idx].image);
    }
  };

  const handleAddToCart = () => {
    const variantName = currentVariant
      ? currentVariant.name
      : product.sizes && product.sizes.length > 0 && typeof product.sizes[0] === 'string'
      ? product.sizes[0]
      : '';

    addToCart(
      {
        ...product,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
        image: selectedImage || product.image
      },
      quantity,
      variantName
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
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

  // WhatsApp Enquiry Link
  const waMsg =
    `Hello! I am interested in purchasing:\n\n` +
    `*${product.name}*\n` +
    (currentVariant ? `Variant: ${currentVariant.name}\n` : '') +
    `Price: ₹${currentPrice}\n` +
    `Quantity: ${quantity}\n\n` +
    `Please confirm availability.`;
  const waUrl = `https://wa.me/${STORE_DATA.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  const ensureRootPath = (src) => {
    if (!src) return '/images/1000090825.jpg';
    if (src.startsWith('http') || src.startsWith('/')) return src;
    return '/' + src;
  };

  const imagesList =
    product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      {/* Breadcrumb Banner */}
      <div className="page-banner" style={{ padding: 'var(--sp-6) 0 var(--sp-5)' }}>
        <div className="container">
          <div className="breadcrumb" id="product-breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/shop">Shop</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to={`/shop?category=${product.category}`}>{product.categoryName}</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Main */}
      <main id="product-detail" className="product-detail" style={{ padding: '40px 0 60px' }}>
        <div className="container">
          <div className="product-detail-grid">
            {/* Gallery Column */}
            <div className="product-gallery">
              <div className="main-image">
                <img
                  id="main-product-img"
                  src={ensureRootPath(selectedImage || product.image)}
                  alt={product.name}
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/1000090825.jpg';
                  }}
                />
              </div>

              {imagesList.length > 1 && (
                <div className="thumb-row" id="thumb-row">
                  {imagesList.map((img, i) => (
                    <img
                      key={i}
                      src={ensureRootPath(img)}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className={`thumb ${selectedImage === img ? 'active' : ''}`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="product-info">
              <Link
                to={`/shop?category=${product.category}`}
                className="product-category-link"
                id="product-category-link"
              >
                <i className="fas fa-tag"></i> {product.categoryName}
              </Link>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <h1 className="product-title" id="product-title">
                  {product.name}
                </h1>
                <button
                  type="button"
                  id="detail-wishlist-btn"
                  title="Add to Wishlist"
                  style={{
                    background: inWishlist ? 'rgba(229,57,53,0.12)' : 'var(--white)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r-full)',
                    width: '44px',
                    height: '44px',
                    flexShrink: 0,
                    fontSize: '18px',
                    color: inWishlist ? '#e53935' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <i className={inWishlist ? 'fas fa-heart' : 'far fa-heart'}></i>
                </button>
              </div>

              {product.telugu && (
                <p
                  className="font-telugu"
                  id="product-telugu"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 'var(--text-lg)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-telugu)'
                  }}
                >
                  {product.telugu}
                </p>
              )}

              {/* Rating Row */}
              <div className="product-rating-row">
                <div className="review-stars" id="product-rating-stars">
                  {renderStars(product.rating)}
                </div>
                <span id="product-rating-num" style={{ fontWeight: 600, color: 'var(--charcoal)' }}>
                  {product.rating || 5}.0
                </span>
                <span id="product-review-count" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  ({product.reviews || 0} customer reviews)
                </span>
                <span style={{ color: '#ddd' }}>|</span>
                <span style={{ color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  <i className="fas fa-check-circle"></i> In Stock
                </span>
              </div>

              {/* Price Row */}
              <div className="product-price-row">
                <span className="product-price" id="product-price">
                  ₹{currentPrice}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <>
                    <span className="product-price-original" id="product-price-orig">
                      ₹{currentOriginalPrice}
                    </span>
                    <span className="product-price-save" id="product-price-save">
                      Save ₹{currentOriginalPrice - currentPrice} ({discount}% off)
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="product-desc" id="product-desc">
                {product.description}
              </p>

              {/* Size Options (Variant Grid) */}
              {variants && variants.length > 0 && (
                <div className="product-option-group">
                  <div className="product-option-label">Select Size / Quantity:</div>
                  <div className="variant-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {variants.map((v, idx) => (
                      <div
                        key={idx}
                        className={`variant-box ${selectedVariantIdx === idx ? 'active' : ''}`}
                        onClick={() => handleVariantSelect(idx)}
                        style={{
                          border: selectedVariantIdx === idx ? '2px solid var(--maroon)' : '2px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          cursor: 'pointer',
                          background: selectedVariantIdx === idx ? '#fff7ed' : '#fff',
                          minWidth: '110px'
                        }}
                      >
                        <span className="var-name" style={{ fontWeight: 700, display: 'block' }}>
                          {v.name}
                        </span>
                        <span className="var-price" style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                          ₹{v.price}
                        </span>
                        {v.original_price > v.price && (
                          <span
                            className="var-orig"
                            style={{ textDecoration: 'line-through', color: '#999', fontSize: '0.8rem', marginLeft: '6px' }}
                          >
                            ₹{v.original_price}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simple size strings if not object */}
              {!variants && product.sizes && product.sizes.length > 0 && (
                <div className="product-option-group">
                  <div className="product-option-label">Select Option:</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {product.sizes.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`size-pill ${selectedVariantIdx === idx ? 'selected' : ''}`}
                        onClick={() => setSelectedVariantIdx(idx)}
                      >
                        {typeof s === 'string' ? s : s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="product-action-row" style={{ marginTop: '24px' }}>
                <div className="qty-control">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="qty-input"
                    id="qty-input"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  />
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <i className="fas fa-shopping-bag"></i> Add to Cart
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                type="button"
                className="btn btn-secondary btn-lg w-100"
                onClick={handleBuyNow}
                style={{ width: '100%', justifyContent: 'center', margin: '14px 0' }}
              >
                <i className="fas fa-bolt"></i> Buy Now
              </button>

              {/* WhatsApp Enquiry Button */}
              <a
                id="whatsapp-enquiry"
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp w-100"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <i className="fab fa-whatsapp"></i> Enquire on WhatsApp
              </a>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'var(--sand)',
                        color: 'var(--maroon)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Trust Features */}
              <div className="product-features" style={{ marginTop: '28px' }}>
                <div className="product-feature-item">
                  <i className="fas fa-leaf"></i> 100% Natural &amp; Pure Ingredients
                </div>
                <div className="product-feature-item">
                  <i className="fas fa-truck"></i> Home Delivery — Free above ₹5000 &amp; within 5km
                </div>
                <div className="product-feature-item">
                  <i className="fas fa-undo"></i> Easy Returns within 3 days
                </div>
                <div className="product-feature-item">
                  <i className="fas fa-shield-alt"></i> Guaranteed Authentic Product
                </div>
                <div className="product-feature-item">
                  <i className="fas fa-map-marker-alt"></i> Sri Manikanta Stores · Dilsukhnagar, Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="related-section" id="related-section" style={{ padding: '40px 0 80px' }}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                You May Also <span>Like</span>
              </h2>
            </div>
            <div className="products-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
