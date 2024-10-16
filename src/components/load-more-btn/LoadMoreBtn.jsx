import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ increasePageFunction }) => {
  return (
    <button
      type="button"
      className={css.loadMoreBtn}
      onClick={increasePageFunction}
    >
      Load more
    </button>
  );
};

export default LoadMoreBtn;
