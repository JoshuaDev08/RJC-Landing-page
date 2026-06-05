// products.ts

export type ProductConfig = {
  id: number;
  name: string;
  material: string;
  image: string;
  price: string;
};

export const productConfigs: ProductConfig[] = [
  {
    id: 1,
    name: "Walnut Executive Desk",
    material: "Walnut Wood + Steel Base",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    price: "$2,499",
  },
  {
    id: 2,
    name: "Industrial Dining Table",
    material: "Oak Wood + Aluminum Legs",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc",
    price: "$1,899",
  },
  {
    id: 3,
    name: "Modern Conference Table",
    material: "Mahogany + Steel Frame",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    price: "$3,299",
  },
  {
    id: 4,
    name: "Minimalist Coffee Table",
    material: "Oak + Brushed Aluminum",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    price: "$899",
  },
  {
    id: 5,
    name: "Custom Work Bench",
    material: "Mixed Wood + Steel",
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    price: "$1,599",
  },
  {
    id: 6,
    name: "Luxury Side Table",
    material: "Walnut + Aluminum",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a",
    price: "$699",
  },
];