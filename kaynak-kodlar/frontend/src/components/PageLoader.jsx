import { HiOutlineRefresh } from 'react-icons/hi';

export default function PageLoader({ label = 'Sayfa hazırlanıyor' }) {
  return (
    <div className="min-h-[45vh] flex items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3 text-surface-500">
        <div className="w-11 h-11 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center">
          <HiOutlineRefresh className="w-5 h-5 text-primary-600 animate-spin" />
        </div>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
