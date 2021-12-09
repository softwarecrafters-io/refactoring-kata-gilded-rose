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

export interface InventoryItem {
	doUpdateQuality(): void;
	toString(): string;
}

export class StandardItem implements InventoryItem{
	private constructor(private name: string, private sellIn: number, private quality: number) {}

	static createFrom(item:Item):InventoryItem{
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
		this.decreaseQuality();
		this.decreaseSellIn();
		if (this.sellIn < 0) {
			this.decreaseQuality()
		}
	}

	private decreaseSellIn() {
		this.sellIn = this.sellIn - 1;
	}

	private decreaseQuality() {
		if (this.quality > 0) {
			this.quality = this.quality - 1;
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

class AgedBrie implements InventoryItem{
	constructor(private name: string, private sellIn: number, private quality: number) {}

	doUpdateQuality() {
		this.increaseQuality();
		this.decreaseQuality();
		if (this.sellIn < 0) {
			this.increaseQuality()
		}
	}

	private decreaseQuality() {
		this.sellIn = this.sellIn - 1;
	}

	private increaseQuality() {
		if (this.quality < 50) {
			this.quality = this.quality + 1;
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

class BackstagePass implements InventoryItem{
	constructor(private name: string, private sellIn: number, private quality: number) {}

	doUpdateQuality() {
		const maxQuality = 50;
		if (this.quality < maxQuality) {
			this.increaseQuality();
			this.increaseQualityBy(11, maxQuality);
			this.increaseQualityBy(6, maxQuality);
		}
		this.decreaseSellIn();
		this.decreaseQuality();
	}

	private increaseQualityBy(sellIn :number,  quality :number) {
		if (this.sellIn < sellIn && this.quality < quality) {
			this.increaseQuality();
		}
	}

	private decreaseQuality() {
		if (this.sellIn < 0) {
			this.quality = 0;
		}
	}

	private decreaseSellIn() {
		this.sellIn = this.sellIn - 1;
	}

	private increaseQuality() {
		this.quality = this.quality + 1;
	}

	toString(){
		return `
		Name: ${this.name} 
		Sell in:${this.sellIn} 
		Quality: ${this.quality}
		`
	}
}

class Sulfuras implements InventoryItem{
	constructor(private name: string, private sellIn: number, private quality: number) {}

	doUpdateQuality() {}

	toString(){
		return `
		Name: ${this.name} 
		Sell in:${this.sellIn} 
		Quality: ${this.quality}
		`
	}
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