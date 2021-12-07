export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	constructor(public items: Array<Item>) {}

	updateQuality() {
		this.items.forEach(item => {
			this.doUpdateQuality(item);
		});

		return this.items;
	}

	private doUpdateQuality(item: Item) {
		switch (item.name) {
			case 'Aged Brie':
				if (item.quality < 50) {
					item.quality = item.quality + 1;
				}
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					if (item.quality < 50) {
						item.quality = item.quality + 1;
					}
				}
				break;
			case 'Backstage passes to a TAFKAL80ETC concert':
				if (item.quality < 50) {
					item.quality = item.quality + 1;
					if (item.sellIn < 11) {
						if (item.quality < 50) {
							item.quality = item.quality + 1;
						}
					}
					if (item.sellIn < 6) {
						if (item.quality < 50) {
							item.quality = item.quality + 1;
						}
					}
				}
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					item.quality = item.quality - item.quality;
				}
				break;
			case 'Sulfuras, Hand of Ragnaros':
				break;
			default:
				if (item.quality > 0) {
					item.quality = item.quality - 1;
				}
				item.sellIn = item.sellIn - 1;
				if (item.sellIn < 0) {
					if (item.quality > 0) {
						item.quality = item.quality - 1;
					}
				}
				break;
		}
	}
}