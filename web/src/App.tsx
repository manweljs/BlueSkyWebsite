"use client";
import Experience from "./components/Experience";
import { UserProvider } from "./context/UserContext";
import { Globals } from "@react-spring/shared";

export default function APP() {

    // Globals.assign({
    //     frameLoop: "always",
    // });
    return (
        <UserProvider>
            <Experience />
        </UserProvider>
    )

}