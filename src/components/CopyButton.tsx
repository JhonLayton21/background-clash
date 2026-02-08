import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`
        flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md transition-all duration-300 shadow-lg
        font-medium text-sm
        ${copied
                    ? "bg-green-500/95 text-white border-green-400"
                    : "bg-white/95 text-gray-900 hover:bg-white/100 border-gray-300 hover:shadow-md hover:scale-105 active:scale-95"
                }
        border
      `}
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy CSS"}
        </button>
    );
}
