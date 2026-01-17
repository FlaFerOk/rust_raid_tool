// Type definitions for Rust Raid Calculator

export interface Weapon {
  id: string;
  name: string;
  image: string;
  sulfur_cost: number;
  damage: {
    [key: string]: number;
  };
}

export interface Target {
  id: string;
  name: string;
  image: string;
  hp: number;
}

export interface OptimalExplosive {
  weaponId: string;
  weaponName: string;
  quantity: number;
  sulfurCost: number;
}

export interface RaidPlanItem {
  id: string;
  target: Target;
  customHP: number;
  optimalExplosives: OptimalExplosive[];
  totalSulfur: number;
}

export interface WeaponsData {
  weapons: Weapon[];
}

export interface TargetsData {
  targets: Target[];
}
