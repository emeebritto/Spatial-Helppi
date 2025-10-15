import React, { useEffect, useState, useCallback } from 'react';
import Styled from 'styled-components';


const Btn = Styled.button<{ show?:boolean }>`
  display: ${({ show }) => show? "":"none"};
  position: fixed;
  border: none;
  z-index: 1;
  padding: 10px 15px;
  border-radius: 10px;
  right: 6vw;
  bottom: 8em;
  cursor: pointer;
  background-color: #230973;
`

const BtnIcon = Styled.img`
  transform: rotate(-90deg);
`


const GoToTopBtn:React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = useCallback(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  },[]);

  useEffect(() => {
    const searchInput = document.querySelector('#search-input');
    if (!searchInput) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setShowButton(!entry.isIntersecting);
      });
    });

    observer.observe(searchInput);
    return () => observer.disconnect();
  }, []);

  return (
    <Btn
      show={showButton}
      aria-label="go to top"
      onClick={handleScrollToTop}
    >
      <BtnIcon src="/icons/arrow.svg" alt="button icon"/>
    </Btn>
  );
}

export default GoToTopBtn;
