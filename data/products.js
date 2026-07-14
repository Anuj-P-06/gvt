export const categories = [
  { id: 'reactors', name: 'Reactors & Pressure Vessels', slug: 'reactors' },
  { id: 'zinc-kettles', name: 'Zinc Kettles', slug: 'zinc-kettles' },
  { id: 'storage-tanks', name: 'Storage Tanks', slug: 'storage-tanks' },
  { id: 'heat-exchangers', name: 'Heat Exchangers', slug: 'heat-exchangers' },
  { id: 'custom-fabrication', name: 'Custom Fabrication', slug: 'custom-fabrication' },
]

export const products = [
  {
    id: 1,
    name: 'Industrial Reactor Vessel',
    category: 'reactors',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    description:
      'Custom-built reactors for chemical and pharmaceutical processing with ASME-compliant design.',
    specs: ['Capacity: 500L – 50,000L', 'Material: SS316, SS304, MS', 'Design Pressure: Up to 40 bar'],
  },
  {
    id: 2,
    name: 'Hot-Dip Galvanizing Kettle',
    category: 'zinc-kettles',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
    description:
      'High-performance zinc kettles engineered for continuous galvanizing operations in steel plants.',
    specs: ['Length: 6m – 18m', 'Zinc Capacity: 100–500 MT', 'Low-iron steel construction'],
  },
  {
    id: 3,
    name: 'FRP Storage Tank',
    category: 'storage-tanks',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    description:
      'Corrosion-resistant FRP tanks for water treatment, chemical storage, and effluent plants.',
    specs: ['Capacity: 1,000L – 100,000L', 'Vertical & horizontal configs', 'UV-resistant gel coat'],
  },
  {
    id: 4,
    name: 'Stainless Steel Storage Tank',
    category: 'storage-tanks',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb71a599?w=800&q=80',
    description:
      'SS304/SS316 storage tanks for pharma, food-grade, and high-purity chemical applications.',
    specs: ['Capacity: 500L – 80,000L', 'Jacketed options available', 'Mirror polish finish'],
  },
  {
    id: 5,
    name: 'Shell & Tube Heat Exchanger',
    category: 'heat-exchangers',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    description:
      'Efficient heat transfer solutions for industrial process heating and cooling applications.',
    specs: ['Surface area: 10–500 m²', 'SS316 tube bundles', 'TEMA standards compliant'],
  },
  {
    id: 6,
    name: 'Custom Pressure Vessel',
    category: 'custom-fabrication',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    description:
      'Bespoke pressure vessels fabricated to your exact process requirements and site constraints.',
    specs: ['Design to client P&ID', 'Third-party inspection ready', 'Complete documentation package'],
  },
]
