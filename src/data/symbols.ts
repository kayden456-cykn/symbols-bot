export type AnimalCompanySymbol = { id: string; name: string; description?: string; aliases?: string[] };
export type AnimalCompanySolution = { id: string; name: string; location?: string; symbols: string[]; notes?: string };

// Add only symbols verified in-game. The uploaded symbols.ts was an IL2CPP export map.
export const symbols: AnimalCompanySymbol[] = [
  // { id: "red_triangle", name: "Red Triangle", aliases: ["triangle"] }
];

export const solutions: AnimalCompanySolution[] = [
  // { id: "verified_puzzle", name: "Verified Puzzle", location: "Location",
  //   symbols: ["red_triangle"], notes: "Enter the verified sequence in order." }
];
