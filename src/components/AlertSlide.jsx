import {X} from 'react-feather';
import {useDispatch, useSelector} from 'react-redux';
import {hideAlertMessage} from '../store/CommonSlice';

export default function AlertSlide() {
  const message = useSelector((state) => state.common.alertMessage);
  const alertType = useSelector((state) => state.common.alertType);
  const isAlertOpen = useSelector((state) => state.common.isAlertOpen);
  const dispatch = useDispatch();
  return (
    <div className={`alert-wrapper ${isAlertOpen ? 'alert-show' : 'alert-hide'}`}>
      <div
        className={`d-flex alert alert-${
          alertType === 'error' ? 'danger' : alertType
        } alert-slide`}
      >
        <div dangerouslySetInnerHTML={{__html: `<strong>${message}</strong>`}} />
        <div
          className="cursor-pointer d-flex align-items-center"
          onClick={() => dispatch(hideAlertMessage())}
        >
          <X size={20} />
        </div>
      </div>
    </div>
  );
}
