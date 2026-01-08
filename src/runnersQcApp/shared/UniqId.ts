import { v4 as uuidv4 } from "uuid";

export const getUniqId = (): string => `${uuidv4()}`;
