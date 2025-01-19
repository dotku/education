import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink } from 'lucide-react';

interface Platform {
  url: string;
  name: string;
  pricing: string;
  description?: string;
}

interface Tag {
  name: string;
  active: boolean;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<Tag[]>([
    'Python', 'JavaScript', 'HTML & CSS', 'SQL', 'Java', 'C++', 'C#', 'C', 'PHP', 'R',
    'IT', 'New', 'Cybersecurity', 'Cloud computing', 'AI', 'Web development',
    'Data science', 'Web design', 'Professional skills'
  ].map(tag => ({ name: tag, active: false })));

  const platforms: Platform[] = [
    {
      url: 'https://brilliant.org/subscribe',
      name: 'Brilliant',
      pricing: '$10.79/mo',
      description: 'Fun and interesting learning experience'
    },
    {
      url: 'https://www.khanacademy.org',
      name: 'Khan Academy',
      pricing: 'Free',
      description: 'Comprehensive educational platform'
    },
    {
      url: 'https://www.pluralsight.com',
      name: 'Pluralsight',
      pricing: '$29.00/mo',
      description: '10 days trial available'
    },
    {
      url: 'https://www.codingtemple.com',
      name: 'Coding Temple',
      pricing: '$5,000.00-$14,995.00',
      description: 'Pay after get hired'
    },
    {
      url: 'https://www.codechef.com',
      name: 'CodeChef',
      pricing: '$39.00/mo'
    },
    {
      url: '#',
      name: 'HackerRank',
      pricing: 'Free'
    },
    {
      url: '#',
      name: 'PyChallenger',
      pricing: '$10.95/mo'
    },
    {
      url: 'https://coderbyte.com',
      name: 'Coderbyte',
      pricing: '$199.00/mo'
    },
    {
      url: 'https://www.codecademy.com',
      name: 'Codecademy',
      pricing: 'Free'
    },
    {
      url: 'https://leetcode.com',
      name: 'LeetCode',
      pricing: '$13.25/mo',
      description: 'Popular platform for coding interview preparation'
    },
    {
      url: 'https://formation.dev/pricing',
      name: 'Formation.dev',
      pricing: '$2,500.00/mo',
      description: 'Personalized software engineering interview preparation'
    }
  ];

  const toggleTag = (index: number) => {
    const newTags = [...tags];
    newTags[index].active = !newTags[index].active;
    setTags(newTags);
  };

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-indigo-600 mb-4">
            <BookOpen className="h-8 w-8" />
            <h1>EduTech Navigator</h1>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Discover the best platforms to learn software development, data science, and more.
            Compare pricing and features to find your perfect learning path.
          </p>
        </div>
      </div>

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
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Popular Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={tag.name}
                onClick={() => toggleTag(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${tag.active
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
            <div key={platform.name} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{platform.name}</h3>
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
                  <p className="text-gray-600 text-sm">{platform.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2024 EduTech Navigator. All learning platforms are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;