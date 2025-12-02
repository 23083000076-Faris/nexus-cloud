import React, { useState, useEffect } from 'react';
import './styles.css';

// Komponen Login
const Login = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Load Google OAuth library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            width: 250
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    setIsLoading(true);

    // Decode JWT token
    try {
      const token = response.credential;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const userData = JSON.parse(jsonPayload);

      setTimeout(() => {
        onLoginSuccess(userData);
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Error parsing token:', error);
      setIsLoading(false);
      alert('Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>🚀 HostingPro</h1>
        </div>
        <h2>Selamat Datang</h2>
        <p className="login-subtitle">Silakan login untuk melanjutkan</p>

        <div className="google-login-wrapper">
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div id="googleSignInButton"></div>
          )}
        </div>
      </div>
    </div>
  );
};

// Komponen Header
const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>🚀 HostingPro</h1>
          </div>
          <nav className="nav">
            <a href="#home">Beranda</a>
            <a href="#products">Produk</a>
            <a href="#about">Tentang</a>
            <a href="#contact">Kontak</a>
          </nav>
          <div className="user-menu">
            <img src={user.picture} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
            <button onClick={onLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Komponen Hero
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Solusi Hosting Terbaik untuk Bisnis Anda</h1>
          <p className="hero-subtitle">VPS, RDP, dan Hosting berkualitas tinggi dengan harga terjangkau</p>
          <button className="btn-primary">Mulai Sekarang</button>
        </div>
      </div>
    </section>
  );
};

// Komponen Product Card
const ProductCard = ({ title, price, features, icon }) => {
  return (
    <div className="product-card">
      <div className="product-icon">{icon}</div>
      <h3 className="product-title">{title}</h3>
      <div className="product-price">
        <span className="price">Rp {price.toLocaleString('id-ID')}</span>
        <span className="period">/bulan</span>
      </div>
      <ul className="product-features">
        {features.map((feature, index) => (
          <li key={index}>✓ {feature}</li>
        ))}
      </ul>
      <button className="btn-buy">Beli Sekarang</button>
    </div>
  );
};

// Komponen Products
const Products = () => {
  const products = [
    {
      title: 'VPS Starter',
      price: 50000,
      icon: '💻',
      features: ['1 CPU Core', '1 GB RAM', '20 GB SSD', '1 TB Bandwidth', 'Full Root Access']
    },
    {
      title: 'VPS Professional',
      price: 150000,
      icon: '🖥️',
      features: ['2 CPU Cores', '4 GB RAM', '80 GB SSD', '3 TB Bandwidth', 'Full Root Access']
    },
    {
      title: 'RDP Windows',
      price: 200000,
      icon: '🪟',
      features: ['4 CPU Cores', '8 GB RAM', '100 GB SSD', 'Windows Server', 'Remote Desktop']
    },
    {
      title: 'Shared Hosting',
      price: 25000,
      icon: '🌐',
      features: ['5 GB Storage', 'Unlimited Bandwidth', '5 Email Accounts', 'cPanel', 'SSL Gratis']
    },
    {
      title: 'Cloud Hosting',
      price: 100000,
      icon: '☁️',
      features: ['20 GB SSD', 'Unlimited Bandwidth', 'Auto Backup', 'CDN Gratis', '99.9% Uptime']
    },
    {
      title: 'Dedicated Server',
      price: 1500000,
      icon: '🏢',
      features: ['Intel Xeon', '32 GB RAM', '1 TB SSD', '10 TB Bandwidth', 'Full Control']
    }
  ];

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">Paket Layanan Kami</h2>
        <p className="section-subtitle">Pilih paket yang sesuai dengan kebutuhan Anda</p>
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponen Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HostingPro</h3>
            <p>Penyedia layanan hosting terpercaya di Indonesia</p>
          </div>
          <div className="footer-section">
            <h4>Layanan</h4>
            <ul>
              <li>VPS Hosting</li>
              <li>RDP Windows</li>
              <li>Shared Hosting</li>
              <li>Cloud Hosting</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Perusahaan</h4>
            <ul>
              <li>Tentang Kami</li>
              <li>Kontak</li>
              <li>Karir</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Kontak</h4>
            <ul>
              <li>📧 info@hostingpro.com</li>
              <li>📱 +62 812-3456-7890</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HostingPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Komponen Utama
const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <Hero />
      <Products />
      <Footer />
    </div>
  );
};

export default App;