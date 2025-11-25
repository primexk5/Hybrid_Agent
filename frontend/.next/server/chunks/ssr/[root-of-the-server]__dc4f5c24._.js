module.exports = {

"[project]/.next-internal/server/app/Listings/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/app/Listings/listings.js [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "propertiesData": ()=>propertiesData,
    "vehiclesData": ()=>vehiclesData
});
const propertiesData = [
    {
        id: 1,
        name: 'Luxury Villa',
        status: 'Active',
        price: '$1,200,000',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
        type: 'Villa',
        location: 'Beverly Hills, CA',
        bedrooms: 5,
        landSize: '2 acres',
        description: 'A stunning luxury villa with panoramic views, a private pool, and state-of-the-art amenities.',
        agent: {
            name: 'Jane Doe',
            location: 'Beverly Hills, CA',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        reviews: [
            {
                id: 1,
                author: 'John D.',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                rating: 5,
                date: 'Nov 01, 2023',
                text: 'Absolutely breathtaking views and incredible amenities. Worth every penny.'
            },
            {
                id: 2,
                author: 'Jane S.',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                rating: 4,
                date: 'Oct 15, 2023',
                text: 'A wonderful stay. The pool area is fantastic.'
            }
        ]
    },
    {
        id: 2,
        name: 'Cozy Cottage',
        status: 'Sold',
        price: '$450,000',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
        type: 'Cottage',
        location: 'The Cotswolds, UK',
        bedrooms: 3,
        landSize: '0.5 acres',
        description: 'A charming and cozy cottage nestled in the heart of the picturesque Cotswolds.',
        agent: {
            name: 'John Smith',
            location: 'London, UK',
            phone: '+44-20-7946-0958',
            email: 'john.smith@hybridagent.co.uk',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 3,
        name: 'Modern Apartment',
        status: 'Active',
        price: '$750,000',
        image: 'https://images.unsplash.com/photo-1493809842344-ab6181ba96a2?q=80&w=2070&auto=format&fit=crop',
        type: 'Apartment',
        location: 'New York, NY',
        bedrooms: 2,
        landSize: 'N/A',
        description: 'A sleek and modern apartment in a prime downtown location, perfect for urban living.',
        agent: {
            name: 'Alex Johnson',
            location: 'New York, NY',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        },
        reviews: [
            {
                id: 1,
                author: 'Alex R.',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                rating: 5,
                date: 'Nov 10, 2023',
                text: 'The location is unbeatable and the apartment itself is top-notch. I felt like I was living in the future.'
            }
        ]
    },
    {
        id: 4,
        name: 'Beach House',
        status: 'Active',
        price: '$980,000',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
        type: 'House',
        location: 'Malibu, CA',
        bedrooms: 4,
        landSize: '1 acre',
        description: 'An exquisite beach house with direct access to the ocean and breathtaking sunset views.',
        agent: {
            name: 'Emily White',
            location: 'Malibu, CA',
            phone: '+1-555-0104',
            email: 'emily.white@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        }
    },
    {
        id: 5,
        name: 'Mountain Cabin',
        status: 'Sold',
        price: '$600,000',
        image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070&auto=format&fit=crop',
        type: 'Cabin',
        location: 'Aspen, CO',
        bedrooms: 4,
        landSize: '5 acres',
        description: 'A rustic yet luxurious mountain cabin, ideal for getaways and enjoying nature.',
        agent: {
            name: 'Michael Brown',
            location: 'Aspen, CO',
            phone: '+1-555-0105',
            email: 'michael.b@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
        }
    },
    {
        id: 6,
        name: 'Urban Loft',
        status: 'Active',
        price: '$820,000',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop',
        type: 'Loft',
        location: 'Chicago, IL',
        bedrooms: 1,
        landSize: 'N/A',
        description: 'A stylish urban loft with an open floor plan, high ceilings, and industrial-chic design.',
        agent: {
            name: 'Jane Doe',
            location: 'Beverly Hills, CA',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        }
    },
    {
        id: 7,
        name: 'Seaside Bungalow',
        status: 'Active',
        price: '$650,000',
        image: 'https://picsum.photos/seed/house4/1600/900',
        type: 'Bungalow',
        location: 'Key West, FL',
        bedrooms: 2,
        landSize: '0.3 acres',
        description: 'A charming seaside bungalow with a private dock and beautiful ocean views.',
        agent: {
            name: 'John Smith',
            location: 'Miami, FL',
            phone: '+1-555-0102',
            email: 'john.smith@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 8,
        name: 'Penthouse Suite',
        status: 'Active',
        price: '$1,450,000',
        image: 'https://picsum.photos/seed/house5/1600/900',
        type: 'Penthouse',
        location: 'Miami, FL',
        bedrooms: 3,
        landSize: 'N/A',
        description: 'Luxurious penthouse suite with a rooftop terrace and stunning city skyline views.',
        agent: {
            name: 'Alex Johnson',
            location: 'Miami, FL',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
    },
    {
        id: 9,
        name: 'Farmhouse',
        status: 'Active',
        price: '$520,000',
        image: 'https://picsum.photos/seed/house6/1600/900',
        type: 'Farmhouse',
        location: 'Rural, TX',
        bedrooms: 4,
        landSize: '10 acres',
        description: 'A classic farmhouse with modern updates, surrounded by acres of beautiful farmland.',
        agent: {
            name: 'Emily White',
            location: 'Austin, TX',
            phone: '+1-555-0104',
            email: 'emily.white@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        }
    },
    {
        id: 10,
        name: 'Townhouse',
        status: 'Sold',
        price: '$380,000',
        image: 'https://picsum.photos/seed/house7/1600/900',
        type: 'Townhouse',
        location: 'Boston, MA',
        bedrooms: 3,
        landSize: '0.1 acres',
        description: 'A historic townhouse in a quiet, tree-lined neighborhood, close to downtown.',
        agent: {
            name: 'Michael Brown',
            location: 'Boston, MA',
            phone: '+1-555-0105',
            email: 'michael.b@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
        }
    },
    {
        id: 11,
        name: 'Studio Loft',
        status: 'Active',
        price: '$220,000',
        image: 'https://picsum.photos/seed/house8/1600/900',
        type: 'Studio',
        location: 'Portland, OR',
        bedrooms: 1,
        landSize: 'N/A',
        description: 'A compact and stylish studio loft, perfect for a single professional or artist.',
        agent: {
            name: 'Jane Doe',
            location: 'Portland, OR',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        }
    },
    {
        id: 12,
        name: 'Countryside Estate',
        status: 'Active',
        price: '$980,000',
        image: 'https://picsum.photos/seed/house9/1600/900',
        type: 'Estate',
        location: 'Napa Valley, CA',
        bedrooms: 6,
        landSize: '15 acres',
        description: 'A sprawling countryside estate with vineyards, a guest house, and a large pool.',
        agent: {
            name: 'John Smith',
            location: 'Napa Valley, CA',
            phone: '+1-555-0102',
            email: 'john.smith@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 13,
        name: 'Lake House',
        status: 'Active',
        price: '$720,000',
        image: 'https://picsum.photos/seed/house10/1600/900',
        type: 'House',
        location: 'Lake Tahoe, NV',
        bedrooms: 4,
        landSize: '1.5 acres',
        description: 'A beautiful lake house with a private beach and stunning views of the water.',
        agent: {
            name: 'Alex Johnson',
            location: 'Lake Tahoe, NV',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
    },
    {
        id: 14,
        name: 'City Penthouse',
        status: 'Active',
        price: '$2,200,000',
        image: 'https://picsum.photos/seed/house11/1600/900',
        type: 'Penthouse',
        location: 'San Francisco, CA',
        bedrooms: 3,
        landSize: 'N/A',
        description: 'An ultra-modern penthouse with floor-to-ceiling windows and 360-degree city views.',
        agent: {
            name: 'Michael Brown',
            location: 'San Francisco, CA',
            phone: '+1-555-0105',
            email: 'michael.b@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
        }
    }
];
const vehiclesData = [
    {
        id: 201,
        name: 'Sports Car',
        status: 'Active',
        price: '$80,000',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
        color: 'Red',
        brand: 'Ferrari',
        year: 2022,
        fuelType: 'Gas',
        description: 'A high-performance sports car with a powerful V8 engine and aerodynamic design.',
        agent: {
            name: 'Jane Doe',
            location: 'Beverly Hills, CA',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
        reviews: [
            {
                id: 1,
                author: 'Chris G.',
                avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
                rating: 5,
                date: 'Oct 28, 2023',
                text: 'An absolute dream to drive. The handling is sublime and it turns heads everywhere.'
            }
        ]
    },
    {
        id: 202,
        name: 'SUV',
        status: 'Active',
        price: '$55,000',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
        color: 'Black',
        brand: 'Porsche',
        year: 2023,
        fuelType: 'Gas',
        description: 'A luxury SUV that combines performance, comfort, and cutting-edge technology.',
        agent: {
            name: 'John Smith',
            location: 'New York, NY',
            phone: '+1-555-0102',
            email: 'john.smith@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 203,
        name: 'Electric Bike',
        status: 'Sold',
        price: '$5,000',
        image: 'https://images.unsplash.com/photo-1622093393794-45c5b8a43429?q=80&w=1932&auto=format&fit=crop',
        color: 'White',
        brand: 'Super73',
        year: 2023,
        fuelType: 'Electric',
        description: 'A powerful electric bike with a long-range battery, perfect for city commuting.',
        agent: {
            name: 'Alex Johnson',
            location: 'Miami, FL',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        },
        reviews: [
            {
                id: 1,
                author: 'Mia K.',
                avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
                rating: 5,
                date: 'Sep 05, 2023',
                text: 'So much fun! I use it for my daily commute and it\'s been a game-changer.'
            },
            {
                id: 2,
                author: 'Leo F.',
                avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
                rating: 4,
                date: 'Aug 20, 2023',
                text: 'Great bike, very powerful. The battery life is good but could be slightly better on steep hills.'
            }
        ]
    },
    {
        id: 204,
        name: 'Convertible',
        status: 'Sold',
        price: '$65,000',
        image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?q=80&w=2070&auto=format&fit=crop',
        color: 'Blue',
        brand: 'BMW',
        year: 2021,
        fuelType: 'Gas',
        description: 'A stylish convertible with a retractable hardtop, offering an exhilarating open-air driving experience.',
        agent: {
            name: 'Emily White',
            location: 'Chicago, IL',
            phone: '+1-555-0104',
            email: 'emily.white@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        }
    },
    {
        id: 205,
        name: 'Pickup Truck',
        status: 'Active',
        price: '$40,000',
        image: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?q=80&w=2070&auto=format&fit=crop',
        color: 'Silver',
        brand: 'Ford',
        year: 2022,
        fuelType: 'Gas',
        description: 'A rugged and reliable pickup truck with excellent towing capacity and off-road capabilities.',
        agent: {
            name: 'Michael Brown',
            location: 'Austin, TX',
            phone: '+1-555-0105',
            email: 'michael.b@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
        }
    },
    {
        id: 206,
        name: 'Classic Motorcycle',
        status: 'Active',
        price: '$12,000',
        image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=2070&auto=format&fit=crop',
        color: 'Green',
        brand: 'Triumph',
        year: 1978,
        fuelType: 'Gas',
        description: 'A beautifully restored classic motorcycle, a true collector\'s item with timeless appeal.',
        agent: {
            name: 'Jane Doe',
            location: 'Portland, OR',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        }
    },
    // Additional vehicles (continuing ids)
    {
        id: 207,
        name: 'Coupe',
        status: 'Active',
        price: '$45,000',
        image: 'https://picsum.photos/seed/car4/1600/900',
        color: 'Gray',
        brand: 'Audi',
        year: 2022,
        fuelType: 'Gas',
        description: 'A sporty coupe with a sleek design and a turbocharged engine for thrilling performance.',
        agent: {
            name: 'John Smith',
            location: 'New York, NY',
            phone: '+1-555-0102',
            email: 'john.smith@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        },
        reviews: [
            {
                id: 1,
                author: 'Rina K.',
                date: '2025-07-11',
                rating: 5,
                text: 'Superb handling and acceleration.',
                avatar: 'https://i.pravatar.cc/64?img=15'
            }
        ]
    },
    {
        id: 208,
        name: 'Minivan',
        status: 'Active',
        price: '$28,000',
        image: 'https://picsum.photos/seed/car5/1600/900',
        color: 'White',
        brand: 'Honda',
        year: 2023,
        fuelType: 'Gas',
        description: 'A spacious and practical minivan, perfect for families with plenty of room for passengers and cargo.',
        agent: {
            name: 'Alex Johnson',
            location: 'Chicago, IL',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
    },
    {
        id: 209,
        name: 'Electric Sedan',
        status: 'Active',
        price: '$68,000',
        image: 'https://picsum.photos/seed/car6/1600/900',
        color: 'Silver',
        brand: 'Tesla',
        year: 2023,
        fuelType: 'Electric',
        description: 'A cutting-edge electric sedan with long range, rapid acceleration, and advanced autopilot features.',
        agent: {
            name: 'Emily White',
            location: 'San Francisco, CA',
            phone: '+1-555-0104',
            email: 'emily.white@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        }
    },
    {
        id: 210,
        name: 'Offroad Jeep',
        status: 'Active',
        price: '$52,000',
        image: 'https://picsum.photos/seed/car7/1600/900',
        color: 'Green',
        brand: 'Jeep',
        year: 2022,
        fuelType: 'Gas',
        description: 'A rugged off-road Jeep designed to conquer any terrain, with a durable frame and powerful 4x4 system.',
        agent: {
            name: 'Michael Brown',
            location: 'Denver, CO',
            phone: '+1-555-0105',
            email: 'michael.b@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
        }
    },
    {
        id: 211,
        name: 'Delivery Van',
        status: 'Active',
        price: '$32,000',
        image: 'https://picsum.photos/seed/car8/1600/900',
        color: 'White',
        brand: 'Ford',
        year: 2023,
        fuelType: 'Gas',
        description: 'A reliable and spacious delivery van, perfect for businesses needing to transport goods efficiently.',
        agent: {
            name: 'Jane Doe',
            location: 'New York, NY',
            phone: '+1-555-0101',
            email: 'jane.doe@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
        }
    },
    {
        id: 212,
        name: 'Hybrid Hatchback',
        status: 'Sold',
        price: '$22,000',
        image: 'https://picsum.photos/seed/car9/1600/900',
        color: 'Blue',
        brand: 'Toyota',
        year: 2021,
        fuelType: 'Hybrid',
        description: 'An economical hybrid hatchback with excellent fuel efficiency and a compact, city-friendly design.',
        agent: {
            name: 'John Smith',
            location: 'Seattle, WA',
            phone: '+1-555-0102',
            email: 'john.smith@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg'
        }
    },
    {
        id: 213,
        name: 'Luxury Sedan',
        status: 'Active',
        price: '$120,000',
        image: 'https://picsum.photos/seed/car10/1600/900',
        color: 'Black',
        brand: 'Mercedes-Benz',
        year: 2023,
        fuelType: 'Gas',
        description: 'A premium luxury sedan offering unparalleled comfort, advanced technology, and a smooth, powerful ride.',
        agent: {
            name: 'Alex Johnson',
            location: 'Beverly Hills, CA',
            phone: '+1-555-0103',
            email: 'alex.j@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
        }
    },
    {
        id: 214,
        name: 'Sports Motorcycle',
        status: 'Active',
        price: '$18,000',
        image: 'https://picsum.photos/seed/car11/1600/900',
        color: 'Red',
        brand: 'Ducati',
        year: 2022,
        fuelType: 'Gas',
        description: 'A high-performance sports motorcycle built for speed and agility, with a striking design.',
        agent: {
            name: 'Emily White',
            location: 'Miami, FL',
            phone: '+1-555-0104',
            email: 'emily.white@hybridagent.com',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
        }
    }
];
}),
"[project]/app/Listings/[id]/page.jsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/Listings/listings.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../leaderboard'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
const StarRating = ({ rating })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center",
        children: [
            ...Array(5)
        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiStar"], {
                className: `mr-1 ${i < rating ? 'text-teal-400 fill-current' : 'text-gray-600'}`
            }, i, false, {
                fileName: "[project]/app/Listings/[id]/page.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/app/Listings/[id]/page.jsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
const ItemDetailsPage = ({ params })=>{
    const id = parseInt(params.id, 10);
    const property = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["propertiesData"].find((p)=>p.id === id);
    const vehicle = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["vehiclesData"].find((v)=>v.id === id);
    const agentRankData = item ? leaderboardData.find((agent)=>agent.name === item.agent?.name) : null;
    const item = property || vehicle;
    const isVehicle = !!vehicle;
    if (!item) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-black text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-2xl",
                children: "Item not found."
            }, void 0, false, {
                fileName: "[project]/app/Listings/[id]/page.jsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/Listings/[id]/page.jsx",
            lineNumber: 27,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Listings",
                        className: "text-teal-400 hover:underline",
                        children: "← Back to Listings"
                    }, void 0, false, {
                        fileName: "[project]/app/Listings/[id]/page.jsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/Listings/[id]/page.jsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white/5 rounded-2xl shadow-2xl overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.image,
                                    alt: item.name,
                                    className: "w-full h-96 object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:w-1/2 p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-4xl font-bold text-teal-400",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 48,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-300 mt-2",
                                                        children: isVehicle ? item.brand + ' • ' + (item.year || '') : item.location
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 49,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                lineNumber: 47,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-lg font-semibold px-4 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`,
                                                    children: item.status
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 52,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mt-6 mb-6",
                                        children: item.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiDollarSign"], {
                                                        className: "text-teal-400",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 62,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-400",
                                                                children: "Price"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 64,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-semibold",
                                                                children: item.price
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 65,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isVehicle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiHome"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 72,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Brand"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 74,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.brand
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 75,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 73,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 71,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiMapPin"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 80,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Fuel Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 82,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.fuelType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 83,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 81,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 79,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiGrid"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 88,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Year"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 90,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.year
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 91,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 89,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 87,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiGrid"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 96,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Color"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 98,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.color
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 99,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 97,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiHome"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 106,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Type"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 108,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 109,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 107,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 105,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiMapPin"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 114,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Location"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 116,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.location
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 117,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 115,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 113,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiGrid"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 122,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Bedrooms"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 124,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.bedrooms
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 125,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 123,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 121,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiGrid"], {
                                                                className: "text-teal-400",
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 130,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Land Size"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 132,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold",
                                                                        children: item.landSize
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                        lineNumber: 133,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                lineNumber: 131,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                                        lineNumber: 129,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/Listings/[id]/page.jsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Listings/[id]/page.jsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Listings/[id]/page.jsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/app/Listings/[id]/page.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                item.agent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-teal-400 mb-6",
                            children: "Listed By"
                        }, void 0, false, {
                            fileName: "[project]/app/Listings/[id]/page.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/10 p-6 rounded-2xl shadow-lg border border-gray-800 flex items-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: item.agent.avatar,
                                    alt: item.agent.name,
                                    className: "w-24 h-24 rounded-full border-4 border-teal-500"
                                }, void 0, false, {
                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold",
                                                    children: item.agent.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 150,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                agentRankData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm font-semibold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiAward"], {}, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 153,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Rank #",
                                                                agentRankData.rank
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 154,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 152,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-gray-400 mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiMapPin"], {}, void 0, false, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 159,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item.agent.location
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 160,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                            lineNumber: 158,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 mt-4",
                                            children: [
                                                item.agent.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `tel:${item.agent.phone}`,
                                                    className: "flex items-center gap-2 text-teal-400 hover:underline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiPhone"], {}, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: item.agent.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 166,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 164,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                item.agent.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${item.agent.email}`,
                                                    className: "flex items-center gap-2 text-teal-400 hover:underline",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FiMail"], {}, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: item.agent.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 172,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Listings/[id]/page.jsx",
                            lineNumber: 146,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Listings/[id]/page.jsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                item.reviews && item.reviews.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl font-bold text-teal-400 mb-6",
                            children: "Reviews"
                        }, void 0, false, {
                            fileName: "[project]/app/Listings/[id]/page.jsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: item.reviews.map((review)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white/10 p-6 rounded-2xl shadow-lg border border-gray-800 backdrop-blur-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: review.avatar,
                                                            alt: review.author,
                                                            className: "w-12 h-12 rounded-full mr-4 border-2 border-teal-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    className: "font-bold text-lg",
                                                                    children: review.author
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-400",
                                                                    children: review.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                                            lineNumber: 190,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(StarRating, {
                                                    rating: review.rating
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                                    lineNumber: 195,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-300 leading-relaxed",
                                            children: review.text
                                        }, void 0, false, {
                                            fileName: "[project]/app/Listings/[id]/page.jsx",
                                            lineNumber: 197,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, review.id, true, {
                                    fileName: "[project]/app/Listings/[id]/page.jsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/app/Listings/[id]/page.jsx",
                            lineNumber: 184,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Listings/[id]/page.jsx",
                    lineNumber: 182,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                (!item.reviews || item.reviews.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-center text-gray-400 mt-12",
                    children: "No reviews for this item yet."
                }, void 0, false, {
                    fileName: "[project]/app/Listings/[id]/page.jsx",
                    lineNumber: 205,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/Listings/[id]/page.jsx",
            lineNumber: 35,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/app/Listings/[id]/page.jsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ItemDetailsPage;
}),
"[project]/app/Listings/[id]/page.jsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/Listings/[id]/page.jsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__dc4f5c24._.js.map