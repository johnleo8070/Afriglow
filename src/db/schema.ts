import { pgTable, serial, varchar, text, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").default(""),
  image: varchar("image", { length: 500 }).default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").default(""),
  price: numeric("price").notNull(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  images: jsonb("images").$type<string[]>().default([]),
  sizes: jsonb("sizes").$type<string[]>().default([]),
  colors: jsonb("colors").$type<string[]>().default([]),
  stockQuantity: integer("stock_quantity").default(0),
  availablePieces: integer("available_pieces").default(0),
  isAvailable: boolean("is_available").default(true),
  isFeatured: boolean("is_featured").default(false),
  isNew: boolean("is_new").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 50 }).unique(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).default(""),
  notes: text("notes").default(""),
  products: jsonb("products").$type<OrderProduct[]>().default([]),
  totalAmount: numeric("total_amount").notNull(),
  paymentScreenshot: varchar("payment_screenshot", { length: 500 }).default(""),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  orderStatus: varchar("order_status", { length: 50 }).default("processing"),
  trackingNumber: varchar("tracking_number", { length: 255 }).default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Hairstyles table (Catalogue)
export const hairstyles = pgTable("hairstyles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  shortDescription: text("short_description").default(""),
  description: text("description").default(""),
  priceFrom: numeric("price_from").notNull(),
  depositAmount: numeric("deposit_amount").default("50"),
  durationHours: numeric("duration_hours").default("4"),
  durationLabel: varchar("duration_label", { length: 100 }).default("Approx. 4 hours"),
  hairIncluded: boolean("hair_included").default(false),
  hairIncludedNote: text("hair_included_note").default(""),
  lengthOptions: jsonb("length_options").$type<string[]>().default([]),
  maintenanceLevel: varchar("maintenance_level", { length: 50 }).default("Low"),
  recommendedWearTime: varchar("recommended_wear_time", { length: 100 }).default("6 - 8 Weeks"),
  images: jsonb("images").$type<string[]>().default([]),
  featured: boolean("featured").default(false),
  popular: boolean("popular").default(false),
  isAvailable: boolean("is_available").default(true),
  whatsIncluded: jsonb("whats_included").$type<string[]>().default([]),
  prepInstructions: jsonb("prep_instructions").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingNumber: varchar("booking_number", { length: 50 }).unique().notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  preferredContact: varchar("preferred_contact", { length: 50 }).default("SMS & Phone"),
  hairLength: varchar("hair_length", { length: 100 }).default(""),
  hairCondition: text("hair_condition").default(""),
  specialRequests: text("special_requests").default(""),
  hairstyleId: varchar("hairstyle_id", { length: 100 }).notNull(),
  hairstyleName: varchar("hairstyle_name", { length: 255 }).notNull(),
  selectedLength: varchar("selected_length", { length: 100 }).default(""),
  appointmentDate: varchar("appointment_date", { length: 100 }).notNull(),
  appointmentTime: varchar("appointment_time", { length: 50 }).notNull(),
  durationHours: numeric("duration_hours").default("4"),
  totalPrice: numeric("total_price").notNull(),
  depositPaid: numeric("deposit_paid").notNull(),
  balanceDue: numeric("balance_due").notNull(),
  paymentOption: varchar("payment_option", { length: 50 }).default("deposit"),
  paymentStatus: varchar("payment_status", { length: 50 }).default("paid"),
  bookingStatus: varchar("booking_status", { length: 50 }).default("confirmed"),
  location: text("location").default("7–9 Corrimal Street, Wollongong NSW 2500"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Admin table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Settings table
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type HairstyleSchema = typeof hairstyles.$inferSelect;
export type BookingSchema = typeof bookings.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type Setting = typeof settings.$inferSelect;

export interface OrderProduct {
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  size: string;
  color: string;
  price: string;
}
