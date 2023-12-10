import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { authContext } from "@/store/auth";

const index = () => {
    const router = useRouter();
    const { authState, authDispatch } = useContext(authContext);

    useEffect(() => {
        (localStorage.getItem("todoweb")) ?
            authDispatch({ type: "RETRIEVE" }) :
            router.push("/auth/signin");

    }, []);

    return (
        <div>
            {authState?.displayName}
        </div>
    )
}

export default index;