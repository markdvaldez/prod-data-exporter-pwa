"use client";

import { getConfig } from "@/services/appConfig";
import {
  changeHasAccess,
  checkPermissionAction,
} from "@/services/store/modules/auth";
import {
  selectHasAccess,
  selectPermissions,
  selectUserData,
} from "@/services/store/modules/auth/selectors";
import _ from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useUserPermissions() {
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);
  const permissions = useSelector(selectPermissions);
  const hasAccess = useSelector(selectHasAccess);

  useEffect(() => {
    if (permissions) {
      const accessKeys = getConfig().permission;
      const hasAccessKey = checkUserAccessKeys(permissions, accessKeys);
      dispatch(
        changeHasAccess({
          hasAccess: hasAccessKey,
        })
      );
    }
  }, [dispatch, permissions]);

  useEffect(() => {
    dispatch(checkPermissionAction());
  }, [dispatch]);

  return { hasAccess, userData, permissions };
}

export function checkUserAccessKeys(obj: object, values: string[]): boolean {
  return _.some(obj, (currentValue) => {
    if (_.isString(currentValue)) {
      return _.includes(values, currentValue);
    } else if (_.isArray(currentValue)) {
      return _.some(currentValue, (item) => _.includes(values, item));
    } else if (_.isObject(currentValue)) {
      return checkUserAccessKeys(currentValue, values);
    }
    return false;
  });
}
