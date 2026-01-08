import { THorse } from "@/runnersQcApp/shared/types";
import _ from "lodash";
export const isMyHorse = (h: THorse, hisaPersonId: string) =>
  _.includes(
    [h.ownerHisaId, h.responsiblePersonHisaId, ...(h.attendingVet || [])],
    hisaPersonId
  );
