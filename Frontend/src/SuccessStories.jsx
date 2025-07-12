import React, { useState, useCallback } from 'react';
import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import ImpactSection from './components/sections/ImpactSection';
import FAQSection from './components/sections/FAQSection';
import CTASection from './components/sections/CTASection';
import './SuccessStories.css';

const SuccessStories = () => {
  const [counters, setCounters] = useState({
    members: 0,
    swaps: 0,
    co2: 0
  });

  // Counter animation function
  const animateCounters = useCallback(() => {
    const animateCounter = (start, end, duration, callback) => {
      const increment = (end - start) / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        callback(Math.floor(current));
      }, 16);
    };

    setTimeout(() => {
      animateCounter(0, 12847, 2000, (value) => 
        setCounters(prev => ({ ...prev, members: value }))
      );
      animateCounter(0, 8934, 2000, (value) => 
        setCounters(prev => ({ ...prev, swaps: value }))
      );
      animateCounter(0, 156, 2000, (value) => 
        setCounters(prev => ({ ...prev, co2: value }))
      );
    }, 500);
  }, []);

  // Hero section data
  const heroStats = [
    { number: counters.members, label: "Happy Members" },
    { number: counters.swaps, label: "Items Swapped" },
    { number: counters.co2, label: "Tons CO2 Saved" }
  ];

  // Testimonials data
  const testimonials = [
    {
      avatar: "https://a-static.besthdwallpaper.com/girl-model-with-wavy-blonde-hair-wallpaper-1280x960-116371_20.jpg",
      name: "Sarah Johnson",
      text: "In my first month, I swapped 5 items and found amazing pieces I never would have discovered otherwise. Plus, I've made friends with similar style tastes!",
      stats: [
        { icon: "fas fa-exchange-alt", text: "23 swaps" },
        { icon: "fas fa-star", text: "4.9 rating" }
      ]
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      name: "Mike T.",
      text: "I've saved over $500 while completely refreshing my wardrobe. ReWear has changed how I think about fashion consumption.",
      stats: [
        { icon: "fas fa-exchange-alt", text: "18 swaps" },
        { icon: "fas fa-dollar-sign", text: "$500+ saved" }
      ]
    },
    {
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      name: "Emma L.",
      text: "The quality of items on ReWear is incredible. I've found designer pieces at a fraction of the cost while helping the environment!",
      stats: [
        { icon: "fas fa-exchange-alt", text: "31 swaps" },
        { icon: "fas fa-heart", text: "Top contributor" }
      ]
    }
  ];

  // Impact data
  const impactData = [
    {
      icon: "fas fa-trash-alt",
      title: "Items Saved from Landfills",
      number: counters.swaps,
      description: "Every swap prevents clothing waste"
    },
    {
      icon: "fas fa-leaf",
      title: "CO2 Emissions Reduced",
      number: counters.co2,
      unit: "tons",
      description: "Equivalent to planting 3,900 trees"
    },
    {
      icon: "fas fa-users",
      title: "Community Size",
      number: counters.members,
      description: "Active members worldwide"
    },
    {
      icon: "fas fa-handshake",
      title: "Successful Swaps",
      number: counters.swaps,
      description: "Completed exchanges and counting"
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "How do I earn points?",
      answer: "You earn points by listing items, completing swaps, and referring friends to the platform. Each successful swap earns you 50-100 points depending on the item value."
    },
    {
      question: "What if an item doesn't fit?",
      answer: "We encourage detailed size information and offer a 7-day return policy for point redemptions. For direct swaps, we recommend discussing sizing details with the other member beforehand."
    },
    {
      question: "How do I arrange item exchanges?",
      answer: "Our messaging system connects you directly with other users to coordinate safe meetups or shipping. We provide guidelines for secure exchanges and recommend meeting in public places."
    },
    {
      question: "What items are not allowed?",
      answer: "We don't allow undergarments, heavily damaged items, or items that violate our community guidelines. All items must be clean and in good condition."
    }
  ];

  return (
    <Layout userPoints={1250} showPoints={true}>
      <div className="success-stories-page">
        <HeroSection
          title="ReWear Community Impact"
          subtitle="Transforming wardrobes, building community, saving the planet"
          stats={heroStats}
          onStatsInView={animateCounters}
        />
        
        <TestimonialsSection
          title="Success Stories"
          testimonials={testimonials}
        />
        
        <ImpactSection
          title="Together We're Making a Difference"
          impactData={impactData}
        />
        
        <FAQSection
          title="Common Questions"
          faqData={faqData}
        />
        
        <CTASection
          title="Ready to Join Our Community?"
          subtitle="Start your sustainable fashion journey today"
          primaryButton={{
            text: "Join ReWear",
            icon: "fas fa-user-plus",
            route: "/signup"
          }}
          secondaryButton={{
            text: "Browse Items",
            icon: "fas fa-search",
            route: "/item-detail"
          }}
        />
      </div>
    </Layout>
  );
};

export default SuccessStories;
