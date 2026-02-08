import type { Background } from "../types/background";
import { DEFAULT_CONTROLS } from "../types/background";

export const backgrounds: Background[] = [
    {
        id: "bg-001",
        name: "Soft Gradient",
        description: "Suave transición entre rosa y azul",
        type: "linear",
        colors: [
            { color: "#f5d0fe", stop: 0 },
            { color: "#bae6fd", stop: 100 }
        ],
        angle: 135,
        controls: { ...DEFAULT_CONTROLS },
        category: "soft",
        isFavorite: false,
        seed: "default-soft-001",
        css: "background: linear-gradient(135deg, #f5d0fe, #bae6fd);",
        previewStyle: { background: "linear-gradient(135deg, #f5d0fe, #bae6fd)" },
        export: {
            variants: {
                cssVariable: "--bg-soft-gradient: linear-gradient(135deg, #f5d0fe, #bae6fd);",
                tailwindConfig: "backgroundImage: { softGradient: 'linear-gradient(135deg, #f5d0fe, #bae6fd)' }",
                inlineStyle: "background: linear-gradient(135deg, #f5d0fe, #bae6fd);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-001&seed=default-soft-001",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-002",
        name: "Midnight Aura",
        description: "Efecto radial oscuro con profundidad",
        type: "radial",
        colors: [
            { color: "#1a1a2e", stop: 0 },
            { color: "#16213e", stop: 50 },
            { color: "#0f3460", stop: 100 }
        ],
        radialShape: "circle",
        controls: { ...DEFAULT_CONTROLS },
        category: "dark",
        isFavorite: false,
        seed: "default-dark-001",
        css: "background: radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460);",
        previewStyle: { background: "radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460)" },
        export: {
            variants: {
                cssVariable: "--bg-midnight-aura: radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460);",
                tailwindConfig: "backgroundImage: { midnightAura: 'radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460)' }",
                inlineStyle: "background: radial-gradient(circle at 50% 50%, #1a1a2e, #16213e, #0f3460);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-002&seed=default-dark-001",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-003",
        name: "Sunny Day",
        description: "Cálido gradiente de naranja a amarillo",
        type: "linear",
        colors: [
            { color: "#ff7e5f", stop: 0 },
            { color: "#feb47b", stop: 100 }
        ],
        angle: 90,
        controls: { ...DEFAULT_CONTROLS },
        category: "soft",
        isFavorite: false,
        seed: "default-soft-002",
        css: "background: linear-gradient(to right, #ff7e5f, #feb47b);",
        previewStyle: { background: "linear-gradient(to right, #ff7e5f, #feb47b)" },
        export: {
            variants: {
                cssVariable: "--bg-sunny-day: linear-gradient(to right, #ff7e5f, #feb47b);",
                tailwindConfig: "backgroundImage: { sunnyDay: 'linear-gradient(to right, #ff7e5f, #feb47b)' }",
                inlineStyle: "background: linear-gradient(to right, #ff7e5f, #feb47b);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-003&seed=default-soft-002",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-004",
        name: "Cool Blues",
        type: "linear",
        colors: [
            { color: "#2193b0", stop: 0 },
            { color: "#6dd5ed", stop: 100 }
        ],
        angle: 0,
        controls: { ...DEFAULT_CONTROLS },
        category: "soft",
        isFavorite: false,
        seed: "default-soft-003",
        css: "background: linear-gradient(to top, #2193b0, #6dd5ed);",
        previewStyle: { background: "linear-gradient(to top, #2193b0, #6dd5ed)" },
        export: {
            variants: {
                cssVariable: "--bg-cool-blues: linear-gradient(to top, #2193b0, #6dd5ed);",
                tailwindConfig: "backgroundImage: { coolBlues: 'linear-gradient(to top, #2193b0, #6dd5ed)' }",
                inlineStyle: "background: linear-gradient(to top, #2193b0, #6dd5ed);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-004&seed=default-soft-003",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-005",
        name: "Neon Life",
        type: "linear",
        colors: [
            { color: "#c33764", stop: 0 },
            { color: "#1d2671", stop: 100 }
        ],
        angle: 90,
        controls: { ...DEFAULT_CONTROLS },
        category: "neon",
        isFavorite: false,
        seed: "default-neon-001",
        css: "background: linear-gradient(to right, #c33764, #1d2671);",
        previewStyle: { background: "linear-gradient(to right, #c33764, #1d2671)" },
        export: {
            variants: {
                cssVariable: "--bg-neon-life: linear-gradient(to right, #c33764, #1d2671);",
                tailwindConfig: "backgroundImage: { neonLife: 'linear-gradient(to right, #c33764, #1d2671)' }",
                inlineStyle: "background: linear-gradient(to right, #c33764, #1d2671);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-005&seed=default-neon-001",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-006",
        name: "Purplin",
        type: "linear",
        colors: [
            { color: "#8360c3", stop: 0 },
            { color: "#2ebf91", stop: 100 }
        ],
        angle: 90,
        controls: { ...DEFAULT_CONTROLS },
        category: "pastel",
        isFavorite: false,
        seed: "default-pastel-001",
        css: "background: linear-gradient(to right, #8360c3, #2ebf91);",
        previewStyle: { background: "linear-gradient(to right, #8360c3, #2ebf91)" },
        export: {
            variants: {
                cssVariable: "--bg-purplin: linear-gradient(to right, #8360c3, #2ebf91);",
                tailwindConfig: "backgroundImage: { purplin: 'linear-gradient(to right, #8360c3, #2ebf91)' }",
                inlineStyle: "background: linear-gradient(to right, #8360c3, #2ebf91);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-006&seed=default-pastel-001",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-007",
        name: "Piggy Pink",
        type: "linear",
        colors: [
            { color: "#ee9ca7", stop: 0 },
            { color: "#ffdde1", stop: 100 }
        ],
        angle: 0,
        controls: { ...DEFAULT_CONTROLS },
        category: "pastel",
        isFavorite: false,
        seed: "default-pastel-002",
        css: "background: linear-gradient(to top, #ee9ca7, #ffdde1);",
        previewStyle: { background: "linear-gradient(to top, #ee9ca7, #ffdde1)" },
        export: {
            variants: {
                cssVariable: "--bg-piggy-pink: linear-gradient(to top, #ee9ca7, #ffdde1);",
                tailwindConfig: "backgroundImage: { piggyPink: 'linear-gradient(to top, #ee9ca7, #ffdde1)' }",
                inlineStyle: "background: linear-gradient(to top, #ee9ca7, #ffdde1);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-007&seed=default-pastel-002",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-008",
        name: "Deep Space",
        type: "linear",
        colors: [
            { color: "#000428", stop: 0 },
            { color: "#004e92", stop: 100 }
        ],
        angle: 180,
        controls: { ...DEFAULT_CONTROLS },
        category: "dark",
        isFavorite: false,
        seed: "default-dark-002",
        css: "background: linear-gradient(to bottom, #000428, #004e92);",
        previewStyle: { background: "linear-gradient(to bottom, #000428, #004e92)" },
        export: {
            variants: {
                cssVariable: "--bg-deep-space: linear-gradient(to bottom, #000428, #004e92);",
                tailwindConfig: "backgroundImage: { deepSpace: 'linear-gradient(to bottom, #000428, #004e92)' }",
                inlineStyle: "background: linear-gradient(to bottom, #000428, #004e92);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-008&seed=default-dark-002",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-009",
        name: "Metal Mist",
        type: "linear",
        colors: [
            { color: "#bdc3c7", stop: 0 },
            { color: "#2c3e50", stop: 100 }
        ],
        angle: 180,
        controls: { ...DEFAULT_CONTROLS },
        category: "dark",
        isFavorite: false,
        seed: "default-dark-003",
        css: "background: linear-gradient(to bottom, #bdc3c7, #2c3e50);",
        previewStyle: { background: "linear-gradient(to bottom, #bdc3c7, #2c3e50)" },
        export: {
            variants: {
                cssVariable: "--bg-metal-mist: linear-gradient(to bottom, #bdc3c7, #2c3e50);",
                tailwindConfig: "backgroundImage: { metalMist: 'linear-gradient(to bottom, #bdc3c7, #2c3e50)' }",
                inlineStyle: "background: linear-gradient(to bottom, #bdc3c7, #2c3e50);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-009&seed=default-dark-003",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-010",
        name: "Morning Dew",
        type: "linear",
        colors: [
            { color: "#56ab2f", stop: 0 },
            { color: "#a8e063", stop: 100 }
        ],
        angle: 90,
        controls: { ...DEFAULT_CONTROLS },
        category: "nature",
        isFavorite: false,
        seed: "default-nature-001",
        css: "background: linear-gradient(to right, #56ab2f, #a8e063);",
        previewStyle: { background: "linear-gradient(to right, #56ab2f, #a8e063)" },
        export: {
            variants: {
                cssVariable: "--bg-morning-dew: linear-gradient(to right, #56ab2f, #a8e063);",
                tailwindConfig: "backgroundImage: { morningDew: 'linear-gradient(to right, #56ab2f, #a8e063)' }",
                inlineStyle: "background: linear-gradient(to right, #56ab2f, #a8e063);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-010&seed=default-nature-001",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-011",
        name: "Juicy Orange",
        type: "linear",
        colors: [
            { color: "#fc4a1a", stop: 0 },
            { color: "#f7b733", stop: 100 }
        ],
        angle: 90,
        controls: { ...DEFAULT_CONTROLS },
        category: "soft",
        isFavorite: false,
        seed: "default-soft-004",
        css: "background: linear-gradient(to right, #fc4a1a, #f7b733);",
        previewStyle: { background: "linear-gradient(to right, #fc4a1a, #f7b733)" },
        export: {
            variants: {
                cssVariable: "--bg-juicy-orange: linear-gradient(to right, #fc4a1a, #f7b733);",
                tailwindConfig: "backgroundImage: { juicyOrange: 'linear-gradient(to right, #fc4a1a, #f7b733)' }",
                inlineStyle: "background: linear-gradient(to right, #fc4a1a, #f7b733);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-011&seed=default-soft-004",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    },
    {
        id: "bg-012",
        name: "Rose Water",
        type: "linear",
        colors: [
            { color: "#e55d87", stop: 0 },
            { color: "#5fc3e4", stop: 100 }
        ],
        angle: 180,
        controls: { ...DEFAULT_CONTROLS },
        category: "pastel",
        isFavorite: false,
        seed: "default-pastel-003",
        css: "background: linear-gradient(to bottom, #e55d87, #5fc3e4);",
        previewStyle: { background: "linear-gradient(to bottom, #e55d87, #5fc3e4)" },
        export: {
            variants: {
                cssVariable: "--bg-rose-water: linear-gradient(to bottom, #e55d87, #5fc3e4);",
                tailwindConfig: "backgroundImage: { roseWater: 'linear-gradient(to bottom, #e55d87, #5fc3e4)' }",
                inlineStyle: "background: linear-gradient(to bottom, #e55d87, #5fc3e4);"
            },
            browserSupport: ["all"]
        },
        share: {
            url: "bg-clash.io/preview?id=bg-012&seed=default-pastel-003",
            isShareable: true
        },
        metadata: {
            createdAt: "2026-02-08T00:00:00Z",
            updatedAt: "2026-02-08T00:00:00Z",
            version: 1,
            isEdited: false
        }
    }
];
