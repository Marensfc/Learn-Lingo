import clsx from 'clsx';
import css from '../components/filters-form/FiltersForm.module.css';

export const createClass = (customOption, optionValue, selectedValue) => {
  switch (customOption) {
    case 'language':
      return clsx({
        [css.customOption]: true,
        [css.selected]: optionValue === selectedValue,
      });
    case 'level':
      return clsx({
        [css.customOption]: true,
        [css.selected]: optionValue === selectedValue,
      });
    case 'price':
      return clsx({
        [css.customOption]: true,
        [css.selected]: optionValue === selectedValue,
      });
    default:
      return css.customOption;
  }
};
