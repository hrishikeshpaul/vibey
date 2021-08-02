import { theme } from "theme/ChakraTheme";
import { StylesConfig, ControlProps } from "react-select";
import { CSSObject } from "@emotion/react";

import { Tag } from "util/Tags";

export const customStyles: StylesConfig<Tag, true> = {
  control: (provided: CSSObject, state: ControlProps<Tag, true>): CSSObject => {
    return {
      ...provided,
      "&:hover": {
        cursor: "text",
        background: !state.isFocused ? `${theme.colors.dark}BB` : "",
      },
      background: state.isFocused ? `${theme.colors.gray[800]}BB` : `${theme.colors.dark}80`,
      outline: 0,
      boxSizing: "border-box",
      border: state.isFocused ? `2px solid ${theme.colors.primary[400]}` : "2px solid transparent",
      boxShadow: "none",
      color: "white",
      borderRadius: theme.radii.md,
    };
  },
  menu: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      background: theme.colors.dark,
    };
  },
  input: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: theme.colors.white,
    };
  },
  option: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      background: theme.colors.dark,
      color: theme.colors.white,
      cursor: "pointer",
      "&:hover": {
        background: theme.colors.gray[600],
      },
    };
  },
  multiValue: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      background: theme.colors.primary[200],
      fontWeight: 600,
      borderRadius: theme.radii.md,
      fontSize: theme.fontSizes.sm,
    };
  },
  multiValueRemove: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      cursor: "pointer",
      color: theme.colors.black,
    };
  },
  indicatorsContainer: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      cursor: "pointer",
    };
  },
  placeholder: (provided: CSSObject): CSSObject => {
    return {
      ...provided,
      color: theme.colors.gray[400],
    };
  },
  valueContainer: (provided: CSSObject, state: ControlProps<Tag, true>): CSSObject => {
    return {
      ...provided,
      padding: state.hasValue ? "0 8px" : "0 16px",
    };
  },
};
