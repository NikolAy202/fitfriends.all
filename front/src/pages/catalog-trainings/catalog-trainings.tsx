import {useState, useEffect} from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCountAllTrainings, getTrainings, getTrainingsDataLoadingStatus } from '../../store/trainings-data/selectors';
import { fetchCatalogTrainings } from '../../store/api-actions';
import TrainingItem from '../../components/training-item/training-item';
import { Query } from '../../types/training';
import { TRAINING_LIST, TypeTraining } from '../../types/questionnaire';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_LIMIT } from '../../const';
import useScrollToUp from '../../hooks/use-scroll-to-up/use-scroll-to-up';
import LoadingScreen from '../loading-screen/loading-screen';


function CatalogTrainingsPage() {
  useScrollToUp();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);

  const isTrainingsDataLoading = useAppSelector(getTrainingsDataLoadingStatus);
  const total = useAppSelector(getCountAllTrainings);
  const totalPage = Math.ceil(total.totalTrainings / DEFAULT_LIMIT);

  const [query, setQuery] = useState<Query>({limit: DEFAULT_LIMIT, page: 1});
  const [formValue, setValue] = useState({
    minPrice: 0, maxPrice: 10000,
    minCalories: 1000, maxCalories: 5000,
    minRating: 0, maxRating: 5
  });

  const [sliderValue, setSliderValue] = useState({
    minPrice: 0, maxPrice: total.maxPrice,
    minCalories: 1000, maxCalories: 5000,
    minRating: 0, maxRating: 5
  });

  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const {value, name} = evt.target;
    const valueNum = Math.max(0, Number(value));
    setValue({...formValue, [name]: Number(valueNum)});

    if (name === 'minPrice' && Number(valueNum) <= formValue.maxPrice) {
      setQuery({...query, price:[Number(valueNum), formValue.maxPrice]});
    }
    if (name === 'maxPrice' && Number(valueNum) >= formValue.minPrice) {
      setQuery({...query, price:[formValue.minPrice, Number(valueNum)]});
    }
    if ((name === 'maxPrice' && Number(valueNum) === 0 && formValue.minPrice === 0)
      || (name === 'minPrice' && Number(valueNum) === 0 && formValue.maxPrice === 0)) {
      setQuery({...query, price: undefined});
    }

    if (name === 'minCalories' && Number(valueNum) <= formValue.maxCalories) {
      setQuery({...query, caloriesReset:[Number(valueNum), formValue.maxCalories]});
    }
    if (name === 'maxCalories' && Number(valueNum) >= formValue.minCalories) {
      setQuery({...query, caloriesReset:[formValue.minCalories, Number(valueNum)]});
    }
    if ((name === 'maxCalories' && Number(valueNum) === 0 && formValue.minCalories === 0)
      || (name === 'minCalories' && Number(valueNum) === 0 && formValue.maxCalories === 0)) {
      setQuery({...query, caloriesReset: undefined});
    }

    if (name === 'specialisation') {
      const isChecked = !!(query && query?.typeTraining && query?.typeTraining.find((el) => el === value as TypeTraining));

      if (isChecked && query.typeTraining) {
        const currentArr = query.typeTraining.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, typeTraining: undefined}) : setQuery({...query, typeTraining: currentArr});
      }
      else {
        const currentArr = query && query.typeTraining ? query.typeTraining : [];
        setQuery({...query, typeTraining: [...currentArr, value as TypeTraining]});
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'sort') {
      evt.target.setAttribute('checked', 'true');
      if (value === 'sort_asc') {
        setQuery({...query, sortPrice: 'asc', price: undefined});
      }
      if (value === 'sort_desc') {
        setQuery({...query, sortPrice: 'desc', price: undefined});
      }
      if (value === 'sort_free') {
        setQuery({...query, price: [0,0]});
      }
    }
  };


  useEffect(()=>{
    dispatch(fetchCatalogTrainings(query));
  }, [dispatch, query]);

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.Main;
    navigate(path);
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isTrainingsDataLoading) {
    <LoadingScreen/>;
  }

  if (!trainings) {
    return null;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
                    type="button"
                    onClick={routeChange}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form">
                    <div className="gym-catalog-form__block gym-catalog-form__block--price">
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={formValue.minPrice}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={formValue.maxPrice}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={0}
                          max={total.maxPrice}
                          step={100}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={sliderValue.minPrice}
                          maxValue={sliderValue.maxPrice}
                          onInput={(e: ChangeResult) => {
                            setSliderValue({...sliderValue, minPrice: e.minValue, maxPrice: e.maxValue});
                            setQuery({...query, price:[Number(e.minValue), Number(e.maxValue)]});
                          }}
                        />
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                        <h4 className="gym-catalog-form__block-title">Калории</h4>
                        <div className="filter-calories">
                          <div className="filter-calories__input-text filter-calories__input-text--min">
                            <input
                              type="number"
                              id="minCalories"
                              name="minCalories"
                              value={formValue.minCalories}
                              onChange={handleFilterChange}
                            />
                            <label htmlFor="minCalories">от</label>
                          </div>
                          <div className="filter-calories__input-text filter-calories__input-text--max">
                            <input
                              type="number"
                              id="maxCalories"
                              name="maxCalories"
                              value={formValue.maxCalories}
                              onChange={handleFilterChange}
                            />
                            <label htmlFor="maxCalories">до</label>
                          </div>
                        </div>
                        <div className="filter-range">
                          <MultiRangeSlider
                            min={1000}
                            max={5000}
                            step={100}
                            style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                            ruler='false'
                            barLeftColor='black'
                            barInnerColor='black'
                            barRightColor='black'
                            thumbLeftColor='black'
                            thumbRightColor='black'
                            minValue={formValue.minCalories}
                            maxValue={formValue.maxCalories}
                            onChange={(e: ChangeResult) => {
                              setValue({...formValue, minCalories: e.minValue, maxCalories: e.maxValue});
                              setQuery({...query, caloriesReset:[Number(e.minValue), Number(e.maxValue)]});
                            }}
                          />
                        </div>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                        <div className="filter-raiting">
                          <MultiRangeSlider
                            min={0}
                            max={5}
                            step={1}
                            style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                            ruler='false'
                            barLeftColor='black'
                            barInnerColor='black'
                            barRightColor='black'
                            thumbLeftColor='black'
                            thumbRightColor='black'
                            minValue={formValue.minRating}
                            maxValue={formValue.maxRating}
                            onChange={(e: ChangeResult) => {
                              setValue({...formValue, minRating: e.minValue, maxRating: e.maxValue});
                              setQuery({...query, rating:[Number(e.minValue), Number(e.maxValue)]});
                            }}
                          />
                        </div>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--type">
                        <h4 className="gym-catalog-form__block-title">Тип</h4>
                        <ul className="gym-catalog-form__check-list">
                          {TRAINING_LIST.map((el) => (
                            <li className="gym-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label >
                                  <input
                                    type="checkbox"
                                    name="specialisation"
                                    value={el}
                                    id={el}
                                    onChange={handleFilterChange}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span>
                                  <span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          ) )}
                        </ul>
                      </div>
                      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                        <div className="btn-radio-sort gym-catalog-form__radio">
                          <label>
                            <input type="radio" name="sort" value="sort_asc" onChange={handleFilterChange} />
                            <span className="btn-radio-sort__label">Дешевле</span>
                          </label>
                          <label>
                            <input type="radio" name="sort" value="sort_desc" onChange={handleFilterChange}/>
                            <span className="btn-radio-sort__label">Дороже</span>
                          </label>
                          <label>
                            <input type="radio" name="sort" value="sort_free" onChange={handleFilterChange}/>
                            <span className="btn-radio-sort__label">Бесплатные</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainings.map((el) =>
                    (
                      <li className="my-trainings__item" key={el.id}>
                        <div className="thumbnail-training" key={el.id}>
                          <TrainingItem training={el}/>
                        </div>
                      </li>)
                  )}
                </ul>
                <div className="show-more training-catalog__show-more">
                  {totalPage !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                  {totalPage === query.page && totalPage !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CatalogTrainingsPage;
