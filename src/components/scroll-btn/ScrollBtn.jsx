import clsx from 'clsx';
import css from './ScrollBtn.module.css';
import { useEffect, useState } from 'react';
import { SlArrowUp } from 'react-icons/sl';

const ScrollBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [offSet, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={clsx(css.scrollBtn, offSet > 400 && css.active)}
      onClick={scrollToTop}
    >
      <SlArrowUp className={css.arrowIcon} />
    </button>
  );
};

export default ScrollBtn;
