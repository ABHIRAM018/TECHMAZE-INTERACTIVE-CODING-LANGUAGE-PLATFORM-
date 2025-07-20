import React from 'react';
import { getRoadmapData } from '../../utils/roadmapData';
import { CheckCircle } from 'lucide-react';

interface RoadmapContentProps {
  language: string;
}

export function RoadmapContent({ language }: RoadmapContentProps) {
  const roadmapData = getRoadmapData(language);

  return (
    <div className="space-y-10">
      {roadmapData.map((section, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-xl font-semibold text-white bg-slate-700/50 p-3 rounded-lg border-l-4 border-emerald-500">
            {section.title}
          </h3>
          <div className="pl-4 space-y-4">
            {section.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="flex items-start space-x-3 bg-slate-700/30 p-4 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="mt-1 text-emerald-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white">{topic.name}</h4>
                  {topic.description && (
                    <p className="text-gray-400 mt-1">
                      {topic.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}