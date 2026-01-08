"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useIsPageVisible } from "@/hooks/useIsFocused";
import { getPageId } from "@/routes/utils";
import { useFetchActiveByPage } from "@/services/api/modules/frontEndNotification/frontEndNotification";
import {
  logResponseAction,
  logShowAction,
} from "@/services/store/modules/frontEndNotification";
import _ from "lodash";
import {
  mapNotificationToProps,
  TFrontEndNotification,
  TIMEOUT,
} from "./helpers";
import { NotificationModal } from "./NotificationModal";

type FrontEndNotificationProps = {
  page: number;
};

export const FrontEndNotificationContainer: React.FC<FrontEndNotificationProps> =
  memo(({ page }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [notification, setNotification] = useState<
      TFrontEndNotification | undefined
    >();

    const isPageVisible = useIsPageVisible();

    const pageId = useMemo(() => getPageId(page), [page]);

    const { data } = useFetchActiveByPage(pageId, {
      enabled: isPageVisible,
      refetchInterval: isPageVisible ? TIMEOUT : false,
    });

    useEffect(() => {
      if (!_.isEmpty(data)) {
        const nextNotification = mapNotificationToProps(data);
        if (nextNotification?.isValid) {
          setNotification(nextNotification);
          dispatch(
            logShowAction({
              frontEndNotificationId:
                nextNotification.frontEndNotificationId || "",
            })
          );
        } else {
          setNotification(undefined);
        }
      }
    }, [data, dispatch]);

    const handleClose = useCallback(
      (responseOption: string) => {
        if (notification?.frontEndNotificationId) {
          dispatch(
            logResponseAction({
              frontEndNotificationId: notification.frontEndNotificationId,
              response: responseOption,
            })
          );
        }
        setNotification(undefined);

        queryClient.setQueryData(["frontEndNotification", pageId], () => []);
      },
      [dispatch, notification, pageId, queryClient]
    );

    useEffect(() => {
      return () => {
        setNotification(undefined);
      };
    }, []);

    return (
      <NotificationModal
        isOpen={!!notification}
        data={notification}
        onClose={handleClose}
        onSubmit={handleClose}
      />
    );
  });

FrontEndNotificationContainer.displayName = "FrontEndNotificationContainer";
