import { Rajdhani, Rubik } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "700"]
});
