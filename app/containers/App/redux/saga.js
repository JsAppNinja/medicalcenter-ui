import recentViewedDoctorsSaga from '../../RecentViewedDoctors/redux/saga';
import topProvidersSaga from '../../TopProviders/redux/saga';
import autocompleteSaga from '../../AutocompleteSearchDoctors/redux/saga';

export default function* globalSaga() {
  yield []
    .concat(recentViewedDoctorsSaga)
    .concat(autocompleteSaga)
    .concat(topProvidersSaga);
}
