/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sun, Cloud, CloudRain, CloudLightning, Snowflake } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface WeatherIconProps {
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className, size = 48 }) => {
  const iconProps = {
    size,
    className: className || "text-white",
  };

  const getIcon = () => {
    switch (condition) {
      case "sunny":
        return (
          <motion.div
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sun {...iconProps} className={`${iconProps.className} text-yellow-400`} />
          </motion.div>
        );
      case "cloudy":
        return (
          <motion.div
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud {...iconProps} className={`${iconProps.className} text-gray-300`} />
          </motion.div>
        );
      case "rainy":
        return (
          <motion.div
            animate={{ y: [-1, 1, -1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <CloudRain {...iconProps} className={`${iconProps.className} text-blue-400`} />
          </motion.div>
        );
      case "stormy":
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1] 
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <CloudLightning {...iconProps} className={`${iconProps.className} text-purple-400`} />
          </motion.div>
        );
      case "snowy":
        return (
          <motion.div
            animate={{ 
              y: [0, 5, 0],
              x: [0, 2, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Snowflake {...iconProps} className={`${iconProps.className} text-cyan-200`} />
          </motion.div>
        );
      default:
        return <Sun {...iconProps} />;
    }
  };

  return <div className="flex items-center justify-center">{getIcon()}</div>;
};
