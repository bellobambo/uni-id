import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import SignIn from "./Components/SignIn";
import User from "./Components/User";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "University ID",
  description: "Generate Virtual / Physical University ID",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html data-theme="night" lang="en">
        <body>
          <User />
          <SignIn />
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
