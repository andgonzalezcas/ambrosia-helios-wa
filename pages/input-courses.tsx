import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react"

//components
import SelectAcademicHistory from "../components/inputGrades/SelectAcademicHistory";
import MainGrades from "../components/inputGrades/MainGrades";
import SecundaryGrades from "../components/inputGrades/SecundaryGrades";
import { Button } from "@material-tailwind/react";

//icons
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

const data = [
  { carrer: 'Ingenieria de sistemas y computacion' },
  { carrer: 'Diseño grafico' }
]

const InputGrades = () => {
  const [available, setAvailable] = useState<Boolean>(true)
  const [[page, direction], setPage] = useState([0, 0]);
  const [historySelected, setHistorySelected] = useState(0)

  //page content array
  const pages = [
    <SelectAcademicHistory data={data} historySelected={historySelected} setHistorySelected={setHistorySelected} key={1} />,
    <MainGrades key={2} />,
    <SecundaryGrades key={3} />
  ]

  //Variants from the animation div
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  // Function that give us a direction transfer
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  //index wrapper
  const pageIndex = wrap(0, pages.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="w-full h-full md:h-screen">
      {
        available
          ? (
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-5 gap-20 h-full w-full p-10">
              {
                pageIndex === 0
                  ? <div></div>
                  : <Button className="flex justify-center mt-20 items-center h-14" onClick={() => paginate(-1)} color='lime'>
                    <GrFormPreviousLink size={30} />
                    <p className="text-sm">pagina anterior</p>
                  </Button>
              }
              <div className="hidden md:block"></div>
              {
                pageIndex === pages.length - 1
                  ? <div></div>
                  : <Button className="flex justify-center mt-20 items-center h-14" onClick={() => paginate(1)} color='lime'>
                    <p className="text-sm">pagina siguiente</p>
                    <GrFormNextLink size={30} />
                  </Button>
              }
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className='w-full h-full col-span-2 md:col-span-3 row-span-4 bg-dark-sesqui bg-opacity-80 rounded-lg p-4'
                >
                  {pages[pageIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full h-screen">

            </div>
          )
      }

    </div>
  )
}

export default InputGrades