import { Link } from "react-router-dom";
import {
  Search,
  Sparkles,
  Scissors,
  GraduationCap,
  Utensils,
  Home as HomeIcon,
  Gift,
  ArrowRight,
  Star
} from "lucide-react";

const categories = [
  {
    name: "Beauty",
    icon: <Sparkles size={28} />,
  },
  {
    name: "Cleaning",
    icon: <HomeIcon size={28} />,
  },
  {
    name: "Tuition",
    icon: <GraduationCap size={28} />,
  },
  {
    name: "Catering",
    icon: <Utensils size={28} />,
  },
  {
    name: "Salon",
    icon: <Scissors size={28} />,
  },
  {
    name: "Handmade",
    icon: <Gift size={28} />,
  },
];

const services = [
  {
    name: "Bridal Makeup",
    provider: "Ananya Beauty Studio",
    price: "₹1,499",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Home Cleaning",
    provider: "CleanCare Services",
    price: "₹499",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mehendi Design",
    provider: "Priya Mehendi Arts",
    price: "₹599",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1601118964938-228a89955311?auto=format&fit=crop&w=600&q=80",
  },
];

function Home() {
  return (
    <div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            Trusted services & products
          </span>

          <h1>
            Discover trusted services
            <br />
            <span>right near you.</span>
          </h1>

          <p>
            Find trusted professionals, book services and
            discover unique products from local entrepreneurs.
          </p>

          <div className="search-box">

            <Search size={22} />

            <input
              type="text"
              placeholder="What service are you looking for?"
            />

            <button>
              Search
            </button>

          </div>

          <div className="hero-actions">

            <Link to="/services" className="primary-button">
              Explore Services
              <ArrowRight size={18} />
            </Link>

            <Link to="/products" className="secondary-button">
              Explore Products
            </Link>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
            alt="Professional"
          />

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="section">

        <div className="section-heading">

          <div>
            <span>EXPLORE</span>
            <h2>Popular Categories</h2>
          </div>

          <Link to="/services">
            View all <ArrowRight size={18} />
          </Link>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <Link
              to="/services"
              className="category-card"
              key={category.name}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>Explore services</p>

            </Link>

          ))}

        </div>

      </section>


      {/* SERVICES */}

      <section className="section services-section">

        <div className="section-heading">

          <div>
            <span>DISCOVER</span>
            <h2>Popular Services</h2>
          </div>

          <Link to="/services">
            View all <ArrowRight size={18} />
          </Link>

        </div>


        <div className="service-grid">

          {services.map((service) => (

            <div className="service-card" key={service.name}>

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.name}
                />

                <div className="rating">
                  <Star size={14} fill="currentColor" />
                  {service.rating}
                </div>

              </div>

              <div className="service-info">

                <h3>{service.name}</h3>

                <p>{service.provider}</p>

                <div className="service-bottom">

                  <strong>
                    {service.price}
                  </strong>

                  <Link to="/booking">
                    Book Now
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="how-section">

        <div className="how-content">

          <span>HOW IT WORKS</span>

          <h2>
            Everything you need,
            <br />
            in a few simple steps.
          </h2>

          <p>
            Discover professionals, choose your service,
            book a convenient time and enjoy a seamless
            experience.
          </p>

        </div>


        <div className="steps">

          <div className="step">
            <span>01</span>
            <h3>Search</h3>
            <p>Find the service you need.</p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Choose</h3>
            <p>Select a trusted professional.</p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Book</h3>
            <p>Choose your preferred time.</p>
          </div>

          <div className="step">
            <span>04</span>
            <h3>Enjoy</h3>
            <p>Relax and enjoy the service.</p>
          </div>

        </div>

      </section>


      {/* PARTNER CTA */}

      <section className="partner-section">

        <div>

          <span>GROW WITH US</span>

          <h2>
            Turn your skills
            <br />
            into an opportunity.
          </h2>

          <p>
            Join our community of professionals and
            reach more customers in your area.
          </p>

          <Link
            to="/become-partner"
            className="primary-button"
          >
            Become a Partner
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;