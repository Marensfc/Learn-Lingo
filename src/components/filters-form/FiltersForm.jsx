import css from './FiltersForm.module.css';
import icons from '../../assets/icons.svg';

import { useId, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLanguage,
  selectLevel,
  selectPricePerHour,
} from '../../redux/filters/selectors';
import {
  resetFilters,
  setLanguage,
  setLevel,
  setPricePerHour,
} from '../../redux/filters/slice';
import { createClass } from '../../utils/createClass';

const FiltersForm = ({ setNewFilter }) => {
  const fieldLanguagesId = useId();
  const fieldLevelsId = useId();
  const fieldPriceId = useId();

  const inputsRefs = {
    inputLanguage: useRef(),
    inputLevel: useRef(),
    inputPrice: useRef(),
  };

  const dropdownSelectsRefs = {
    language: useRef(),
    level: useRef(),
    price: useRef(),
  };

  const dispatch = useDispatch();
  const selectedLanguage = useSelector(selectLanguage);
  const selectedLevel = useSelector(selectLevel);
  const selectedPrice = useSelector(selectPricePerHour);

  const handleToggleInputOnClick = currentTab => {
    currentTab.classList.toggle(css.isActive);
    const otherTabs = Object.values(dropdownSelectsRefs).filter(
      tab =>
        tab.current !== currentTab && tab.current.classList.remove(css.isActive)
    );
  };

  const handleSelectFilter = e => {
    if (e.target.nodeName === 'SPAN') {
      const filters = {
        setLanguage: () => {
          dispatch(setLanguage(e.target.textContent));
          setNewFilter(e.target.textContent);
        },
        setLevel: () => {
          dispatch(setLevel(e.target.textContent));
          setNewFilter(e.target.textContent);
        },
        setPricePerHour: () => {
          dispatch(setPricePerHour(Number(e.target.textContent)));
          setNewFilter(e.target.textContent);
        },
      };

      filters[e.currentTarget.dataset.role]();
      return;
    }

    return;
  };

  const handleResetFilters = () => {
    const resetedInputs = Object.values(inputsRefs).filter(
      input => input.current.value === 'All'
    );

    const areAllFieldReseted =
      resetedInputs.length === Object.values(inputsRefs).length;

    if (areAllFieldReseted) return;

    dispatch(resetFilters());
    setNewFilter('All');
  };

  useEffect(() => {
    const handlerOnClick = e => {
      const tabs = Object.values(dropdownSelectsRefs);
      const inputs = Object.values(inputsRefs);

      const openedTab = tabs.find(tab =>
        tab.current.classList.contains(css.isActive)
      );

      if (!openedTab) return;

      const isInAnyTab = tabs.find(tab => tab.current.contains(e.target));

      const isAnyInput = inputs.find(tab =>
        tab.current.parentElement.contains(e.target)
      );

      if (!isInAnyTab && !isAnyInput) {
        openedTab.current.classList.remove(css.isActive);
        return;
      }
    };

    document.addEventListener('click', handlerOnClick);

    return () => {
      document.removeEventListener('click', handlerOnClick);
    };
  }, [dropdownSelectsRefs.language, inputsRefs.inputLanguage]);

  return (
    <form className={css.filtersForm}>
      <div className={css.formFieldWrapper}>
        <label className={css.label} htmlFor={fieldLanguagesId}>
          Languages
        </label>
        <select name="language" value={selectedLanguage} readOnly></select>
        <div className={css.dropdownSelectWrapper}>
          <div
            className={css.selectInputWrapper}
            onClick={() =>
              handleToggleInputOnClick(dropdownSelectsRefs.language.current)
            }
          >
            <input
              ref={inputsRefs.inputLanguage}
              id={fieldLanguagesId}
              type="text"
              value={selectedLanguage}
              readOnly
              className={css.selectInput}
            />
            <svg width="20" height="20" className={css.chevronIcon}>
              <use href={`${icons}#chevron-down`}></use>
            </svg>
          </div>
          <div
            ref={dropdownSelectsRefs.language}
            className={css.dropdownSelect}
            onClick={handleSelectFilter}
            data-role="setLanguage"
          >
            <span
              className={createClass('language', 'French', selectedLanguage)}
            >
              French
            </span>
            <span
              className={createClass('language', 'English', selectedLanguage)}
            >
              English
            </span>
            <span
              className={createClass('language', 'German', selectedLanguage)}
            >
              German
            </span>
            <span
              className={createClass('language', 'Ukrainian', selectedLanguage)}
            >
              Ukrainian
            </span>
            <span
              className={createClass('language', 'Polish', selectedLanguage)}
            >
              Polish
            </span>
            <span
              className={createClass('language', 'Spanish', selectedLanguage)}
            >
              Spanish
            </span>
            <span
              className={createClass(
                'language',
                'Mandarin Chinese',
                selectedLanguage
              )}
            >
              Mandarin Chinese
            </span>
            <span
              className={createClass('language', 'Italian', selectedLanguage)}
            >
              Italian
            </span>
            <span
              className={createClass('language', 'Korean', selectedLanguage)}
            >
              Korean
            </span>
          </div>
        </div>
      </div>

      <div className={css.formFieldWrapper}>
        <label htmlFor={fieldLevelsId} className={css.label}>
          Level of knowledge
        </label>
        <select name="level" value={selectedLevel} readOnly></select>
        <div className={css.dropdownSelectWrapper}>
          <div
            className={css.selectInputWrapper}
            onClick={() =>
              handleToggleInputOnClick(dropdownSelectsRefs.level.current)
            }
          >
            <input
              ref={inputsRefs.inputLevel}
              id={fieldLevelsId}
              type="text"
              value={selectedLevel}
              className={css.selectInput}
              readOnly
            />
            <svg width="20" height="20" className={css.chevronIcon}>
              <use href={`${icons}#chevron-down`}></use>
            </svg>
          </div>
          <div
            ref={dropdownSelectsRefs.level}
            className={css.dropdownSelect}
            onClick={handleSelectFilter}
            data-role="setLevel"
          >
            <span
              className={createClass('level', 'A1 Beginner', selectedLevel)}
            >
              A1 Beginner
            </span>
            <span
              className={createClass('level', 'A2 Elementary', selectedLevel)}
            >
              A2 Elementary
            </span>
            <span
              className={createClass('level', 'B1 Intermediate', selectedLevel)}
            >
              B1 Intermediate
            </span>
            <span
              className={createClass(
                'level',
                'B2 Upper-Intermediate',
                selectedLevel
              )}
            >
              B2 Upper-Intermediate
            </span>
            <span
              className={createClass('level', 'C1 Advanced', selectedLevel)}
            >
              C1 Advanced
            </span>
            <span
              className={createClass('level', 'C2 Proficient', selectedLevel)}
            >
              C2 Proficient
            </span>
          </div>
        </div>
      </div>

      <div className={css.formFieldWrapper}>
        <label htmlFor={fieldPriceId} className={css.label}>
          Price
        </label>
        <select name="price" value={selectedPrice} readOnly></select>
        <div className={css.dropdownSelectWrapper}>
          <div
            className={css.selectInputWrapper}
            onClick={() =>
              handleToggleInputOnClick(dropdownSelectsRefs.price.current)
            }
          >
            <input
              ref={inputsRefs.inputPrice}
              id={fieldPriceId}
              type="text"
              value={
                selectedPrice === 'All' ? selectedPrice : `${selectedPrice} $`
              }
              className={css.selectInput}
              readOnly
            />
            <svg width="20" height="20" className={css.chevronIcon}>
              <use href={`${icons}#chevron-down`}></use>
            </svg>
          </div>
          <div
            ref={dropdownSelectsRefs.price}
            className={css.dropdownSelect}
            onClick={handleSelectFilter}
            data-role="setPricePerHour"
          >
            <span className={createClass('price', 10, selectedPrice)}>10</span>
            <span className={createClass('price', 20, selectedPrice)}>20</span>
            <span className={createClass('price', 30, selectedPrice)}>30</span>
            <span className={createClass('price', 40, selectedPrice)}>40</span>
          </div>
        </div>
      </div>

      <button
        className={css.resetFiltersBtn}
        type="reset"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </form>
  );
};

export default FiltersForm;
