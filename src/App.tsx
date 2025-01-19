import React, { useState } from "react";
import { Search, BookOpen, ExternalLink, Calendar, Star } from "lucide-react";

interface Platform {
  url: string;
  name: string;
  pricing: string;
  priceLevel: "FREE" | "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
  description: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<string>("all");
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
      priceLevel: "$",
      description:
        "Interactive STEM and computer science courses with focus on fundamentals",
      category: "Academic",
    },
    {
      url: "https://www.khanacademy.org",
      name: "Khan Academy",
      pricing: "Free",
      priceLevel: "FREE",
      description:
        "Comprehensive educational platform covering math, science, and computing",
      category: "Academic",
    },
    {
      url: "https://www.pluralsight.com",
      name: "Pluralsight",
      pricing: "$29.00/mo",
      priceLevel: "$$",
      description:
        "Professional tech skill development and certification preparation",
      category: "Professional",
    },
    {
      url: "https://www.appacademy.io",
      name: "App Academy",
      pricing: "$17,000 or 15% income share",
      priceLevel: "$$$$",
      description:
        "Rigorous full-stack development program with campuses in SF and online options",
      category: "Professional",
    },
    {
      url: "https://extension.berkeley.edu/public/category/courseCategoryCertificateProfile.do?method=load&certificateId=17066&selectedProgramAreaId=11464",
      name: "UC Berkeley Extension",
      pricing: "$13,500",
      priceLevel: "$$$",
      description:
        "University-backed coding bootcamp offering full-stack web development",
      category: "Professional",
    },
    {
      url: "https://www.rithmschool.com",
      name: "Rithm School",
      pricing: "$24,000",
      priceLevel: "$$$$$",
      description:
        "Small class sizes bootcamp in SF with real-world project experience",
      category: "Professional",
    },
    {
      url: "https://generalassemb.ly",
      name: "General Assembly",
      pricing: "$15,950",
      priceLevel: "$$$$",
      description:
        "Global tech education provider with SF campus offering software engineering, UX, and data science",
      category: "Professional",
    },
    {
      url: "https://hackbrightacademy.com",
      name: "Hackbright Academy",
      pricing: "$16,895",
      priceLevel: "$$$$",
      description:
        "Engineering school for women with strong emphasis on Python development",
      category: "Professional",
    },
    {
      url: "https://www.holbertonschool.com",
      name: "Holberton School",
      pricing: "Income share agreement",
      priceLevel: "$$$$",
      description:
        "Project-based software engineering school in SF with 2-year curriculum",
      category: "Professional",
    },
    {
      url: "https://www.techelevator.com",
      name: "Tech Elevator",
      pricing: "$15,950",
      priceLevel: "$$$$",
      description:
        "Coding bootcamp focused on Java and .NET with high placement rates",
      category: "Professional",
    },
    {
      url: "https://www.thinkful.com",
      name: "Thinkful",
      pricing: "$16,000 or income share",
      priceLevel: "$$$$",
      description:
        "Online tech bootcamp with strong mentorship and career services",
      category: "Professional",
    },
    {
      url: "https://www.hackreactor.com",
      name: "Hack Reactor",
      pricing: "$17,980",
      priceLevel: "$$$$",
      description:
        "Advanced software engineering bootcamp in SF with focus on full-stack JavaScript",
      category: "Professional",
    },
    {
      url: "https://flatironschool.com",
      name: "Flatiron School",
      pricing: "$16,900",
      priceLevel: "$$$$",
      description:
        "Comprehensive software engineering and data science bootcamp with SF presence",
      category: "Professional",
    },
    {
      url: "https://www.springboard.com",
      name: "Springboard",
      pricing: "$9,900 or income share",
      priceLevel: "$$$",
      description:
        "Online tech bootcamp based in SF with 1:1 mentorship in software engineering and data science",
      category: "Professional",
    },
    {
      url: "https://www.codingdojo.com",
      name: "Coding Dojo",
      pricing: "$16,995",
      priceLevel: "$$$$",
      description:
        "Multi-stack coding bootcamp with SF Bay Area campus, teaching 3 full stacks",
      category: "Professional",
    },
    {
      url: "https://lambdaschool.com",
      name: "Lambda School",
      pricing: "Income share agreement",
      priceLevel: "$$$$",
      description:
        "Remote software engineering program with income share agreement option",
      category: "Professional",
    },
    {
      url: "https://www.lewagon.com",
      name: "Le Wagon",
      pricing: "$14,900",
      priceLevel: "$$$$",
      description:
        "International coding bootcamp with web development and data science tracks",
      category: "Professional",
    },
    {
      url: "https://www.bloc.io",
      name: "Bloc",
      pricing: "$8,500",
      priceLevel: "$$$",
      description:
        "Online bootcamp with flexible scheduling and personalized mentorship",
      category: "Professional",
    },
    {
      url: "https://www.nucamp.co",
      name: "Nucamp",
      pricing: "$2,500",
      priceLevel: "$$",
      description:
        "Affordable coding bootcamp with hybrid learning model in SF Bay Area",
      category: "Professional",
    },
    {
      url: "https://www.ironhack.com",
      name: "Ironhack",
      pricing: "$12,000",
      priceLevel: "$$$$",
      description:
        "Global tech school offering web development, UX/UI, and data analytics",
      category: "Professional",
    },
    {
      url: "https://www.brainstation.io",
      name: "BrainStation",
      pricing: "$15,000",
      priceLevel: "$$$$",
      description:
        "Digital skills bootcamp offering web development, data science, and UX design",
      category: "Professional",
    },
    {
      url: "https://www.microverse.org",
      name: "Microverse",
      pricing: "Income share agreement",
      priceLevel: "$$$$",
      description:
        "Remote software development program with pair programming focus",
      category: "Professional",
    },
    {
      url: "https://www.alchemycodelab.com",
      name: "Alchemy Code Lab",
      pricing: "$18,000",
      priceLevel: "$$$$$",
      description:
        "Advanced software development bootcamp with focus on modern JavaScript",
      category: "Professional",
    },
    {
      url: "https://www.kenzie.academy",
      name: "Kenzie Academy",
      pricing: "Income share agreement",
      priceLevel: "$$$$",
      description:
        "Year-long program combining software engineering with professional skills",
      category: "Professional",
    },
    {
      url: "https://anyonecanlearntocode.com",
      name: "Actualize",
      pricing: "$13,900",
      priceLevel: "$$$$",
      description:
        "Coding bootcamp offering part-time and full-time web development courses",
      category: "Professional",
    },
    {
      url: "https://careerfoundry.com",
      name: "CareerFoundry",
      pricing: "$7,900",
      priceLevel: "$$$",
      description:
        "Online bootcamp with dedicated mentorship in web development and UX/UI",
      category: "Professional",
    },
    {
      url: "https://skillcrush.com",
      name: "Skillcrush",
      pricing: "$2,499",
      priceLevel: "$$",
      description:
        "Online tech skills platform focused on web development and design",
      category: "Professional",
    },
    {
      url: "https://teamtreehouse.com",
      name: "Treehouse",
      pricing: "$199/month",
      priceLevel: "$",
      description:
        "Online learning platform with comprehensive programming courses",
      category: "Professional",
    },
    {
      url: "https://codifyacademy.com",
      name: "Codify Academy",
      pricing: "$14,800",
      priceLevel: "$$$$",
      description:
        "Part-time web development bootcamp with emphasis on front-end development",
      category: "Professional",
    },
    {
      url: "https://www.codechef.com",
      name: "CodeChef",
      pricing: "$39.00/mo",
      priceLevel: "$$",
      description: "Competitive programming and algorithmic challenges",
      category: "Academic",
    },
    {
      url: "#",
      name: "HackerRank",
      pricing: "Free",
      priceLevel: "FREE",
      description: "Technical interview preparation and skill assessment",
      category: "Professional",
    },
    {
      url: "#",
      name: "PyChallenger",
      pricing: "$10.95/mo",
      priceLevel: "$",
      description: "Python-focused learning with academic approach",
      category: "Academic",
    },
    {
      url: "https://coderbyte.com",
      name: "Coderbyte",
      pricing: "$199.00/mo",
      priceLevel: "$$",
      description: "Technical assessment and interview preparation platform",
      category: "Professional",
    },
    {
      url: "https://www.codecademy.com",
      name: "Codecademy",
      pricing: "Free",
      priceLevel: "FREE",
      description:
        "Interactive programming courses for beginners to intermediate",
      category: "Academic",
    },
    {
      url: "https://leetcode.com",
      name: "LeetCode",
      pricing: "$13.25/mo",
      priceLevel: "$",
      description:
        "Coding interview preparation with focus on algorithms and data structures",
      category: "Professional",
    },
    {
      url: "https://formation.dev/pricing",
      name: "Formation.dev",
      pricing: "$2,500.00/mo",
      priceLevel: "$$$$",
      description:
        "Elite software engineering interview preparation and mentorship",
      category: "Professional",
    },
    {
      url: "https://www.devbootcamp.com",
      name: "Dev Bootcamp",
      pricing: "$15,950",
      priceLevel: "$$$$",
      description:
        "Pioneer coding bootcamp in SF focusing on full-stack web development",
      category: "Professional",
    },
    {
      url: "https://www.makeschool.com",
      name: "Make School",
      pricing: "Income share agreement",
      priceLevel: "$$$$",
      description:
        "Project-based computer science education with focus on mobile and web development",
      category: "Professional",
    },
    {
      url: "https://codepath.org",
      name: "CodePath",
      pricing: "Free",
      priceLevel: "FREE",
      description:
        "Industry-backed technical training program focusing on mobile and web development",
      category: "Professional",
    },
    {
      url: "https://www.byteacademy.co",
      name: "Byte Academy",
      pricing: "$14,950",
      priceLevel: "$$$$",
      description:
        "Specialized bootcamp offering Python, FinTech and blockchain courses",
      category: "Professional",
    },
    {
      url: "https://www.fullstackacademy.com",
      name: "Fullstack Academy",
      pricing: "$17,910",
      priceLevel: "$$$$",
      description:
        "Immersive software engineering program with focus on JavaScript stack",
      category: "Professional",
    },
    {
      url: "https://www.techacademy.com",
      name: "The Tech Academy",
      pricing: "$11,660",
      priceLevel: "$$$$",
      description:
        "Self-paced coding bootcamp offering multiple programming tracks",
      category: "Professional",
    },
    {
      url: "https://www.galvanize.com",
      name: "Galvanize",
      pricing: "$17,980",
      priceLevel: "$$$$",
      description:
        "Software engineering and data science bootcamp with SF campus and enterprise training",
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

  const filteredPlatforms = platforms
    .filter((platform) =>
      searchQuery
        ? platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          platform.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true
    )
    .filter((platform) =>
      selectedCategory === "all" ? true : platform.category === selectedCategory
    )
    .filter((platform) =>
      selectedPriceLevel === "all"
        ? true
        : platform.priceLevel === selectedPriceLevel
    )
    .filter(
      (platform) =>
        tags.every((tag) => !tag.active) ||
        tags.some(
          (tag) =>
            tag.active &&
            platform.description?.toLowerCase().includes(tag.name.toLowerCase())
        )
    );

  // Calculate metrics
  const totalSchools = platforms.length;
  const professionalSchools = platforms.filter(
    (p) => p.category === "Professional"
  ).length;
  const academicSchools = platforms.filter(
    (p) => p.category === "Academic"
  ).length;
  const priceLevels = {
    FREE: platforms.filter((p) => p.priceLevel === "FREE").length,
    $: platforms.filter((p) => p.priceLevel === "$").length,
    $$: platforms.filter((p) => p.priceLevel === "$$").length,
    $$$: platforms.filter((p) => p.priceLevel === "$$$").length,
    $$$$: platforms.filter((p) => p.priceLevel === "$$$$").length,
    $$$$$: platforms.filter((p) => p.priceLevel === "$$$$$").length,
  };

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

      {/* Metrics Section */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-indigo-600">
                {totalSchools}
              </div>
              <div className="text-sm text-gray-600">Total Schools</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600">
                {professionalSchools}
              </div>
              <div className="text-sm text-gray-600">Professional Schools</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-green-600">
                {academicSchools}
              </div>
              <div className="text-sm text-gray-600">Academic Schools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-grow mb-4 md:mb-0">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Filter */}
          <div className="mb-4 md:mb-0">
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories · {totalSchools}</option>
              <option value="Professional">
                Professional · {professionalSchools}
              </option>
              <option value="Academic">Academic · {academicSchools}</option>
            </select>
          </div>

          {/* Price Level Filter */}
          <div>
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={selectedPriceLevel}
              onChange={(e) => setSelectedPriceLevel(e.target.value)}
            >
              <option value="all">All Price Ranges · {totalSchools}</option>
              <option value="FREE" className="text-green-600">
                Free · {priceLevels["FREE"]}
              </option>
              <option value="$">$ Under $3k/year · {priceLevels["$"]}</option>
              <option value="$$">$$ $3k-$8k/year · {priceLevels["$$"]}</option>
              <option value="$$$">
                $$$ $8k-$13k/year · {priceLevels["$$$"]}
              </option>
              <option value="$$$$">
                $$$$ $13k-$20k/year · {priceLevels["$$$$"]}
              </option>
              <option value="$$$$$">
                $$$$$ $20k+/year · {priceLevels["$$$$$"]}
              </option>
            </select>
          </div>
        </div>

        {/* Topics Filter */}
        <div className="mb-8">
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

        {/* Results Count */}
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600">
            Found{" "}
            <span className="text-indigo-600 font-semibold">
              {filteredPlatforms.length}
            </span>{" "}
            {filteredPlatforms.length === 1 ? "result" : "results"}
          </span>
        </div>

        {/* Platform Grid */}
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
                  <span
                    className={`inline-block ml-2 text-sm font-medium ${
                      platform.priceLevel === "FREE"
                        ? "text-green-600"
                        : "text-gray-600"
                    }`}
                  >
                    {platform.priceLevel}
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
