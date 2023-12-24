import { DescriptionLn } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { editTraining, fetchCoachTraining, fetchUserOrder, reduceOrder } from '../../store/api-actions';
import { Training } from '../../types/training';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { UserRole, UserGender } from '../../types/user';
import { getOrder } from '../../store/orders-data/selectors';
import PopupWindow from '../popup-window/popup-window';
import CreateOrder from '../create-order/create-order';

type Props = {
  training: Training;
  role: UserRole;
}
enum FormFieldName {
  title ='title',
  trainingLevel='trainingLevel',
  typeTraining='typeTraining',
  timeTraining='timeTraining',
  price='price',
  caloriesBurnedTraining='caloriesBurnedTraining',
  description='description',
  video='videoTraning',
  specialOffer='specialoffer'
}


const TrainingForm = ({training, role}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const isCoach = role === UserRole.Trainer;

  const currentOrder = useAppSelector(getOrder);

  const [isDisabledTraining, setSignDisabledTraining] = useState<boolean>(currentOrder?.isDone === undefined || currentOrder?.isDone);
  const [isHiddenStop, setSignHiddenStop] = useState<boolean>(false);
  const handleStartButtonClick = () => {
    if (currentOrder?.id && !isHiddenStop) {
      dispatch(reduceOrder(currentOrder.id));
      setSignHiddenStop(true);
    }
    if (isHiddenStop)
    {
      setSignHiddenStop(false);
      dispatch(fetchUserOrder(training.id));
    }
  };

  useEffect(()=>{
    setSignDisabledTraining(currentOrder?.isDone || currentOrder?.isDone === undefined);
  }, [currentOrder?.isDone, isHiddenStop]);

  const [showModal, setShowModal] = useState(false);
  const togglePopup = () => {
    if (showModal) {
      dispatch(fetchUserOrder(training.id));
      dispatch(fetchCoachTraining(training.id));
    }
    setShowModal(!showModal);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      id: training.id,
      title: String(formData.get(FormFieldName.title)),
      price: Number(formData.get(FormFieldName.price)),
      description: String(formData.get(FormFieldName.description)),
      specialOffer: isDiscount
    };
    dispatch(editTraining(data));
    setSignEditForm(false);
  };

  const handleVideoSubmit = () => {
    const data = {
      id: training.id,
      video: String(fileVideoTraning),
      fileVideoTraning: fileVideoTraning
    };
    dispatch(editTraining(data));
  };

  const [isEditForm, setSignEditForm] = useState<boolean>(false);
  const handleEditButtonClick = () => {
    setSignEditForm((prevIsEditForm) => !prevIsEditForm);
  };

  const [isDiscount, setDiscount] = useState<boolean>(training.specialOffer ? training.specialOffer : false);
  const handleSetDiscount = () => {
    if (currentInfo.price){
      setInfo({...currentInfo, price: Math.round(isDiscount ? currentInfo.price / 0.9 : currentInfo.price * 0.9)});
    }
    setDiscount((prevIsDiscount) => !prevIsDiscount);


  };

  const TRAINING_INFO = {
    title: training.title,
    price: training.price,
    description: training.description,
    specialOffer: training.specialOffer,
    videoTraningPath: training.videoTraningPath
  };

  const [currentInfo, setInfo] = useState(TRAINING_INFO);
  const handleInfoChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    if (name === 'isSpecialOffer') {
      const signSpecialOffer = !currentInfo.specialOffer;
      setInfo({...currentInfo, specialOffer: signSpecialOffer});
    } else {
      setInfo({...currentInfo, [name]: value});
    }
  };

  const [fileVideoTraning, setfileVideoTraning] = useState<File | undefined>();
  // eslint-disable-next-line no-console
  console.log(training.videoTraningPath);
  const handleVideoUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setfileVideoTraning(evt.target.files[0]);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleVideoDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setInfo({...currentInfo, videoTraningPath: undefined});
      setfileVideoTraning(undefined);
    }
  };

  const [isNotCorrectLength, setSignCorrectLength] = useState<boolean>(false);
  useEffect(() => {
    if (
      currentInfo.description && (currentInfo.description.length < DescriptionLn.MinLength
      || currentInfo.description.length > DescriptionLn.MaxLength)
    ) {
      setSignCorrectLength(true);
    }
    else {
      setSignCorrectLength(false);
    }
  }, [currentInfo.description]);


  return (

    <div className="training-card">
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img src={training.trainerAvataPath} width="64" height="64" alt="Изображение тренера"/>
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training.trainerName}</span>
            </div>
          </div>
          {isCoach && isEditForm &&
              (
                <button
                  className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
                  type="submit"
                  form="training"
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg><span>Сохранить</span>
                </button>
              )}
          {isCoach && !isEditForm &&
          (
            <button
              className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
              type="button"
              onClick={handleEditButtonClick}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg><span>Редактировать</span>
            </button>
          )}
        </div>
        <div className="training-info__main-content">
          <form
            method="get"
            id="training"
            onSubmit={handleFormSubmit}
          >
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label><span className="training-info__label">Название тренировки</span>
                    <input
                      type="text"
                      name={FormFieldName.title}
                      required
                      minLength={1}
                      maxLength={15}
                      disabled={!isEditForm}
                      value={currentInfo.title}
                      onChange={handleInfoChange}
                    />
                  </label>
                </div>
                <div className="training-info__textarea">
                  <label><span className="training-info__label">Описание тренировки</span>
                    <span className="custom-input--error">
                      <textarea
                        id={FormFieldName.description}
                        name={FormFieldName.description}
                        placeholder=" "
                        disabled={!isEditForm}
                        value={currentInfo.description}
                        onChange={handleInfoChange}
                      >
                        {training.description}
                      </textarea>
                      {isNotCorrectLength &&
                 <span className="custom-textarea__error">Минимальная длина 10 символ. Максимальная длина 140 символов</span>}
                    </span>
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label><span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input type="number" name="rating" value={training.rating} disabled/>
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.typeTraining}</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>
                        {training.gender === UserGender.Female && '#для_женщин'}
                        {training.gender === UserGender.Male && '#для_мужчин'}
                        {training.gender === UserGender.NoMatter && '#для_всех'}
                      </span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.caloriesBurnedTraining}ккал</span></div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white"><span>#{training.timeTraining}</span></div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <span className="custom-input__wrapper">
                      <input
                        type="number"
                        name={FormFieldName.price}
                        required
                        min="0"
                        disabled={!isEditForm}
                        value={currentInfo.price}
                        onChange={handleInfoChange}
                      />
                      <span className="custom-input__text">₽</span>
                    </span>
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {!isCoach &&
                <button
                  className="btn training-info__buy"
                  type="button"
                  disabled={!isDisabledTraining}
                  onClick={togglePopup}
                >Купить
                </button>}
                {showModal &&
                <PopupWindow handleClose={togglePopup}>
                  <CreateOrder training={training} handleClose={togglePopup} />
                </PopupWindow>}
                {isCoach &&
                  <button
                    className="btn-flat btn-flat--light btn-flat--underlined"
                    type="button"
                    onClick={handleSetDiscount}
                    disabled={!isEditForm}
                  >
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-discount"></use>
                    </svg><span>{isDiscount ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
                  </button>}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <input
              className={`${currentInfo.videoTraningPath || fileVideoTraning || !isEditForm ? 'visually-hidden' : ''}`}
              type="file"
              name="import"
              tabIndex={-1}
              accept=".mov, .avi, .mp4"
              ref={inputRef}
              required
              onChange={handleVideoUpload}
              disabled={!isEditForm}
            />
            {fileVideoTraning &&
              <video src={URL.createObjectURL(fileVideoTraning)} width="922" height="566" controls></video>}
            {!fileVideoTraning && currentInfo.videoTraningPath &&
                <video src={currentInfo.videoTraningPath} width="922" height="566" controls></video>}
          </div>
        </div>
        {!isCoach &&
      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          disabled={isDisabledTraining}
          onClick={handleStartButtonClick}
        >{isHiddenStop ? 'Закончить' : 'Приступить'}
        </button>
      </div>}
        {isCoach && isEditForm &&
      <div className="training-video__edit-buttons" style={{display: 'flex'}}>
        <button
          className="btn"
          type="button"
          onClick={handleVideoSubmit}
        >Сохранить
        </button>
        <button
          className="btn btn--outlined"
          type="button"
          onClick={handleVideoDelete}
        >Удалить
        </button>
      </div>}
      </div>
    </div>
  );
};

export default TrainingForm;
