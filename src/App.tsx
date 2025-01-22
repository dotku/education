import { useState } from "react";
import { Search, BookOpen, ExternalLink, Calendar, Star } from "lucide-react";
import AIConsultant from './components/AIConsultant';

interface Platform {
  url: string;
  name: string;
  category: string;
  pricing: string;
  priceLevel: string;
  description?: string;
}

interface Tag {
  name: string;
  active: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  platform: string;
  content: string;
}

function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceLevel, setSelectedPriceLevel] = useState("all");

  // Sample data
  const averageSalaryIncrease = 25000;
  const totalAdvisors = 50;
  const totalSchools = 200;
  const professionalSchools = 120;
  const academicSchools = 80;

  const priceLevels: { [key: string]: number } = {
    "FREE": 20,
    "$": 40,
    "$$": 60,
    "$$$": 40,
    "$$$$": 30,
    "$$$$$": 10,
  };

  const [tags, setTags] = useState<Tag[]>([
    { name: "Web Development", active: false },
    { name: "Data Science", active: false },
    { name: "Machine Learning", active: false },
    { name: "Cloud Computing", active: false },
    { name: "DevOps", active: false },
    { name: "Mobile Development", active: false },
    { name: "Cybersecurity", active: false },
    { name: "UI/UX Design", active: false },
  ]);

  const platforms: Platform[] = [
    {
      url: "https://www.udemy.com",
      name: "Udemy",
      category: "Professional",
      pricing: "Pay per course",
      priceLevel: "$",
      description: "Massive course selection with frequent discounts",
    },
    {
      url: "https://www.coursera.org",
      name: "Coursera",
      category: "Academic",
      pricing: "Subscription/Certification",
      priceLevel: "$$",
      description: "University-backed courses and degrees",
    },
    // Add more platforms as needed
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      platform: "Coursera",
      content: "The guidance I received helped me transition from marketing to software engineering.",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist at Amazon",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 5,
      platform: "Udacity",
      content: "Found the perfect learning path for my career switch to data science.",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Apple",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      platform: "Udemy",
      content: "The personalized recommendations were spot-on for my design career.",
    },
  ];

  const toggleTag = (index: number) => {
    const newTags = [...tags];
    newTags[index].active = !newTags[index].active;
    setTags(newTags);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || platform.category === selectedCategory;
    const matchesPriceLevel = selectedPriceLevel === "all" || platform.priceLevel === selectedPriceLevel;
    return matchesSearch && matchesCategory && matchesPriceLevel;
  });

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
            Discover the best platforms to learn software development, data science, and more. 
            Compare pricing and features to find your perfect learning path.
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

      {/* AI Consultant Section */}
      <div className="bg-white shadow-sm mt-8">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            AI Education Consultant
          </h2>
          <AIConsultant />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-1">
                {formatCurrency(averageSalaryIncrease)}
              </div>
              <div className="text-sm font-medium text-gray-600">Average Salary Growth</div>
              <div className="text-xs text-gray-500 mt-1">Based on 2024 Graduate Data</div>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl font-bold text-indigo-600 mb-1">
                {totalAdvisors}
              </div>
              <div className="text-sm font-medium text-gray-600">Expert Advisors</div>
              <div className="text-xs text-gray-500 mt-1">Ready to Guide You</div>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-1">
                {totalSchools}
              </div>
              <div className="text-sm font-medium text-gray-600">Partner Schools</div>
              <div className="text-xs text-gray-500 mt-1">Professional & Academic</div>
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
              <option value="Professional">Professional · {professionalSchools}</option>
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
              <option value="FREE" className="text-green-600">Free · {priceLevels["FREE"]}</option>
              <option value="$">$ Under $3k/year · {priceLevels["$"]}</option>
              <option value="$$">$$ $3k-$8k/year · {priceLevels["$$"]}</option>
              <option value="$$$">$$$ $8k-$13k/year · {priceLevels["$$$"]}</option>
              <option value="$$$$">$$$$ $13k-$20k/year · {priceLevels["$$$$"]}</option>
              <option value="$$$$$">$$$$$ $20k+/year · {priceLevels["$$$$$"]}</option>
            </select>
          </div>
        </div>

        {/* Topics Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={tag.name}
                onClick={() => toggleTag(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${tag.active
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
                    <span className={`text-xs font-medium ${platform.category === "Professional"
                      ? "text-purple-600"
                      : "text-green-600"
                      }`}>
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
                  <span className={`inline-block ml-2 text-sm font-medium ${platform.priceLevel === "FREE"
                    ? "text-green-600"
                    : "text-gray-600"
                    }`}>
                    {platform.priceLevel}
                  </span>
                </div>
                {platform.description && (
                  <p className="text-gray-600 text-sm">{platform.description}</p>
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
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
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
            2024 Education Navigator. All learning platforms are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
