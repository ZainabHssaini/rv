import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { FiCheck, FiUsers, FiUser, FiMessageSquare, FiBook, FiBarChart2, FiHeart, FiShield, FiStar } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const PricingPage = () => { 
  const [activeTab, setActiveTab] = useState<'enterprise' | 'individual'>('enterprise');

  const navigate = useNavigate();
  

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-200">
    
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-1xl font-bold text-reviva-purple leading-tigh mb-6">
            Reviva: <span className="text-reviva-teal"> Pricing Plans </span>
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'enterprise'
                ? 'bg-reviva-teal text-white font-semibold'
                : 'bg-gray-100 dark:bg-reviva-charcoal hover:bg-gray-200 dark:hover:bg-reviva-dark-charcoal'
            }`}
            onClick={() => setActiveTab('enterprise')}
          >
            For Businesses
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === 'individual'
                ? 'bg-reviva-teal text-white font-semibold'
                : 'bg-gray-100 dark:bg-reviva-charcoal hover:bg-gray-200 dark:hover:bg-reviva-dark-charcoal'
            }`}
            onClick={() => setActiveTab('individual')}
          >
            For Individuals
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === 'enterprise' ? (
          <>
            {/* Vitality Pack */}
            <div className="bg-[#EFD9D0] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#F4DCD3] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#8C5E58] dark:text-[#F4DCD3] mb-2">
                    VITALITY PACK
                  </h2>
                  <span className="bg-[#F4DCD3] dark:bg-[#8C5E58] text-[#8C5E58] dark:text-[#F4DCD3] text-xs font-semibold px-3 py-1 rounded-full">
                    <FiUsers className="inline mr-1" /> Up to 10
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#5A3A35] dark:text-white mb-2">500 DH <span className="text-lg text-[#8C5E58] dark:text-gray-400">/ Month</span></div>
                <p className="text-[#5A3A35] dark:text-gray-300 mb-6">Ideal for small businesses & startups focused on well-being</p>
                
                <div className="border-t border-white dark:border-gray-700 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="Unlimited access to REVIVA app" />
                  <FeatureItem icon={<FiUser />} text="1 individual session/month with a psychologist" />
                  <FeatureItem icon={<FiUsers />} text="1 thematic support group/month" />
                  <FeatureItem icon={<FiMessageSquare />} text="Psychologist chat (5 messages/month)" checked />
                  <FeatureItem icon={<FiBook />} text="Basic therapeutic modules" />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#8C5E58] hover:bg-[#5A3A35] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiStar className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>

            {/* Performance Pack */}
            <div className="bg-[#C4BEDF] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#E4DDF5] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#4E4A6B] dark:text-[#E4DDF5] mb-2">
                    PERFORMANCE PACK
                  </h2>
                  <span className="bg-[#E4DDF5] dark:bg-[#4E4A6B] text-[#4E4A6B] dark:text-[#E4DDF5] text-xs font-semibold px-3 py-1 rounded-full">
                    <FiUsers className="inline mr-1" /> Up to 30
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#3A365E] dark:text-white mb-2">900 DH <span className="text-lg text-[#4E4A6B] dark:text-gray-400">/ Month</span></div>
                <p className="text-[#3A365E] dark:text-gray-300 mb-6">For SMEs looking to strengthen team mental health</p>
                
                <div className="border-t border-[#E4DDF5] dark:border-gray-800 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="All features from Vitality Pack" checked />
                  <FeatureItem icon={<FiUser />} text="3 individual sessions/month with a psychologist" checked />
                  <FeatureItem icon={<FiMessageSquare />} text="Unlimited psychologist chat" checked />
                  <FeatureItem icon={<FiUsers />} text="In-depth support groups" checked />
                  <FeatureItem icon={<FiBarChart2 />} text="Anonymous mood tracking" checked />
                  <FeatureItem icon={<FiBook />} text="Advanced therapeutic modules" />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#4E4A6B] hover:bg-[#3A365E] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiShield className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>

            {/* Impact+ Pack */}
            <div className="bg-[#CDE7F3] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#A8E9F6] transform hover:-translate-y-2 transition-transform duration-300 relative">
              <div className="absolute top-0 right-0 bg-[#3A7CA5] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-[#2A5A7A] dark:text-[#A8E9F6] mb-2">
                    IMPACT+ PACK
                  </h2>
                  <span className="bg-[#A8E9F6] dark:bg-[#2A5A7A] text-[#2A5A7A] dark:text-[#A8E9F6] text-xs font-semibold px-3 py-1 rounded-full">
                    <FiUsers className="inline mr-1" /> Unlimited
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#1E425B] dark:text-white mb-2">1500 DH <span className="text-lg text-[#2A5A7A] dark:text-gray-400">/ Month</span></div>
                <p className="text-[#1E425B] dark:text-gray-300 mb-6">For large companies or CSR-committed businesses</p>
                
                <div className="border-t border-white dark:border-gray-700 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="All features from Performance Pack" checked />
                  <FeatureItem icon={<FiUser />} text="Unlimited individual sessions" checked />
                  <FeatureItem icon={<FiUsers />} text="Dedicated psychologists for your company" checked />
                  <FeatureItem icon={<FiBarChart2 />} text="Annual psychological assessment" checked />
                  <FeatureItem icon={<FiBook />} text="Full access to all modules" checked />
                  <FeatureItem icon={<FiHeart />} text="Custom well-being programs" checked />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#2A5A7A] hover:bg-[#1E425B] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiHeart className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Serenity Pack */}
            <div className="bg-[#EFD9D0] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#F4DCD3] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#8C5E58] dark:text-[#F4DCD3] mb-2">
                  SERENITY PACK
                </h2>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#5A3A35] dark:text-white">100 DH <span className="text-sm text-[#8C5E58] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#8C5E58] dark:text-gray-400">Student</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#5A3A35] dark:text-white">150 DH <span className="text-sm text-[#8C5E58] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#8C5E58] dark:text-gray-400">Employee</div>
                  </div>
                </div>
                <p className="text-[#5A3A35] dark:text-gray-300 mb-6">Entry-level solution for individual well-being</p>
                
                <div className="border-t border-white dark:border-gray-700 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="Access to REVIVA app" />
                  <FeatureItem icon={<FiUser />} text="1 thematic session/month" />
                  <FeatureItem icon={<FiMessageSquare />} text="Psychologist chat (5 messages/month)" />
                  <FeatureItem icon={<FiBook />} text="Basic modules" />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#8C5E58] hover:bg-[#5A3A35] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiStar className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>

            {/* Balance Pack */}
            <div className="bg-[#C4BEDF] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#E4DDF5] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#4E4A6B] dark:text-[#E4DDF5] mb-2">
                  BALANCE PACK
                </h2>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#3A365E] dark:text-white">200 DH <span className="text-sm text-[#4E4A6B] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#4E4A6B] dark:text-gray-400">Student</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#3A365E] dark:text-white">250 DH <span className="text-sm text-[#4E4A6B] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#4E4A6B] dark:text-gray-400">Employee</div>
                  </div>
                </div>
                <p className="text-[#3A365E] dark:text-gray-300 mb-6">Complete solution for personal balance</p>
                
                <div className="border-t border-[#E4DDF5] dark:border-gray-700 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="All Serenity Pack features" checked />
                  <FeatureItem icon={<FiUser />} text="1 coaching session/month" checked />
                  <FeatureItem icon={<FiMessageSquare />} text="Psychologist chat (10 messages/month)" checked />
                  <FeatureItem icon={<FiBook />} text="Advanced modules" checked />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#4E4A6B] hover:bg-[#3A365E] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiShield className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>

            {/* Harmony Pack */}
            <div className="bg-[#CDE7F3] dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-t-4 border-[#A8E9F6] transform hover:-translate-y-2 transition-transform duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#2A5A7A] dark:text-[#A8E9F6] mb-2">
                  HARMONY PACK
                </h2>
                <div className="flex space-x-4 mb-4">
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#1E425B] dark:text-white">400 DH <span className="text-sm text-[#2A5A7A] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#2A5A7A] dark:text-gray-400">Student</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xl font-semibold text-[#1E425B] dark:text-white">550 DH <span className="text-sm text-[#2A5A7A] dark:text-gray-400">/ Month</span></div>
                    <div className="text-sm text-[#2A5A7A] dark:text-gray-400">Employee</div>
                  </div>
                </div>
                <p className="text-[#1E425B] dark:text-gray-300 mb-6">Premium solution for optimal well-being</p>
                
                <div className="border-t border-white dark:border-gray-700 my-4"></div>

                <ul className="space-y-3 mb-8">
                  <FeatureItem icon={<FiCheck />} text="All Balance Pack features" checked />
                  <FeatureItem icon={<FiUser />} text="2 premium sessions/month" checked />
                  <FeatureItem icon={<FiMessageSquare />} text="Unlimited psychologist chat" checked />
                  <FeatureItem icon={<FiBook />} text="All modules" checked />
                  <FeatureItem icon={<FiBarChart2 />} text="Quarterly assessment" checked />
                </ul>
                <Link to="/virement1">
                    <button className="w-full bg-[#2A5A7A] hover:bg-[#1E425B] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    Choose this plan <FiHeart className="ml-2" />
                    </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-reviva-500/20 pt-6">
        <p className="mb-2">* The Impact+ Pack requires a preliminary consultation</p>
        <p>Contact us for a demo or customized options</p>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, text, checked = false }: { icon: React.ReactNode, text: string, checked?: boolean }) => {
  return (
    <li className="flex items-start">
      <span className={`mt-1 mr-3 ${checked ? 'text-[#2A5A7A] dark:text-[#A8E9F6]' : 'text-gray-600 dark:text-gray-500'}`}>
        {icon}
      </span>
      <span className={checked ? 'text-[#1E425B] dark:text-white' : 'text-gray-700 dark:text-gray-400'}>
        {text}
      </span>
    </li>
  );
};

export default PricingPage;