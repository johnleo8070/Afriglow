import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getSupabaseAdmin, isSupabaseStorageConfigured, STORAGE_BUCKET } from "@/lib/supabase";

// Allowed image mime types and max size (10MB)
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = (formData.get("type") as string) || "hairstyles";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Invalid file type. Only images are allowed." }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "File too large. Max 10MB." }, { status: 400 });
    }

    const safeType = type.replace(/[^a-zA-Z0-9_-]/g, "");
    const ext = file.name.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const objectPath = `${safeType}/${uniqueName}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ---- Primary path: Supabase Storage ----
    if (isSupabaseStorageConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        // Ensure bucket exists
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === STORAGE_BUCKET);
        
        if (!bucketExists) {
          await supabase.storage.createBucket(STORAGE_BUCKET, {
            public: true,
            fileSizeLimit: 10485760, // 10MB
            allowedMimeTypes: ALLOWED_TYPES,
          });
        }

        const { error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(objectPath, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (error) {
          console.error("Supabase upload error:", error.message);
        } else {
          const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(objectPath);
          return NextResponse.json({
            success: true,
            data: { url: pub.publicUrl, filename: uniqueName, storage: "supabase" },
          });
        }
      }
    }

    // ---- Fallback: local public/uploads directory ----
    const uploadDir = path.join(process.cwd(), "public", "uploads", safeType);
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      data: { url: `/uploads/${safeType}/${uniqueName}`, filename: uniqueName, storage: "local" },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
