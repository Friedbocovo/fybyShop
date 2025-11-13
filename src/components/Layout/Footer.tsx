import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, TikTok, Instagram, Youtube } from 'lucide-react';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";
import Logo from "/jaune.jpeg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <Fade direction="left"cascade>
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={Logo}
                  alt="fybyShop Logo"
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </div>
              <Fade direction="right">
              <span className="hidden md:block lg:block logo text-xl sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 ">
               ybyShop
                
              </span></Fade>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre destination premium pour l'électronique de pointe. 
              Découvrez les dernières innovations technologiques avec 
              un service client exceptionnel.
            </p>{/*
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Tiktok className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>*/}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Boutique
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service client */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Client</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Livraison & Expédition
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Mon Compte
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">+229 52 35 34 84</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-400">friedshop00@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span className="text-gray-400">
                  Tankpè,Fifonsi<br />
                  Abomey Calavi, Benin
                </span>
              </div>
            </div>
          </div>
        </Fade>
        </div>

      </div>
    </footer>
  );
};

export default Footer;