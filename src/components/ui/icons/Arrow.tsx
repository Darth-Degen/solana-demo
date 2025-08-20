"use client";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  color?: string;
  animate?: boolean;
  animateColor?: string;
  type?: string;
}

const ArrowIcon: FC<Props> = (props: Props) => {
  const {
    color = "#6F7273",
    animateColor = "#E77975",
    animate = false,
    type = "carrot",
  } = props;

  const arrowVariants = {
    start: {
      rotate: 0,
      stroke: color,
      transition: {
        duration: 1,
      },
    },
    end: {
      stroke: animateColor,
      rotate: 180,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <>
      {type === "carrot" ? (
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // {...enterAnimation}
          key="down-arrow"
        >
          <path
            d="M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z"
            fill={color}
          />
        </motion.svg>
      ) : (
        <motion.svg
          width="35"
          height="35"
          viewBox="0 0 89 89"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M22.25 33.375L44.5 55.625L66.75 33.375"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={animate ? "end" : "start"}
            variants={arrowVariants}
          />
        </motion.svg>
      )}
    </>
  );
};

export default ArrowIcon;
