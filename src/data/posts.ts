import articleImage from "../assets/article.png";
import type { ImageMetadata } from "astro";
import FaysalBankImage from "../assets/testomonials/faysal_bank.jpeg";
import SmartFinanceImage from "../assets/testomonials/smart_mou.jpeg";
import CarrefourImage from "../assets/testomonials/carefour.jpeg";
import MultanImage from "../assets/testomonials/multan.png";

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	category: string;
	image: ImageMetadata;
	author?: string;
}

export const posts: BlogPost[] = [
	{
		slug: "mou-signing-ceremony",
		title: "MoU Signing Ceremony",
		excerpt:
			"Waseela Pakistan has signed an MoU with Faysal Bank Ltd to deliver fast-track, Shariah-compliant financing for farmers through digital solutions.",
		content: `
Waseela Pakistan has signed an MoU with Faysal Bank Ltd to deliver fast-track, Shariah-compliant financing for farmers through digital solutions. This initiative aims to give financial support to farmers and reduce dependence on middlemen.
		`.trim(),
		date: "February 12, 2026",
		category: "Partnership",
		image: FaysalBankImage,
	},
	{
		slug: "partnership-with-smart-finance",
		title: "Partnership with Smart Finance Limited",
		excerpt:
			"We have partnered with Smart Finance Limited to expand structured financing across Waseela’s farmer network, anchored in data, discipline, and recoverability.",
		content: `
We have partnered with Smart Finance Limited to expand structured financing across Waseela’s farmer network, anchored in data, discipline, and recoverability.
		`.trim(),
		date: "February 19, 2026",
		category: "Partnership",
		image: SmartFinanceImage,
	},
	{
		slug: "kisaan-kanak-atta-carrefour",
		title: "Kisaan Kanak Atta at Carrefour",
		excerpt:
			"Kisaan Kanak Atta has reached Carrefour stores nationwide, marking a proud milestone in bringing our farmers’ finest directly to your table.",
		content: `
Kisaan Kanak Atta has reached Carrefour stores nationwide, marking a proud milestone in bringing our farmers’ finest directly to your table.
		`.trim(),
		date: "January 29, 2026",
		category: "Event",
		image: CarrefourImage,
	},

	{
		slug: "kisaan-kanak-availability-multan",
		title: "Kisaan Kanak Availability in Multan",
		excerpt:
			"Kisaan Kanak has reached Multan, bringing a real upgrade in taste and quality, straight from our farmers to your table.",
		content: `
Kisaan Kanak has reached Multan, bringing a real upgrade in taste and quality, straight from our farmers to your table.
		`.trim(),
		date: "December 10, 2026",
		category: "Event",
		image: MultanImage,
	},
];
