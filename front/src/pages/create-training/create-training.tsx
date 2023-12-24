import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postTraining } from '../../store/api-actions';
import { TrainingLevel, TIME_TRAINING_LIST, TRAINING_LEVEL_LIST, TRAINING_LIST, TimeTraining, TypeTraining } from '../../types/questionnaire';
import { USER_GENDER_LIST, UserGender } from '../../types/user';
import { DescriptionLn } from '../../const';
import { getErrorPost, getIsLoadingPostTraining } from '../../store/trainings-data/selectors';

enum FormFieldName {
  nameTraining ='nameTraining',
  trainingLevel='trainingLevel',
  typeTraining='typeTraining',
  timeTraining='timeTraining',
  price='price',
  caloriesReset='caloriesReset',
  descriptionTraining='descriptionTraining',
  gender='gender',
  videoTraning='videoTraning'
}

function CreateTrainingPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const isLoadingPost = useAppSelector(getIsLoadingPostTraining);
  const hasErrorPost = useAppSelector(getErrorPost);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: String(formData.get(FormFieldName.nameTraining)),
      trainingLevel: currentAria.levelTr,
      typeTraining: currentAria.trType,
      timeTraining: currentAria.trTime,
      gender: currentSex,
      price: Number(formData.get(FormFieldName.price)),
      caloriesBurnedTraining: Number(formData.get(FormFieldName.caloriesReset)),
      description: String(formData.get(FormFieldName.descriptionTraining)),
      video: String(fileVideoTraning),
      image: String(fileImageTraning),
      fileVideoTraning: fileVideoTraning,
      fileImageTraning: fileImageTraning,
      specialOffer: false,
      rating: 0,

    };
    dispatch(postTraining(data));
  };

  const ARIA_BUTTONS_STATE = {trType: false, trTime: false, levelTr: false};
  const [isOpened, setIsOpened] = useState(ARIA_BUTTONS_STATE);
  const handleToggleButtonClick = (nameAria: string) => {
    if (nameAria === 'trType' || nameAria === 'trTime' || nameAria === 'levelTr') {
      setIsOpened({...isOpened, [nameAria]: !isOpened[nameAria]});
    }
  };

  const ARIA_LIST_BOX = {trType: TypeTraining.Aerobics, trTime: TimeTraining.Time30, levelTr: TrainingLevel.Beginner};
  const [currentAria, setAria] = useState(ARIA_LIST_BOX);
  const handleAriaChange = (evt: React.MouseEvent<HTMLLIElement>, nameAria: string) => {
    setIsOpened({...isOpened, [nameAria]: false});
    if(nameAria === 'trType') {setAria({...currentAria, trType: evt.currentTarget.innerText as TypeTraining});}
    if(nameAria === 'trTime') {setAria({...currentAria, trTime: evt.currentTarget.innerText as TimeTraining});}
    if(nameAria === 'levelTr') {setAria({...currentAria, levelTr: evt.currentTarget.innerText as TrainingLevel});}
    evt.currentTarget.setAttribute('aria-selected', 'true');
  };

  const [currentSex, setSex] = useState(UserGender.NoMatter);
  const handleSexChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setSex(value as UserGender);
    evt.target.setAttribute('checked', 'true');
  };

  const [fileImageTraning, setfileImageTraning] = useState<File | undefined>();
  const handleImageUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileImageTraning(evt.target.files[0]);
  };

  const [fileVideoTraning, setfileVideoTraning] = useState<File | undefined>();
  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileVideoTraning(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [descriptionTraining, setdescriptionTraining] = useState<string>('');
  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value} = evt.target;
    setdescriptionTraining(value);
  };
  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      descriptionTraining && (descriptionTraining.length < DescriptionLn.MinLength
      || descriptionTraining.length > DescriptionLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [descriptionTraining]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form
                  method="get"
                  onSubmit={handleFormSubmit}
                >
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name={FormFieldName.nameTraining}
                                required
                                minLength={1}
                                maxLength={15}
                              />
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div className={`custom-select ${isOpened.trType ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <div className="custom-select__placeholder">{currentAria.trType}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={()=>handleToggleButtonClick('trType')}
                            >
                              <span className="custom-select__text">{currentAria.trType}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {TRAINING_LIST.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.trType === el}
                                    onClick={(evt)=>handleAriaChange(evt, 'trType')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label><span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name={FormFieldName.caloriesReset}
                                  required
                                  min="1000"
                                  max="5000"
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened.trTime ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <div className="custom-select__placeholder">{currentAria.trTime}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={()=>handleToggleButtonClick('trTime')}
                            >
                              <span className="custom-select__text">{currentAria.trTime}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {TIME_TRAINING_LIST.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.trTime === el}
                                    onClick={(evt)=>handleAriaChange(evt, 'trTime')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label><span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name={FormFieldName.price}
                                  required
                                  min="0"
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                            </label>
                          </div>
                          <div className={`custom-select ${isOpened.levelTr ? 'is-open' : 'custom-select--not-selected'}`}>
                            <span className="custom-select__label">Выберите уровень тренировки</span>
                            <div className="custom-select__placeholder">{currentAria.levelTr}</div>
                            <button
                              className="custom-select__button"
                              type="button"
                              aria-label="Выберите одну из опций"
                              onClick={()=>handleToggleButtonClick('levelTr')}
                            >
                              <span className="custom-select__text">{currentAria.levelTr}</span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </button>
                            <ul className="custom-select__list" role="listbox">
                              {TRAINING_LEVEL_LIST.map((el) =>
                                (
                                  <li
                                    key={el}
                                    role="option"
                                    tabIndex={0}
                                    className="custom-select__item"
                                    aria-selected={currentAria.levelTr === el}
                                    onClick={(evt)=>handleAriaChange(evt, 'levelTr')}
                                  >
                                    {el}
                                  </li>
                                ))}
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет тренировка</span>
                            <br/>
                            <div className="custom-toggle-radio create-training__radio">
                              {USER_GENDER_LIST.map((el) => (
                                <div className="custom-toggle-radio__block" key={el}>
                                  <label htmlFor={el}>
                                    {el === UserGender.Male ?
                                      (
                                        <input
                                          type="radio"
                                          id={el}
                                          name="sex"
                                          value={el}
                                          required
                                          onChange={handleSexChange}
                                        />
                                      )
                                      : (
                                        <input
                                          type="radio"
                                          id={el}
                                          name="sex"
                                          value={el}
                                          onChange={handleSexChange}
                                        />
                                      )}
                                    <span className="custom-toggle-radio__icon"></span>
                                    <span className="custom-toggle-radio__label">{el}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <span className="custom-input--error">
                              <textarea
                                id={FormFieldName.descriptionTraining}
                                name={FormFieldName.descriptionTraining}
                                placeholder=" "
                                onChange={handleDescriptionChange}
                              >
                              </textarea>
                              {isNotCorrectLength &&
                          <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите фоновое иображение</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              {fileImageTraning ? fileImageTraning.name : 'Загрузите сюда файлы формата JPG, PNG'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".JPG, .PNG"
                              ref={inputRef}
                              required
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              {fileVideoTraning ? fileVideoTraning.name : 'Загрузите сюда файлы формата MOV, AVI или MP4'}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="import"
                              tabIndex={-1}
                              accept=".mov, .avi, .mp4"
                              ref={inputRef}
                              required
                              onChange={handleVideoUpload}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit" disabled={isLoadingPost || hasErrorPost}>
                      {isLoadingPost ? 'Отправка...' : 'Опубликовать'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateTrainingPage;
