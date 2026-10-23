import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api, FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../services/api';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || searchParams.get('cat') || 'all';
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';

  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minPrice, setMinPrice] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat') || 'all';
    setSelectedCategory(cat);
    const q = searchParams.get('search') || searchParams.get('q') || '';
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Load categories and products
  useEffect(() => {
    async function loadData() {
      const cats = await api.getCategories();
      if (cats && cats.length) setCategories(cats);

      const prods = await api.getProducts({
        category: selectedCategory,
        search: searchQuery,
        badge: selectedBadge,
        sort: sortBy,
        min_price: minPrice,
        max_price: maxPrice
      });
      if (prods) setProducts(prods);
    }
    loadData();
  }, [selectedCategory, selectedBadge, searchQuery, sortBy, minPrice, maxPrice]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    if (catId === 'all') {
      searchParams.delete('category');
      searchParams.delete('cat');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Pagination calculation
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="container">
          <h1>Our Product Collection</h1>
          <p>Pure • Authentic • Sacred</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <span>Shop</span>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <main style={{ paddingBottom: 'var(--sp-16)' }}>
        <div className="container">
          <div className="shop-layout">
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
              {/* Category Filter */}
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <i className="fas fa-filter"></i> Categories
                </div>
                <div className="filter-list" id="category-filter-list">
                  <div
                    className={`filter-item ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => handleCategorySelect('all')}
                  >
                    <div className="filter-item-left">🕉️ All Categories</div>
                    <span className="filter-count">
                      {categories.reduce((acc, c) => acc + (c.count || 0), 0) || products.length}
                    </span>
                  </div>
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      className={`filter-item ${selectedCategory === c.id ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(c.id)}
                    >
                      <div className="filter-item-left">
                        {c.emoji || '🌸'} {c.name}
                      </div>
                      <span className="filter-count">{c.count || 0}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <i className="fas fa-rupee-sign"></i> Price Range
                </div>
                <input
                  type="range"
                  id="price-slider"
                  min="0"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div className="price-range-inputs">
                  <input
                    type="number"
                    className="price-input"
                    id="price-min"
                    placeholder="Min ₹"
                    value={minPrice}
                    min="0"
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="price-input"
                    id="price-max"
                    placeholder="Max ₹"
                    value={maxPrice}
                    max="5000"
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Badges Filter */}
              <div className="sidebar-card">
                <div className="sidebar-title">
                  <i className="fas fa-tag"></i> Badges
                </div>
                <div className="filter-list">
                  <div
                    className={`filter-item badge-filter-item ${selectedBadge === '' ? 'active' : ''}`}
                    onClick={() => setSelectedBadge('')}
                  >
                    <div className="filter-item-left">🕉️ All Items</div>
                  </div>
                  <div
                    className={`filter-item badge-filter-item ${selectedBadge === 'popular' ? 'active' : ''}`}
                    onClick={() => setSelectedBadge('popular')}
                  >
                    <div className="filter-item-left">⭐ Popular</div>
                  </div>
                  <div
                    className={`filter-item badge-filter-item ${selectedBadge === 'new' ? 'active' : ''}`}
                    onClick={() => setSelectedBadge('new')}
                  >
                    <div className="filter-item-left">🆕 New Arrivals</div>
                  </div>
                  <div
                    className={`filter-item badge-filter-item ${selectedBadge === 'sale' ? 'active' : ''}`}
                    onClick={() => setSelectedBadge('sale')}
                  >
                    <div className="filter-item-left">🔥 On Sale</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Products Content */}
            <div className="shop-content">
              {/* Search Bar */}
              <div className="shop-search-bar">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  id="shop-search-input"
                  placeholder="Search agarbatti, diyas, kumkum..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {/* Toolbar */}
              <div className="shop-toolbar">
                <div id="result-count" className="shop-result-count">
                  Showing <strong>{products.length}</strong> items
                  {selectedCategory !== 'all' && (
                    <span> in "{categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}"</span>
                  )}
                </div>

                <div className="shop-toolbar-right">
                  <select
                    id="sort-select"
                    className="sort-select"
                    aria-label="Sort products"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="new">New Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>

                  <div className="view-toggle">
                    <button
                      type="button"
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      id="view-grid"
                      title="Grid view"
                      onClick={() => setViewMode('grid')}
                    >
                      <i className="fas fa-th"></i>
                    </button>
                    <button
                      type="button"
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      id="view-list"
                      title="List view"
                      onClick={() => setViewMode('list')}
                    >
                      <i className="fas fa-list"></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid / List */}
              {products.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕉️</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--maroon)', marginBottom: '8px' }}>
                    No Products Found
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                    We couldn't find items matching your criteria. Try adjusting your filters.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedBadge('');
                      setSearchQuery('');
                      setMinPrice(0);
                      setMaxPrice(2000);
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={viewMode === 'grid' ? 'shop-grid' : 'shop-list'}
                  id="shop-grid"
                  style={
                    viewMode === 'list'
                      ? { display: 'flex', flexDirection: 'column', gap: '16px' }
                      : {}
                  }
                >
                  {displayedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination" id="pagination">
                  <button
                    type="button"
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  >
                    &laquo;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      className={`page-btn ${pg === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pg)}
                    >
                      {pg}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
