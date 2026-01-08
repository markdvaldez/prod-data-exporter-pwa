"use client";

import { FrontEndNotificationFullResponse } from "@/Types/global-types";
import _ from "lodash";
import { DateTime } from "luxon";

export type TFrontEndNotification = FrontEndNotificationFullResponse & {
  isValid: boolean;
};

export const TIMEOUT = 10 * 60 * 1000;

export function mapNotificationToProps(
  data?: FrontEndNotificationFullResponse[] | []
): TFrontEndNotification | undefined {
  if (_.isEmpty(data)) return undefined;

  const currentNotification = _.head(data);
  if (currentNotification) {
    const startDate = DateTime.fromISO(currentNotification.activeFrom || "");
    const endDate = DateTime.fromISO(currentNotification.activeTo || "");
    const now = DateTime.now();
    const isValid =
      !currentNotification.isDeleted && startDate <= now && now <= endDate;

    return {
      ...currentNotification,
      isValid,
    };
  }

  return undefined;
}
