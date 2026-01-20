import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";


export default function useStreamClients({ apikey, user, token }) {

    const [videoClient, setVideoClient] = useState(null);
    const [chatClient, setChatClient] = useState(null);

    let isMounted = true

    useEffect(() => {
        if (!user || !token || !apikey) return;

        const initClients = async () => {

            try {
                const tokenProvider = () => Promise.resolve(token);
                const myVideoClient = new StreamVideoClient({
                    apikey, user, tokenProvider

                })

                const myChatClient = StreamChat.getInstance(apikey)
                await myChatClient.connectUser(user, token);

                if (isMounted) {
                    setChatClient(myChatClient)
                    setVideoClient(myVideoClient)
                }

            } catch (error) {
                console.error("Client initialiazation error", error)

            }

        }
        initClients();
        return () => {
            isMounted = false;
            if (videoClient) {
                videoClient.disconnectUSer().catch(console.error)
            }
            if (chatClient) {
                chatClient.disconnectUSer().catch(console.error)
            }

        }

    }, [apikey, user, token])

    return { videoClient, chatClient }
}