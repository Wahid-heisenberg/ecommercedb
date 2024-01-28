import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-64  w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <p>FAQ</p>
          <p>Contact Support</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Account</h3>
          <p>Login</p>
          <p>Register</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <p>Help center</p>
          <p>Privacy Terms</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
