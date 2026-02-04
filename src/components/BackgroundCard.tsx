import type { Background } from "../data/backgrounds";

interface BackgroundCardProps {
    background: Background;
}

export function BackgroundCard({ background }: BackgroundCardProps) {
    return (
        <button
            className="group flex flex-col gap-2 rounded-xl p-2 transition-all hover:bg-gray-100 cursor-pointer text-left w-full border border-transparent hover:border-gray-200"
            type="button"
        >
            <div
                className="aspect-video w-full rounded-lg shadow-sm ring-1 ring-black/5 transition-all group-hover:shadow-md"
                style={background.previewStyle}
            />
            <div className="flex items-center justify-between px-1">
                <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                    {background.name}
                </span>
            </div>
        </button>
    );
}
