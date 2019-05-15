import { state } from "./state";
import { validate } from "./validate";
import { get } from "./get";

import { input } from "./input";
import { table } from "./table";
import { mapFromData } from "./input/mapFromData";
import { mapFromChildren } from "./input/mapFromChildren";

export const FormUtility = {
  stateManager: state,
  validate,
  get,
  input,
  table,
  map: {
    from: {
      data: mapFromData,
      children: mapFromChildren
    }
  }
};
