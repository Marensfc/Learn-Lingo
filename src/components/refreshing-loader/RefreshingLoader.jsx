import css from './RefreshingLoader.module.css';

const RefreshingLoader = () => {
  return (
    <div className={css.loaderContainer}>
      <p className={css.refreshingText}>Refreshing a user</p>
      <div className={css.loader}></div>
    </div>
  );
};

export default RefreshingLoader;
