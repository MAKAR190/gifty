import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import blockContent from "./blockContent";
import category from "./category";
import product from "./product";
import article from "./article";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";
import video from "./video";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([
    product,
    article,
    category,

    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    video
  ]),
});
