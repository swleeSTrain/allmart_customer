import {useNavigate} from "react-router-dom";



function App() {

    const navigate = useNavigate();


  return (
      <div className="min-h-screen flex flex-col bg-gray-100">

          <header className="bg-white shadow-lg flex justify-around items-center h-20  mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                  <path
                      d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z"/>
                  <path fillRule="evenodd"
                        d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z"
                        clipRule="evenodd"/>
              </svg>
              <input type="text" placeholder="Search"
                     className="w-2/3 mx-2 py-2 px-4 border rounded-lg border-gray-300"/>
              <button className="w-fit rounded-s">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                      <path fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clipRule="evenodd"/>
                  </svg>
              </button>
              <input type="checkbox" id="menu-toggle" className="hidden peer"/>
              <label htmlFor="menu-toggle"
                     className="bg-white z-20 p-2 rounded cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                      <path fillRule="evenodd"
                            d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"/>
                  </svg>
              </label>
              <nav
                  className="fixed top-0 left-0 z-10 h-full w-full bg-white transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
                  <ul className="pt-16 px-4">
                      <li className="mb-4"><a href="#"
                                              className="text-center text-4xl block hover:bg-gray-400 rounded">최근 본
                          상품</a></li>
                      <li className="mb-4"><a href="#" className="text-center text-4xl block hover:bg-gray-400 rounded">주문
                          상품</a></li>
                      <li className="mb-4"><a href="#"
                                              className="text-center text-4xl block hover:bg-gray-400 rounded">장바구니</a>
                      </li>
                      <li className="mb-4"><a href="#"
                                              className="text-center text-4xl block hover:bg-gray-400 rounded">회원정보</a>
                      </li>
                      <li className="mb-4"><a href="#"
                                              className="text-center text-4xl block hover:bg-gray-400 rounded">고객센터</a>
                      </li>
                      <li className="mb-4"><a href="#"
                                              className="text-center text-4xl block hover:bg-gray-400 rounded">포인트</a>
                      </li>
                      <button className="w-full h-20 text-5xl bg-blue-300 rounded">로그인</button>
                  </ul>
              </nav>
          </header>
          <div className="flex justify-around bg-gray-300 rounded-full mb-4 shadow-lg">
              <button className="px-4 py-2 text-2xl bg-white rounded-full text-blue-500">식료품</button>
              <button className="px-4 py-2 text-2xl rounded-full text-black hover:bg-white hover:text-blue-400">생필품
              </button>
              <button className="px-4 py-2 text-2xl rounded-full text-black hover:bg-white hover:text-blue-400">의류
              </button>
          </div>

          return (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-20">
              <button
                  className="flex flex-col items-center justify-center w-1/3 text-xl text-gray-600 hover:text-blue-500 focus:outline-none"
                  onClick={() => navigate("/points")} // 포인트 페이지로 이동
              >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-10 h-10"
                  >
                      <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                      <path
                          fillRule="evenodd"
                          d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                          clipRule="evenodd"
                      />
                  </svg>
                  포인트
              </button>
              <button
                  className="relative flex flex-col items-center justify-center w-28 h-28 bg-blue-500 text-white rounded-full shadow-lg transform -translate-y-10 hover:bg-blue-600 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="w-12 h-12 mb-1">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"/>
                  </svg>
                  <span className="text-lg">음성주문</span>
              </button>
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
      </div>

  )
}

export default App
