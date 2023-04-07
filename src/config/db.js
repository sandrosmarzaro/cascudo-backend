export const dbConfig = {
    dialect: "sqlite",
    storage: "db.sqlite",
    define: {
        timestamps: true,
        freezeTableName: true,
        underscored: true
    }
};
