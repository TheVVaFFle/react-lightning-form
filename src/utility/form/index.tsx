import { state } from "./state";
import { validate } from "./validate";
import { get } from "./get";

import { input } from "./input";
import { handleData } from "./input/handleData";
import { mapFromChildren } from "./input/mapFromChildren";

export const FormUtility = {
  stateManager: state,
  validate,
  get,
  input,
  map: {
    from: {
      data: handleData
    }
  },
  handle: {
    children: mapFromChildren
  }
};
