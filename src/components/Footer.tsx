
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-reviva-mint/30 dark:to-reviva-purple/20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img 
              src="/reviva/8d6035b5-8ccf-43b7-a612-84053242895a.png" 
              alt="Reviva Logo" 
              className="h-12 mb-4"
            />
            <p className="text-reviva-charcoal/80 dark:text-white/80 mb-4">
              Your journey to mental wellness begins with us. We're here to support you every step of the way.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-reviva-teal hover:text-reviva-deep-teal transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-reviva-teal hover:text-reviva-deep-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-reviva-teal hover:text-reviva-deep-teal transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-reviva-teal hover:text-reviva-deep-teal transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-reviva-deep-teal">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#therapy" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Therapy
                </a>
              </li>
              <li>
                <a href="#pet-game" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Pet Care
                </a>
              </li>
              <li>
                <a href="#mood-tracker" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Mood Tracker
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-reviva-deep-teal">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Mental Health Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Crisis Support
                </a>
              </li>
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Therapist Directory
                </a>
              </li>
              <li>
                <a href="#" className="text-reviva-charcoal/80 dark:text-white/80 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
                  Support Groups
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-reviva-deep-teal">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-reviva-charcoal/80 dark:text-white/80">
                support@reviva.com
              </li>
              <li className="text-reviva-charcoal/80 dark:text-white/80">
                +1 (800) 123-4567
              </li>
              <li className="text-reviva-charcoal/80 dark:text-white/80">
                123 Wellness Street<br />
                Mindful City, MC 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-reviva-teal/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-reviva-charcoal/70 dark:text-white/70 mb-4 md:mb-0">
            © 2023 Reviva. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-reviva-charcoal/70 dark:text-white/70 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-reviva-charcoal/70 dark:text-white/70 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-reviva-charcoal/70 dark:text-white/70 hover:text-reviva-teal dark:hover:text-reviva-mint transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-reviva-charcoal/60 dark:text-white/60 flex items-center justify-center">
            Made with <Heart className="h-3 w-3 text-pink-500 mx-1" /> for mental wellbeing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
