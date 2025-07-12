import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import './Browse.css';

const Browse = () => {
  const heroStats = [
    { number: 2847, label: "Items Available" },
    { number: 156, label: "Categories" },
    { number: 4.8, label: "Avg Rating" }
  ];

  const categories = [
    { name: "Dresses", count: 342, icon: "fas fa-female" },
    { name: "Tops", count: 289, icon: "fas fa-tshirt" },
    { name: "Bottoms", count: 234, icon: "fas fa-user-tag" },
    { name: "Outerwear", count: 187, icon: "fas fa-coat-arms" },
    { name: "Shoes", count: 156, icon: "fas fa-shoe-prints" },
    { name: "Accessories", count: 98, icon: "fas fa-glasses" }
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Excellent",
      points: 120,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop",
      owner: "Sarah M."
    },
    {
      id: 2,
      title: "Designer Silk Dress",
      brand: "Zara",
      size: "S",
      condition: "Like New",
      points: 180,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
      owner: "Emma L."
    },
    {
      id: 3,
      title: "Casual Summer Top",
      brand: "H&M",
      size: "L",
      condition: "Good",
      points: 80,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
      owner: "Mike T."
    }
  ];

  return (
    <Layout userPoints={1250}>
      <div className="browse-page">
        <HeroSection
          title="Browse Fashion Items"
          subtitle="Discover amazing pieces from our community of fashion lovers"
          stats={heroStats}
        />
        
        <section className="categories-section">
          <div className="container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="categories-grid">
              {categories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.count} items</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="featured-items-section">
          <div className="container">
            <h2 className="section-title">Featured Items</h2>
            <div className="items-grid">
              {featuredItems.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                    <div className="item-condition">{item.condition}</div>
                  </div>
                  <div className="item-content">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-brand">{item.brand} • Size {item.size}</p>
                    <div className="item-footer">
                      <div className="item-points">
                        <i className="fas fa-coins"></i>
                        {item.points} pts
                      </div>
                      <p className="item-owner">by {item.owner}</p>
                    </div>
                    <button className="view-item-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Browse;
