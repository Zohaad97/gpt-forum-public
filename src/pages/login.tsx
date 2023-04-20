import React, { useCallback } from "react"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { post } from "@/services/http";
import { googleLogin } from "@/services/endpoints";
import { AxiosResponse } from "axios";
import { Card, Typography } from "antd";

type GoogleResponse = {
    credential: string,
    clientId: string,
}
const { Title } = Typography;

export default function LoginPage() {
    const loginWithGoogle = useCallback(async (credentialResponse: CredentialResponse) => {
        const response: AxiosResponse<GoogleResponse> = await post(googleLogin, { token: credentialResponse.credential });
        console.log(response)
    }, [])
    return <div className="bg">
                    <Title className="text-center py-8">Welcome to GPT Forum</Title>
        <div className="space-align-container">
            <div className="space-align-block">
                <Card title="SignIn" hoverable={true} bodyStyle={{ width: '400px' }}>
                    <GoogleLogin
                        width={"350"}
                        onSuccess={loginWithGoogle}
                        onError={() => {
                            console.log('Login Failed')
                        }}
                    />
                </Card>
            </div>
        </div>
    </div>
}