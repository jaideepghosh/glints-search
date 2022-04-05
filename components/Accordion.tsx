import { useRef, useState } from "react";

const ChevronOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

type AccordionProps = {
    title: string
    children: React.ReactNode
}

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpened, setOpened] = useState<boolean>(false);
    const [height, setHeight] = useState<string>("0px");
    const contentElement = useRef<any>(null);
    const HandleOpening = () => {
      setOpened(!isOpened)
      setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px")
    }
    return (
        <div className="border border-gray-400 mb-2">
          <div className={"bg-gray-200 p-4 flex justify-between"}  onClick={HandleOpening}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg> */}
            <h4 className="font-semibold">{title}</h4>
            {isOpened ? <ChevronOpen /> : <ChevronClosed />}
          </div>
          <div
            ref={contentElement}
            style={{ height: height }}
            className="bg-white overflow-hidden transition-all duration-200"
          >
            {children}
          </div>
        </div>
    );
}