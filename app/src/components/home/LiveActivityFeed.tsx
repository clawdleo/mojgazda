"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: "review" | "salary" | "view";
  company: string;
  companySlug: string;
  location: string;
  country: string;
  timestamp: Date;
  details?: string;
}

// Simulated live activity - in production this would come from a websocket/API
const generateActivity = (): ActivityItem => {
  const activities = [
    { type: "review" as const, companies: [
      { name: "Rimac Technology", slug: "rimac", city: "Zagreb", country: "HR" },
      { name: "Infobip", slug: "infobip", city: "Zagreb", country: "HR" },
      { name: "Nordeus", slug: "nordeus", city: "Beograd", country: "RS" },
      { name: "Krka d.d.", slug: "krka-dd", city: "Novo Mesto", country: "SI" },
      { name: "BH Telecom", slug: "bh-telecom", city: "Sarajevo", country: "BA" },
    ]},
    { type: "salary" as const, companies: [
      { name: "Podravka", slug: "podravka", city: "Koprivnica", country: "HR" },
      { name: "Lek d.d.", slug: "lek-dd", city: "Ljubljana", country: "SI" },
      { name: "Comtrade", slug: "comtrade", city: "Beograd", country: "RS" },
      { name: "ASA Group", slug: "asa-group", city: "Sarajevo", country: "BA" },
    ]},
    { type: "view" as const, companies: [
      { name: "Konzum", slug: "konzum", city: "Zagreb", country: "HR" },
      { name: "Mercator d.d.", slug: "mercator-dd", city: "Ljubljana", country: "SI" },
      { name: "Telekom Srbija", slug: "telekom-srbija", city: "Beograd", country: "RS" },
    ]},
  ];

  const activityType = activities[Math.floor(Math.random() * activities.length)];
  const company = activityType.companies[Math.floor(Math.random() * activityType.companies.length)];
  
  const roles = ["Software Developer", "Prodajni savjetnik", "Marketing manager", "HR specijalist", "Financijski analitičar", "Projektni voditelj"];
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    type: activityType.type,
    company: company.name,
    companySlug: company.slug,
    location: company.city,
    country: company.country,
    timestamp: new Date(),
    details: activityType.type === "salary" ? roles[Math.floor(Math.random() * roles.length)] : undefined,
  };
};

const getCountryFlag = (code: string) => {
  const flags: Record<string, string> = { SI: "🇸🇮", HR: "🇭🇷", RS: "🇷🇸", BA: "🇧🇦" };
  return flags[code] || "🌍";
};

const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "upravo sada";
  if (seconds < 120) return "prije 1 min";
  if (seconds < 3600) return `prije ${Math.floor(seconds / 60)} min`;
  return `prije ${Math.floor(seconds / 3600)} h`;
};

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initial activities
    const initial = Array.from({ length: 5 }, () => {
      const activity = generateActivity();
      activity.timestamp = new Date(Date.now() - Math.random() * 1800000); // Last 30 min
      return activity;
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initial);

    // Add new activity every 8-15 seconds
    const interval = setInterval(() => {
      if (isLive) {
        setActivities(prev => {
          const newActivity = generateActivity();
          return [newActivity, ...prev.slice(0, 4)];
        });
      }
    }, 8000 + Math.random() * 7000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Update timestamps every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => [...prev]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review": return "📝";
      case "salary": return "💰";
      case "view": return "👀";
      default: return "📌";
    }
  };

  const getActivityText = (item: ActivityItem) => {
    switch (item.type) {
      case "review":
        return <>Nova recenzija za <strong>{item.company}</strong></>;
      case "salary":
        return <>Prijavljena plaća za <strong>{item.details}</strong> u {item.company}</>;
      case "view":
        return <><strong>{Math.floor(Math.random() * 20 + 5)}</strong> osoba gleda {item.company}</>;
      default:
        return <>Aktivnost na {item.company}</>;
    }
  };

  return (
    <div className="bg-gradient-to-r from-brand-50 to-teal-50 dark:from-brand-900/20 dark:to-teal-900/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <h3 className="font-semibold text-gray-900 dark:text-white">Aktivnost upravo sada</h3>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`text-xs px-2 py-1 rounded-full transition-colors ${
            isLive 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
              : "bg-gray-100 text-gray-500 dark:bg-gray-700"
          }`}
        >
          {isLive ? "LIVE" : "Pauzirano"}
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((item, index) => (
          <Link
            key={item.id}
            href={`/company/${item.companySlug}`}
            className={`flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl 
                       hover:shadow-md transition-all hover:-translate-y-0.5 border border-gray-100 
                       dark:border-gray-700 ${index === 0 ? "animate-pulse-once" : ""}`}
          >
            <span className="text-xl">{getActivityIcon(item.type)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {getActivityText(item)}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                {getCountryFlag(item.country)} {item.location} - {getTimeAgo(item.timestamp)}
              </p>
            </div>
            <span className="text-gray-400 text-sm">→</span>
          </Link>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xs text-gray-500">
          Danas: <strong className="text-brand-600">127</strong> novih recenzija - 
          <strong className="text-brand-600"> 89</strong> prijavljenih plaća
        </p>
      </div>
    </div>
  );
}
