import { theme } from "theme/ChakraTheme";

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    "&:hover": {
      cursor: "text",
      background: !state.isFocused ? `${theme.colors.gray[700]}BB` : "",
    },
    background: state.isFocused ? `${theme.colors.gray[800]}BB` : `${theme.colors.gray[700]}80`,
    outline: 0,
    boxSizing: "border-box",
    border: state.isFocused ? `2px solid ${theme.colors.teal[400]}` : "2px solid transparent",
    boxShadow: "none",
    color: "white",
    borderRadius: theme.radii.md,
  }),
  menu: (provided: any): any => {
    return {
      ...provided,
      background: theme.colors.gray[700],
    };
  },
  input: (provided: any): any => {
    return {
      ...provided,
      color: theme.colors.white,
    };
  },
  option: (provided: any): any => {
    return {
      ...provided,
      background: theme.colors.gray[700],
      color: theme.colors.white,
      cursor: "pointer",
      "&:hover": {
        background: theme.colors.gray[600],
      },
    };
  },
  multiValue: (provided: any): any => {
    return {
      ...provided,
      background: theme.colors.teal[200],
      fontWeight: "600",
      borderRadius: theme.radii.md,
      fontSize: theme.fontSizes.sm,
    };
  },

  multiValueRemove: (provided: any): any => {
    return {
      ...provided,
      cursor: "pointer",
      color: theme.colors.black,
    };
  },
  indicatorsContainer: (provided: any): any => {
    return {
      ...provided,
      cursor: "pointer",
    };
  },
  placeholder: (provided: any): any => {
    return {
      ...provided,
      color: theme.colors.gray[400],
    };
  },
  valueContainer: (provided: any, state: any): any => {
    return {
      ...provided,
      padding: state.hasValue ? "0 8px" : "0 16px",
    };
  },
};
