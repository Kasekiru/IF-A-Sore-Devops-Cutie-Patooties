'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check if user_id exists in localStorage; if it does, redirect to homepage
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      router.push('/');  // Redirect if user is already logged in
    }
  }, [router]);

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          router.push('/'); // Redirect to root after 3 seconds
        }, 3000);
      } else {
        alert(data.error + ', Maybe User already Exist');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Terjadi kesalahan pada server. Silakan coba lagi.');
    }
  };

  return (
    <>
      <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Create An Account" subHeading="Create An Account" />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <form className="md:mt-7 mt-4" onSubmit={handleRegister}>
                <div className="username">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    type="text"
                    placeholder="Username *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="email mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="password"
                    type="password"
                    placeholder="Password *"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="confirm-pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password *"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center mt-5">
                  <div className="block-input">
                    <input type="checkbox" name="terms" id="terms" required />
                    <Icon.CheckSquare size={20} weight="fill" className="icon-checkbox" />
                  </div>
                  <label htmlFor="terms" className="pl-2 cursor-pointer text-secondary2">
                    I agree to the
                    <Link href="#!" className="text-black hover:underline pl-1">Terms of User</Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button 
                    className="button-main px-6 py-3 bg-blue-600 text-black bg-purple rounded-lg hover:bg-blue-700"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                
                {/* Success message with animated checkmark */}
                {successMessage && (
                  <div className="mt-4 flex items-center text-green-600">
                    <Icon.CheckCircle className="mr-2 animate-checkmark" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience, saved preferences, and more. We{String.raw`'re`} thrilled to have you with us again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href="/login" className="button-main">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
