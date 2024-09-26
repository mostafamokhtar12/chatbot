import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import style from './Home.module.css'

export default function Home() {

    let [messageButton, setMessageButton] = useState(false);

    let [userMessage, setUserMessage] = useState('Hello');

    let [messagesList, setMessagesList] = useState([]);


    const API_KEY = "AIzaSyC1qACtzbf1q5Enucd92Dq7O9k6OQYmjrY"



    async function generateResponse(Message) {


        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = Message;

        const result = await model.generateContent(prompt);



        console.log(result.response.text());
        return result.response.text()
    }


    return <>



        <div className={`d-flex flex-wrap justify-content-center`}>

            <div className={`${style.myDiv} chatbot rounded-3 border-4 w-75 overflow-y-scroll`}>

                <h2 className='bg-dark text-white text-center p-2 mb-3 rounded-top-3'>CHATBOT</h2>

                <ul className='chatbox p-0'>



                    <li className='chat incoming list-unstyled d-flex align-items-center'>
                        <i className="fa-solid fa-robot"></i>
                        <p className='p-2 bg-light text-dark rounded-2 w-50'>Hello there, How can i help you?</p>
                    </li>


                    {messagesList}

                </ul>





            </div>








        </div >

        <div className="w-75 mx-auto d-flex justify-content-center rounded-3">

            <div className="chat-input w-75 d-flex justify-content-center align-items-end">

                <textarea className='form-control border-3' placeholder='Enter your message.....' onInput={(e) => {

                    let m = e.target.value
                    e.target.value !== '' ? setMessageButton(true) : setMessageButton(false);

                    m !== '' ? setUserMessage(m) : setUserMessage('');


                }
                }></textarea>



                {messageButton ? <div className=' btn btn-sm btn-success mx-1' onClick={

                    async () => {

                        
                        let newarr = [...messagesList, <li className='chat outgoing d-flex justify-content-end list-unstyled'>
                            <p className=' p-2 bg-black text-white rounded-2 w-50'>{userMessage}</p>
                        </li>]

                        setMessagesList(newarr)

                        let m = await generateResponse(userMessage);
                        newarr = [...messagesList, <li className='chat outgoing d-flex justify-content-end list-unstyled'>
                            <p className=' p-2 bg-black text-white rounded-2 w-50'>{userMessage}</p>
                        </li>, <li className='chat incoming list-unstyled d-flex align-items-center'>
                            <i className="fa-solid fa-robot"></i>
                            <p className='p-2 bg-light text-dark rounded-2 w-50'>{m}</p>
                        </li>]

                        setMessagesList(newarr)

                    }
                } >
                    <i className=" fa-solid fa-chevron-right mx-1"></i>
                </div> : ''}


            </div>

        </div>

    </>
}
