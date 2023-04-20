import React, { useCallback } from "react"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { post } from "@/services/http";
import { googleLogin } from "@/services/endpoints";
import { AxiosResponse } from "axios";

type GoogleResponse = {
    credential: string,
    clientId: string,
}
export default function LoginPage() {
    const loginWithGoogle = useCallback(async (credentialResponse: CredentialResponse) => {
        const response: AxiosResponse<GoogleResponse> = await post(googleLogin, { token: credentialResponse.credential });
        console.log(response)
    }, [])
    return <div>
        <GoogleLogin
            onSuccess={loginWithGoogle}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    </div>
}