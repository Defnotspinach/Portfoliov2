import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Award,
  Heart,
  Code2,
  Braces,
  GitBranch,
  Database,
  Server,
  Layers,
  Smartphone,
  Github,
  Linkedin,
  Mail,
  Facebook,
} from "lucide-react";

function Content({ isDarkMode }) {
  const [isThesisHovered, setIsThesisHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [educationTab, setEducationTab] = useState("education");
  const [setIsSeminarTab] = useState(false);
  const [setIsEducationTab] = useState(true);

  const handleSetEducationTab = (tab) => {
    setEducationTab(tab);
    setIsEducationTab(tab === "education");
    setIsSeminarTab(tab === "seminar");
  };
  // Initialize EmailJS
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error(
        "EmailJS public key not found. Please check your .env file.",
      );
    }
    emailjs.init(publicKey);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isThesisHovered) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isThesisHovered]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "marcaedrian67@gmail.com",
        },
      );

      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: "React", desc: "Modern UI library", icon: Code2 },
    { name: "JavaScript", desc: "Dynamic programming", icon: Braces },
    { name: "Git", desc: "Version control", icon: GitBranch },
    { name: "MongoDB", desc: "NoSQL database", icon: Database },
    { name: "Node.js", desc: "Server-side JS", icon: Server },
    { name: "Express.js", desc: "Web framework", icon: Layers },
    { name: "Expo", desc: "React Native framework", icon: Smartphone },
    { name: "Next.js", desc: "React framework", icon: Code2 },
  ];

  return (
    <motion.div
      className="flex flex-col gap-12 sm:gap-16 w-full justify-center"
      initial={false}
      animate={{
        color: isDarkMode ? "#ddd" : "#555",
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {isThesisHovered && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 60,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-24 h-24 object-contain drop-shadow-lg"
          />
        </motion.div>
      )}
      <section id="about" className="animate-fadeIn">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-5 ${isDarkMode ? "text-white border-[#444]" : "text-[#1a1a1a] border-[#f0f0f0]"} pb-3 border-b-2`}
        >
          About Me
        </h2>

        <div
          className={`text-sm leading-relaxed ${isDarkMode ? "text-[#bbb]" : "text-[#555]"} space-y-2`}
        >
          <p>
            <strong>BS Information Technology (Full-Stack)</strong>
          </p>
          <p>Saint Mary's University, Bayombong</p>

          <p
            className={`p-4 border-l-4 border-[#999] rounded my-4 cursor-pointer ${isDarkMode ? "bg-[#2a2a2a] text-[#bbb]" : "bg-[#f5f5f3] text-inherit"}`}
            onMouseEnter={() => setIsThesisHovered(true)}
            onMouseLeave={() => setIsThesisHovered(false)}
          >
            <strong>Thesis:</strong> BantayBakir – QR-Based Tree Tagging GIS for
            DENR
          </p>

          <p>
            Passionate about web applications, mobile development, and system
            architecture. I focus on creating scalable, user-friendly solutions
            using modern technologies and best practices.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills" className="w-full py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <div
                  key={skill.name}
                  className={`
                    group
                    rounded-2xl
                    border
                    px-6 py-8
                    text-center
                    transition-all
                    hover:-translate-y-1
                    ${
                      isDarkMode
                        ? "bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border-[#444] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),_0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),_0_20px_40px_rgba(0,0,0,0.5)]"
                        : "bg-gradient-to-br from-[#ffffff] to-[#f2f2f2] border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),_0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),_0_20px_40px_rgba(0,0,0,0.1)]"
                    }
                  `}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.8}
                    className={`mx-auto mb-3 transition-colors ${isDarkMode ? "text-[#aaa] group-hover:text-[#fff]" : "text-[#555] group-hover:text-[#111]"}`}
                  />

                  <h3
                    className={`font-semibold ${isDarkMode ? "text-white" : "text-[#222]"}`}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${isDarkMode ? "text-[#999]" : "text-[#777]"}`}
                  >
                    {skill.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education/seminar" className="animate-fadeIn">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <motion.h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-semibold pb-3 border-b-2 flex items-center justify-center ${
              isDarkMode
                ? "text-white border-[#444]"
                : "text-[#1a1a1a] border-[#f0f0f0]"
            }`}
            animate={{ color: isDarkMode ? "#fff" : "#1a1a1a" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >

            {educationTab === "education" ? "Education" : "Seminar"}

          </motion.h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEducationTab("education")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                educationTab === "education"
                  ? isDarkMode
                    ? "bg-white text-[#1a1a1a] border-white"
                    : "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : isDarkMode
                    ? "text-[#bbb] border-[#444] hover:text-white"
                    : "text-[#666] border-[#ddd] hover:text-[#1a1a1a]"
              }`}
            >
              EDUCATION
            </button>
            <button
              type="button"
              onClick={() => setEducationTab("seminar")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                educationTab === "seminar"
                  ? isDarkMode
                    ? "bg-white text-[#1a1a1a] border-white"
                    : "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : isDarkMode
                    ? "text-[#bbb] border-[#444] hover:text-white"
                    : "text-[#666] border-[#ddd] hover:text-[#1a1a1a]"
              }`}
            >
              SEMINAR
            </button>
          </div>
        </div>

                 
        <AnimatePresence mode="wait">
          {educationTab === "education" ? (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative max-w-5xl mx-auto"
            >
              {/* Center line */}
              <div
                className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${
                  isDarkMode ? "bg-[#444]" : "bg-[#e0e0e0]"
                }`}
              />

              {/* Item 1 - Left */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="lg:w-1/2 lg:pr-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Saint Mary's University
                      </h3>
                      <span className="text-xs text-[#999]">2022 – Present</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Bachelor of Science in Information Technology
                    </p>
                    <p className="text-xs mt-2 text-[#888]">Cauayan City</p>
                  </div>
                </div>

                {/* Dot */}
                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Item 2 - Right */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row-reverse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="lg:w-1/2 lg:pl-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Cauayan City National High School
                      </h3>
                      <span className="text-xs text-[#999]">2020 – 2022</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Senior High
                    </p>
                    <p className="text-xs mt-2 text-[#888]">Cauayan City</p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Item 3 - Left */}
              <motion.div
                className="relative flex flex-col lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="lg:w-1/2 lg:pr-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Cauayan City National High School
                      </h3>
                      <span className="text-xs text-[#999]">2016 – 2020</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Junior High
                    </p>
                    <p className="text-xs mt-2 text-[#888]">Cauayan City</p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="seminar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative max-w-5xl mx-auto"
            >
              {/* Center line */}
              <div
                className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${
                  isDarkMode ? "bg-[#444]" : "bg-[#e0e0e0]"
                }`}
              />

              {/* Seminar 1 - Left */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="lg:w-1/2 lg:pr-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        AI Applications – University of Singapore (Online)
                      </h3>
                      <span className="text-xs text-[#999]">2025</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Applied AI tools and real-world use cases.
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Seminar 2 - Right */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row-reverse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="lg:w-1/2 lg:pl-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Flutter Seminar – Firebase Chat App
                      </h3>
                      <span className="text-xs text-[#999]">2025</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Built a real-time chat app with Firebase.
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Seminar 3 - Left */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="lg:w-1/2 lg:pr-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Code, Chat, Deploy – React + WebSockets
                      </h3>
                      <span className="text-xs text-[#999]">2025</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Built a live chat experience with sockets.
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Seminar 4 - Right */}
              <motion.div
                className="relative mb-12 flex flex-col lg:flex-row-reverse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="lg:w-1/2 lg:pl-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        GitHub Seminar
                      </h3>
                      <span className="text-xs text-[#999]">2024</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Version control and collaboration workflows.
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>

              {/* Seminar 5 - Left */}
              <motion.div
                className="relative flex flex-col lg:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="lg:w-1/2 lg:pr-10">
                  <div
                    className={`p-6 rounded-lg border transition hover:shadow-md ${
                      isDarkMode
                        ? "bg-[#2a2a2a] border-[#444]"
                        : "bg-white border-[#e0e0e0]"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <h3
                        className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
                      >
                        Fiber Optics Seminar
                      </h3>
                      <span className="text-xs text-[#999]">2024</span>
                    </div>
                    <p className={isDarkMode ? "text-[#aaa]" : "text-[#666]"}>
                      Networking fundamentals and fiber optics basics.
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Projects */}
      <section id="projects" className="animate-fadeIn">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-5 ${isDarkMode ? "text-white border-[#444]" : "text-[#1a1a1a] border-[#f0f0f0]"} pb-3 border-b-2`}
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* BantayBakir */}
          <div
            className={`p-5 rounded-lg border transition hover:shadow-lg hover:scale-[1.02] ${isDarkMode ? "bg-[#2a2a2a] border-[#444]" : "bg-white border-[#e0e0e0]"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <h3
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
              >
                BantayBakir
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  React Native
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Expo
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Firebase
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  QR Code
                </span>
              </div>
            </div>

            <p
              className={`text-xs font-medium mb-2 ${isDarkMode ? "text-[#9aa]" : "text-[#777]"}`}
            >
              Role: Backend Developer
            </p>

            <p
              className={`text-sm ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
            >
              QR-Based Tree Tagging GIS for DENR with real-time geolocation
              tracking, enabling accurate identification, monitoring, and
              mapping of individual trees in the field. The system supports
              efficient data collection and visualization to assist DENR in
              forest management, conservation efforts, and decision-making.
            </p>
          </div>

          {/* TaraLaba */}
          <div
            className={`p-5 rounded-lg border transition hover:shadow-lg hover:scale-[1.02] ${isDarkMode ? "bg-[#2a2a2a] border-[#444]" : "bg-white border-[#e0e0e0]"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <h3
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
              >
                TaraLaba
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  REST API
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  MongoDB
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Express.js
                </span>
              </div>
            </div>

            <p
              className={`text-xs font-medium mb-2 ${isDarkMode ? "text-[#9aa]" : "text-[#777]"}`}
            >
              Role: Backend Developer
            </p>

            <p
              className={`text-sm ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
            >
              Laundry Management System with a RESTful API and integrated
              database management, enabling efficient handling of orders,
              customer records, and service status. The system ensures reliable
              data synchronization and supports scalable operations for
              day-to-day laundry business workflows.
            </p>
          </div>

          {/* TaraKain */}
          <div
            className={`p-5 rounded-lg border transition hover:shadow-lg hover:scale-[1.02] ${isDarkMode ? "bg-[#2a2a2a] border-[#444]" : "bg-white border-[#e0e0e0]"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <h3
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
              >
                TaraKain
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  React
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Vite
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Express
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  MongoDB
                </span>
              </div>
            </div>

            <p
              className={`text-xs font-medium mb-2 ${isDarkMode ? "text-[#9aa]" : "text-[#777]"}`}
            >
              Role: Full-Stack Developer
            </p>

            <p
              className={`text-sm ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
            >
              Menu Management System with full CRUD functionality and image
              upload capabilities, allowing administrators to easily create,
              update, and manage menu items. The system ensures organized
              content management and seamless handling of images for a more
              dynamic and user-friendly menu experience.
            </p>
          </div>

          {/* NexTransport */}
          <div
            className={`p-5 rounded-lg border transition hover:shadow-lg hover:scale-[1.02] ${isDarkMode ? "bg-[#2a2a2a] border-[#444]" : "bg-white border-[#e0e0e0]"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <h3
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
              >
                NexTransport
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Next.js
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  TypeScript
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                  Supabase
                </span>
              </div>
            </div>

            <p
              className={`text-[11px] font-medium mb-2 ${isDarkMode ? "text-[#9aa]" : "text-[#777]"}`}
            >
              Role: Backend Developer
            </p>

            <p
              className={`text-xs ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
            >
              Bus and Jeep booking web application that streamlines public
              transportation reservations with real-time availability tracking,
              seat selection, and secure payment processing for a seamless
              commuter experience.
            </p>
          </div>

          {/* Flowerama */}
          <div
            className={`p-5 rounded-lg border transition hover:shadow-lg hover:scale-[1.02] ${isDarkMode ? "bg-[#2a2a2a] border-[#444]" : "bg-white border-[#e0e0e0]"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
              <h3
                className={`text-base font-bold ${isDarkMode ? "text-white" : "text-[#1a1a1a]"}`}
              >
                Flowerama
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${isDarkMode ? "bg-[#3a3a3a] text-[#bbb]" : "bg-[#f0f0f0] text-[#555]"}`}
                >
                 Vite + React
                </span>
                
              </div>
            </div>

            <p
              className={`text-xs ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
            >
              Simple Flowering Game That uses only Frontend Technologies. You Can use this in your free time to relax and have fun. And for Valentines
            </p>
          </div>
        </div>
      </section>


      <section id="contact" className="animate-fadeIn mt-20">
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-semibold mb-5 ${isDarkMode ? "text-white border-[#444]" : "text-[#1a1a1a] border-[#f0f0f0]"} pb-3 border-b-2`}
        >
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p
              className={`text-sm mb-6 max-w-md ${isDarkMode ? "text-[#bbb]" : "text-[#666]"}`}
            >
              Have a question or want to work together? Send me a message and
              I'll get back to you as soon as possible.
            </p>

            <div className="flex items-center gap-4">
              <p
                className={`text-xs font-medium mb-2 ${isDarkMode ? "text-[#9aa]" : "text-[#777]"}`}
              >
                <a
                rel="noreferrer"
                aria-label="GitHub"
                className={`transition ${isDarkMode ? "text-[#bbb] hover:text-white" : "text-[#555] hover:text-[#1a1a1a]"}`}
                >
                <Github size={20} />
                </a>
            </p>

              <p
                className={`text-sm ${isDarkMode ? "text-[#aaa]" : "text-[#666]"}`}
              >
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={`transition ${isDarkMode ? "text-[#bbb] hover:text-white" : "text-[#555] hover:text-[#1a1a1a]"}`}
              >
                <Linkedin size={20} />
              </a>
              </p>
              <a
                href="mailto:marcaedrian67@gmail.com"
                aria-label="Email"
                className={`transition ${isDarkMode ? "text-[#bbb] hover:text-white" : "text-[#555] hover:text-[#1a1a1a]"}`}
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={`transition ${isDarkMode ? "text-[#bbb] hover:text-white" : "text-[#555] hover:text-[#1a1a1a]"}`}
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-[#bbb]" : "text-[#555]"}`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-[#2a2a2a] border-[#444] text-white placeholder-[#666]" : "bg-white border-[#e0e0e0] text-[#1a1a1a] placeholder-[#999]"}`}
              placeholder="Your name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-[#bbb]" : "text-[#555]"}`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "bg-[#2a2a2a] border-[#444] text-white placeholder-[#666]" : "bg-white border-[#e0e0e0] text-[#1a1a1a] placeholder-[#999]"}`}
              placeholder="your@email.com"
            />
          </div>

          {/* Message Input */}
          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-[#bbb]" : "text-[#555]"}`}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${isDarkMode ? "bg-[#2a2a2a] border-[#444] text-white placeholder-[#666]" : "bg-white border-[#e0e0e0] text-[#1a1a1a] placeholder-[#999]"}`}
              placeholder="Your message here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg font-medium transition ${
              isSubmitting
                ? isDarkMode
                  ? "bg-[#444] text-[#888] cursor-not-allowed"
                  : "bg-[#e0e0e0] text-[#999] cursor-not-allowed"
                : isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-500 text-sm font-medium"
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.p>
          )}
          {submitStatus === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm font-medium"
            >
              ✗ Something went wrong. Please try again.
            </motion.p>
          )}
        </form>
        </div>
      </section>
    </motion.div>
  );
}

export default Content;
