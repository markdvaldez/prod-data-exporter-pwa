import { HorseSchema, THorse } from "@/runnersQcApp/shared/types";
import {
  CoveredHorseSearchResponse,
  HorseAutocomplete,
  TPerson,
} from "@/Types";
import _ from "lodash";

export const mapHorsesToProps = (
  horses?: CoveredHorseSearchResponse[]
): THorse[] => {
  return _.chain(horses)
    .map((horse) => {
      const location = _.head(horse.location);
      const lastUpdate = horse.activity?.lastUpdate?.date;
      const parsedResult = HorseSchema.safeParse({
        ...horse,
        locationId: location?.locationId || undefined,
        locationName: location?.name || "",
        lastUpdate,
      });
      return parsedResult.success ? parsedResult.data : null;
    })
    .compact()
    .value();
};

export const mapAutocompleteHorsesToProps = (
  horses?: HorseAutocomplete[]
): THorse[] => {
  return _.chain(horses)
    .map((horse) => {
      const parsedResult = HorseSchema.safeParse(horse);
      return parsedResult.success ? parsedResult.data : null;
    })
    .compact()
    .value();
};

export const extractPersons = (horses?: THorse[]): TPerson[] => {
  if (_.isEmpty(horses)) {
    return [];
  }
  const personsMap = new Map<string, TPerson>();
  _.forEach(horses, (horse) => {
    _.forEach(
      [
        { id: horse.ownerHisaId, value: horse.ownerName || "" },
        {
          id: horse.responsiblePersonHisaId,
          value: horse.responsiblePersonName || "",
        },
      ],
      (entry) => {
        if (entry.id) {
          personsMap.set(entry.id, {
            hisaPersonId: entry.id,
            hisaPersonName: entry.value,
          });
        }
      }
    );
    _.forEach(horse.attendingVet, (hisaPersonId, index) => {
      personsMap.set(hisaPersonId, {
        hisaPersonId: hisaPersonId,
        hisaPersonName: horse.attendingVetName?.[index] || "",
      });
    });
  });
  return Array.from(personsMap.values());
};
