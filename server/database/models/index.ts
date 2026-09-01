import { Sequelize } from "sequelize";
import { InternalServerError } from "../../middleware/errorHandler.ts";

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new InternalServerError("Database configuration is missing in environment variables.");
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
});

// Models
const User = require('./user.ts')(sequelize);

const Product = require('./fridge/product.ts')(sequelize);
const Price = require('./fridge/price.ts')(sequelize);
const Grocery = require('./fridge/grocery.ts')(sequelize);
const PersonalPurchase = require('./fridge/personalPurchase.ts')(sequelize);
const InventoryAdjustment = require('./fridge/inventoryAdjustment.ts')(sequelize);
const Transfer = require('./fridge/transfer.ts')(sequelize);

const WishlistPeriod = require('./fridge/wishlistPeriod.ts')(sequelize);
const WishlistEntry = require('./fridge/wishlistEntry.ts')(sequelize);

// Relationships

// Product 1:N Grocery
Product.hasMany(Grocery, {
  foreignKey: "productId",
});

Grocery.belongsTo(Product, {
  foreignKey: "productId",
});

// User 1:N Grocery
User.hasMany(Grocery, {
  foreignKey: "providerId",
});

Grocery.belongsTo(User, {
  foreignKey: "providerId",
  as: "provider",
});


// Product 1:N Price
Product.hasMany(Price, {
  foreignKey: "productId",
});

Price.belongsTo(Product, {
  foreignKey: "productId",
});

// Price 1:N PersonalPurchase
Price.hasMany(PersonalPurchase, {
  foreignKey: "priceId",
});

PersonalPurchase.belongsTo(Price, {
  foreignKey: "priceId",
});

// User 1:N PersonalPurchase
User.hasMany(PersonalPurchase, {
  foreignKey: "buyerId",
});

PersonalPurchase.belongsTo(User, {
  foreignKey: "buyerId",
  as: "buyer",
});

// Product 1:N InventoryAdjustment
Product.hasMany(InventoryAdjustment, {
  foreignKey: "productId",
});

InventoryAdjustment.belongsTo(Product, {
  foreignKey: "productId",
});

// User 1:N InventoryAdjustment
User.hasMany(InventoryAdjustment, {
  foreignKey: "adminId",
});

InventoryAdjustment.belongsTo(User, {
  foreignKey: "adminId",
  as: "admin",
});

// WishlistPeriod 1:N WishlistEntry
WishlistPeriod.hasMany(WishlistEntry, {
    foreignKey: "periodId",
    as: "entries",
});

WishlistEntry.belongsTo(WishlistPeriod, {
    foreignKey: "periodId",
    as: "period",
});

// Product 1:N WishlistEntry
Product.hasMany(WishlistEntry, {
    foreignKey: "productId",
    as: "wishlistEntries",
});

WishlistEntry.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

// User 1:N WishlistEntry
User.hasMany(WishlistEntry, {
    foreignKey: "userId",
    as: "wishlistEntries",
});

WishlistEntry.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// User 1:N WishlistPeriod
User.hasMany(WishlistPeriod, {
    foreignKey: "closedById",
    as: "closedWishlistPeriods",
});

WishlistPeriod.belongsTo(User, {
    foreignKey: "closedById",
    as: "closedBy",
});

// User 1:N Transfer
User.hasMany(Transfer, {
    foreignKey: "fromUserId",
    as: "sentTransfers",
});

Transfer.belongsTo(User, {
    foreignKey: "fromUserId",
    as: "fromUser",
});

// User 1:N Transfer
User.hasMany(Transfer, {
    foreignKey: "toUserId",
    as: "receivedTransfers",
});

Transfer.belongsTo(User, {
    foreignKey: "toUserId",
    as: "toUser",
});

export default sequelize;