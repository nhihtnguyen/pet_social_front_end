import React from 'react';
import { FiMoon } from 'react-icons/fi';
const DarkMode = () => {
  let clickedClass = 'clicked';
  const body = document.body;
  const lightTheme = 'theme-light';
  const darkTheme = 'theme-dark';
  let theme;

  if (localStorage) {
    theme = localStorage.getItem('theme');
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem('theme', 'theme-light');
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem('theme', 'theme-dark');
      theme = darkTheme;
    }
  };

  return (
    <span
      className={`cursor-pointer p-2 text-center ms-3 menu-icon chat-active-btn ${
        theme === 'dark' ? clickedClass : ''
      }`}
      onClick={(e) => switchTheme(e)}
    >
      <span className='font-xl text-current'>
        <FiMoon />
      </span>
    </span>
  );
};

export default DarkMode;
