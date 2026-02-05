import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
  showCompany?: boolean;
  companyName?: string;
}

export function ReviewCard({ review, showCompany, companyName }: ReviewCardProps) {
  const timeAgo = getTimeAgo(review.created_at);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          {showCompany && companyName && (
            <p className="text-sm text-brand-600 font-medium mb-1">{companyName}</p>
          )}
          <h3 className="font-semibold text-lg">{review.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <StarRating rating={review.rating_overall} size="sm" />
            <span className="text-sm text-gray-500">
              GAZDA Score <strong className="text-brand-600">{review.gazda_rating}/10</strong>
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-400">{timeAgo}</span>
      </div>

      {/* Job info */}
      {review.job_title && (
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{review.job_title}</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
            {review.employment_status === "current" ? "Trenutno zaposlen/a" : "Bivši zaposlenik"}
          </span>
          {review.years_at_company && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">{review.years_at_company} god.</span>
          )}
        </div>
      )}

      {/* Pros & Cons */}
      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">✅ Prednosti</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{review.pros}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-1">❌ Nedostaci</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{review.cons}</p>
        </div>
        {review.advice_to_management && (
          <div>
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">💡 Savjet upravi</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{review.advice_to_management}</p>
          </div>
        )}
      </div>

      {/* Employer Response */}
      {review.employer_response && (
        <div className="mt-4 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-lg">
          <p className="text-xs font-semibold text-brand-700 mb-1">🏢 Odgovor poslodavca</p>
          <p className="text-sm">{review.employer_response}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button className="text-xs text-gray-400 hover:text-brand-500 transition-colors">
          👍 Korisno ({review.helpful_count})
        </button>
        <button className="text-xs text-gray-400 hover:text-red-500 transition-colors">
          🚩 Prijavi
        </button>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 3600) return `prije ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `prije ${Math.floor(diff / 3600)}h`;
  if (diff < 2592000) return `prije ${Math.floor(diff / 86400)} dana`;
  if (diff < 31536000) return `prije ${Math.floor(diff / 2592000)} mj.`;
  return `prije ${Math.floor(diff / 31536000)} god.`;
}
