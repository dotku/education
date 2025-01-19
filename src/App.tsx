import React, { useState } from "react";
import { Search, BookOpen, ExternalLink, Calendar, Star } from "lucide-react";

interface Platform {
  url: string;
  name: string;
  pricing: string;
  description?: string;
  category: "Professional" | "Academic";
}

interface Tag {
  name: string;
  active: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  platform: string;
  rating: number;
  image: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "Professional" | "Academic" | ""
  >("");
  const [tags, setTags] = useState<Tag[]>(
    [
      // Programming Languages
      "Python",
      "JavaScript",
      "HTML & CSS",
      "SQL",
      "Java",
      "C++",
      "C#",
      "C",
      "PHP",
      "R",
      // Professional Skills
      "Interview Prep",
      "Career Development",
      "System Design",
      // Technical Domains
      "Data Science",
      "Machine Learning",
      "Web Development",
      "Cloud Computing",
      "Cybersecurity",
      "DevOps",
      // Academic Focus
      "Computer Science",
      "Mathematics",
      "Algorithms",
      "Science",
      "Engineering",
    ].map((tag) => ({ name: tag, active: false }))
  );
  const [showBooking, setShowBooking] = useState(false);

  const platforms: Platform[] = [
    {
      url: "https://brilliant.org/subscribe",
      name: "Brilliant",
      pricing: "$10.79/mo",
      description:
        "Interactive STEM and computer science courses with focus on fundamentals",
      category: "Academic",
    },
    {
      url: "https://www.khanacademy.org",
      name: "Khan Academy",
      pricing: "Free",
      description:
        "Comprehensive educational platform covering math, science, and computing",
      category: "Academic",
    },
    {
      url: "https://www.pluralsight.com",
      name: "Pluralsight",
      pricing: "$29.00/mo",
      description:
        "Professional tech skill development and certification preparation",
      category: "Professional",
    },
    {
      url: "https://www.codingtemple.com",
      name: "Coding Temple",
      pricing: "$5,000.00-$14,995.00",
      description: "Intensive bootcamp focused on career transition into tech",
      category: "Professional",
    },
    {
      url: "#",
      name: "CodeChef",
      pricing: "$39.00/mo",
      description: "Competitive programming and algorithmic challenges",
      category: "Academic",
    },
    {
      url: "#",
      name: "HackerRank",
      pricing: "Free",
      description: "Technical interview preparation and skill assessment",
      category: "Professional",
    },
    {
      url: "#",
      name: "PyChallenger",
      pricing: "$10.95/mo",
      description: "Python-focused learning with academic approach",
      category: "Academic",
    },
    {
      url: "https://coderbyte.com",
      name: "Coderbyte",
      pricing: "$199.00/mo",
      description: "Technical assessment and interview preparation platform",
      category: "Professional",
    },
    {
      url: "https://www.codecademy.com",
      name: "Codecademy",
      pricing: "Free",
      description:
        "Interactive programming courses for beginners to intermediate",
      category: "Academic",
    },
    {
      url: "https://leetcode.com",
      name: "LeetCode",
      pricing: "$13.25/mo",
      description:
        "Coding interview preparation with focus on algorithms and data structures",
      category: "Professional",
    },
    {
      url: "https://formation.dev/pricing",
      name: "Formation.dev",
      pricing: "$2,500.00/mo",
      description:
        "Elite software engineering interview preparation and mentorship",
      category: "Professional",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Michael Rodriguez",
      role: "Software Engineer at Google",
      content:
        "The advisor helped me choose the perfect learning path. I went from a complete beginner to landing my dream job at Google in 12 months.",
      platform: "LeetCode",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Emily Thompson",
      role: "Data Scientist",
      content:
        "The personalized guidance in choosing between different data science platforms was invaluable. Now I'm confidently working with ML models.",
      platform: "Pluralsight",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "David Chen",
      role: "Computer Science Student",
      content:
        "The academic resources recommended were exactly what I needed. The math and algorithm courses significantly improved my understanding.",
      platform: "Brilliant",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  const toggleTag = (index: number) => {
    const newTags = [...tags];
    newTags[index].active = !newTags[index].active;
    setTags(newTags);
  };

  const filteredPlatforms = platforms.filter(
    (platform) =>
      (searchTerm === "" ||
        platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        platform.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || platform.category === selectedCategory) &&
      (tags.every((tag) => !tag.active) ||
        tags.some(
          (tag) =>
            tag.active &&
            platform.description?.toLowerCase().includes(tag.name.toLowerCase())
        ))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-indigo-600 mb-4">
            <BookOpen className="h-8 w-8" />
            <h1>Education Navigator</h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
            Discover the best platforms to learn software development, data
            science, and more. Compare pricing and features to find your perfect
            learning path.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Talk with our Advisors
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book an Appointment
            </h2>
            <p className="text-gray-600 mb-6">
              Schedule a free consultation with our education advisors to get
              personalized guidance on your learning journey.
            </p>
            <div className="space-y-4">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Schedule on Calendly
              </a>
              <button
                onClick={() => setShowBooking(false)}
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search platforms..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Categories
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedCategory === ""
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("Professional")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedCategory === "Professional"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              Professional
            </button>
            <button
              onClick={() => setSelectedCategory("Academic")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  selectedCategory === "Academic"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              Academic
            </button>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Popular Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={tag.name}
                onClick={() => toggleTag(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${
                    tag.active
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {platform.name}
                    </h3>
                    <span
                      className={`text-xs font-medium ${
                        platform.category === "Professional"
                          ? "text-purple-600"
                          : "text-green-600"
                      }`}
                    >
                      {platform.category}
                    </span>
                  </div>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <div className="mb-4">
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {platform.pricing}
                  </span>
                </div>
                {platform.description && (
                  <p className="text-gray-600 text-sm">
                    {platform.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-indigo-600 font-medium">
                    via {testimonial.platform}
                  </p>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            2024 Education Navigator. All learning platforms are property of
            their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
