import { putFavorites } from "@/services/api/modules/locations/addToUserSettingsQuery";
import { fetchAddressesQuery } from "@/services/api/modules/locations/fetchAddresses";
import { fetchUserSettings } from "@/services/api/modules/locations/fetchUserSettings";
import { searchLocationsByGeoQuery } from "@/services/api/modules/locations/searchLocationsByGeoQuery";
import { searchLocationsByIdsQuery } from "@/services/api/modules/locations/searchLocationsByIds";
import { searchLocationsQuery } from "@/services/api/modules/locations/searchLocationsQuery";
import { getConfig } from "@/services/appConfig";
import { Address, LocationSearchResponse, UserSettingsResponse } from "@/Types";
import { toast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import _, { map } from "lodash";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  endSettingsFetching,
  endTracksFetching,
  searchNearestLocations,
  startSettingsFetching,
  startTracksFetching,
  updateAddresses,
  updateFavorites,
  updateLocationsFailure,
  updateLocationsList,
  updateNearestLocations,
} from ".";
import { selectHisaPersonId } from "../auth/selectors";
import {
  createVariables,
  mapLocationsResponseToProps,
  mapLocationsToProps,
} from "./helpers";
import { TLocationsActions as a } from "./sagaActions";
import { selectFavoriteLocations } from "./selectors";
import {
  locationsArraySchema,
  TAddToUserSettingsAction,
  TLocation,
  TSearchAddressesAction,
  TSearchLocationsAction,
  TSearchNearestLocationAction,
  TSyncLocationsAction,
} from "./types";

function* syncLocationsSaga(action: TSyncLocationsAction) {
  // try {
  //   const { locations } = action.payload;
  //   if (_.isEmpty(locations)) {
  //     return;
  //   }
  //   yield put(startLocationsFetching());
  //   const {
  //     data,
  //     error,
  //   }: {
  //     data: any;
  //     isError: boolean;
  //     error?: { error: string; status: string };
  //   } = yield putResolve(findLocationNamesByIDsQuery(locations) as any);
  //   if (data) {
  //     const nextLocations: TLocation[] = yield call(mapLocationToProps, data);
  //     yield put(updateLocationsList({ locations: nextLocations }));
  //     yield call(addLocations, nextLocations);
  //   }
  //   if (error) {
  //     const _error = extractError(error);
  //     yield put(
  //       updateLocationsFailure({
  //         error: _error,
  //       })
  //     );
  //   }
  // } catch (e) {
  //   const error = extractError(e);
  //   yield call(logError, error);
  //   yield put(updateLocationsFailure({ error }));
  // }
}

function* searchLocationsSaga(action: TSearchLocationsAction) {
  try {
    const { payload } = action;
    yield put(startTracksFetching());
    const data: LocationSearchResponse[] = yield call(
      searchLocationsQuery,
      payload
    );
    if (data) {
      const nextLocations = mapLocationsToProps(data);
      yield put(updateLocationsList({ locations: nextLocations }));
    }
  } catch (e) {
    const error = extractError(e);
    yield put(updateLocationsFailure({ error }));
  } finally {
    yield put(endTracksFetching());
  }
}

function* searchAddressesSaga(action: TSearchAddressesAction) {
  try {
    const { payload } = action;
    yield put(startTracksFetching());
    const data: Address[] = yield call(fetchAddressesQuery, payload);
    if (data) {
      yield put(updateAddresses({ addresses: data }));
    }
  } catch (e) {
    const error = extractError(e);
  } finally {
    yield put(endTracksFetching());
  }
}

function* searchNearestLocationsSaga(action: TSearchNearestLocationAction) {
  try {
    const { payload } = action;
    yield put(startTracksFetching());
    const data: LocationSearchResponse[] = yield call(
      searchLocationsByGeoQuery,
      payload
    );
    if (data) {
      const nextLocations = mapLocationsResponseToProps(data, payload?.latLong);
      yield put(updateLocationsList({ locations: nextLocations }));
      yield put(updateNearestLocations({ locations: nextLocations }));
    }
  } catch (e) {
    const error = extractError(e);
    yield put(updateLocationsFailure({ error }));
  } finally {
    yield put(endTracksFetching());
  }
}

function* addToUserSettingsSaga(action: TAddToUserSettingsAction) {
  const currentLocations: TLocation[] = yield select(selectFavoriteLocations);

  try {
    const { payload } = action;
    const { location } = payload;
    const personId: string = yield select(selectHisaPersonId);
    const appId = getConfig().appId;

    let favoritesToUpdate = [];

    const isInFavorites =
      _.findIndex(currentLocations, ["locationId", location.locationId]) !== -1;

    if (!isInFavorites) {
      favoritesToUpdate = [...currentLocations, location];
      yield call(toast, {
        title: "Successfully added to favorite locations",
        variant: "default",
      });
    } else {
      favoritesToUpdate = _.filter(
        currentLocations,
        (l) => l.locationId !== location.locationId
      );
      yield call(toast, {
        title: "Successfully removed from favorite locations",
        variant: "default",
      });
    }

    const favoritesJSON = JSON.stringify(createVariables(favoritesToUpdate));

    const variables: UserSettingsResponse = {
      appId: appId,
      userId: personId,
      settingName: "favoriteLocations",
      value: favoritesJSON,
    };

    yield put(updateFavorites({ favorites: favoritesToUpdate }));

    yield call(putFavorites, variables);
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
    yield put(updateFavorites({ favorites: currentLocations }));
  }
}

function* getUserSettingsSaga() {
  try {
    yield put(startSettingsFetching());
    const personId: string = yield select(selectHisaPersonId);

    const appId = getConfig().appId;

    const variables: UserSettingsResponse = {
      appId: appId,
      userId: personId,
      settingName: "favoriteLocations",
    };

    const data: UserSettingsResponse = yield call(fetchUserSettings, variables);
    if (data.value) {
      const favorites: TLocation[] = JSON.parse(data.value);

      const result = locationsArraySchema.safeParse(favorites);

      if (result.success && !!favorites?.length) {
        const locationIds: string[] = yield call(() =>
          map(favorites, (l) => l.locationId)
        );

        const data: LocationSearchResponse[] = yield call(
          searchLocationsByIdsQuery,
          { locationIds }
        );

        yield put(updateFavorites({ favorites: mapLocationsToProps(data) }));
      }
    }
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);
  } finally {
    yield put(endSettingsFetching());
  }
}
export function* locationsSaga() {
  yield all([
    takeEvery(a.LOCATIONS_SYNC, syncLocationsSaga),
    takeEvery(a.ADD_TO_USER_SETTINGS_REQUEST_SEND, addToUserSettingsSaga),
    takeLatest(a.LOCATIONS_REQUEST_SEND, searchLocationsSaga),
    takeLatest(a.ADDRESS_REQUEST_SEND, searchAddressesSaga),
    takeLatest(searchNearestLocations, searchNearestLocationsSaga),
    takeLatest(a.USER_SETTINGS_REQUEST_SEND, getUserSettingsSaga),
  ]);
}
