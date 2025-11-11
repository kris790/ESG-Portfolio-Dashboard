import React from 'react';
import { SparklesIcon, ChartBarIcon, GlobeAltIcon, ChatBubbleLeftRightIcon } from './icons';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 sm:p-12 min-h-[40rem] text-center">
      <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-full mb-6">
        <SparklesIcon className="w-8 h-8 text-indigo-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to Your ESG Dashboard</h2>
      <p className="mt-3 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
        Start building a sustainable portfolio. Add your first stock holding using the form on the left to unlock powerful insights and visualizations.
      </p>

      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300">
                <GlobeAltIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Track ESG Scores</h4>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Monitor Environmental, Social, and Governance risk scores for each of your holdings.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <ChartBarIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Visualize Your Portfolio</h4>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Use interactive charts to compare your portfolio's ESG performance against benchmarks.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Get AI-Powered Insights</h4>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Chat with an AI assistant that understands your portfolio's context to get deeper insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
