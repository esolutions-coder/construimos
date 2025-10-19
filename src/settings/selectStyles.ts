import { CSSProperties } from "react";

interface SelectState {
    data: any,
    isFocused: boolean,
    isSelected: boolean
}

const blue = "#030f27";
const yellow = "#fdbe33"
export const selectStyles = {
    control: (styles: CSSProperties): CSSProperties => {
      return {
        ...styles,
        borderRadius: 0,
        border: "none",
        minHeight: 30,
      };
    },
  };

  export const preopSelectStyle = {
    control: (styles: CSSProperties, state: any): CSSProperties => {
      return {
        ...styles,
        borderRadius: 0,
        fontSize: 12,
        // @ts-ignore
        border: state.isFocused ? "dashed black 2px" : "dashed black 2px",
      };
    },
    option: (styles: CSSProperties, {isFocused, isSelected}: SelectState): CSSProperties => {
        return {
          ...styles,
          padding: 3,
          fontSize: 12,
          backgroundColor: isSelected ? yellow : isFocused ? yellow : blue,
          color: isSelected ? blue : isFocused ? blue : yellow
        };
      },
      menu: (styles: CSSProperties, state: any): CSSProperties => {
        return {
          ...styles,
          borderRadius: 0,
          backgroundColor: blue
        };
      },
      dropdownIndicator: (styles: CSSProperties, state: any): CSSProperties => {
        return {
          ...styles,
          color: yellow,
        };
      },
      container: (styles: CSSProperties, state: any): CSSProperties => {
        return {
          ...styles,
        };
      }
  };