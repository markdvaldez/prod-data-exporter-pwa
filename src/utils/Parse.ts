import _ from "lodash";

export const safeParse = <T>(data?: string | null | object): T | undefined => {
  let json;
  try {
    if (!data) {
      return json;
    }

    if (_.isString(data)) {
      json = JSON.parse(data);
    }

    if (_.isObjectLike(data)) {
      json = data;
    }
  } catch (e) {
    console.log(e);
  }

  return json;
};
