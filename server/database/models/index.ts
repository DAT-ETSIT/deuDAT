import {Sequelize} from "sequelize";
import {InternalServerError} from "../../middleware/errorHandler.ts";

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new InternalServerError("Database configuration is missing in environment variables.");
}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
});

// Models

// Relationships

export default sequelize;