import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { Order } from '../../types/order';
import { UserRole } from '../../types/user';
import { fetchCoachTraining, fetchComments, fetchUserOrder } from '../../store/api-actions';
import { AppRoute } from '../../const';

type Props = {
  order: Order;
  currentUserRole: UserRole;
}
const OrderItem = ({order, currentUserRole}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const routeChange = () =>{
    dispatch(fetchCoachTraining(order.trainingId));
    dispatch(fetchUserOrder(order.trainingId));
    dispatch(fetchComments(order.trainingId));
    const path = `${AppRoute.Training}/${order.trainingId}`;
    navigate(path);
  };
  // eslint-disable-next-line no-console
  console.log(order.training.title);

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type="image/webp"/>
            <img src={order.training.image} width="330" height="190" alt=""/>
          </picture>
        </div>
        <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">{order.price}</span><span>₽</span>
        </p>
        <h2 className="thumbnail-training__title">{order.trainingCount}</h2>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{order.training.title}</span></div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag"><span>#{order.training.caloriesBurnedTraining}ккал</span></div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="thumbnail-training__rate-value">{order.training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{order.training.description}</p>
        </div>
        {currentUserRole === UserRole.User &&
    <div className="thumbnail-training__button-wrapper">
      <button
        className="btn btn--small thumbnail-training__button-catalog"
        type="button"
        onClick={routeChange}
      >Подробнее
      </button>
      <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="/">Отзывы</a>
    </div>}
        {currentUserRole === UserRole.Trainer &&
        <button
          className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
          onClick={routeChange}
        >
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-info"></use>
          </svg><span>Подробнее</span>
        </button> }
      </div>
      {currentUserRole === UserRole.Trainer &&
    <div className="thumbnail-training__total-info">
      <div className="thumbnail-training__total-info-card">
        <svg width="32" height="32" aria-hidden="true">
          <use xlinkHref="#icon-chart"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{order.trainingCount}</p>
        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
      </div>
      <div className="thumbnail-training__total-info-card">
        <svg width="31" height="28" aria-hidden="true">
          <use xlinkHref="#icon-wallet"></use>
        </svg>
        <p className="thumbnail-training__total-info-value">{order.totalPrice}<span>₽</span></p>
        <p className="thumbnail-training__total-info-text">Общая сумма</p>
      </div>
    </div>}
    </div>
  );
};

export default OrderItem;
