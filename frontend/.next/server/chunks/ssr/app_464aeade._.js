module.exports = {

"[project]/app/Listings/listings.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/app/Profile/page.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/Listings/listings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
const ProfilePage = ()=>{
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isEditModalOpen, setIsEditModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editFormData, setEditFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        twitter: '',
        linkedin: '',
        facebook: ''
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setCurrentUser(parsedData);
            setEditFormData({
                twitter: parsedData.socials?.twitter || '',
                linkedin: parsedData.socials?.linkedin || '',
                facebook: parsedData.socials?.facebook || ''
            });
        } else {
            // If no user data, redirect to login/registration
            router.push('/Registration');
        }
    }, [
        router
    ]);
    const handleEditFormChange = (e)=>{
        const { name, value } = e.target;
        setEditFormData((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    // Filter listings to find those belonging to the current user
    const userListings = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["propertiesData"],
        ...__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$Listings$2f$listings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vehiclesData"]
    ].filter((item)=>item.agent?.name === currentUser?.fullName);
    const salesCount = userListings.filter((item)=>item.status === 'Sold').length;
    const handleEditFormSubmit = (e)=>{
        e.preventDefault();
        if (currentUser) {
            const updatedUser = {
                ...currentUser,
                socials: editFormData
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
            setIsEditModalOpen(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('Profile updated successfully!');
        }
    };
    const StatCard = ({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white/10 p-4 rounded-lg text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-2xl font-bold text-teal-400",
                    children: value
                }, void 0, false, {
                    fileName: "[project]/app/Profile/page.jsx",
                    lineNumber: 64,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-400",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/app/Profile/page.jsx",
                    lineNumber: 65,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/Profile/page.jsx",
            lineNumber: 63,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    const ListingCard = ({ item })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: `/Listings/${item.id}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white/5 rounded-lg overflow-hidden group border border-gray-800 hover:border-teal-500 transition-all duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: item.image,
                                alt: item.name,
                                className: "w-full h-48 object-cover"
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${item.status === 'Active' ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`,
                                children: item.status
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Profile/page.jsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-lg truncate group-hover:text-teal-400",
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-sm",
                                children: item.price
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Profile/page.jsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/Profile/page.jsx",
                lineNumber: 71,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/Profile/page.jsx",
            lineNumber: 70,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    if (!currentUser) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-black text-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading profile..."
            }, void 0, false, {
                fileName: "[project]/app/Profile/page.jsx",
                lineNumber: 89,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/Profile/page.jsx",
            lineNumber: 88,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white py-12 mt-16 px-4 sm:px-6 lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
                position: "top-center",
                reverseOrder: false
            }, void 0, false, {
                fileName: "[project]/app/Profile/page.jsx",
                lineNumber: 96,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 p-8 rounded-2xl shadow-2xl border border-gray-800 md:flex gap-8 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 mb-6 md:mb-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: currentUser.avatar,
                                    alt: currentUser.fullName,
                                    className: "w-32 h-32 rounded-full border-4 border-teal-500 mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-grow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-3xl font-bold",
                                                        children: currentUser.fullName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 106,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-teal-400",
                                                        children: [
                                                            "@",
                                                            currentUser.userName,
                                                            " • ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "capitalize",
                                                                children: currentUser.userType
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/Profile/page.jsx",
                                                                lineNumber: 107,
                                                                columnNumber: 72
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 107,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 105,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsEditModalOpen(true),
                                                className: "flex items-center gap-2 text-gray-300 hover:text-white border border-gray-600 px-3 py-1 rounded-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiEdit"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 110,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Edit Profile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 111,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 104,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 mt-4",
                                        children: currentUser.bio
                                    }, void 0, false, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex flex-wrap gap-x-6 gap-y-2 text-gray-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiMail"], {}, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 116,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    currentUser.email || 'N/A'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiPhone"], {}, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 117,
                                                        columnNumber: 57
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    currentUser.phoneNumber || 'N/A'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 117,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex items-center gap-4",
                                        children: [
                                            currentUser.socials?.twitter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: currentUser.socials.twitter,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-gray-400 hover:text-teal-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiTwitter"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 120,
                                                    columnNumber: 174
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 120,
                                                columnNumber: 48
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            currentUser.socials?.linkedin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: currentUser.socials.linkedin,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-gray-400 hover:text-teal-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiLinkedin"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 121,
                                                    columnNumber: 176
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 121,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            currentUser.socials?.facebook && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: currentUser.socials.facebook,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-gray-400 hover:text-teal-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiFacebook"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 122,
                                                    columnNumber: 176
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/Profile/page.jsx",
                                                lineNumber: 122,
                                                columnNumber: 49
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Profile/page.jsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Total Listings",
                                value: userListings.length
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Properties Sold",
                                value: salesCount
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Profile Views",
                                value: "1.2k"
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                                label: "Member Since",
                                value: "2023"
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Profile/page.jsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-teal-400 mb-6",
                                children: "My Listings"
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            userListings.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                                children: userListings.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ListingCard, {
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12 bg-white/5 rounded-lg border border-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: "You haven't listed any items yet."
                                    }, void 0, false, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/Listings/add",
                                        className: "mt-4 inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg",
                                        children: "Create a Listing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/Profile/page.jsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/Profile/page.jsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/Profile/page.jsx",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isEditModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-900 border border-gray-700 rounded-2xl shadow-xl w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center p-4 border-b border-gray-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-teal-400",
                                    children: "Edit Social Links"
                                }, void 0, false, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsEditModalOpen(false),
                                    className: "text-gray-400 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/app/Profile/page.jsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Profile/page.jsx",
                            lineNumber: 159,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleEditFormSubmit,
                            className: "p-6 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "twitter",
                                            className: "block text-sm font-medium text-gray-400 mb-1",
                                            children: "Twitter URL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-teal-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiTwitter"], {}, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 169,
                                                        columnNumber: 92
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 169,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    id: "twitter",
                                                    name: "twitter",
                                                    value: editFormData.twitter,
                                                    onChange: handleEditFormChange,
                                                    placeholder: "https://twitter.com/username",
                                                    className: "w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "linkedin",
                                            className: "block text-sm font-medium text-gray-400 mb-1",
                                            children: "LinkedIn URL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-teal-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiLinkedin"], {}, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 176,
                                                        columnNumber: 92
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    id: "linkedin",
                                                    name: "linkedin",
                                                    value: editFormData.linkedin,
                                                    onChange: handleEditFormChange,
                                                    placeholder: "https://linkedin.com/in/username",
                                                    className: "w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 177,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 175,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "facebook",
                                            className: "block text-sm font-medium text-gray-400 mb-1",
                                            children: "Facebook URL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-teal-400",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FiFacebook"], {}, void 0, false, {
                                                        fileName: "[project]/app/Profile/page.jsx",
                                                        lineNumber: 183,
                                                        columnNumber: 92
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 183,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "url",
                                                    id: "facebook",
                                                    name: "facebook",
                                                    value: editFormData.facebook,
                                                    onChange: handleEditFormChange,
                                                    placeholder: "https://facebook.com/username",
                                                    className: "w-full pl-10 bg-gray-800 border border-gray-600 rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-teal-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/Profile/page.jsx",
                                                    lineNumber: 184,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 182,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end gap-4 pt-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsEditModalOpen(false),
                                            className: "px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-semibold",
                                            children: "Save Changes"
                                        }, void 0, false, {
                                            fileName: "[project]/app/Profile/page.jsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/Profile/page.jsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/Profile/page.jsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/Profile/page.jsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/app/Profile/page.jsx",
                lineNumber: 157,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/Profile/page.jsx",
        lineNumber: 95,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ProfilePage;
}),

};

//# sourceMappingURL=app_464aeade._.js.map