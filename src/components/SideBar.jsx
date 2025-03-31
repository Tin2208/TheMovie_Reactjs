import React from "react";
import { MdNavigateNext, MdKeyboardArrowDown } from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { TbCalendarEvent } from "react-icons/tb";
import "react-circular-progressbar/dist/styles.css";
import arrowDown from "../assets/Icons/arrowDown.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef, useEffect } from "react";

const Soft = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Popularity Descending");
  const dropdownRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(new Date(2025, 9, 26));
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const calendarRef = useRef(null);
  const [language, setLanguage] = useState("None Selected");
  const [languageSortOpen, setLanguageSortOpen] = useState(false);
  const languageRef = useRef(null);

  const handleSortChange = (value) => {
    setSelectedOption(value);
    setIsDropdownOpen(false);
  };

  const languageSortChange = (value) => {
    setLanguage(value);
    setLanguageSortOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = (date) => {
    if (activeField === "from") {
      setFromDate(date);
    } else if (activeField === "to") {
      setToDate(date);
    }
    setShowCalendar(false);
  };

  const genres = [
    "Chương trình truyền hình",
    "Phim Bí Ẩn",
    "Phim Chiến Tranh",
    "Phim Chính Kịch",
    "Phim Gia Đình",
    "Phim Giả Tưởng",
    "Phim Gân Cấn",
    "Phim Hoạt Hình",
    "Phim Hài",
    "Phim Hành Động",
    "Phim Hình Sự",
    "Phim Khoa Học Viễn Tưởng",
    "Phim Kinh Dị",
    "Phim Lãng Mạn",
    "Phim Lịch Sử",
    "Phim Miền Tây",
    "Phim Nhạc",
    "Phim Phiêu Lưu",
    "Phim Tài Liệu",
  ];

  return (
    <div>
      <div className="sidebar w-[260px]">
        <div className="filters">
          <div className="shadow-md shadow-black/10 max-w-[260px] mb-3 border border-[#e3e3e3] rounded-[8px] text-[1.1em] cursor-pointer">
            <div
              className="p-[14px] px-[16px] font-bold flex justify-between items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <h2>Sort</h2>
              <span>
                {isOpen ? (
                  <MdKeyboardArrowDown size={24} />
                ) : (
                  <MdNavigateNext size={24} />
                )}
              </span>
            </div>
            {isOpen && (
              <div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="p-[14px] px-[16px]">
                  <h3>Sort Results By</h3>
                  <div
                    className="bg-[#dee2e6] hover:bg-[#ced4da] rounded flex items-center justify-between cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-[#212529] px-3 py-1.5">
                      {selectedOption}
                    </span>
                    <span className="font-bold p-1.5">
                      <MdKeyboardArrowDown size={24} />
                    </span>
                  </div>
                  <div className="relative" ref={dropdownRef}>
                    {isDropdownOpen && (
                      <div className="mt-2 border border-[#e3e3e3] rounded py-1 bg-white shadow-md absolute top-0 left-0 w-full max-h-[200px] overflow-y-auto z-10">
                        {[
                          "Popularity Descending",
                          "Popularity Ascending",
                          "Rating Descending",
                          "Rating Ascending",
                          "Release Date Descending",
                          "Release Date Ascending",
                          "Title (A-Z)",
                          "Title (Z-A)",
                        ].map((option) => (
                          <div
                            key={option}
                            className={`p-2 hover:bg-[#f1f3f5] cursor-pointer ${
                              selectedOption === option
                                ? "bg-[#01b4e4] text-white"
                                : ""
                            }`}
                            onClick={() => handleSortChange(option)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="shadow-md shadow-black/10 max-w-[260px] border border-[#e3e3e3] rounded-[8px]">
            <div className="p-[14px] px-[16px]">
              <div
                className="text-[1.1em] font-bold justify-between items-center flex cursor-pointer"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <h2>Filters</h2>
                <span className="font-bold">
                  {isFilterOpen ? (
                    <MdKeyboardArrowDown size={24} />
                  ) : (
                    <MdNavigateNext size={24} />
                  )}
                </span>
              </div>
            </div>
            {isFilterOpen && (
              <div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="p-[14px] px-[16px]">
                  <div className="flex items-center mb-[10px]">
                    <h3 className="text-[1em] font-light">Show Me</h3>
                    <BsQuestionCircleFill
                      className="text-gray-600 text-xl ml-[6px]"
                      size={16}
                    />
                  </div>
                  <div className="flex flex-col text-4">
                    {[
                      "Everything",
                      "Movies I Haven't Seen",
                      "Movies I Have Seen",
                    ].map((filter) => (
                      <label key={filter}>
                        <input
                          className="cursor-pointer"
                          type="radio"
                          name="filter"
                          value={filter.toLowerCase().replace(/\s/g, "-")}
                          defaultChecked={filter === "Everything"}
                        />
                        <span className="ml-1 cursor-pointer">{filter}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light">Release Dates</h3>
                  <div className="flex items-center">
                    <input className="cursor-pointer" type="checkbox" />
                    <span className="ml-1 cursor-pointer">
                      Search all releases?
                    </span>
                  </div>
                  <div>
                    {["from", "to"].map((field) => (
                      <div
                        key={field}
                        className="flex items-center justify-between mt-[8px] relative"
                      >
                        <span>{field}</span>
                        <div
                          className="border w-[70%] border-[#21252933] flex items-center justify-between rounded-[6px]"
                          ref={field === "from" ? calendarRef : null}
                        >
                          <span className="py-[6px] px-[12px] text-[#a4a4a4]">
                            {field === "from"
                              ? fromDate?.toLocaleDateString() || ""
                              : toDate?.toLocaleDateString() || ""}
                          </span>
                          <button
                            className="p-[10px] hover:bg-[#ced4da] cursor-pointer bg-[#dee2e6]"
                            onClick={() => {
                              setShowCalendar(!showCalendar);
                              setActiveField(field);
                            }}
                          >
                            <TbCalendarEvent />
                          </button>
                          {showCalendar && activeField === field && (
                            <div className="absolute top-12 left-0 z-10 bg-white shadow-lg rounded-lg">
                              <Calendar
                                onChange={handleDateChange}
                                value={field === "from" ? fromDate : toDate}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h4 className="text-[1em] font-light mb-2.5">Genres</h4>
                  <ul className="flex flex-wrap gap-2">
                    {genres.map((genre, index) => (
                      <li
                        key={index}
                        className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max hover:text-white hover:bg-[#01b4e4] hover:border-[#01b4e4] cursor-pointer"
                      >
                        <a href="#">{genre}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light">Certification</h3>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <div className="flex items-center mb-[10px]">
                    <h3 className="text-[1em] font-light">Language</h3>
                    <BsQuestionCircleFill
                      className="text-gray-600 text-xl ml-[6px]"
                      size={16}
                    />
                  </div>
                  <div className="relative" ref={languageRef}>
                    <div
                      className="flex items-center justify-between bg-[#dee2e6] hover:bg-[#ced4da] cursor-pointer rounded-[8px]"
                      onClick={() => setLanguageSortOpen(!languageSortOpen)}
                    >
                      <span className="py-[6px] px-[12px]">{language}</span>
                      <button className="p-[6px] cursor-pointer">
                        <img className="w-6" src={arrowDown} alt="" />
                      </button>
                    </div>
                    {languageSortOpen && (
                      <div className="mt-2 border border-[#e3e3e3] rounded py-1 bg-white shadow-md absolute z-10 max-h-[200px] overflow-y-auto w-full">
                        {[
                          "None Selected",
                          "Tiếng Anh",
                          "Tiếng Pháp",
                          "Tiếng Tây Ban Nhà kiểu Cax-ti-le",
                          "Tiếng Đức",
                          "Tiếng Nhật",
                          "Tiếng Bồ Đào Nha",
                          "Tiếng Trung Quốc",
                          "Tiếng Ý",
                          "Tiếng Nga",
                          "Tiếng Hàn",
                          "Tiếng Séc",
                          "Tiếng A Rập",
                          "Tiếng Hoà Lan; Tiếng Ph-le-mi",
                          "Tiếng Thuỵ Điển",
                          "Tiếng Hin-đi",
                          "Tiếng Thổ Nhĩ Kỳ",
                          "Tiếng Ba Lan",
                          "Tiếng Ta-ga-lọc",
                        ].map((lang) => (
                          <div
                            key={lang}
                            className={`p-2 hover:bg-[#f1f3f5] cursor-pointer ${
                              language === lang ? "bg-[#01b4e4] text-white" : ""
                            }`}
                            onClick={() => languageSortChange(lang)}
                          >
                            {lang}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                {/* <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light mb-2.5">User Score</h3>
                  <div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="h-2 relative flex items-center">
                      <div className="bg-[#01b3e4] h-1 w-full transition-all duration-200 ease-in-out"></div>
                      <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -left-[6px] hover:bg-black shadow-[0_0_0_3px_rgba(1,179,228,0.5)] cursor-pointer"></div>
                      <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -right-[6px] hover:bg-black"></div>
                    </div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="flex justify-between">
                      <span className="relative -left-[3px] text-[#b7b7b7]">
                        0
                      </span>
                      <span className="relative -right-[4px] text-[#b7b7b7]">
                        5
                      </span>
                      <span className="relative -right-[4px] text-[#b7b7b7]">
                        10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light mb-2.5">
                    Minimum User Votes
                  </h3>
                  <div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="h-2 relative flex items-center">
                      <div className="bg-[#01b3e4] h-1 w-full"></div>
                      <div className="w-[14px] h-[14px] bg-[#01b3e4] hover:bg-black rounded-full absolute -left-[6px]"></div>
                    </div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="flex justify-between">
                      <span className="relative -left-[3px] text-[#b7b7b7]">
                        0
                      </span>
                      <span className="relative -right-[4px] text-[#b7b7b7]">
                        100
                      </span>
                      <span className="relative -right-[6px] text-[#b7b7b7]">
                        200
                      </span>
                      <span className="relative -right-[8px] text-[#b7b7b7]">
                        300
                      </span>
                      <span className="relative -right-[8px] text-[#b7b7b7]">
                        400
                      </span>
                      <span className="relative -right-[10px] text-[#b7b7b7]">
                        500
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light mb-2.5">Runtime</h3>
                  <div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="h-2 relative flex items-center">
                      <div className="bg-[#01b3e4] h-1 w-full"></div>
                      <div className="w-[14px] h-[14px] bg-[#01b3e4] hover:bg-black rounded-full absolute -left-[6px]"></div>
                      <div className="w-[14px] h-[14px] bg-[#01b3e4] hover:bg-black rounded-full absolute -right-[6px]"></div>
                    </div>
                    <ul className="flex justify-between items-center">
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-1"></li>
                      <li className="border-l-2 border-gray-400 h-2"></li>
                    </ul>
                    <div className="flex justify-between">
                      <span className="relative -left-[3px] text-[#b7b7b7]">
                        0
                      </span>
                      <span className="relative -right-[6px] text-[#b7b7b7]">
                        120
                      </span>
                      <span className="relative -right-[8px] text-[#b7b7b7]">
                        240
                      </span>
                      <span className="relative -right-[10px] text-[#b7b7b7]">
                        360
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                <div className="pt-[14px] px-[16px] pb-[16px]">
                  <h3 className="text-[1em] font-light mb-2.5">Keywords</h3>
                  <input
                    type="text"
                    placeholder="Filter by Keywords..."
                    className="border border-[#9e9e9e] rounded-[8px] py-1.5 px-3 w-full placeholder-black"
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <p className="w-full mt-5 flex justify-center items-center rounded-[20px] h-[44px] bg-[#01b4e4] text-[1.2em] text-white font-semibold">
              SEARCH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soft;
