import { useMemo, useState } from "react";
import {
  products as catalogProducts,
  productCategories,
} from "./data/products";

const categories = [
  { name: "Beauty", icon: "✦" },
  { name: "Cleaning", icon: "◇" },
  { name: "Catering", icon: "◆" },
  { name: "Tuition", icon: "✧" },
  { name: "Repairs", icon: "◈" },
  { name: "Handmade", icon: "✹" },
];

const services = [
  {
    id: 1,
    title: "Home Beauty Service",
    provider: "RawZen Beauty",
    category: "Beauty",
    description:
      "Convenient beauty and grooming services from trusted local professionals.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    title: "Home Deep Cleaning",
    provider: "RawZen Clean",
    category: "Cleaning",
    description:
      "Reliable home cleaning for kitchens, rooms and everyday spaces.",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    title: "Home Catering",
    provider: "RawZen Kitchen",
    category: "Catering",
    description:
      "Fresh, homestyle catering for family gatherings and special occasions.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    title: "Personal Tuition",
    provider: "RawZen Tutors",
    category: "Tuition",
    description:
      "Personalized tuition and academic support from experienced tutors.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    title: "Home & Appliance Repair",
    provider: "RawZen Repairs",
    category: "Repairs",
    description:
      "Get everyday home and appliance repair work handled by local experts.",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    title: "Handmade Custom Work",
    provider: "RawZen Makers",
    category: "Handmade",
    description:
      "Discover skilled makers for thoughtful handcrafted products and work.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
  },
];

const fallbackProductImage =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80";

function formatPrice(price) {
  if (!price || Number(price) <= 0) return "PRICE ON REQUEST";
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [productCategory, setProductCategory] = useState("All");
  const [productSubcategory, setProductSubcategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookingService, setBookingService] = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [partnerDone, setPartnerDone] = useState(false);
  const [visibleProductCount, setVisibleProductCount] = useState(48);

  const query = search.trim().toLowerCase();

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const categoryMatch =
        activeCategory === "All" || service.category === activeCategory;

      const searchMatch =
        !query ||
        `${service.title} ${service.provider} ${service.category} ${service.description}`
          .toLowerCase()
          .includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const subcategories = useMemo(() => {
    const source =
      productCategory === "All"
        ? catalogProducts
        : catalogProducts.filter(
            (product) => product.category === productCategory
          );

    return [...new Set(source.map((product) => product.subcategory).filter(Boolean))];
  }, [productCategory]);

  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((product) => {
      const categoryMatch =
        productCategory === "All" ||
        product.category === productCategory;

      const subcategoryMatch =
        productSubcategory === "All" ||
        product.subcategory === productSubcategory;

      const searchableText = [
        product.name,
        product.category,
        product.subcategory,
        product.productType,
        product.description,
        product.size,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch = !query || searchableText.includes(query);

      return categoryMatch && subcategoryMatch && searchMatch;
    });
  }, [productCategory, productSubcategory, query]);

  const visibleProducts = filteredProducts.slice(0, visibleProductCount);

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const productImage = (product) =>
    product.image || fallbackProductImage;

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });

    setMobileMenu(false);
  };

  const selectServiceCategory = (category) => {
    setActiveCategory(category);
    scrollTo("services");
  };

  const selectProductCategory = (category) => {
    setProductCategory(category);
    setProductSubcategory("All");
    setVisibleProductCount(48);
    scrollTo("products");
  };

  const openBooking = (service) => {
    setBookingService(service);
    setBookingDone(false);
  };

  const closeBooking = () => {
    setBookingService(null);
    setBookingDone(false);
  };

  const confirmBooking = (event) => {
    event.preventDefault();
    setBookingDone(true);
  };

  const openCheckout = () => {
    if (!cart.length) return;
    setCartOpen(false);
    setOrderDone(false);
    setCheckoutOpen(true);
  };

  const placeOrder = (event) => {
    event.preventDefault();
    setOrderDone(true);
  };

  const openPartner = () => {
    setPartnerDone(false);
    setPartnerOpen(true);
  };

  const submitPartner = (event) => {
    event.preventDefault();
    setPartnerDone(true);
  };

  return (
    <div className="app">
      <div className="top-strip">
        <div>
          <span>CRAFTED FOR EVERYDAY LIFE</span>
        </div>

        <div className="top-right">
          <span>FREE SHIPPING ABOVE ₹1999</span>
        </div>
      </div>

      <header className="navbar">
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => scrollTo("home")}
          >
            <span className="brand-main">RAWZEN</span>
            <span className="brand-sub">
              LIFESTYLE PRODUCTS
            </span>
          </button>

          <nav
            className={`nav-links ${
              mobileMenu ? "show" : ""
            }`}
          >
            <button onClick={() => scrollTo("home")}>
              HOME
            </button>

            <button onClick={() => scrollTo("categories")}>
              CATEGORIES
            </button>

            <button onClick={() => scrollTo("services")}>
              SERVICES
            </button>

            <button onClick={() => scrollTo("products")}>
              SHOP
            </button>

            <button onClick={() => scrollTo("about")}>
              OUR STORY
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className="nav-search"
              onClick={() => scrollTo("products")}
            >
              SEARCH
            </button>

            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
            >
              BAG <span>{cartCount}</span>
            </button>

            <button
              className="menu-button"
              onClick={() =>
                setMobileMenu((value) => !value)
              }
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-kicker">
            <span />
            RAWZEN LIFESTYLE PRODUCTS
            <span />
          </div>

          <h1>
            ROOTED IN
            <br />
            <em>EVERYDAY.</em>
          </h1>

          <h2>CRAFTED FOR LIFE.</h2>

          <p>
            Discover trusted local services and distinctive
            lifestyle products in one thoughtfully crafted
            marketplace.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() => scrollTo("products")}
            >
              EXPLORE PRODUCTS
            </button>

            <button
              className="btn btn-outline"
              onClick={() => scrollTo("categories")}
            >
              FIND A SERVICE
            </button>
          </div>
        </div>

        <div className="hero-bottom">
          <span>LOCAL • TRUSTED • AUTHENTIC</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>
      </section>

      <section className="search-section">
        <div className="section-container">
          <div className="search-heading">
            <span>01</span>
            <h3>FIND WHAT YOU NEED</h3>
          </div>

          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisibleProductCount(48);
              }}
              placeholder="Search products, services or categories..."
            />

            {search && (
              <button onClick={() => setSearch("")}>
                CLEAR
              </button>
            )}
          </div>
        </div>
      </section>
            <section
        id="categories"
        className="categories section-dark"
      >
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-number">02</span>
              <h2>SERVICES & CATEGORIES</h2>
            </div>

            <p>
              Everyday services brought together with the
              RawZen character.
            </p>
          </div>

          <div className="category-grid">
            <button
              className={`category-card ${
                activeCategory === "All" ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory("All");
                scrollTo("services");
              }}
            >
              <span className="category-icon">✦</span>
              <strong>ALL</strong>
              <small>EXPLORE SERVICES</small>
            </button>

            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-card ${
                  activeCategory === category.name
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  selectServiceCategory(category.name)
                }
              >
                <span className="category-icon">
                  {category.icon}
                </span>

                <strong>{category.name}</strong>

                <small>EXPLORE SERVICE</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-number">03</span>
              <h2>LOCAL SERVICES</h2>
            </div>

            <p>
              Find reliable people for the things that
              matter in everyday life.
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="empty-state">
              <h3>NO SERVICES FOUND</h3>
              <p>
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="service-grid">
              {filteredServices.map((service) => (
                <article
                  className="service-card"
                  key={service.id}
                >
                  <div className="card-image">
                    <img
                      src={service.image}
                      alt={service.title}
                    />

                    <span className="image-label">
                      RAWZEN
                    </span>
                  </div>

                  <div className="card-body">
                    <span className="eyebrow">
                      {service.category}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="card-meta">
                      <span>{service.provider}</span>
                      <strong>
                        {formatPrice(service.price)}
                      </strong>
                    </div>

                    <button
                      className="card-button"
                      onClick={() => openBooking(service)}
                    >
                      BOOK SERVICE →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="products"
        className="products section-dark"
      >
        <div className="section-container">
          <div className="section-header">
            <div>
              <span className="section-number">04</span>
              <h2>SHOP LIFESTYLE</h2>
            </div>

            <p>
              Explore the complete RawZen product catalog
              across all available categories and
              subcategories.
            </p>
          </div>

          <div
            className="product-filters"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
              marginBottom: "28px",
            }}
          >
            <select
              value={productCategory}
              onChange={(event) => {
                setProductCategory(event.target.value);
                setProductSubcategory("All");
                setVisibleProductCount(48);
              }}
              aria-label="Product category"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#1c120d",
                color: "#f2e2c3",
                border: "1px solid #7b4525",
              }}
            >
              <option value="All">
                ALL PRODUCT CATEGORIES
              </option>

              {productCategories.map((category) => (
                <option
                  key={category.name}
                  value={category.name}
                >
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            <select
              value={productSubcategory}
              onChange={(event) => {
                setProductSubcategory(event.target.value);
                setVisibleProductCount(48);
              }}
              aria-label="Product subcategory"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#1c120d",
                color: "#f2e2c3",
                border: "1px solid #7b4525",
              }}
            >
              <option value="All">
                ALL SUBCATEGORIES
              </option>

              {subcategories.map((subcategory) => (
                <option
                  key={subcategory}
                  value={subcategory}
                >
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span className="eyebrow">
              SHOWING {visibleProducts.length} OF{" "}
              {filteredProducts.length} PRODUCTS
            </span>

            <span className="eyebrow">
              {catalogProducts.length} TOTAL CATALOG PRODUCTS
            </span>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="empty-state">
              <h3>NOTHING FOUND</h3>
              <p>
                Try another search, category or
                subcategory.
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div
                    className="product-image product-clickable"
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                  >
                    <img
                      src={productImage(product)}
                      alt={product.name}
                      onError={(event) => {
                        event.currentTarget.src =
                          fallbackProductImage;
                      }}
                    />

                    <span className="product-tag">
                      RAWZEN
                    </span>

                    <button
                      className="quick-add"
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(product);
                      }}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      +
                    </button>
                  </div>

                  <div className="product-info">
                    <span>{product.category}</span>

                    <h3>{product.name}</h3>

                    <p
                      style={{
                        margin: "8px 0",
                        opacity: 0.7,
                        fontSize: "0.78rem",
                      }}
                    >
                      {product.subcategory}
                    </p>

                    <div className="product-bottom">
                      <strong>
                        {formatPrice(product.price)}
                      </strong>

                      <button
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        VIEW DETAILS
                      </button>
                    </div>

                    <button
                      className="product-add-button"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO BAG →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {visibleProductCount <
            filteredProducts.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "36px",
              }}
            >
              <button
                className="btn btn-outline"
                onClick={() =>
                  setVisibleProductCount(
                    (count) => count + 48
                  )
                }
              >
                LOAD MORE PRODUCTS →
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="story">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85"
            alt="People and local work"
          />
        </div>

        <div className="story-content">
          <span className="section-number">05</span>

          <div className="stamp">RZ</div>

          <h2>
            MADE FOR
            <br />
            <em>REAL LIFE.</em>
          </h2>

          <p>
            RawZen brings the marketplace closer to
            everyday life by connecting people with useful
            services, local makers and products with
            character.
          </p>

          <p>
            From a trusted tutor to a home repair expert or
            a handcrafted product, discover people and
            things that make life easier and more personal.
          </p>

          <div className="signature">RAWZEN</div>
        </div>
      </section>

      <section className="process">
        <div className="section-container">
          <div className="section-header centered">
            <div>
              <span className="section-number">06</span>
              <h2>HOW RAWZEN WORKS</h2>
            </div>
          </div>

          <div className="process-grid">
            <div className="process-item">
              <span>01</span>
              <h3>DISCOVER</h3>
              <p>
                Browse local services, products and
                categories.
              </p>
            </div>

            <div className="process-line" />

            <div className="process-item">
              <span>02</span>
              <h3>CHOOSE</h3>
              <p>
                Select the service or product that fits
                your needs.
              </p>
            </div>

            <div className="process-line" />

            <div className="process-item">
              <span>03</span>
              <h3>CONNECT</h3>
              <p>
                Book a service or add a product to your
                bag.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partner">
        <div className="partner-content">
          <span>
            FOR LOCAL MAKERS & SERVICE PROVIDERS
          </span>

          <h2>
            HAVE SOMETHING
            <br />
            <em>TO SHARE?</em>
          </h2>

          <p>
            Bring your products or services to the RawZen
            community.
          </p>

          <button
            className="btn btn-primary"
            onClick={openPartner}
          >
            BECOME A PARTNER →
          </button>
        </div>
      </section>
            <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="brand-main">RAWZEN</div>

            <div className="brand-sub">
              LIFESTYLE PRODUCTS
            </div>

            <p>
              Rugged by nature.
              <br />
              Refined by design.
            </p>
          </div>

          <div className="footer-column">
            <h4>EXPLORE</h4>

            <button onClick={() => scrollTo("home")}>
              Home
            </button>

            <button onClick={() => scrollTo("products")}>
              Shop
            </button>

            <button onClick={() => scrollTo("services")}>
              Services
            </button>

            <button onClick={() => scrollTo("about")}>
              Our Story
            </button>
          </div>

          <div className="footer-column">
            <h4>PRODUCT CATEGORIES</h4>

            <button
              onClick={() => {
                setProductCategory("All");
                setProductSubcategory("All");
                scrollTo("products");
              }}
            >
              All Products
            </button>

            {productCategories
              .slice(0, 5)
              .map((category) => (
                <button
                  key={category.name}
                  onClick={() =>
                    selectProductCategory(
                      category.name
                    )
                  }
                >
                  {category.name}
                </button>
              ))}
          </div>

          <div className="footer-column">
            <h4>CONNECT</h4>

            <span>Instagram</span>
            <span>Facebook</span>
            <span>WhatsApp</span>
            <span>hello@rawzen.com</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 RAWZEN LIFESTYLE PRODUCTS
          </span>

          <span>CRAFTED WITH CHARACTER</span>
        </div>
      </footer>

      {cartOpen && (
        <div
          className="drawer-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="drawer-header">
              <div>
                <span>YOUR</span>
                <h2>BAG</h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>✦</div>

                <h3>YOUR BAG IS EMPTY</h3>

                <p>
                  Find something worth keeping.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCartOpen(false);
                    scrollTo("products");
                  }}
                >
                  SHOP COLLECTION
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >
                      <img
                        src={productImage(item)}
                        alt={item.name}
                        onError={(event) => {
                          event.currentTarget.src =
                            fallbackProductImage;
                        }}
                      />

                      <div className="cart-item-info">
                        <span>{item.category}</span>

                        <h4>{item.name}</h4>

                        <p>
                          {formatPrice(item.price)}
                        </p>

                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <strong>
                            {item.quantity}
                          </strong>

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div>
                    <span>TOTAL</span>

                    <strong>
                      {cartTotal > 0
                        ? formatPrice(cartTotal)
                        : "PRICE ON REQUEST"}
                    </strong>
                  </div>

                  <button
                    className="btn btn-primary full"
                    onClick={openCheckout}
                  >
                    PROCEED TO CHECKOUT →
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >
          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <div className="product-modal-image">
              <img
                src={productImage(selectedProduct)}
                alt={selectedProduct.name}
                onError={(event) => {
                  event.currentTarget.src =
                    fallbackProductImage;
                }}
              />
            </div>

            <div className="product-modal-content">
              <span className="eyebrow">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <p>
                {selectedProduct.description ||
                  "RawZen lifestyle product."}
              </p>

              <div className="product-detail-grid">
                <div>
                  <span>SUBCATEGORY</span>

                  <strong>
                    {selectedProduct.subcategory ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>PRODUCT TYPE</span>

                  <strong>
                    {selectedProduct.productType ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <span>SIZE</span>

                  <strong>
                    {selectedProduct.size || "—"}
                  </strong>
                </div>

                <div>
                  <span>PRICE</span>

                  <strong>
                    {formatPrice(
                      selectedProduct.price
                    )}
                  </strong>
                </div>
              </div>

              <button
                className="btn btn-primary full"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                ADD TO BAG →
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingService && (
        <div
          className="modal-overlay"
          onClick={closeBooking}
        >
          <div
            className="booking-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={closeBooking}
            >
              ×
            </button>

            {!bookingDone ? (
              <>
                <span className="eyebrow">
                  RAWZEN SERVICES
                </span>

                <h2>
                  BOOK
                  <br />
                  <em>{bookingService.title}</em>
                </h2>

                <p>
                  {bookingService.description}
                </p>

                <form onSubmit={confirmBooking}>
                  <label>
                    YOUR NAME

                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                    />
                  </label>

                  <label>
                    PHONE NUMBER

                    <input
                      required
                      type="tel"
                      placeholder="+91"
                    />
                  </label>

                  <label>
                    PREFERRED DATE

                    <input
                      required
                      type="date"
                    />
                  </label>

                  <label>
                    PREFERRED TIME

                    <select
                      required
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select time
                      </option>

                      <option>
                        10:00 AM
                      </option>

                      <option>
                        12:00 PM
                      </option>

                      <option>
                        03:00 PM
                      </option>

                      <option>
                        05:00 PM
                      </option>

                      <option>
                        07:00 PM
                      </option>
                    </select>
                  </label>

                  <button
                    className="btn btn-primary full"
                    type="submit"
                  >
                    CONFIRM BOOKING →
                  </button>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-mark">
                  ✓
                </div>

                <span>
                  BOOKING CONFIRMED
                </span>

                <h2>
                  YOU'RE
                  <br />
                  <em>ALL SET.</em>
                </h2>

                <p>
                  Your request for{" "}
                  <strong>
                    {bookingService.title}
                  </strong>{" "}
                  has been received for this demo.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={closeBooking}
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {checkoutOpen && (
        <div
          className="modal-overlay"
          onClick={() =>
            setCheckoutOpen(false)
          }
        >
          <div
            className="checkout-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ×
            </button>

            {!orderDone ? (
              <>
                <span className="eyebrow">
                  RAWZEN CHECKOUT
                </span>

                <h2>
                  COMPLETE
                  <br />
                  <em>YOUR ORDER.</em>
                </h2>

                <div className="checkout-summary">
                  <span>
                    {cartCount} ITEM(S)
                  </span>

                  <strong>
                    {cartTotal > 0
                      ? formatPrice(cartTotal)
                      : "PRICE ON REQUEST"}
                  </strong>
                </div>

                <form onSubmit={placeOrder}>
                  <label>
                    FULL NAME

                    <input
                      required
                      type="text"
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    PHONE NUMBER

                    <input
                      required
                      type="tel"
                      placeholder="+91"
                    />
                  </label>

                  <label>
                    EMAIL

                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label>
                    DELIVERY ADDRESS

                    <textarea
                      required
                      rows="3"
                      placeholder="Enter your address"
                    />
                  </label>

                  <label>
                    PAYMENT METHOD

                    <select
                      required
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select payment method
                      </option>

                      <option>
                        UPI
                      </option>

                      <option>
                        Card
                      </option>

                      <option>
                        Cash on Delivery
                      </option>
                    </select>
                  </label>

                  <button
                    className="btn btn-primary full"
                    type="submit"
                  >
                    PLACE DEMO ORDER →
                  </button>
                </form>

                <small>
                  Demo checkout only. No real
                  payment is processed.
                </small>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-mark">
                  ✓
                </div>

                <span>
                  ORDER RECEIVED
                </span>

                <h2>
                  THANK
                  <br />
                  <em>YOU.</em>
                </h2>

                <p>
                  Your demo order has been
                  recorded. Real payment and order
                  processing will be connected in
                  the backend phase.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCheckoutOpen(false);
                    setOrderDone(false);
                    setCart([]);
                  }}
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
            {partnerOpen && (
        <div
          className="modal-overlay"
          onClick={() =>
            setPartnerOpen(false)
          }
        >
          <div
            className="partner-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setPartnerOpen(false)
              }
            >
              ×
            </button>

            {!partnerDone ? (
              <>
                <span className="eyebrow">
                  RAWZEN PARTNERS
                </span>

                <h2>
                  BECOME A
                  <br />
                  <em>PARTNER.</em>
                </h2>

                <p>
                  Apply as a local service provider
                  or product seller. This form is
                  currently a demo flow.
                </p>

                <form onSubmit={submitPartner}>
                  <label>
                    FULL NAME / BUSINESS NAME

                    <input
                      required
                      type="text"
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    EMAIL

                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label>
                    PHONE NUMBER

                    <input
                      required
                      type="tel"
                      placeholder="+91"
                    />
                  </label>

                  <label>
                    PARTNER TYPE

                    <select
                      required
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select type
                      </option>

                      <option>
                        Service Provider
                      </option>

                      <option>
                        Product Seller
                      </option>
                    </select>
                  </label>

                  <label>
                    CATEGORY

                    <select
                      required
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category.name}
                          >
                            {category.name}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <button
                    className="btn btn-primary full"
                    type="submit"
                  >
                    SUBMIT APPLICATION →
                  </button>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-mark">
                  ✓
                </div>

                <span>
                  APPLICATION RECEIVED
                </span>

                <h2>
                  WELCOME TO
                  <br />
                  <em>RAWZEN.</em>
                </h2>

                <p>
                  Your partner application has
                  been recorded for this demo.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setPartnerOpen(false)
                  }
                >
                  DONE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;