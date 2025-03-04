import { Roboto } from "next/font/google";

export const roboto700 = Roboto({
  weight: ["700"], // Specify the weights you intend to use
  subsets: ["latin"], // Specify the subsets you intend to use
  display: "swap", // Optional: Controls font-display behavior
  style: ["italic"], // Include both normal and italic styles
});
export const roboto400 = Roboto({
  weight: ["400"], // Specify the weights you intend to use
  subsets: ["latin"], // Specify the subsets you intend to use
  display: "swap", // Optional: Controls font-display behavior
  style: ["normal"], // Include both normal and italic styles
});