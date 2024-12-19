import OrderVoiceButton from "../components/chatbot/OrderVoiceButton.tsx";

import {useNavigate} from "react-router-dom";



export const Footer = ()=>{
   const navigate = useNavigate();
    return (
     <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-20">
         <button
             className="flex flex-col items-center justify-center w-1/3 text-xl text-gray-600 hover:text-blue-500 focus:outline-none"
             onClick={() => navigate(`/points`)} // 포인트 페이지로 이동
         >
             <svg
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 fill="currentColor"
                 className="w-10 h-10"
             >
                 <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
                 <path
                     fillRule="evenodd"
                     d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                     clipRule="evenodd"
                 />
             </svg>
             포인트
         </button>

         {/* OrderVoiceButton 컴포넌트 사용 */}
         <OrderVoiceButton/>

         <button
             className="flex flex-col items-center w-1/3 justify-center py-2 text-xl text-gray-600 hover:text-blue-500 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-10 h-10 mb-1">
                 <path strokeLinecap="round" strokeLinejoin="round"
                       d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.0 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
             </svg>
             장바구니
         </button>
     </div>
    );

}

export default Footer;