export const propertiesData = [
    { 
      id: 1, name: 'Luxury Villa', status:'Active', price: '$1,200,000', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop', type: 'Villa', location: 'Beverly Hills, CA', bedrooms: 5, landSize: '2 acres', description: 'A stunning luxury villa with panoramic views, a private pool, and state-of-the-art amenities.',
      reviews: [
        { id: 1, author: 'John D.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, date: 'Nov 01, 2023', text: 'Absolutely breathtaking views and incredible amenities. Worth every penny.' },
        { id: 2, author: 'Jane S.', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 4, date: 'Oct 15, 2023', text: 'A wonderful stay. The pool area is fantastic.' },
      ]
    },
    { id: 2, name: 'Cozy Cottage', status:'Sold', price: '$450,000', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop', type: 'Cottage', location: 'The Cotswolds, UK', bedrooms: 3, landSize: '0.5 acres', description: 'A charming and cozy cottage nestled in the heart of the picturesque Cotswolds.' },
    { 
      id: 3, name: 'Modern Apartment', status:'Active', price: '$750,000', image: 'https://images.unsplash.com/photo-1493809842344-ab6181ba96a2?q=80&w=2070&auto=format&fit=crop', type: 'Apartment', location: 'New York, NY', bedrooms: 2, landSize: 'N/A', description: 'A sleek and modern apartment in a prime downtown location, perfect for urban living.',
      reviews: [
        { id: 1, author: 'Alex R.', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 5, date: 'Nov 10, 2023', text: 'The location is unbeatable and the apartment itself is top-notch. I felt like I was living in the future.' },
      ]
    },
    { id: 4, name: 'Beach House', status:'Active', price: '$980,000', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', type: 'House', location: 'Malibu, CA', bedrooms: 4, landSize: '1 acre', description: 'An exquisite beach house with direct access to the ocean and breathtaking sunset views.' },
    { id: 5, name: 'Mountain Cabin', status:'Sold', price: '$600,000', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2070&auto=format&fit=crop', type: 'Cabin', location: 'Aspen, CO', bedrooms: 4, landSize: '5 acres', description: 'A rustic yet luxurious mountain cabin, ideal for getaways and enjoying nature.' },
    { id: 6, name: 'Urban Loft', status:'Active', price: '$820,000', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop', type: 'Loft', location: 'Chicago, IL', bedrooms: 1, landSize: 'N/A', description: 'A stylish urban loft with an open floor plan, high ceilings, and industrial-chic design.' },
    { id: 7, name: 'Seaside Bungalow', status: 'Active', price: '$650,000', image: 'https://picsum.photos/seed/house4/1600/900', type: 'Bungalow', location: 'Key West, FL', bedrooms: 2, landSize: '0.3 acres', description: 'A charming seaside bungalow with a private dock and beautiful ocean views.' },
    { id: 8, name: 'Penthouse Suite', status: 'Active', price: '$1,450,000', image: 'https://picsum.photos/seed/house5/1600/900', type: 'Penthouse', location: 'Miami, FL', bedrooms: 3, landSize: 'N/A', description: 'Luxurious penthouse suite with a rooftop terrace and stunning city skyline views.' },
    { id: 9, name: 'Farmhouse', status: 'Active', price: '$520,000', image: 'https://picsum.photos/seed/house6/1600/900', type: 'Farmhouse', location: 'Rural, TX', bedrooms: 4, landSize: '10 acres', description: 'A classic farmhouse with modern updates, surrounded by acres of beautiful farmland.' },
    { id: 10, name: 'Townhouse', status: 'Sold', price: '$380,000', image: 'https://picsum.photos/seed/house7/1600/900', type: 'Townhouse', location: 'Boston, MA', bedrooms: 3, landSize: '0.1 acres', description: 'A historic townhouse in a quiet, tree-lined neighborhood, close to downtown.' },
    { id: 11, name: 'Studio Loft', status: 'Active', price: '$220,000', image: 'https://picsum.photos/seed/house8/1600/900', type: 'Studio', location: 'Portland, OR', bedrooms: 1, landSize: 'N/A', description: 'A compact and stylish studio loft, perfect for a single professional or artist.' },
    { id: 12, name: 'Countryside Estate', status: 'Active', price: '$980,000', image: 'https://picsum.photos/seed/house9/1600/900', type: 'Estate', location: 'Napa Valley, CA', bedrooms: 6, landSize: '15 acres', description: 'A sprawling countryside estate with vineyards, a guest house, and a large pool.' },
    { id: 13, name: 'Lake House', status: 'Active', price: '$720,000', image: 'https://picsum.photos/seed/house10/1600/900', type: 'House', location: 'Lake Tahoe, NV', bedrooms: 4, landSize: '1.5 acres', description: 'A beautiful lake house with a private beach and stunning views of the water.' },
    { id: 14, name: 'City Penthouse', status: 'Active', price: '$2,200,000', image: 'https://picsum.photos/seed/house11/1600/900', type: 'Penthouse', location: 'San Francisco, CA', bedrooms: 3, landSize: 'N/A', description: 'An ultra-modern penthouse with floor-to-ceiling windows and 360-degree city views.' },
  ];
  
  export const vehiclesData = [
    { 
      id: 201, name: 'Sports Car', status: 'Active', price: '$80,000', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', color: 'Red', brand: 'Ferrari', year: 2022, fuelType: 'Gas', description: 'A high-performance sports car with a powerful V8 engine and aerodynamic design.',
      reviews: [
        { id: 1, author: 'Chris G.', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', rating: 5, date: 'Oct 28, 2023', text: 'An absolute dream to drive. The handling is sublime and it turns heads everywhere.' },
      ]
    },
    { id: 202, name: 'SUV', status: 'Active', price: '$55,000', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop', color: 'Black', brand: 'Porsche', year: 2023, fuelType: 'Gas', description: 'A luxury SUV that combines performance, comfort, and cutting-edge technology.' },
    { 
      id: 203, name: 'Electric Bike', status: 'Sold', price: '$5,000', image: 'https://images.unsplash.com/photo-1622093393794-45c5b8a43429?q=80&w=1932&auto=format&fit=crop', color: 'White', brand: 'Super73', year: 2023, fuelType: 'Electric', description: 'A powerful electric bike with a long-range battery, perfect for city commuting.',
      reviews: [
        { id: 1, author: 'Mia K.', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', rating: 5, date: 'Sep 05, 2023', text: 'So much fun! I use it for my daily commute and it\'s been a game-changer.' },
        { id: 2, author: 'Leo F.', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', rating: 4, date: 'Aug 20, 2023', text: 'Great bike, very powerful. The battery life is good but could be slightly better on steep hills.' },
      ]
    },
    { id: 204, name: 'Convertible', status: 'Sold', price: '$65,000', image: 'https://images.unsplash.com/photo-1511918984145-48de785d4c4e?q=80&w=2070&auto=format&fit=crop', color: 'Blue', brand: 'BMW', year: 2021, fuelType: 'Gas', description: 'A stylish convertible with a retractable hardtop, offering an exhilarating open-air driving experience.' },
    { id: 205, name: 'Pickup Truck', status: 'Active', price: '$40,000', image: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?q=80&w=2070&auto=format&fit=crop', color: 'Silver', brand: 'Ford', year: 2022, fuelType: 'Gas', description: 'A rugged and reliable pickup truck with excellent towing capacity and off-road capabilities.' },
    { id: 206, name: 'Classic Motorcycle', status: 'Active', price: '$12,000', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=2070&auto=format&fit=crop', color: 'Green', brand: 'Triumph', year: 1978, fuelType: 'Gas', description: 'A beautifully restored classic motorcycle, a true collector\'s item with timeless appeal.' },
      // Additional vehicles (continuing ids)
      { id: 207, name: 'Coupe', status: 'Active', price: '$45,000', image: 'https://picsum.photos/seed/car4/1600/900', color: 'Gray', brand: 'Audi', year: 2022, fuelType: 'Gas', description: 'A sporty coupe with a sleek design and a turbocharged engine for thrilling performance.', reviews: [ { id: 1, author: 'Rina K.', date: '2025-07-11', rating: 5, text: 'Superb handling and acceleration.', avatar: 'https://i.pravatar.cc/64?img=15' } ] },
      { id: 208, name: 'Minivan', status: 'Active', price: '$28,000', image: 'https://picsum.photos/seed/car5/1600/900', color: 'White', brand: 'Honda', year: 2023, fuelType: 'Gas', description: 'A spacious and practical minivan, perfect for families with plenty of room for passengers and cargo.' },
      { id: 209, name: 'Electric Sedan', status: 'Active', price: '$68,000', image: 'https://picsum.photos/seed/car6/1600/900', color: 'Silver', brand: 'Tesla', year: 2023, fuelType: 'Electric', description: 'A cutting-edge electric sedan with long range, rapid acceleration, and advanced autopilot features.' },
      { id: 210, name: 'Offroad Jeep', status: 'Active', price: '$52,000', image: 'https://picsum.photos/seed/car7/1600/900', color: 'Green', brand: 'Jeep', year: 2022, fuelType: 'Gas', description: 'A rugged off-road Jeep designed to conquer any terrain, with a durable frame and powerful 4x4 system.' },
      { id: 211, name: 'Delivery Van', status: 'Active', price: '$32,000', image: 'https://picsum.photos/seed/car8/1600/900', color: 'White', brand: 'Ford', year: 2023, fuelType: 'Gas', description: 'A reliable and spacious delivery van, perfect for businesses needing to transport goods efficiently.' },
      { id: 212, name: 'Hybrid Hatchback', status: 'Sold', price: '$22,000', image: 'https://picsum.photos/seed/car9/1600/900', color: 'Blue', brand: 'Toyota', year: 2021, fuelType: 'Hybrid', description: 'An economical hybrid hatchback with excellent fuel efficiency and a compact, city-friendly design.' },
      { id: 213, name: 'Luxury Sedan', status: 'Active', price: '$120,000', image: 'https://picsum.photos/seed/car10/1600/900', color: 'Black', brand: 'Mercedes-Benz', year: 2023, fuelType: 'Gas', description: 'A premium luxury sedan offering unparalleled comfort, advanced technology, and a smooth, powerful ride.' },
      { id: 214, name: 'Sports Motorcycle', status: 'Active', price: '$18,000', image: 'https://picsum.photos/seed/car11/1600/900', color: 'Red', brand: 'Ducati', year: 2022, fuelType: 'Gas', description: 'A high-performance sports motorcycle built for speed and agility, with a striking design.' },
  ];
  