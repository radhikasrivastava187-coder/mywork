/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, MapPin, Wind, Droplets, Thermometer, Sun, Cloudy, CloudRain, CloudLightning, Snowflake, ArrowLeft, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useMemo } from "react";
import { WeatherIcon } from "./components/WeatherIcon";
import { MOCK_WEATHER, WeatherData } from "./data/mockWeather";

type Unit = "C" | "F";

export default function App() {
  const [selectedCity, setSelectedCity] = useState<WeatherData>(MOCK_WEATHER["Mumbai"]);
  const [unit, setUnit] = useState<Unit>("C");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Background gradient based on weather condition
  const bgGradient = useMemo(() => {
    switch (selectedCity.condition) {
      case "sunny": return "from-blue-400 via-blue-600 to-indigo-800";
      case "cloudy": return "from-gray-400 via-gray-600 to-slate-800";
      case "rainy": return "from-blue-600 via-indigo-800 to-slate-900";
      case "stormy": return "from-indigo-900 via-purple-900 to-black";
      case "snowy": return "from-blue-100 via-blue-300 to-indigo-400";
      default: return "from-blue-500 to-indigo-700";
    }
  }, [selectedCity.condition]);

  const convertTemp = (temp: number) => {
    if (unit === "F") return Math.round((temp * 9) / 5 + 32);
    return temp;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = Object.keys(MOCK_WEATHER).find(
      (k) => k.toLowerCase() === searchQuery.toLowerCase()
    );

    if (city) {
      setSelectedCity(MOCK_WEATHER[city]);
      setError(null);
      setSearchQuery("");
      setIsSearching(false);
    } else {
      setError("City not found. Try Mumbai, Delhi, London, or Paris.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const quickCities = ["Mumbai", "Delhi", "Lucknow", "Panaji", "Dehradun", "London", "Paris"];

  return (
    <div className="mesh-background flex items-center justify-center p-4">
      {/* Animated Mesh Background elements from the theme */}
      <div className="mesh-orb w-96 h-96 bg-blue-500 -top-20 -left-20" />
      <div className="mesh-orb w-96 h-96 bg-purple-600 -bottom-20 -right-20" />
      <div className="mesh-orb w-80 h-80 bg-indigo-400 top-1/2 left-1/2 blur-[120px] opacity-10" />

      <main className="relative w-full max-w-md h-[850px] max-h-[95vh] frosted-container flex flex-col overflow-hidden">
        {/* Header / Search */}
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSearching(!isSearching)}
              className="p-3 frosted-button rounded-2xl"
            >
              {isSearching ? <X size={20} /> : <Search size={20} />}
            </motion.button>

            <div className="flex flex-col items-center">
              <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                {selectedCity.city}, {selectedCity.country === "India" ? "IN" : selectedCity.country === "United Kingdom" ? "UK" : "FR"}
              </h1>
              <p className="text-[10px] text-white/50 font-semibold tracking-widest uppercase mt-0.5">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="px-4 py-2 frosted-button rounded-xl font-display font-bold text-sm h-12 flex items-center justify-center"
            >
              °{unit}
            </motion.button>
          </div>

          <AnimatePresence>
            {isSearching && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleSearch}
                className="mt-6 overflow-hidden"
              >
                <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/5">
                  <Search size={18} className="text-white/40" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city e.g. London..."
                    className="bg-transparent text-white placeholder-white/30 border-none outline-none text-sm w-full"
                  />
                  {searchQuery && (
                    <X size={16} className="text-white/40 cursor-pointer" onClick={() => setSearchQuery("")} />
                  )}
                </div>
                
                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-300 text-[10px] mt-2 px-2 uppercase tracking-wide">
                    {error}
                  </motion.p>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {quickCities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(MOCK_WEATHER[city]);
                        setIsSearching(false);
                      }}
                      className="text-[9px] uppercase font-bold tracking-widest bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/5 transition-all"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Main Weather Display */}
        <div className="flex-1 flex flex-col items-center px-8 overflow-y-auto no-scrollbar pb-10">
          <motion.div
            key={selectedCity.city}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center mt-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <WeatherIcon condition={selectedCity.condition} size={140} className="mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-[120px] font-thin text-white leading-none tracking-tighter flex">
                <span>{convertTemp(selectedCity.temp)}</span>
                <span className="text-6xl font-light mt-6 ml-1 opacity-50">°</span>
              </div>
              <p className="text-2xl text-white/80 font-light tracking-wide uppercase mt-4">
                {selectedCity.description}
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-12 mb-10">
            <StatCard label="Humidity" value={`${selectedCity.humidity}%`} />
            <StatCard label="Wind" value={`${selectedCity.windSpeed} km/h`} />
            <StatCard label="UV Index" value={`${selectedCity.uvIndex} High`} />
            <StatCard label="Feels Like" value={`${convertTemp(selectedCity.feelsLike)}°`} />
          </div>

          {/* Hourly Forecast */}
          <div className="w-full mt-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-sm font-semibold tracking-wide">24-Hour Forecast</h3>
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest leading-none">1h intervals</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {selectedCity.hourly.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`min-w-[76px] p-5 flex flex-col items-center gap-3 transition-colors ${i === 0 ? 'frosted-card-active' : 'frosted-card'}`}
                >
                  <span className="text-[11px] font-medium text-white/50">{h.time}</span>
                  <WeatherIcon condition={h.condition} size={24} />
                  <span className="text-white font-bold">{convertTemp(h.temp)}°</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Drag Handle (Aesthetic) */}
        <div className="p-6 pt-0 mt-auto flex justify-center">
          <div className="h-1.5 w-16 bg-white/10 rounded-full" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="frosted-card p-5 border-white/5 flex flex-col gap-1">
      <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{label}</span>
      <span className="text-white text-xl font-display font-medium">{value}</span>
    </div>
  );
}
