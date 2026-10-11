import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tags = [
  "Frontend Developer",
  "Backend Engineer",
  "Full-Stack Dev",
  "Open Source Lover",
  "ReactJS",
  "Node.js",
  "MongoDB",
  "Machine Learning",
  "Python",
  "TypeScript",
];

const carouselItems = [
  "👨‍💻 Find your perfect dev match!",
  "🤝 Collaborate on exciting projects.",
  "🚀 Launch your next startup idea.",
  "💬 Network with like-minded devs.",
];

const features = [
  {
    icon: "👥",
    title: "Match with Developers",
    description: "Find developers who share your tech stack and interests",
  },
  {
    icon: "💼",
    title: "Project Collaboration",
    description: "Start or join exciting projects that match your skills",
  },
  {
    icon: "🌟",
    title: "Skill Growth",
    description: "Learn from peers and enhance your coding abilities",
  },
  {
    icon: "🤝",
    title: "Network Building",
    description: "Build meaningful connections in the tech community",
  },
];

const Home = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Welcome to Ultron";
  const speed = 100;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, speed);
      }
    };
    typeText();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 2000);
    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="min-h-screen rounded-b-3xl bg-[#fffdf8] text-gray-900 relative overflow-hidden">
      <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center gap-10 text-center relative z-10">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-700 to-green-500 bg-clip-text text-transparent">
            {displayText}
          </h1>

          <p className="text-gray-700 italic text-sm mb-6">
            Built by BNPians, for BNPians. ❤️
          </p>

          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-gray-800 font-medium mb-6"
          >
            {carouselItems[carouselIndex]}
          </motion.div>

          <motion.div
            className="flex whitespace-nowrap mb-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            {[...tags, ...tags].map((tag, idx) => (
              <span
                key={idx}
                className="mx-3 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.section
        className="py-16 px-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Ultron?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl border border-emerald-900/10 bg-[#fffdf8] p-6 shadow-sm transition-colors hover:bg-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="py-16 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to explore your knowledge base?
          </h2>
          <p className="text-gray-700 mb-8">
            Ask questions and discover useful answers from your connected
            documents.
          </p>
          <button
            onClick={() => navigate("/chatbot")}
            className="btn btn-primary btn-wide text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            💬 Start Asking
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
