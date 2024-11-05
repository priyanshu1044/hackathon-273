import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <div className="w-11/12 mx-auto my-0">
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center min-h-screen">
        <div className="py-4 px-4 sm:px-6 lg:px-8 w-full lg:w-6/12 flex flex-col justify-center">
          <h8 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-9xl tracking-tight font-extrabold text-gray-900">
            YOUR <span style={{ color: '#D5B85A' }}>AI</span> HELPER
          </h8>
          <p className="mt-4 lg:mt-6 text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-normal sm:leading-relaxed lg:leading-loose">
            <span className="font-bold">
              273 Project
            </span>
            - Please click on
            <br/>
            <span>
            CHAT-PDF 😎
            </span>
            
          </p>
        </div>
        <div className="w-full lg:w-6/12">
          <Gallery />
        </div>
      </div>
    </div>
  );
}