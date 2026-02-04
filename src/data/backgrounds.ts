import { CSSProperties } from "react";

export interface Background {
    id: string;
    name: string;
    css: string;
    previewStyle: CSSProperties;
}

export const backgrounds: Background[] = [
    {
        id: "bg-01",
        name: "Soft Gradient",
        css: "background: linear-gradient(135deg, #f5d0fe, #bae6fd);",
        previewStyle: { background: "linear-gradient(135deg, #f5d0fe, #bae6fd)" },
    },
    {
        id: "bg-02",
        name: "Midnight Aura",
        css: "background: radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460);",
        previewStyle: { background: "radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460)" },
    },
    {
        id: "bg-03",
        name: "Sunny Day",
        css: "background: linear-gradient(to right, #ff7e5f, #feb47b);",
        previewStyle: { background: "linear-gradient(to right, #ff7e5f, #feb47b)" },
    },
    {
        id: "bg-04",
        name: "Cool Blues",
        css: "background: linear-gradient(to top, #2193b0, #6dd5ed);",
        previewStyle: { background: "linear-gradient(to top, #2193b0, #6dd5ed)" },
    },
    {
        id: "bg-05",
        name: "Neon Life",
        css: "background: linear-gradient(to right, #c33764, #1d2671);",
        previewStyle: { background: "linear-gradient(to right, #c33764, #1d2671)" },
    },
    {
        id: "bg-06",
        name: "Purplin",
        css: "background: linear-gradient(to right, #8360c3, #2ebf91);",
        previewStyle: { background: "linear-gradient(to right, #8360c3, #2ebf91)" },
    },
    {
        id: "bg-07",
        name: "Piggy Pink",
        css: "background: linear-gradient(to top, #ee9ca7, #ffdde1);",
        previewStyle: { background: "linear-gradient(to top, #ee9ca7, #ffdde1)" },
    },
    {
        id: "bg-08",
        name: "Deep Space",
        css: "background: linear-gradient(to bottom, #000428, #004e92);",
        previewStyle: { background: "linear-gradient(to bottom, #000428, #004e92)" },
    },
    {
        id: "bg-09",
        name: "Metal Mist",
        css: "background: linear-gradient(to bottom, #bdc3c7, #2c3e50);",
        previewStyle: { background: "linear-gradient(to bottom, #bdc3c7, #2c3e50)" },
    },
    {
        id: "bg-10",
        name: "Morning Dew",
        css: "background: linear-gradient(to right, #56ab2f, #a8e063);",
        previewStyle: { background: "linear-gradient(to right, #56ab2f, #a8e063)" },
    },
    {
        id: "bg-11",
        name: "Juicy Orange",
        css: "background: linear-gradient(to right, #fc4a1a, #f7b733);",
        previewStyle: { background: "linear-gradient(to right, #fc4a1a, #f7b733)" },
    },
    {
        id: "bg-12",
        name: "Rose Water",
        css: "background: linear-gradient(to bottom, #e55d87, #5fc3e4);",
        previewStyle: { background: "linear-gradient(to bottom, #e55d87, #5fc3e4)" },
    },
];
