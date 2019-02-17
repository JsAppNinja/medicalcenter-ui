import doctorsSaga from '../containers/RenderDoctors/redux/saga';

export default function* homeSaga() {
  yield []
    .concat(doctorsSaga);
}
