import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  shadows: {
    elevation: 4,
    shadowColor: colors.medium,
    shadowOffset: { width: 0, height: 0.7 * 10 },
    shadowOpacity: 0.1,
    shadowRadius: 0.8 * 10,
  },
};
