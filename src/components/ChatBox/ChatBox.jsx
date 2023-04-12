import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import userAxios from "../../utils/userAxios";
import managerAxios from "../../utils/managerAxios";
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, type, addEstimate, showEstimate, setReceiver }) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [showMenu, setShowMenu] = useState(false);
    const [image, setImage] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const scroll = useRef();
    const imageRef = useRef();
    const videoRef = useRef();
    const pdfRef = useRef();

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    setReceiver(chat?.members.find((id) => id !== currentUser))

    // fetching data for header
    useEffect(() => {
        const user = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
            if (type == "manager") {
                try {
                    const { data } = await managerAxios.get(`/provider/chatUsers/${user}`);
                    setUserData(data);
                } catch (error) {
                    alert("No chat are available")
                }
            } else {
                try {
                    const { data } = await userAxios.get(`/chatManagers/${user}`);
                    setUserData(data);
                } catch (error) {
                    alert("No chat are available")
                }
            }
        };

        if (chat !== null) getUserData();
    }, [chat, currentUser]);



    // fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (type == "manager") {
                    const { data } = await managerAxios.get(`/message/${chat._id}`);
                    setMessages(data);
                } else {
                    const { data } = await userAxios.get(`/message/${chat._id}`);
                    setMessages(data);
                }
            } catch (error) {
                alert("network problem")
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);


    // Always scroll to last Message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
        setShowMenu(false)
        setImage(null)
        setVideoFile(null)
    }, [messages])



    // Send Message
    const handleSend = async (e) => {
        // e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
            type: "text",
        }
        const receiverId = chat.members.find((id) => id !== currentUser);
        setSendMessage({ ...message, receiverId })

        try {
            if (type == "manager") {
                const { data } = await managerAxios.post('/message/', message);
                setMessages([...messages, data]);
                setNewMessage("");
            } else {
                const { data } = await userAxios.post('/message/', message);
                setMessages([...messages, data]);
                setNewMessage("");
            }

        }
        catch
        {
            alert("NETWORK PROBLEM!!!!!!!!!!!!!")
        }
    }
    // upload pdf,image and video...........
    const UploadFile = async () => {
        if (videoFile === null && image === null && pdfFile === null) {
            return;
        }
        setLoading(true);
        const ChatType = !image ? !videoFile ? "raw" : "video" : "image";
        const file = !image ? !videoFile ? pdfFile : videoFile : image;
        if (file.size > 7000000) {
            toast.info("🥵 Seems like big file, take some time", toastConfig)
        }
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dnh79zoop/${ChatType}/upload`;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "EventManagement");
        data.append("cloud_name", "dnh79zoop");
        try {
            const res = await fetch(cloudinaryUrl, {
                method: "post",
                body: data,
            });
            const json = await res.json();
            const url = json.url;

            const message = {
                senderId: currentUser,
                text: url,
                chatId: chat._id,
                type: ChatType,
            };
            //Sending file to socket server
            const receiverId = chat.members.find((id) => id !== currentUser);
            setSendMessage({ ...message, receiverId });
            //Sending to the database

            try {

                if (type == "manager") {
                    const { data } = await managerAxios.post('/message/', message);
                    setMessages([...messages, data]);
                    setNewMessage("");
                    setLoading(false)
                    setVideoFile(null);
                    setImage(null);
                    setPdfFile(null);
                } else {
                    const { data } = await userAxios.post('/message/', message);
                    setMessages([...messages, data]);
                    setNewMessage("");
                    setLoading(false)
                    setVideoFile(null);
                    setImage(null);
                    setPdfFile(null);
                }

            }
            catch
            {
                alert("NETWORK PROBLEM!!!!!!!!!!!!!")
            }


        } catch (err) {
            toast.error("Oops, uploading failed", toastConfig);
        }
    };


    // Receive Message from parent component
    useEffect(() => {
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])




    return (
        <>
            <div className="ChatBox-container bg-white">
                {chat ? (
                    <>
                        {/* chat-header */}
                        <div className="chat-header">
                            <div className="follower">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={

                                                userData?.profilePhoto ? userData.profilePhoto : "img-scelton.png"
                                            }
                                            alt="Profile"
                                            className="rounded-full "

                                            style={{ width: "50px", height: "50px" }}
                                        />
                                        <div className="name ml-6" style={{ fontSize: "0.9rem" }}>
                                            <span className="text-2xl font-extrabold">
                                                {userData?.companyname ? userData?.companyname : userData?.email}
                                            </span>
                                        </div>
                                    </div>
                                    {type === "manager" ? <button onClick={() => addEstimate(true)} className="bg-black p-2 rounded-xl text-white font-semibold hover:scale-105 mr-20">Create Estimate</button> : <button onClick={() => showEstimate(true)} className="bg-black p-2 rounded-xl text-white font-semibold hover:scale-105 mr-20">Estimate</button>}
                                </div>
                            </div>
                            <hr
                                style={{
                                    width: "95%",
                                    border: "0.1px solid #ececec",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                        {/* chat-body */}
                        <div className="chat-body no-scrollbar" >
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll}
                                        className={
                                            message.senderId === currentUser
                                                ? "message own"
                                                : "message"
                                        }
                                    >
                                        {message.type === "text" && <span>{message.text ? message.text : ""}</span>}
                                        {message.type === "raw" && <p><a href={message.text} target="_blank"><BsFileEarmarkPdfFill className="text-9xl text-black" /></a></p>}
                                        {message.type === "image" && <img src={message.text} width={400}></img>}
                                        {message.type === "video" && <video src={message.text} controls className="h-96"></video>}
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        {/* chat-sender */}
                        < div className="chat-sender" >
                            <div className="relative" onClick={() => { setShowMenu(!showMenu); }}>+</div>
                            {showMenu && (
                                <div className="bg-black bg-opacity-70 rounded-2xl flex flex-col bottom-28" style={{ height: 'max-content', position: 'absolute', marginTop: '-12em', marginLeft: '-0.5em' }}>
                                    <div className="flex">
                                        <div className="flex" onClick={() => imageRef.current.click()} style={{ padding: '5px', borderRadius: '50%', marginBottom: '0.7em' }}>
                                            <BiImageAdd className="cursor-pointer" style={{ fontSize: '2em', color: 'white' }} />
                                            <input disabled={videoFile} onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="file" ref={imageRef} style={{ display: "none" }} accept="image/x-png,image/gif,image/jpeg" />

                                        </div>
                                        <div className="flex" onClick={() => videoRef.current.click()} style={{ padding: '5px', borderRadius: '50%', marginBottom: '0.7em' }}>
                                            <BiVideoPlus className="cursor-pointer" style={{ fontSize: '2em', color: 'white' }} />
                                            <input disabled={image} onChange={(e) => { setVideoFile(e.target.files[0]) }} type="file" id="file" ref={videoRef} style={{ display: "none" }} accept="video/mp4,video/x-m4v,video/*" />

                                        </div>
                                        <div className="flex" onClick={() => pdfRef.current.click()} style={{ padding: '2px', borderRadius: '50%', marginBottom: '0.7em' }}>
                                            <BsFileEarmarkPdfFill className="cursor-pointer" style={{ fontSize: '2em', color: 'white' }} />
                                            <input disabled={image} onChange={(e) => { setPdfFile(e.target.files[0]) }} type="file" id="file" ref={pdfRef} style={{ display: "none" }} accept="application/pdf,application/vnd.ms-excel" />

                                        </div>
                                    </div>
                                    {image != null && <div className="w-16 h-16 bg-cover bg-center" style={{
                                        backgroundImage: `url(${URL.createObjectURL(image)})`,
                                    }}>

                                    </div>}
                                    {videoFile != null && <div className="" >
                                        <video className="w-16" src={`${URL.createObjectURL(videoFile)}`} autoPlay="true" muted loop></video>
                                    </div>}
                                    {pdfFile != null && <div className="flex items-center mb-2" >
                                        <BsFileEarmarkPdfFill style={{ fontSize: '2em', color: 'green' }} /><strong className="text-white">One file selected</strong>
                                    </div>}
                                </div>
                            )}
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}

                            />
                            {loading ?
                                <Button className=' rounded-3xl h-12 w-24 text-2xl font-bold mt-6 p-4 uppercase' height={8} rounded={16} isLoading colorScheme='green' spinner={<BeatLoader size={10} color='white' />}>Click me</Button>
                                : < button className="cursor-pointer border-2 border-black rounded-md w-28 h-10 bg-green-400" onClick={() => { newMessage !== '' ? handleSend() : UploadFile() }}>Send</button>}

                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">
                        Tap on a chat to start conversation...
                    </span>
                )}
            </div>
        </>
    );
};

export default ChatBox;