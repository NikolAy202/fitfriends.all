import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { fetchCoachTraining, fetchComments, fetchUserOrder } from '../../store/api-actions';
import { Training } from '../../types/training';

type Props = {
  training: Training;
}

const TrainingItem = ({training}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-console
  console.log(training);
  const navigate = useNavigate();
  const routeChange = () =>{
    dispatch(fetchCoachTraining(training.id));
    dispatch(fetchUserOrder(training.id));
    dispatch(fetchComments(training.id));
    const path = `${AppRoute.Training}/${training.id}`;
    navigate(path);
  };


  return (
    <div className="thumbnail-training__inner">
      <div className="thumbnail-training__image">
        {training.image &&
        (
          <picture>
            <source type="image/webp"/>
            <img src={training.image } width="330" height="190" alt=""/>
          </picture>
        )}
        {!training.image &&
        (
          <picture>
            <source type="image/webp" srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"/>
            <img src="img/content/thumbnails/training-06.jpg" srcSet="img/content/thumbnails/training-06@2x.jpg 2x" width="330" height="190" alt=""/>
          </picture>
        )}
      </div>
      <p className="thumbnail-training__price">{training.price === 0 ? 'Бесплатно' : training.price}
      </p>
      <h3 className="thumbnail-training__title">{training.timeTraining}</h3>
      <div className="thumbnail-training__info">
        <ul className="thumbnail-training__hashtags-list">
          <li className="thumbnail-training__hashtags-item">
            <div className="hashtag thumbnail-training__hashtag"><span>#{training.typeTraining}</span></div>
          </li>
          <li className="thumbnail-training__hashtags-item">
            <div className="hashtag thumbnail-training__hashtag"><span>#{training.caloriesBurnedTraining}ккал</span></div>
          </li>
        </ul>
        <div className="thumbnail-training__rate">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span className="thumbnail-training__rate-value">{training.rating}</span>
        </div>
      </div>
      <div className="thumbnail-training__text-wrapper">
        <p className="thumbnail-training__text">{training.description}</p>
      </div>
      <div className="thumbnail-training__button-wrapper">
        <button
          className="btn btn--small thumbnail-training__button-catalog"
          type="button"
          onClick={routeChange}
        >Подробнее
        </button>
        <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="/">Отзывы</a>
      </div>
    </div>
  );
};

export default TrainingItem;
