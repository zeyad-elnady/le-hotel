"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Preloader: FC = () => {
  const { language } = useLanguage();
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => {
      setActive(false);
    }, 500);

    // cleanup
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <>
      {active ? (
        <div className='loading-screen' id='loading-screen'>
          <span className='bar top-bar' />
          <span className='bar down-bar' />
          <div className='animation-preloader'>
            <div className='position-relative z-1'>
              <div className='loader-border' />
            </div>
            <div className='txt-loading tw-mt-10'>
              <span data-text-preloader='l' className='letters-loading'>
                l
              </span>
              <span data-text-preloader='e' className='letters-loading'>
                e
              </span>
              <span data-text-preloader=' ' className='letters-loading' style={{ width: "10px", display: "inline-block" }}>
                &nbsp;
              </span>
              <span data-text-preloader='h' className='letters-loading'>
                h
              </span>
              <span data-text-preloader='o' className='letters-loading'>
                o
              </span>
              <span data-text-preloader='t' className='letters-loading'>
                t
              </span>
              <span data-text-preloader='e' className='letters-loading'>
                e
              </span>
              <span data-text-preloader='l' className='letters-loading'>
                l
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Preloader;
