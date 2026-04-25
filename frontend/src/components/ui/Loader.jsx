export default function Loader({ text = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">{text}</p>
        </div>
    );
}