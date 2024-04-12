"use client";
import Experience from "./components/Experience";
import { UserProvider } from "./context/UserContext";

export default function APP() {
    return (
        <UserProvider>
            <Experience />
        </UserProvider>
    )

}