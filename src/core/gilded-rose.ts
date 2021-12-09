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

export class StandardItem {
	protected constructor(protected name: string, protected sellIn: number, protected quality: number) {}

	static createFrom(item:Item){
		switch (item.name) {
			case 'Aged Brie':
				return new AgedBrie('Aged Brie', item.sellIn, item.quality)
			case 'Backstage passes to a TAFKAL80ETC concert':
				return new BackstagePass('Backstage passes to a TAFKAL80ETC concert', item.sellIn, item.quality)
			case 'Sulfuras, Hand of Ragnaros':
				return new Sulfuras('Sulfuras, Hand of Ragnaros', item.sellIn, item.quality)
			default:
				return new StandardItem(item.name, item.sellIn, item.quality)
		}
	}

	doUpdateQuality() {
		if (this.quality > 0) {
			this.quality = this.quality - 1;
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			if (this.quality > 0) {
				this.quality = this.quality - 1;
			}
		}
	}

	toString(){
		return `
		Name: ${this.name} 
		Sell in:${this.sellIn} 
		Quality: ${this.quality}
		`
	}
}

class AgedBrie extends StandardItem{
	doUpdateQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1;
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			if (this.quality < 50) {
				this.quality = this.quality + 1;
			}
		}
	}
}

class BackstagePass extends StandardItem{
	doUpdateQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1;
			if (this.sellIn < 11) {
				if (this.quality < 50) {
					this.quality = this.quality + 1;
				}
			}
			if (this.sellIn < 6) {
				if (this.quality < 50) {
					this.quality = this.quality + 1;
				}
			}
		}
		this.sellIn = this.sellIn - 1;
		if (this.sellIn < 0) {
			this.quality = this.quality - this.quality;
		}
	}
}

class Sulfuras extends StandardItem{
	doUpdateQuality() {}
}

export class GildedRose {
	constructor(public items: Array<StandardItem>) {}

	updateQuality() {
		this.items.forEach(item => {
			item.doUpdateQuality();
		});

		return this.items;
	}
}