import { defineStore } from 'pinia';
import type { Weapon, Target, RaidPlanItem, OptimalExplosive, WeaponsData, TargetsData } from '@/types';

export const useRaidStore = defineStore('raid', {
    state: () => ({
        weapons: [] as Weapon[],
        targets: [] as Target[],
        selectedWeaponIds: [] as string[],
        selectedTargetId: null as string | null,
        customHP: null as number | null,
        raidPlan: [] as RaidPlanItem[],
    }),

    getters: {
        selectedWeapons(state): Weapon[] {
            return state.weapons.filter(w => state.selectedWeaponIds.includes(w.id));
        },

        selectedTarget(state): Target | null {
            return state.targets.find(t => t.id === state.selectedTargetId) || null;
        },

        currentHP(state): number | null {
            if (state.customHP !== null) return state.customHP;
            const target = this.selectedTarget;
            return target ? target.hp : null;
        },

        totalSulfurNeeded(state): number {
            return state.raidPlan.reduce((sum, item) => sum + item.totalSulfur, 0);
        },

        totalExplosivesNeeded(state): { [weaponId: string]: { name: string; quantity: number } } {
            const totals: { [weaponId: string]: { name: string; quantity: number } } = {};

            state.raidPlan.forEach(item => {
                item.optimalExplosives.forEach(explosive => {
                    if (!totals[explosive.weaponId]) {
                        totals[explosive.weaponId] = {
                            name: explosive.weaponName,
                            quantity: 0
                        };
                    }
                    totals[explosive.weaponId].quantity += explosive.quantity;
                });
            });

            return totals;
        },
    },

    actions: {
        async loadWeapons() {
            try {
                const response = await fetch('/data/weapons.json');
                const data: WeaponsData = await response.json();
                this.weapons = data.weapons;
            } catch (error) {
                console.error('Failed to load weapons:', error);
            }
        },

        async loadTargets() {
            try {
                const response = await fetch('/data/targets.json');
                const data: TargetsData = await response.json();
                this.targets = data.targets;
            } catch (error) {
                console.error('Failed to load targets:', error);
            }
        },

        toggleWeapon(weaponId: string) {
            const index = this.selectedWeaponIds.indexOf(weaponId);
            if (index > -1) {
                this.selectedWeaponIds.splice(index, 1);
            } else {
                this.selectedWeaponIds.push(weaponId);
            }
        },

        selectTarget(targetId: string) {
            this.selectedTargetId = targetId;
            this.customHP = null; // Reset custom HP when selecting new target
        },

        setCustomHP(hp: number | null) {
            this.customHP = hp;
        },

        calculateOptimalRaid(): OptimalExplosive[] | null {
            const target = this.selectedTarget;
            const hp = this.currentHP;
            const selectedWeapons = this.selectedWeapons;

            if (!target || hp === null || selectedWeapons.length === 0) {
                return null;
            }

            // Calculate for each weapon individually
            const weaponOptions: OptimalExplosive[] = selectedWeapons.map(weapon => {
                const damage = weapon.damage[target.id] || 0;
                if (damage === 0) {
                    return {
                        weaponId: weapon.id,
                        weaponName: weapon.name,
                        quantity: 0,
                        sulfurCost: Infinity,
                    };
                }

                const quantity = Math.ceil(hp / damage);
                const sulfurCost = quantity * weapon.sulfur_cost;

                return {
                    weaponId: weapon.id,
                    weaponName: weapon.name,
                    quantity,
                    sulfurCost,
                };
            });

            // Filter out weapons that don't work
            const validOptions = weaponOptions.filter(opt => opt.sulfurCost !== Infinity);

            if (validOptions.length === 0) {
                return null;
            }

            // Find the cheapest single weapon option
            const cheapestSingle = validOptions.reduce((min, curr) =>
                curr.sulfurCost < min.sulfurCost ? curr : min
            );

            // Try to find better combinations (greedy approach)
            // For simplicity, we'll use the cheapest weapon to deal most damage,
            // then fill the rest with the next cheapest
            if (validOptions.length > 1) {
                const sorted = [...validOptions].sort((a, b) => {
                    const weapon_a = selectedWeapons.find(w => w.id === a.weaponId)!;
                    const weapon_b = selectedWeapons.find(w => w.id === b.weaponId)!;
                    const damage_a = weapon_a.damage[target.id];
                    const damage_b = weapon_b.damage[target.id];

                    // Sort by sulfur per damage (efficiency)
                    const eff_a = weapon_a.sulfur_cost / damage_a;
                    const eff_b = weapon_b.sulfur_cost / damage_b;

                    return eff_a - eff_b;
                });

                let bestCombination = [cheapestSingle];
                let bestCost = cheapestSingle.sulfurCost;

                // Try combinations of the two most efficient weapons
                for (let i = 0; i < sorted.length - 1; i++) {
                    const weapon1 = selectedWeapons.find(w => w.id === sorted[i].weaponId)!;
                    const damage1 = weapon1.damage[target.id];

                    for (let j = i + 1; j < sorted.length; j++) {
                        const weapon2 = selectedWeapons.find(w => w.id === sorted[j].weaponId)!;
                        const damage2 = weapon2.damage[target.id];

                        // Try different quantities of weapon1, fill rest with weapon2
                        for (let qty1 = 0; qty1 <= Math.ceil(hp / damage1); qty1++) {
                            const remainingHP = hp - (qty1 * damage1);
                            if (remainingHP <= 0) {
                                const cost = qty1 * weapon1.sulfur_cost;
                                if (cost < bestCost) {
                                    bestCost = cost;
                                    bestCombination = [{
                                        weaponId: weapon1.id,
                                        weaponName: weapon1.name,
                                        quantity: qty1,
                                        sulfurCost: cost,
                                    }];
                                }
                                break;
                            }

                            const qty2 = Math.ceil(remainingHP / damage2);
                            const cost = (qty1 * weapon1.sulfur_cost) + (qty2 * weapon2.sulfur_cost);

                            if (cost < bestCost) {
                                bestCost = cost;
                                bestCombination = [
                                    {
                                        weaponId: weapon1.id,
                                        weaponName: weapon1.name,
                                        quantity: qty1,
                                        sulfurCost: qty1 * weapon1.sulfur_cost,
                                    },
                                    {
                                        weaponId: weapon2.id,
                                        weaponName: weapon2.name,
                                        quantity: qty2,
                                        sulfurCost: qty2 * weapon2.sulfur_cost,
                                    },
                                ].filter(item => item.quantity > 0);
                            }
                        }
                    }
                }

                return bestCombination;
            }

            return [cheapestSingle];
        },

        addToRaidPlan() {
            const target = this.selectedTarget;
            const hp = this.currentHP;
            const optimal = this.calculateOptimalRaid();

            if (!target || hp === null || !optimal) {
                return;
            }

            const totalSulfur = optimal.reduce((sum, exp) => sum + exp.sulfurCost, 0);

            const item: RaidPlanItem = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                target: { ...target },
                customHP: hp,
                optimalExplosives: optimal,
                totalSulfur,
            };

            this.raidPlan.push(item);
        },

        removeFromRaidPlan(itemId: string) {
            const index = this.raidPlan.findIndex(item => item.id === itemId);
            if (index > -1) {
                this.raidPlan.splice(index, 1);
            }
        },

        clearRaidPlan() {
            this.raidPlan = [];
        },
    },
});
