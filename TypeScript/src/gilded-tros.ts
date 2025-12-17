import {Item} from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    public updateQuality(): void {
        for (let i = 0; i < this.items.length; i++) {

             // NEW: Smelly items degrade twice as fast as normal items
            const isSmelly =
                this.items[i].name == 'Duplicate Code' ||
                this.items[i].name == 'Long Methods' ||
                this.items[i].name == 'Ugly Variable Names';

            // NEW: Legendary must always have Quality 80
            if (this.items[i].name == 'B-DAWG Keychain') {
                this.items[i].quality = 80;
                continue;
            }

            if (this.items[i].name != 'Good Wine' && this.items[i].name != 'Backstage passes for Re:Factor' && this.items[i].name != 'Backstage passes for HAXX') {
                if (this.items[i].quality > 0) {
                        // CHANGED: smelly items degrade twice as fast
                        this.items[i].quality = this.items[i].quality - (isSmelly ? 2 : 1);
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1;

                    if (this.items[i].name == 'Backstage passes for Re:Factor' || this.items[i].name == 'Backstage passes for HAXX') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }

                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1;
                            }
                        }
                    }
                }
            }

            // CHANGED: SellIn decreases daily (except legendary, already continued)
            this.items[i].sellIn = this.items[i].sellIn - 1;

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Good Wine') {
                    // FIXED: must be &&, not ||
                    // (otherwise backstage never drops to 0)
                    if (this.items[i].name != 'Backstage passes for Re:Factor' && this.items[i].name != 'Backstage passes for HAXX') {
                        if (this.items[i].quality > 0) {
                            // CHANGED: smelly items degrade twice as fast after sell date too
                            this.items[i].quality = this.items[i].quality - (isSmelly ? 2 : 1);
                        }
                    } else {
                        // CHANGED:Backstage passes drop to 0 after the conference
                        this.items[i].quality = 0;
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
            // NEW: Quality is never negative
            if (this.items[i].quality < 0) {
                this.items[i].quality = 0;
            }
        }
    }

}

