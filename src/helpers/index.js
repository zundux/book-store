import * as R from "ramda";

export const flattenObj = obj => {
  const go = obj_ => R.chain(
    ([k, v]) => {
      if (R.type(v) === "Object" || R.type(v) === "Array") {
        return R.map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
      } else {
        return [[k, v]];
      }
    },
    R.toPairs(obj_)
  );

  return R.fromPairs(go(obj));
};

export const findFirstKey = comparator => R.pipe(
  R.filter(comparator),
  R.keys,
  R.head
);

export const focusOnFirstInvalidField = errors => {
  if (errors) {
    const invalidFieldName = R.pipe(
      flattenObj,
      findFirstKey(value => value !== undefined)
    )(errors);

    const invalidField = document.getElementsByName(invalidFieldName)[0];

    if (invalidField) {
      const newPosition = window.pageYOffset +
        (invalidField.getBoundingClientRect().top - 100);
      window.scrollTo(0, newPosition);

      invalidField.focus();
    }
  }
};

export const getFetchParams = (defaultParams, params) => ({
  ...defaultParams,
  ...params
});