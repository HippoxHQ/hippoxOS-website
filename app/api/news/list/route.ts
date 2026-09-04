// src/app/api/news/list/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const newsDir = path.join(process.cwd(), "public", "news");
    
    if (!fs.existsSync(newsDir)) {
      return NextResponse.json({ folders: [] });
    }

    const folders = fs
      .readdirSync(newsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && /^\d{8}$/.test(dirent.name))
      .map((dirent) => dirent.name)
      .sort((a, b) => b.localeCompare(a)); // 降序，最新的在前

    return NextResponse.json({ folders });
  } catch (error) {
    console.error("Failed to list news folders:", error);
    return NextResponse.json({ folders: [], error: "Failed to list news" });
  }
}