import { z } from "zod";

// Validation schema for creating a new report
export const createReportSchema = z.object({
  title: z
    .string()
    .min(10, "Judul harus minimal 10 karakter")
    .max(100, "Judul maksimal 100 karakter"),

  description: z
    .string()
    .min(20, "Deskripsi harus minimal 20 karakter")
    .max(1000, "Deskripsi maksimal 1000 karakter"),

  category: z.enum(["infrastruktur", "kebersihan", "keamanan", "kesehatan", "lainnya"], {
    required_error: "Kategori harus dipilih",
    invalid_type_error: "Kategori tidak valid",
  }),

  address: z
    .string()
    .min(10, "Alamat harus minimal 10 karakter")
    .max(200, "Alamat maksimal 200 karakter"),

  city: z
    .string()
    .min(3, "Kota harus minimal 3 karakter")
    .max(50, "Kota maksimal 50 karakter"),

  latitude: z
    .number({
      required_error: "Koordinat latitude diperlukan",
      invalid_type_error: "Latitude harus berupa angka",
    })
    .min(-90, "Latitude harus antara -90 dan 90")
    .max(90, "Latitude harus antara -90 dan 90"),

  longitude: z
    .number({
      required_error: "Koordinat longitude diperlukan",
      invalid_type_error: "Longitude harus berupa angka",
    })
    .min(-180, "Longitude harus antara -180 dan 180")
    .max(180, "Longitude harus antara -180 dan 180"),

  images: z
    .array(z.string().url("URL gambar tidak valid"))
    .min(1, "Minimal 1 gambar harus diunggah")
    .max(5, "Maksimal 5 gambar yang dapat diunggah"),
});

// Type inference from schema
export type CreateReportInput = z.infer<typeof createReportSchema>;

// Validation schema for updating a report (all fields optional)
export const updateReportSchema = createReportSchema.partial();

export type UpdateReportInput = z.infer<typeof updateReportSchema>;
