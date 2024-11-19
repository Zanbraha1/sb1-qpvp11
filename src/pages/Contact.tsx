import React from 'react';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="bg-navy-600 text-white relative py-16"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Chris Casper</h1>
            <p className="text-xl text-gray-200">Let's discuss your real estate goals</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-navy-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <a href="tel:770-572-3941" className="text-lg font-semibold text-navy-600 hover:text-navy-700">
                    (770) 572-3941
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-6 w-6 text-navy-600 mr-4" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a href="mailto:chris.casper@markmahaffey.com" className="text-lg font-semibold text-navy-600 hover:text-navy-700">
                    chris.casper@markmahaffey.com
                  </a>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-navy-600 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/chris.casper.90"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 hover:text-navy-700"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/ccasperrealestate/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-600 hover:text-navy-700"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-navy-600 mb-6">About Me</h2>
            
            <div className="prose max-w-none text-gray-600">
              <p className="mb-4">
                Following in the footsteps of my grandfather, Dave Casper, I'm proud to continue a legacy 
                of excellence in Athens real estate. Growing up, I watched him help countless families find 
                their perfect homes, and his dedication to client service left an indelible mark on my 
                approach to real estate.
              </p>

              <p className="mb-4">
                My grandfather taught me that real estate isn't just about properties – it's about people, 
                their dreams, and their futures. He showed me the importance of integrity, hard work, and 
                always putting clients first. These values are deeply ingrained in how I conduct business 
                today.
              </p>

              <p className="mb-4">
                As a native of Athens, I bring not just professional expertise but also deep local knowledge 
                to every transaction. I understand the nuances of our neighborhoods, schools, and community 
                dynamics that make Athens such a special place to live.
              </p>

              <p className="mb-4">
                Whether you're a first-time homebuyer, looking to sell, or interested in investment 
                properties, I'm here to provide the same level of exceptional service that made my 
                grandfather a trusted name in Athens real estate. Let's work together to achieve your 
                real estate goals.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="https://www.facebook.com/profile.php?id=61562859434550"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-navy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-700 transition-colors"
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;