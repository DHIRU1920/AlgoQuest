import React, { useState, useEffect } from "react";
import api from "../utils/api";
import {
  Calendar,
  ExternalLink,
  RefreshCw,
  Code,
  Clock,
  Tag,
  AlertCircle,
} from "lucide-react";

const DailyChallenge = () => {
  const [dailyProblem, setDailyProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyProblem();
  }, []);

  const fetchDailyProblem = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/problems/random");

      if (response.data?.success) {
        setDailyProblem(response.data.data);
      } else {
        setError("Failed to load daily challenge");
      }
    } catch (err) {
      console.error("Error fetching daily problem:", err);
      setError("Unable to fetch daily challenge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "hard":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-muted bg-muted/10 border-muted/30";
    }
  };

  /* ---------- LOADING ---------- */

  if (loading) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text">
            Daily Coding Challenge
          </h2>
          <Calendar className="h-6 w-6 text-brand" />
        </div>

        <div className="flex items-center justify-center h-36">
          <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-brand"></div>
        </div>
      </div>
    );
  }

  /* ---------- ERROR ---------- */

  if (error) {
    return (
      <div className="bg-card rounded-2xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text">
            Daily Coding Challenge
          </h2>
          <Calendar className="h-6 w-6 text-brand" />
        </div>

        <div className="flex flex-col items-center justify-center h-36 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <p className="text-muted mb-4">{error}</p>

          <button
            onClick={fetchDailyProblem}
            className="flex items-center space-x-2 px-4 py-2 bg-brand text-black rounded-xl hover:opacity-90 transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  /* ---------- MAIN ---------- */

  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-text">
          Daily Coding Challenge
        </h2>

        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-brand" />

          <button
            onClick={fetchDailyProblem}
            className="p-2 text-muted hover:text-text hover:bg-sidebar rounded-xl transition-all duration-200"
            title="Get new challenge"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {dailyProblem && (
        <div className="space-y-5">
          {/* Title */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-text flex items-start gap-2 leading-snug">
              <Code className="h-5 w-5 text-brand mt-1 shrink-0" />
              <span className="break-words">{dailyProblem.title}</span>
            </h3>

            {/* Difficulty */}
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                  dailyProblem.difficulty
                )}`}
              >
                {dailyProblem.difficulty || "Easy"}
              </span>

              <div className="flex items-center gap-1 text-muted text-sm">
                <Clock className="h-4 w-4" />
                <span>Daily Challenge</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {dailyProblem.tags && dailyProblem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {dailyProblem.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 px-2.5 py-1 bg-sidebar text-text rounded-lg text-xs border border-gray-700"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}

              {dailyProblem.tags.length > 5 && (
                <span className="px-2 py-1 bg-sidebar text-muted rounded-lg text-xs border border-gray-700">
                  +{dailyProblem.tags.length - 5} more
                </span>
              )}
            </div>
          )}

          {/* Button */}
          <div className="pt-4 border-t border-gray-700">
            <a
              href={dailyProblem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-black font-medium rounded-xl hover:opacity-90 transition-all duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Solve on LeetCode
            </a>
          </div>

          {/* Tip */}
          <div className="bg-sidebar rounded-xl p-4 border border-gray-700">
            <p className="text-muted text-sm leading-relaxed">
              💡 <span className="text-text font-semibold">Pro Tip:</span> Try
              solving the problem without checking the solution first. If stuck,
              step away for 10 minutes — your brain continues working in the
              background.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
