import React, { useRef, useState } from "react";
import "./Chat.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentUserId, userData2 } from "../../features/userAuthSlice";
import Conversation from "../../components/Coversation/Coversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import Navebar from "../../components/NavBar";
import ShowEstimateModal from "../../components/ChatBox/ShowEstimateModal";
import userAxios from "../../utils/userAxios";

const Chat = () => {
  
    const socket = useRef();
    // const { user } = useSelector((state) => state.authReducer.authData);
    const userId = useSelector(currentUserId)


    const [chats, setChats] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [showEstimate, setShowEstimate] = useState(false);
    const [receiver, setReceiver] = useState("");

    const showEstimateClose = () => setShowEstimate(false);
    // Get the chat in chat section
    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userAxios.get(`/chat/${userId}`);
              
                setChats(data);
            } catch (error) {
                alert("server error")
            }
        };
        getChats();
    }, [userId]);

    // Connect to Socket.io
    useEffect(() => {
        socket.current = io("ws://localhost:8080");
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [userId]);

    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);


    // Get the message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            setReceivedMessage(data);
        }

        );
    }, []);


    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== userId);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
    };

    return (
        <>
            <Navebar />
            <div className="Chat p-5">
                {/* Left Side */}
                <div className="Left-side-chat">
                    {/* <LogoSearch /> */}
                    <div className="Chat-container bg-white no-scrollbar ">
                        <h2 className="font-extrabold text-4xl text-center font-Volkhov">Chats</h2>
                        <div className="Chat-list">
                            {chats.map((chat, i) => (
                                <div
                                    onClick={() => {
                                        setCurrentChat(chat);
                                    }}
                                >
                                    <Conversation
                                        key={i}
                                        data={chat}
                                        currentUser={userId}
                                        online={checkOnlineStatus(chat)}
                                        type="user"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side */}

                <div className="Right-side-chat ">
                    {/* <div style={{ width: "20rem", alignSelf: "flex-end" }}>
                    <NavIcons />
                </div> */}
                    <ChatBox
                        chat={currentChat}
                        currentUser={userId}
                        setSendMessage={setSendMessage}
                        receivedMessage={receivedMessage}
                        type="user"
                        showEstimate={setShowEstimate}
                        setReceiver={setReceiver}
                    />
                </div>
            </div>
            <ShowEstimateModal onClose={showEstimateClose} visible={showEstimate} userId={userId} managerId={receiver} />
        </>
    );
};

export default Chat;