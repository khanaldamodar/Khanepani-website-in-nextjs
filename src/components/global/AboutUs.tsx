"use client"
import React, { useEffect } from 'react'
const AboutUs = () => {

  const [aboutUs, setAboutUs] = React.useState();

  useEffect(() => {
    // Fetch about us data from an API or context if needed
    // For now, we will use static data
    const fetchAboutUs = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
      const response = await fetch(`${apiUrl}settings`);
      const data = await response.json();
      setAboutUs(data.about);
    };
    fetchAboutUs();
  }, []);

  return (
    <div className=' p-6 rounded-lg shadow-md text-white text-center font-poppins'>
        <h1 className='text-2xl font-semibold'>About us</h1>
        <p className='mt-4 text-lg xl:px-40'>{aboutUs}</p>
    </div>
  )
}

export default AboutUs