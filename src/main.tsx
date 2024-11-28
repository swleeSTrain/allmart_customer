import { createRoot } from 'react-dom/client'

import './index.css'
import {RouterProvider} from "react-router-dom";
import mainRouter from "./router/mainRouter.tsx";
// import "./firebase/settingFCM.ts";
// import "./firebase/getToken.ts"
// import {handleAllowNotification} from "./firebase/getToken.ts";
createRoot(document.getElementById('root')!).render(


    <RouterProvider router={mainRouter}></RouterProvider>

)

if ('serviceWorker' in navigator) {
    //handleAllowNotification().then(r => console.log(r));
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
