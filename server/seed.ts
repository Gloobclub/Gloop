import { db } from "./db";
import { submissions } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const initialSubmissions = [
    {
      walletAddress: "0x123...abc",
      twitterHandle: "@gloop_fan_1",
      discordHandle: "glooper#1234",
      imageUrl: "/images/IMG-20260217-WA0012_1771391580443.jpg",
      title: "Floating Zen",
      description: "Finding peace in the digital realm.",
      status: "approved",
    },
    {
      walletAddress: "0x456...def",
      twitterHandle: "@nft_collector",
      discordHandle: "collector#5678",
      imageUrl: "/images/IMG-20260217-WA0013_1771391580391.jpg",
      title: "Money Swing",
      description: "Swinging through the crypto highs and lows.",
      status: "approved",
    },
    {
      walletAddress: "0x789...ghi",
      twitterHandle: "@cat_lover_dao",
      discordHandle: "meow#9999",
      imageUrl: "/images/IMG-20260217-WA0014_1771391580488.jpg",
      title: "Cancel AI Slop",
      description: "Hand-drawn art is forever.",
      status: "pending",
    },
    {
      walletAddress: "0xabc...123",
      twitterHandle: "@fastfood_punk",
      discordHandle: "burger#0000",
      imageUrl: "/images/IMG-20260217-WA0015_1771391580529.jpg",
      title: "Fast Food Worker",
      description: "Even in the metaverse, gotta flip burgers.",
      status: "approved",
    },
  ];

  await db.insert(submissions).values(initialSubmissions);
  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
